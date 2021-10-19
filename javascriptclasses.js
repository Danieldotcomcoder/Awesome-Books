class Book {
  constructor(title, author, key) {
    this.title = title;
    this.author = author;
    this.key = key;
  }
}

class Store {
  static getBooksFromStorage() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBookToStorage(book) {
    const books = Store.getBooksFromStorage();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(key) {
    const books = Store.getBooksFromStorage();
    books.forEach((book, i) => {
      if (book.key === key) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

class Display {
  static displayBooks() {
    const books = Store.getBooksFromStorage();

    books.forEach((book) => Display.addBookToDisplay(book));
  }

  static addBookToDisplay(book) {
    const list = document.querySelector(".book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <h2>${book.title}</h2>
      <h2>${book.author}</h2>
      <h2 hidden>${book.key}</h2>
      <h2><button class="btn btn-sm delete" id="button">Remove</button></h2>
    `;

    list.appendChild(row);
  }

  static deleteBookFromDisplay(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", Display.displayBooks);

document.querySelector("#book-form").addEventListener("submit", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const key = Math.floor(Math.random() * 100000000);

  const book = new Book(title, author, key);

  Display.addBookToDisplay(book);
  Store.addBookToStorage(book);
});

document.querySelector(".book-list").addEventListener("click", (e) => {
  Display.deleteBookFromDisplay(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
