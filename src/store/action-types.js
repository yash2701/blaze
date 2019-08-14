export default mirrorKeys({
  LOAD_BOOKS        : null,
  LOAD_BOOKS_SUCCESS: null,
  LOAD_BOOKS_FAIL   : null,

  CREATE_BOOK_SUCCESS: null,
  UPDATE_BOOK_SUCCESS: null,
  REMOVE_BOOK_SUCCESS: null,

  ON_BOOK_CREATE: null,
  ON_BOOK_UPDATE: null,
  ON_BOOK_REMOVE: null,
});

function mirrorKeys(obj) {
  const mirroredObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key
    }
  }

  return mirroredObject
}
