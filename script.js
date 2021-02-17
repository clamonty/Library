let myLibrary = [];

// Book Constructor
function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}
// Add new book to myLibrary array
function addBookToLibrary(title, author, pages, completed) {
  myLibrary.push(new Book(title, author, pages, completed))
}
Book.prototype.printBook = function() {
  let str = `${this.title}, ${this.author}, ${this.pages} pages, `;
  this.completed ? str += `completed` : str += `not completed`
  return str;
}





// Page Functionality
document.querySelector('.add-btn').addEventListener('click', () => {
  toggle();
});

document.querySelector('.submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  makeBookDiv();
  addBook();
  toggle();
  resetForm();
  updateInfo();
});

// Toggle new book form and blur
function toggle() {
  let blur = document.querySelector('#blur');
  blur.classList.toggle('active');
  let popup = document.querySelector('#popup');
  popup.classList.toggle('active');
}

// Add new book card to carousel
function makeBookDiv() {
  let newBook = document.createElement('div');
  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let pageCount = document.createElement('p');
  let completed = document.createElement('p')
  bookTitle.textContent = getTitle();
  bookAuthor.textContent = getAuthor();
  pageCount.textContent = getPages();
  completed.textContent = getCompleted();
  newBook.appendChild(bookTitle);
  newBook.appendChild(bookAuthor);
  newBook.appendChild(pageCount);
  newBook.appendChild(completed);
  newBook.classList.add('book-card');
  document.querySelector('.carousel-cards').appendChild(newBook);
}

// Add new book object to library array
function addBook() {
  let title = getTitle();
  let author = getAuthor();
  let pages = getPages();
  let completed = getCompleted();
  addBookToLibrary(title, author, pages, completed);
  console.log(myLibrary);
}

////////// GET VALUES OF NEW BOOK FORM INPUT FIELDS //////////
function getTitle() {
  return document.querySelector('#title').value;
}
function getAuthor() {
  return document.querySelector('#author').value;
}
function getPages() {
  return document.querySelector('#pages').value;
}
function getCompleted() {
  return document.querySelector('#completed').checked;
}

// Reset form after submission
function resetForm() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#completed').checked = false;
}

// Update running tally of library
function updateInfo() {
  let totalBooks = myLibrary.length;
  let totalPages = 0;
  let totalCompleted = 0;
  myLibrary.forEach(book => {
    totalPages += parseInt(book.pages);
    if (book.completed) {
      totalCompleted++;
    }
  });
  document.querySelector('.book-count').textContent = `${totalBooks}`;
  document.querySelector('.page-count').textContent = `${totalPages}`;
  document.querySelector('.completed-count').textContent = `${totalCompleted}`;
}



////////// CAROUSEL IMAGE SLIDER FUNCTIONALITY //////////
const carouselCards = document.querySelector('.carousel-cards');
const carouselButtons = document.querySelectorAll('.carousel-btn');
let cardIndex = 1;
let translateX = 0;

carouselButtons.forEach(button => {
  button.addEventListener('click', e => {
    let bookCount = myLibrary.length;
    if (e.target.id === 'previous') {
      if (cardIndex !== 1) {
        cardIndex--;
        translateX += 300;
      }
    } else {
      if (cardIndex !== bookCount) {
        cardIndex++;
        translateX -= 300;
      }
    }
    carouselCards.style.transform = `translateX(${translateX}px)`;
  });
});