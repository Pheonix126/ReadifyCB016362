
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const savedText = localStorage.getItem(key);

  if (savedText === null) {
    return null;
  }

  try {
    return JSON.parse(savedText);
  } catch (error) {
    return null;
  }
}

// Email check
function looksLikeEmail(email) {
  if (email === null || email === undefined) {
    return false;
  }

  const emailText = String(email);

  const hasAtSymbol = emailText.indexOf("@") !== -1;
  const hasDotSymbol = emailText.indexOf(".") !== -1;

  if (hasAtSymbol && hasDotSymbol) {
    return true;
  }

  return false;
}

// Hamburger menu (mobile)
function setupHamburger() {
  const hamburgerButton = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburgerButton === null || navMenu === null) {
    return;
  }

  hamburgerButton.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });
}

// Newsletter form (footer)
function setupNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmailInput = document.getElementById("newsletterEmail");
  const newsletterMessage = document.getElementById("newsletterMessage");

  if (newsletterForm === null || newsletterEmailInput === null || newsletterMessage === null) {
    return;
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValue = newsletterEmailInput.value.trim();

    if (looksLikeEmail(emailValue) === false) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      return;
    }

    newsletterMessage.textContent = "Thanks! You are subscribed.";
    newsletterEmailInput.value = "";
  });
}

// Register the service worker (PWA)
function setupServiceWorker() {
  if ("serviceWorker" in navigator === false) {
    return;
  }

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {
      // Failure is ignored
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupHamburger();
  setupNewsletter();
  setupServiceWorker();
});

//sounds

const ambientSounds = [
  {
    id: 1,
    name: "Piano Relaxation",
    src: "images/Beautiful Relaxing Piano Music.mp3"
  },
  {
    id: 2,
    name: "Ambient Music",
    src: "images/ambient.mp3"
  },
  {
    id: 3,
    name: "Forest Birds",
    src: "images/bird.mp3"
  },
  {
    id: 4,
    name: "Library Quiet",
    src: "images/study.mp3"
  }
];

function loadAmbientSounds() {
  const soundsGrid = document.getElementById("soundsGrid");
  if (soundsGrid === null) {
    return;
  }

  let soundsHTML = "";
  for (let i = 0; i < ambientSounds.length; i++) {
    const sound = ambientSounds[i];
    soundsHTML = soundsHTML + '<div class="sound-card"><h3>' + sound.name + '</h3><audio controls><source src="' + sound.src + '" type="audio/mpeg"/>Your browser does not support the audio element.</audio></div>';
  }
  soundsGrid.innerHTML = soundsHTML;
}

// Reading Flow

const COMPLETED_BOOKS_KEY = "readify_completed_books";

function getCompletedBooks() {
  const savedList = getFromStorage(COMPLETED_BOOKS_KEY);

  if (Array.isArray(savedList) === false) {
    return [];
  }

  return savedList;
}

function saveCompletedBooks(bookList) {
  saveToStorage(COMPLETED_BOOKS_KEY, bookList);
}

function showCompletedBooks() {
  const listArea = document.getElementById("completedBooksList");
  if (listArea === null) {
    return;
  }

  const completedBooks = getCompletedBooks();

  if (completedBooks.length === 0) {
    listArea.innerHTML = '<p class="empty-message">No completed books yet. Start adding your achievements!</p>';
    return;
  }

  let cardsHTML = "";
  for (let i = 0; i < completedBooks.length; i++) {
    const bookInfo = completedBooks[i];
    cardsHTML = cardsHTML + '<div class="completed-card"><div class="completed-title">' + bookInfo.title + '</div><div class="completed-date">Completed: ' + bookInfo.date + '</div><button class="btn small-btn" onclick="deleteCompletedBook(' + i + ')">Remove</button></div>';
  }
  listArea.innerHTML = cardsHTML;
}

function deleteCompletedBook(index) {
  const currentBooks = getCompletedBooks();
  currentBooks.splice(index, 1);
  saveCompletedBooks(currentBooks);
  showCompletedBooks();
}

function addCompletedBook() {
  const titleInput = document.getElementById("completedBookTitle");
  if (titleInput === null) {
    return;
  }

  const bookTitle = titleInput.value.trim();

  if (bookTitle === "") {
    alert("Please enter a book title.");
    return;
  }

  const today = new Date();

  const year = today.getFullYear();

  const monthNumber = today.getMonth() + 1;
  let monthText = String(monthNumber);
  if (monthText.length === 1) {
    monthText = "0" + monthText;
  }

  const dayNumber = today.getDate();
  let dayText = String(dayNumber);
  if (dayText.length === 1) {
    dayText = "0" + dayText;
  }

  const dateText = year + "-" + monthText + "-" + dayText;

  const completedBooks = getCompletedBooks();
  completedBooks.unshift({ title: bookTitle, date: dateText });

  saveCompletedBooks(completedBooks);

  titleInput.value = "";
  showCompletedBooks();
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addCompletedBook");

  if (addButton !== null) {
    addButton.addEventListener("click", addCompletedBook);
  }

  loadAmbientSounds();
  showCompletedBooks();
});
