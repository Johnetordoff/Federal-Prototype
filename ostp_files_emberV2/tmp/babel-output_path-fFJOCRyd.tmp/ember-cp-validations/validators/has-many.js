define('ember-cp-validations/validators/has-many', ['exports', 'ember', 'ember-cp-validations/validators/base'], function (exports, _ember, _emberCpValidationsValidatorsBase) {
  /**
   * Copyright 2016, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */

  'use strict';

  var canInvoke = _ember['default'].canInvoke;

  /**
   *  Identifies a `has-many` relationship in an Ember Data Model or Ember.Object.
   *  This is used to create a validation collection of the `has-many` validations.
   *
   *  _**Note:** Validations must exist on **all** models/objects_
   *
   *  ### Ember Models
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default DS.Model.extend(Validations, {
   *    friends: DS.hasMany('user')
   *  });
   *  ```
   *
   *  ### Ember Objects
   *
   *  ```javascript
   *  // model/users.js
   *
   *  const Validations = buildValidations({
   *    friends: validator('has-many')
   *  });
   *
   *  export default Ember.Object.extend(Validations, {
   *    friends: null
   *  });
   *  ```
   *
   *  From our `user` model, we can now check validation properties on the `friends` attribute.
   *
   *  ```javascript
   *  get(model, 'validations.attrs.friends.isValid')
   *  get(model, 'validations.attrs.friends.messages')
   *  ```
   *
   *  @class Has Many
   *  @module Validators
   *  @extends Base
   */
  var HasMany = _emberCpValidationsValidatorsBase['default'].extend({
    validate: function validate(value) {
      if (value) {
        if (canInvoke(value, 'then')) {
          return value.then(function (models) {
            return models ? models.map(function (m) {
              return m.get('validations');
            }) : true;
          });
        }
        return value.map(function (m) {
          return m.get('validations');
        });
      }

      return true;
    }
  });

  HasMany.reopenClass({
    getDependentsFor: function getDependentsFor(attribute) {
      return ['_model.' + attribute + '.[]', attribute + '.@each.isTruelyValid'];
    }
  });

  exports['default'] = HasMany;
});