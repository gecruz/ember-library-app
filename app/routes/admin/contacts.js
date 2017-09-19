// app/routes/admin/contacts.js
import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('contact');
  },

  actions: {

    saveLibrary(newContact) {
      newContact.save().then(() => this.transitionTo('contacts'));
    },

    willTransition() {
      // this.controller.get('model').rollbackAttributes();
    }
  }
});