import { combineReducers } from 'redux'

import books from './books'

const rootReducer = combineReducers({
  books
});

export default rootReducer;

export const getBooks = state => state.books;
