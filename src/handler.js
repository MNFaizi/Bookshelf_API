/* eslint-disable max-len */
const books = require('./books');
const {nanoid} = require('nanoid');

// function untuk menyimpan buku
const saveBook = (request, h) => {
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBooks = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};
  books.push(newBooks);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const isSuccess = books.filter((bo) => bo.id === id ).length;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// function untuk mendapatkan semua buku yang tersimpan
const getAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  let filterBooks = books;

  if (name !== undefined) {
    filterBooks = filterBooks.filter((bo) => bo.name.toLowerCase() === name.toLowerCase());
  }
  if (reading !== undefined) {
    filterBooks = filterBooks.filter((bo) => bo.reading === !!Number(reading));
  }
  if (finished !== undefined) {
    filterBooks = filterBooks.filter((bo) => bo.finished === !!Number(finished));
  }
  const response = h.response({
    status: 'success',
    data: {
      books: filterBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
  return response;
};
const getBookById = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((bo) => bo.id === bookId)[0];
  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    });
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
};
const editBookById = (request, h) => {
  const {bookId} = request.params;
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
      return response;
    }
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'buku berhasil diperbarui',
    }).code(200);
    return response();
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
  return response;
};
const deleteBookById = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((bo) => bo.id === bookId );
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
  return response;
};

module.exports = {saveBook, getAllBooks, getBookById, editBookById, deleteBookById};
