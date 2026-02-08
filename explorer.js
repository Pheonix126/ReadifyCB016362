// Save and load data using localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const text = localStorage.getItem(key);
  if (text === null) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function looksLikeEmail(email) {
  return email.indexOf("@") !== -1 && email.indexOf(".") !== -1;
}

function getCoverImagePath() {
  return "images/book.png";
}

// Hamburger menu (mobile)
function setupHamburger() {
  const hamburgerButton = document.getElementById("hamburger");
  const menu = document.getElementById("navMenu");

  if (hamburgerButton === null || menu === null) {
    return;
  }

  hamburgerButton.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
}

// Newsletter form
function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const emailBox = document.getElementById("newsletterEmail");
  const infoText = document.getElementById("newsletterMessage");

  if (form === null || emailBox === null || infoText === null) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailBox.value.trim();

    if (looksLikeEmail(email) === false) {
      infoText.textContent = "Please enter a valid email address.";
      return;
    }

    infoText.textContent = "Thanks! You are subscribed.";
    emailBox.value = "";
  });
}

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

// Page Data

const booksData = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    genre: "Fantasy",
    length: "Long",
    image: "images/hp.jpg",
    pages: 223,
    synopsis: "A boy discovers he is a wizard and begins his first year at Hogwarts, where a hidden threat is stirring.",
    series: "Yes — Book 1",
    reviews: ["Magical and timeless.", "A perfect start to a classic series."]
  },
  {
    id: 2,
    title: "Percy Jackson & the Olympians: The Lightning Thief",
    author: "Rick Riordan",
    genre: "Fantasy",
    length: "Medium",
    image: "images/pj.jpg",
    pages: 377,
    synopsis: "A boy learns he's a demigod and is thrown into a quest to prevent a war among the Greek gods.",
    series: "Yes — Book 1",
    reviews: ["Funny and action-packed.", "A great gateway into mythology."]
  },
  {
    id: 3,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    length: "Long",
    image: "images/DaVinciCode.jpg",
    pages: 489,
    synopsis: "A murder in the Louvre leads to a chain of clues involving secret societies, symbols, and hidden history.",
    series: "Yes — Robert Langdon",
    reviews: ["Fast-paced and addictive.", "Twisty and cinematic."]
  },
  {
    id: 4,
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    length: "Long",
    image: "images/gonegirl.jpg",
    pages: 432,
    synopsis: "When Amy Dunne disappears, her husband becomes the prime suspect—until the story flips in shocking ways.",
    series: "No",
    reviews: ["Dark and clever.", "The twists hit hard."]
  },
  {
    id: 5,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    length: "Medium",
    image: "images/mockingbird.jpg",
    pages: 336,
    synopsis: "In a small Southern town, a young girl witnesses injustice as her father defends a Black man falsely accused.",
    series: "No",
    reviews: ["Powerful and human.", "A book that stays with you."]
  },
  {
    id: 6,
    title: "The Fault in Our Stars",
    author: "John Green",
    genre: "Romance",
    length: "Medium",
    image: "images/The_Fault_in_Our_Stars.png",
    pages: 313,
    synopsis: "Two teens with cancer fall in love while searching for meaning, laughter, and honesty in hard circumstances.",
    series: "No",
    reviews: ["Funny, sad, and sincere.", "Emotionally unforgettable."]
  },
  {
    id: 7,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Sci-Fi",
    length: "Medium",
    image: "images/hg.jpg",
    pages: 374,
    synopsis: "Katniss Everdeen is forced into a televised fight to the death—and becomes a symbol of rebellion.",
    series: "Yes — Book 1",
    reviews: ["Intense and gripping.", "You’ll fly through it."]
  },
  {
    id: 8,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Fiction",
    length: "Short",
    image: "images/f451.jpg",
    pages: 249,
    synopsis: "In a future where books are burned, a fireman begins to question everything after meeting a curious young woman.",
    series: "No",
    reviews: ["Short, sharp, and powerful.", "A classic that still hits hard."]
  },
  {
    id: 9,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    length: "Long",
    image: "images/dune.jpg",
    pages: 688,
    synopsis: "On a desert planet, politics, prophecy, and ecology collide as Paul Atreides faces a destiny bigger than himself.",
    series: "Yes — Book 1",
    reviews: ["Huge world and big ideas.", "Epic sci-fi done right."]
  },
  {
    id: 10,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    length: "Medium",
    image: "images/p&p.jpg",
    pages: 432,
    synopsis: "Elizabeth Bennet navigates society, family pressure, and pride as her complicated relationship with Mr. Darcy grows.",
    series: "No",
    reviews: ["Witty and charming.", "A classic for a reason."]
  },
  {
    id: 11,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Non-Fiction",
    length: "Medium",
    image: "images/atom.png",
    pages: 320,
    synopsis: "A practical guide to building good habits, breaking bad ones, and improving through small daily changes.",
    series: "No",
    reviews: ["Simple and useful.", "Easy to apply immediately."]
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    length: "Short",
    image: "images/The Alchemist.jpg",
    pages: 208,
    synopsis: "A shepherd travels in search of treasure, learning about fear, purpose, and listening to his heart along the way.",
    series: "No",
    reviews: ["Short but meaningful.", "Feels like a modern fable."]
  }
];

