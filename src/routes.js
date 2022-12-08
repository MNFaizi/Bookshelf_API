/* eslint-disable max-len */
const {saveBook, getAllBooks, getBookById, editBookById, deleteBookById} = require('./handler');

const routes = [
  // menambahkan buku
  {
    method: 'POST',
    path: '/books',
    handler: saveBook,
  },
  // menampilkan seluruh buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  // menampilkan buku berdasarkan id
  {
    method: 'GET',
    path: `/books/{bookId}`,
    handler: getBookById,
  },
  // mengedit data buku
  {
    method: 'PUT',
    path: `/books/{bookId}`,
    handler: editBookById,
  },
  // delete data buku
  {
    method: 'DELETE',
    path: `/books/{bookId}`,
    handler: deleteBookById,
  },
];

module.exports = routes;
