
class Book {
  constructor(title, author, key) {
    this.title = title;
    this.author = author;
    this.key = key;
  }

  static getBooksFromStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBookToStorage(book) {
    const books = Book.getBooksFromStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(key) {
    const books = Book.getBooksFromStorage();
    books.forEach((book, i) => {
      const key1 = parseInt(key, 10);
      if (key1 === book.key) {
        books.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = Book.getBooksFromStorage();
    books.forEach((book) => Book.addBookToDisplay(book));
  }

  static addBookToDisplay(book) {
    const list = document.querySelector('.book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <h2>'${book.title}' &nbsp by  &nbsp ${book.author}</h2>
      <h4 hidden>${book.key}</h4>
      <h2><button class='btn btn-sm delete' id='button'>Remove</button></h2>
    `;

    list.appendChild(row);
  }

  static deleteBookFromDisplay(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const key = Math.floor(Math.random() * 100000000);
  const msg = document.getElementById('error-msg');

  if (title === '' || author === '') {
    msg.innerHTML = 'Please Fill In Both Fields';
  } else {
    const book = new Book(title, author, key);

    Book.addBookToDisplay(book);
    Book.addBookToStorage(book);
  }
});

document.querySelector('.book-list').addEventListener('click', (e) => {
  Book.deleteBookFromDisplay(e.target);
  Book.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

document.getElementById('list').addEventListener('click', () => {
  document.querySelector('.book-list').classList.remove('hide');
  document.querySelector('#book-form').classList.remove('show');
  document.querySelector('#main-h1').classList.remove('hide');
  document.querySelector('.contact-sect').classList.remove('show');
});

document.getElementById('Add-new').addEventListener('click', () => {
  document.querySelector('.book-list').classList.add('hide');
  document.querySelector('#book-form').classList.add('show');
  document.querySelector('#main-h1').classList.add('hide');
  document.querySelector('.contact-sect').classList.remove('show');
});

document.getElementById('Contact').addEventListener('click', () => {
  document.querySelector('.book-list').classList.add('hide');
  document.querySelector('#book-form').classList.remove('show');
  document.querySelector('#main-h1').classList.add('hide');
  document.querySelector('.contact-sect').classList.add('show');
});

function time() {
  const { DateTime } = luxon;    // eslint-disable-line
  const now = new DateTime.now();
  document.querySelector('.time').innerHTML = now.toLocaleString(DateTime.DATETIME_MED);
  setTimeout(time, 1000);
}
time();