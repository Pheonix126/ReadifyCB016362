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

function getCoverImagePath() {
  return "images/book.png";
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

// Run common setup
document.addEventListener("DOMContentLoaded", function () {
  setupHamburger();
  setupNewsletter();
  setupServiceWorker();
});

// Page Data

const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    length: "Short",
    pages: 180,
    synopsis: "Nick Carraway is drawn into the glittering world of Jay Gatsby, where wealth, obsession, and heartbreak collide in 1920s America.",
    series: "No",
    reviews: ["Beautifully written.", "A sharp look at ambition and illusion."]
  },
  {
    id: 2,
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    length: "Medium",
    pages: 387,
    synopsis: "A mysterious black-and-white circus appears without warning, hiding a magical competition between two illusionists bound by dangerous rules.",
    series: "No",
    reviews: ["Atmospheric and imaginative.", "Dreamy and immersive."]
  },
  {
    id: 3,
    title: "The Hating Game",
    author: "Sally Thorne",
    genre: "Romance",
    length: "Medium",
    pages: 384,
    synopsis: "Two workplace rivals compete for a promotion, and their intense dislike starts to blur into something else.",
    series: "No",
    reviews: ["Funny enemies-to-lovers.", "Charming and quick to read."]
  },
  {
    id: 4,
    title: "Ender's Game",
    author: "Orson Scott Card",
    genre: "Sci-Fi",
    length: "Medium",
    pages: 324,
    synopsis: "A gifted child is trained through intense war games to lead humanity against an alien threat—at a shocking cost.",
    series: "Yes — Book 1 (Ender's Saga)",
    reviews: ["Fast-paced and smart.", "A classic sci-fi read."]
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Non-Fiction",
    length: "Medium",
    pages: 304,
    synopsis: "A practical guide to building focus and producing high-quality work in a world full of distractions.",
    series: "No",
    reviews: ["Practical and motivating.", "Great for study and productivity."]
  },
  {
    id: 6,
    title: "The Cuckoo's Calling",
    author: "Robert Galbraith",
    genre: "Mystery",
    length: "Long",
    pages: 464,
    synopsis: "Private detective Cormoran Strike investigates the suspicious death of a famous model, uncovering secrets behind a glamorous public story.",
    series: "Yes — Book 1 (Cormoran Strike)",
    reviews: ["Classic detective vibe.", "A detailed, twisty investigation."]
  },
  {
    id: 7,
    title: "Mistborn: The Final Empire",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    length: "Long",
    pages: 541,
    synopsis: "In a world ruled by an immortal tyrant, a street thief joins a rebellion powered by a unique metal-based magic system.",
    series: "Yes — Book 1 (Mistborn Era 1)",
    reviews: ["Amazing magic system.", "Epic and addictive."]
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    genre: "Fantasy",
    length: "Medium",
    pages: 310,
    synopsis: "Bilbo Baggins is swept into an unexpected quest with dwarves to reclaim treasure guarded by the dragon Smaug.",
    series: "No (connected to Middle-earth)",
    reviews: ["Classic adventure.", "Warm, witty, and timeless."]
  },
  {
    id: 9,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    length: "Long",
    pages: 443,
    synopsis: "A sweeping look at how Homo sapiens evolved and shaped societies through major revolutions in culture, agriculture, and science.",
    series: "No",
    reviews: ["Big-picture and thought-provoking.", "Great conversation starter."]
  },
  {
    id: 10,
    title: "The Martian",
    author: "Andy Weir",
    genre: "Sci-Fi",
    length: "Medium",
    pages: 387,
    synopsis: "Stranded on Mars after a mission goes wrong, an astronaut uses science and grit to survive until rescue is possible.",
    series: "No",
    reviews: ["Smart and funny.", "Science-heavy but super readable."]
  },
  {
    id: 11,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Mystery",
    length: "Long",
    pages: 465,
    synopsis: "A journalist and a brilliant hacker investigate a decades-old disappearance tied to a powerful family’s secrets.",
    series: "Yes — Book 1 (Millennium)",
    reviews: ["Dark, complex mystery.", "Gripping investigation and characters."]
  },
  {
    id: 12,
    title: "The Notebook",
    author: "Nicholas Sparks",
    genre: "Romance",
    length: "Short",
    pages: 214,
    synopsis: "A love story spanning years, told through memories of a couple whose relationship endures heartbreak and time.",
    series: "Yes (related: The Wedding)",
    reviews: ["Emotional and heartfelt.", "Classic tearjerker romance."]
  }
];

