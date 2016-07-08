import Ember from 'ember';
import layout from './template';
import config from 'ember-get-config';

export default Ember.Component.extend({
    layout: layout,
    host: config.OSF.url,
    query: null,
    actions: {
        // Runs toggleSearch in parent component, osf-navbar
        toggleSearch: function toggleSearch() {
            this.sendAction('action');
        },
        updateQuery: function updateQuery(value) {
            this.set('query', value);
        },
        search: function search() {
            var query = this.get('query');
            if (query) {
                window.location.href = this.host + 'search/?q=' + query;
            }
        }
    }
});