// Book Explorer 

function showBooks(bookList) {
  const grid = document.getElementById("booksGrid");
  if (grid === null) {
    return;
  }

  if (bookList === null || bookList.length === 0) {
    grid.innerHTML = '<p class="empty-message">No books found matching your criteria.</p>';
    return;
  }

  let gridHTML = "";
  for (let i = 0; i < bookList.length; i++) {
    const book = bookList[i];
    const coverPath = book.image || getCoverImagePath();
    gridHTML = gridHTML + '<div class="book-card" data-book-id="' + book.id + '" onclick="clickBookCard(' + book.id + ')"><img class="book-cover" alt="' + book.title + ' cover" src="' + coverPath + '"><div class="book-info"><h3 class="book-title">' + book.title + '</h3><p class="book-author">by ' + book.author + '</p><span class="book-genre">' + book.genre + '</span></div></div>';
  }
  grid.innerHTML = gridHTML;
}

function clickBookCard(bookId) {
  const selectedBook = findBookById(bookId);
  if (selectedBook !== null) {
    openBookModal(selectedBook);
  }
}

function findBookById(bookId) {
  for (let i = 0; i < booksData.length; i++) {
    if (booksData[i].id === bookId) {
      return booksData[i];
    }
  }
  return null;
}

function openBookModal(book) {
  const modal = document.getElementById("bookModal");
  if (modal === null) {
    return;
  }

  const titleEl = document.getElementById("modalTitle");
  const authorEl = document.getElementById("modalAuthor");
  const synopsisEl = document.getElementById("modalSynopsis");
  const coverBox = document.getElementById("modalBookCover");
  const seriesList = document.getElementById("modalSeries");
  const seriesSection = document.getElementById("seriesSection");
  const reviewsBody = document.getElementById("modalReviews");

  if (titleEl !== null) {
    titleEl.textContent = book.title;
  }
  if (authorEl !== null) {
    authorEl.textContent = "by " + book.author;
  }
  if (synopsisEl !== null) {
    synopsisEl.textContent = book.synopsis;
  }

  // Series list
  if (seriesList !== null) {
    const seriesText = book.series ? book.series : "No";
    seriesList.innerHTML = "<li>" + seriesText + "</li>";
  }

// Cover
  if (coverBox !== null) {
    const coverImage = book.image || getCoverImagePath();
    coverBox.style.backgroundImage = 'url("' + coverImage + '")';
  }

  // Show/hide series section
  if (seriesSection !== null) {
    const isSeriesBook = book.series && book.series.indexOf("Yes") !== -1;
    if (isSeriesBook) {
      seriesSection.style.display = "block";
    } else {
      seriesSection.style.display = "none";
    }
  }

  // Reviews table
  if (reviewsBody !== null) {
    const sources = ["Readers", "Book Club"];
    const ratingText = "★★★★☆";
    let reviewsHTML = "";

    for (let i = 0; i < sources.length; i++) {
      const reviewText = book.reviews && book.reviews[i] ? book.reviews[i] : "Great read!";
      reviewsHTML = reviewsHTML + "<tr><td>" + sources[i] + "</td><td>" + ratingText + "</td><td>" + reviewText + "</td></tr>";
    }
    reviewsBody.innerHTML = reviewsHTML;
  }

  modal.classList.add("open");
}

function closeBookModal() {
  const modal = document.getElementById("bookModal");
  if (modal === null) {
    return;
  }
  modal.classList.remove("open");
}

function filterBooks() {
  const genreSelect = document.getElementById("genreFilter");
  const searchBox = document.getElementById("searchInput");

  let chosenGenre = "All";
  let searchText = "";

  if (genreSelect !== null) {
    chosenGenre = genreSelect.value;
  }

  if (searchBox !== null) {
    searchText = searchBox.value.trim().toLowerCase();
  }

  const results = [];

  for (let i = 0; i < booksData.length; i++) {
    const book = booksData[i];

    let matchesGenre = false;
    if (chosenGenre === "All" || book.genre === chosenGenre) {
      matchesGenre = true;
    }

    let matchesSearch = false;
    if (searchText === "") {
      matchesSearch = true;
    } else {
      const titleMatch = book.title.toLowerCase().indexOf(searchText) !== -1;
      const authorMatch = book.author.toLowerCase().indexOf(searchText) !== -1;

      if (titleMatch || authorMatch) {
        matchesSearch = true;
      }
    }

    if (matchesGenre && matchesSearch) {
      results.push(book);
    }
  }

  showBooks(results);
}

// Page start

document.addEventListener("DOMContentLoaded", function () {
  setupHamburger();
  setupNewsletter();
  setupServiceWorker();

  showBooks(booksData);

  const genreSelect = document.getElementById("genreFilter");
  const searchBox = document.getElementById("searchInput");

  if (genreSelect !== null) {
    genreSelect.addEventListener("change", filterBooks);
  }

  if (searchBox !== null) {
    searchBox.addEventListener("input", filterBooks);
  }

  // Modal close button
  const closeButton = document.querySelector("#bookModal .close");
  if (closeButton !== null) {
    closeButton.addEventListener("click", closeBookModal);
  }

  // Close modal when clicking outside
  const modal = document.getElementById("bookModal");
  if (modal !== null) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeBookModal();
      }
    });
  }
});
