
let library;

// If key not found in local storage, initialize empty array
if (localStorage.getItem('library') === null) {
  library = [];
} else {
  // if key found in local storage, parse it into an array
  library = JSON.parse(localStorage.getItem('library'));
  library.forEach(book => {
    generateLibrary(book);
  });
  updateInfo();
}

////////// CAROUSEL IMAGE SLIDER FUNCTIONALITY //////////
const carouselCards = document.querySelector('.carousel-cards');
const carouselButtons = document.querySelectorAll('.carousel-btn');
let cardIndex = 1;
let translateX = 0;

carouselButtons.forEach(button => {
  button.addEventListener('click', e => {
    let bookCount = library.length;
    if (e.target.id === 'previous') {
      if (cardIndex !== 1) {
        cardIndex--;
        translateX += 500;
      }
    } else {
      if (cardIndex !== bookCount) {
        cardIndex++;
        translateX -= 500;
      }
    }
    carouselCards.style.transform = `translateX(${translateX}px)`;
  });
});


// Book Constructor
function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}
// Add new book to library array
function addBookToLibrary(title, author, pages, completed) {
  library.push(new Book(title, author, pages, completed))
}

// Page Functionality
document.querySelector('.add-btn').addEventListener('click', () => {
  toggle();
});
document.querySelector('.close-btn').addEventListener('click', () => {
  toggle();
});

// On submitting form
// 1) Add book to library array
// 2) Create a book div
// 3) toggle blur effect, reset the form, update the library info
document.querySelector('.submit-btn').addEventListener('click', (e) => {
  // Make sure required inputs are filled before submitting form
  if (document.querySelector('#title').value == "") {
    document.querySelector('#title').focus();
    return false;
  }
  if (document.querySelector('#author').value == "") {
    document.querySelector('#author').focus();
    return false;
  }
  if (document.querySelector('#pages').value <= 0 || document.querySelector('#pages').value >= 9999) {
    document.querySelector('#pages').focus();
    return false;
  }
  
  e.preventDefault();
  addBook();
  generateLibrary(library[library.length - 1]);
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

// Add new book object to library array
function addBook() {
  let title = getTitle();
  let author = getAuthor();
  let pages = getPages();
  let completed = getCompleted();
  addBookToLibrary(title, author, pages, completed);
  saveLibrary();
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
  let totalBooks = library.length;
  let totalPages = 0;
  let totalCompleted = 0;
  library.forEach(book => {
    totalPages += parseInt(book.pages);
    if (book.completed) {
      totalCompleted++;
    }
  });
  document.querySelector('.book-count').textContent = `${totalBooks}`;
  document.querySelector('.page-count').textContent = `${totalPages}`;
  document.querySelector('.completed-count').textContent = `${totalCompleted}`;
}

// Update library in local storage
function saveLibrary() {
  let libraryJSON = JSON.stringify(library);
  localStorage.setItem('library', libraryJSON);
}

function generateLibrary(book) {
  let newBook = document.createElement('div');
  let bookTitle = document.createElement('p');
  let bookAuthor = document.createElement('p');
  let pageCount = document.createElement('p');
  let read = document.createElement('p');
  let toggleDiv = document.createElement('div');
  let toggleText = document.createElement('span');
  let toggle = document.createElement('input');
  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove book?';
  deleteBtn.classList.add('remove-btn');
  bookTitle.textContent = `Book: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  pageCount.textContent = `Number of pages: ${book.pages}`;
  book.completed ? read.textContent = 'Has been read' : read.textContent = 'Not read yet';

  toggle.setAttribute('type', 'checkbox');
  book.completed ? toggle.checked = true : toggle.checked = false;
  toggleText.textContent = 'Have you read it?';

  // Add change read status
  toggle.addEventListener('change', (e) => {
    let readTag = e.target.parentNode.previousSibling;
    library[cardIndex - 1].completed = !library[cardIndex - 1].completed;
    library[cardIndex - 1].completed ? readTag.textContent = 'Has been read' : readTag.textContent = 'Not read yet';
    saveLibrary();
    updateInfo();
  });

  deleteBtn.addEventListener('click', (e) => {
    e.target.parentNode.remove();
    library.splice(cardIndex - 1, 1);
    saveLibrary();
    updateInfo();
  });

  toggleText.classList.add('checkbox-text');
  toggle.classList.add('completed');
  toggleDiv.classList.add('check-completed', 'bookcard-check');

  toggleDiv.appendChild(toggleText);
  toggleDiv.appendChild(toggle);
  newBook.appendChild(bookTitle);
  newBook.appendChild(bookAuthor);
  newBook.appendChild(pageCount);
  newBook.appendChild(read);
  newBook.appendChild(toggleDiv);
  newBook.appendChild(deleteBtn);
  newBook.classList.add('book-card');
  document.querySelector('.carousel-cards').appendChild(newBook);
}
