import Backendless from 'backendless'

import t from '../action-types';

export const loadBooks = () => ({
  types  : [t.LOAD_BOOKS, t.LOAD_BOOKS_SUCCESS, t.LOAD_BOOKS_FAIL],
  apiCall: () => Backendless.Data.of('Book').find(),
});

export const createBook = book => ({
  types  : [null, t.CREATE_BOOK_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Book').save(book),
});

export const updateBook = book => ({
  types  : [null, t.UPDATE_BOOK_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Book').save(book),
});

export const removeBook = bookId => ({
  bookId,
  types  : [null, t.REMOVE_BOOK_SUCCESS, null],
  apiCall: () => Backendless.Data.of('Book').remove(bookId),
});

export const onBookCreate = book => ({
  book,
  type: t.ON_BOOK_CREATE,
});

export const onBookUpdate = book => ({
  book,
  type: t.ON_BOOK_UPDATE,
});

export const onBookRemove = book => ({
  book,
  type: t.ON_BOOK_REMOVE,
});
