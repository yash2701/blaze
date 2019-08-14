import t from '../action-types'
import { reduceReducers, loadReducer, reducersMap } from './helpers'

const initialState = {
  list: []
};

const booksReducer = reduceReducers(initialState,
  loadReducer(t.LOAD_BOOKS, (state, action) => ({
    ...state,
    list: action.result
  })),

  reducersMap({
    [t.CREATE_BOOK_SUCCESS]: (state, action) => addBook(state, action.result),
    [t.UPDATE_BOOK_SUCCESS]: (state, action) => updateBook(state, action.result),
    [t.REMOVE_BOOK_SUCCESS]: (state, action) => deleteBook(state, action.bookId),

    [t.ON_BOOK_CREATE]: (state, action) => addBook(state, action.book),
    [t.ON_BOOK_UPDATE]: (state, action) => updateBook(state, action.book),
    [t.ON_BOOK_REMOVE]: (state, action) => deleteBook(state, action.book.objectId)
  })
);

function addBook(state, book) {
  if (state.list.find(p => p.objectId === book.objectId)) {
    return state
  }

  return {
    ...state,
    list: state.list.concat(book)
  }
}

function updateBook(state, book) {
  return {
    ...state,
    list: state.list.map(p => p.objectId === book.objectId ? book : p)
  }
}

function deleteBook(state, bookId) {
  return {
    ...state,
    list: state.list.filter(book => book.objectId !== bookId)
  }
}

export default booksReducer