// Recommender

const READING_LIST_KEY = "readify_reading_list";
let selectedBook = null;

function getSavedReadingList() {
  const savedList = getFromStorage(READING_LIST_KEY);

  if (Array.isArray(savedList) === false) {
    return [];
  }

  return savedList;
}

function saveReadingList(list) {
  saveToStorage(READING_LIST_KEY, list);
}

function showReadingList() {
  const listContainer = document.getElementById("readingList");
  if (listContainer === null) {
    return;
  }

  const readingList = getSavedReadingList();

  if (readingList.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">No saved books yet.</p>';
    return;
  }

  let listHTML = "";
  for (let i = 0; i < readingList.length; i++) {
    const book = readingList[i];
    const metaText = book.author + " • " + book.genre;
    listHTML = listHTML + '<div class="list-row"><div class="list-left"><div><div class="list-title">' + book.title + '</div><div class="list-meta">' + metaText + '</div></div></div><button class="btn small-btn" onclick="deleteFromReadingList(' + i + ')">Remove</button></div>';
  }
  listContainer.innerHTML = listHTML;
}

function deleteFromReadingList(index) {
  const updatedList = getSavedReadingList();
  updatedList.splice(index, 1);
  saveReadingList(updatedList);
  showReadingList();
}

function pickRecommendation() {
  const genreSelect = document.getElementById("genreSelect");
  const lengthSelect = document.getElementById("lengthSelect");

  if (genreSelect === null || lengthSelect === null) {
    return;
  }

  const chosenGenre = genreSelect.value;
  const chosenLength = lengthSelect.value;

  if (chosenGenre === "" || chosenLength === "") {
    alert("Please select both genre and length.");
    return;
  }

  // Filter by user choices
  const matchedBooks = [];

  for (let i = 0; i < booksData.length; i++) {
    const book = booksData[i];

    if (book.genre === chosenGenre && book.length === chosenLength) {
      matchedBooks.push(book);
    }
  }

  if (matchedBooks.length === 0) {
    alert("No books found for that combo. Try different options.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * matchedBooks.length);
  selectedBook = matchedBooks[randomIndex];

  const titleEl = document.getElementById("recTitle");
  const authorEl = document.getElementById("recAuthor");
  const genreEl = document.getElementById("recGenre");
  const pagesEl = document.getElementById("recPages");
  const synopsisEl = document.getElementById("recSynopsis");

  if (titleEl !== null) {
    titleEl.textContent = selectedBook.title;
  }
  if (authorEl !== null) {
    authorEl.textContent = "by " + selectedBook.author;
  }
  if (genreEl !== null) {
    genreEl.textContent = selectedBook.genre;
  }
  if (pagesEl !== null) {
    pagesEl.textContent = String(selectedBook.pages) + " pages";
  }
  if (synopsisEl !== null) {
    synopsisEl.textContent = selectedBook.synopsis;
  }

  const placeholder = document.getElementById("recommendationPlaceholder");
  const content = document.getElementById("recommendationContent");

  if (placeholder !== null) {
    placeholder.style.display = "none";
  }
  if (content !== null) {
    content.style.display = "grid";
  }
}

function saveSelectedBookToList() {
  if (selectedBook === null) {
    alert("Get a recommendation first.");
    return;
  }

  const readingList = getSavedReadingList();

  // Avoid duplicates
  for (let i = 0; i < readingList.length; i++) {
    if (readingList[i].id === selectedBook.id) {
      alert("This book is already in your list.");
      return;
    }
  }

  readingList.unshift(selectedBook);
  saveReadingList(readingList);
  showReadingList();
}

document.addEventListener("DOMContentLoaded", function () {
  const getButton = document.getElementById("getRecommendation");
  const againButton = document.getElementById("pickAgain");
  const saveButton = document.getElementById("saveToList");

  if (getButton !== null) {
    getButton.addEventListener("click", pickRecommendation);
  }
  if (againButton !== null) {
    againButton.addEventListener("click", pickRecommendation);
  }
  if (saveButton !== null) {
    saveButton.addEventListener("click", saveSelectedBookToList);
  }

  const recommendationContent = document.getElementById("recommendationContent");
  if (recommendationContent !== null) {
    recommendationContent.style.display = "none";
  }

  showReadingList();
});
