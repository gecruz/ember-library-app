// app/routes/books.js
import Ember from 'ember';
export default Ember.Route.extend({

  model() {
    return Ember.RSVP.hash({
      books: this.store.findAll('book'),
      authors: this.store.findAll('author'),
      libraries: this.store.findAll('library')
    });
  },

  setupController(controller, model) {
    const books = model.books;
    const authors = model.authors;
    const libraries = model.libraries;

    this._super(controller, books);

    controller.set('authors', authors);
    controller.set('libraries', libraries);
  },

  actions: {

    editBook(book) {
      book.set('isEditing', true);
    },

    cancelBookEdit(book) {
      book.set('isEditing', false);
      book.rollbackAttributes();
    },

    saveBook(book) {
      if (book.get('isNotValid')) {
        return;
      }

      book.set('isEditing', false);
      book.save();
    },

    editAuthor(book) {
      book.set('isAuthorEditing', true);
    },

    cancelAuthorEdit(book) {
      book.set('isAuthorEditing', false);
      book.rollbackAttributes();
    },

    saveAuthor(author, book) {
      // Firebase adapter is buggy, we have to manually remove the previous relation
      book.get('author').then((previousAuthor) => {
        previousAuthor.get('books').then((previousAuthorBooks) => {
          previousAuthorBooks.removeObject(book);
          previousAuthor.save();
        });
      });

      // Setup the new relation
      book.set('author', author);
      book.save().then(() => author.save());
      book.set('isAuthorEditing', false);
    },

    editLibrary(book) {
      book.set('isLibraryEditing', true);
    },

    cancelLibraryEdit(book) {
      book.set('isLibraryEditing', false);
      book.rollbackAttributes();
    },

    saveLibrary(library, book) {
      // Firebase adapter is buggy, we have to manually remove the previous relation
      book.get('library').then((previousLibrary) => {
        previousLibrary.get('books').then((previousLibraryBooks) => {
          previousLibraryBooks.removeObject(book);
          previousLibrary.save();
        });
      });

      // Setup the new relation
      book.set('library', library);
      book.save().then(() => library.save());
      book.set('isLibraryEditing', false);
    },
  }
});