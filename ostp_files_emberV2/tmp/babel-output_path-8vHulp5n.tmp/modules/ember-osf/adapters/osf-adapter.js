/*
  Base adapter class for all OSF APIv2 endpoints
 */
import Ember from 'ember';
import DS from 'ember-data';

import HasManyQuery from 'ember-data-has-many-query';
import config from 'ember-get-config';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

var inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export default DS.JSONAPIAdapter.extend(HasManyQuery.RESTAdapterMixin, DataAdapterMixin, {
    authorizer: 'authorizer:osf-token',
    host: config.OSF.apiUrl,
    namespace: config.OSF.apiNamespace,
    buildURL: function buildURL(modelName, id, snapshot, requestType) {
        // Fix issue where CORS request failed on 301s: Ember does not seem to append trailing
        // slash to URLs for single documents, but DRF redirects to force a trailing slash
        var url = this._super.apply(this, arguments);
        if (requestType === 'deleteRecord' || requestType === 'updateRecord' || requestType === 'findRecord') {
            if (snapshot.record.get('links.self')) {
                url = snapshot.record.get('links.self');
            }
        }
        if (url.lastIndexOf('/') !== url.length - 1) {
            url += '/';
        }
        return url;
    },
    /**
     * Construct a URL for a relationship create/update/delete. Has the same
     * signature as buildURL, with the addition of a 'relationship' param
     *
     * @method _buildRelationshipURL
     * @param {String} relationship the relationship to build a url for
     * @return {String} a URL
     **/
    _buildRelationshipURL: function _buildRelationshipURL(modelName, id, snapshot, requestType, query, relationship) {
        // jshint ignore:line
        var links = relationship ? snapshot.record.get('relationshipLinks.' + Ember.String.underscore(relationship) + '.links') : false;
        if (links && (links.self || links.related)) {
            return links.self ? links.self.href : links.related.href;
        } else {
            return this.buildURL.apply(this, arguments);
        }
    },
    _serializeHasMany: function _serializeHasMany(serialized) {
        if (serialized.length > 1) {
            serialized = {
                data: serialized.map(function (record) {
                    var data = record.data;
                    return data;
                })
            };
        } else {
            serialized = serialized[0];
        }
        return serialized;
    },
    _handleManyRequest: function _handleManyRequest(store, type, snapshot, query, relationship, serializer) {
        var relationMeta = snapshot.record[relationship].meta();
        var serialized = snapshot.hasMany(relationship).filter(function (each) {
            return each.record.isNewOrDirty();
        }).map(function (each) {
            return serializer.serialize(each);
        });
        var options = Ember.merge({
            requestType: function requestType() {
                return 'PATCH';
            },
            isBulk: function isBulk(serialized) {
                return serialized.length > 1;
            },
            url: this._buildRelationshipURL(type.modelName, snapshot.id, snapshot, 'updateRecord', query, relationship),
            serialized: this._serializeHasMany
        }, relationMeta.options.updateRequest);
        return this.ajax(options.url, options.requestType(snapshot, relationship), {
            data: options.serialized(serialized),
            isBulk: options.isBulk(serialized)
        }).then(function () {
            return snapshot.record.clearDirtyRelationship(relationMeta);
        });
    },
    updateRecord: function updateRecord(store, type, snapshot, _, query) {
        var _this = this;

        var promises = null;
        var dirtyRelationships = snapshot.record.get('dirtyRelationships');
        if (dirtyRelationships.length) {
            promises = dirtyRelationships.map(function (relationship) {
                var relationMeta = snapshot.record[relationship].meta();
                var serialized;
                if (relationMeta.options.serializer) {
                    serialized = relationMeta.options.serializer(snapshot.record);
                } else {
                    var serializer = store.serializerFor(inflector.singularize(relationMeta.type));
                    if (relationMeta.kind === 'hasMany') {
                        return _this._handleManyRequest(store, type, snapshot, query, relationship, serializer);
                    }
                    serialized = serializer.serialize(snapshot.belongsTo(relationship));
                }
                var url = _this._buildRelationshipURL(type.modelName, snapshot.id, snapshot, 'updateRecord', query, relationship);
                return _this.ajax(url, 'PATCH', {
                    data: serialized
                }).then(function () {
                    return snapshot.record.clearDirtyRelationship(relationship);
                });
            });
        }
        if (Object.keys(snapshot.record.changedAttributes()).length) {
            if (promises) {
                return this._super.apply(this, arguments).then(function (response) {
                    return Ember.RSVP.allSettled(promises).then(function () {
                        return response;
                    });
                });
            }
            return this._super.apply(this, arguments);
        } else if (promises) {
            return Ember.RSVP.allSettled(promises).then(function () {
                return null;
            });
        } else {
            return new Ember.RSVP.Promise(function (resolve) {
                return resolve(null);
            });
        }
    },
    ajaxOptions: function ajaxOptions(_, __, options) {
        var ret = this._super.apply(this, arguments);
        if (options && options.isBulk) {
            ret.contentType = 'application/vnd.api+json; ext=bulk';
        }
        return ret;
    },
    pathForType: function pathForType(modelName) {
        var underscored = Ember.String.underscore(modelName);
        return Ember.String.pluralize(underscored);
    }
});