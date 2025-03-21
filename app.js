let myLibrary = [];

let booksContainer = document.getElementById("books-container");

// Select the form and its input fields
const addBookForm = document.getElementById('add-book-form');
const titleInput = addBookForm.querySelector('input[placeholder="Title"]');
const authorInput = addBookForm.querySelector('input[placeholder="Author"]');
const pagesInput = addBookForm.querySelector('input[placeholder="Pages"]');
const readInput = document.getElementById('read-checkbox');


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  addBookToUI(book);
}

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
}

function removeBookFromUI(id) {
  let bookCard = document.querySelector(`.book-card[data-id="${id}"]`);
  bookCard.remove();
}

function addBookToUI(book) {
  
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-id", book.id);

  let title = document.createElement("h2");
  title.textContent = book.title;

  let author = document.createElement("p");
  author.textContent = `Author: ${book.author}`;

  let pages = document.createElement("p");
  pages.textContent = `Pages: ${book.pages}`;

  let read = document.createElement("p");
  read.textContent = book.read ? "Read" : "Not read yet";

  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";

  let readBtn = document.createElement("button");
  readBtn.textContent = "Toggle Read";
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    read.textContent = book.read ? "Read" : "Not read yet";
  });

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(removeBtn);
  bookCard.appendChild(readBtn);

  booksContainer.appendChild(bookCard);

  removeBtn.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
    removeBookFromUI(book.id);
  });
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


// Handle form submission
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);

  // Clear the form inputs
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
});
