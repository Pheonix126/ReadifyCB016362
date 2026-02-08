// Save and load data using localStorage
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
  return "images/readify.png";
}

// Hamburger menu (mobile)
function setupHamburger() {
  const hamburgerButton = document.getElementById("hamburger");
  const navigationMenu = document.getElementById("navMenu");

  if (hamburgerButton === null || navigationMenu === null) {
    return;
  }

  hamburgerButton.addEventListener("click", function () {
    navigationMenu.classList.toggle("open");
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

// Home page

const quoteList = [
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "The only thing you absolutely have to know is the location of the library.", author: "Albert Einstein" }
];

const authorList = [
  {
    name: "J.K. Rowling",
    bio: "British author best known for the Harry Potter series, loved by readers of all ages.",
    books: ["Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban"],
    image: "images/jk.jpg"
  },
  {
    name: "Stephen King",
    bio: "Famous for horror and thriller novels that keep readers on the edge of their seats.",
    books: ["The Shining", "It", "Carrie"],
    image: "images/sk.jpg"
  },
  {
    name: "Agatha Christie",
    bio: "Known as the Queen of Mystery and one of the best-selling authors of all time.",
    books: ["Murder on the Orient Express", "And Then There Were None", "Death on the Nile"],
    image: "images/ac.jpg"
  }
];

function showQuote(quoteInfo) {
  const quoteTextElement = document.getElementById("rotatingQuote");
  const quoteAuthorElement = document.getElementById("quoteAuthor");

  if (quoteTextElement === null || quoteAuthorElement === null) {
    return;
  }

  quoteTextElement.textContent = '"' + quoteInfo.text + '"';
  quoteAuthorElement.textContent = "- " + quoteInfo.author;
}

function startQuoteRotation() {
  let currentIndex = 0;

  showQuote(quoteList[currentIndex]);

  setInterval(function () {
    currentIndex = currentIndex + 1;

    if (currentIndex >= quoteList.length) {
      currentIndex = 0;
    }

    showQuote(quoteList[currentIndex]);
  }, 5000);
}

function showAuthorOfDay() {
  const now = new Date();
  const utcMidnightMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const daysSinceEpoch = Math.floor(utcMidnightMs / 86400000);
  const index = daysSinceEpoch % authorList.length;

  const chosenAuthor = authorList[index];

  const authorNameElement = document.getElementById("authorName");
  const authorBioElement = document.getElementById("authorBio");
  const authorBooksElement = document.getElementById("authorBooks");
  const authorImageElement = document.getElementById("authorImage");

  if (authorNameElement === null || authorBioElement === null || authorBooksElement === null) {
    return;
  }

  authorNameElement.textContent = chosenAuthor.name;
  authorBioElement.textContent = chosenAuthor.bio;

  if (authorImageElement !== null) {
    authorImageElement.loading = 'lazy';
    authorImageElement.alt = chosenAuthor.name + " photo";

    const desiredSrc = chosenAuthor.image || "images/jk.jpg";
    authorImageElement.src = desiredSrc;
    authorImageElement.onerror = function () {
      this.onerror = null;
      this.src = 'images/readify.png';
    };
  }

  let booksHTML = "";
  for (let i = 0; i < chosenAuthor.books.length; i++) {
    booksHTML = booksHTML + "<li>" + chosenAuthor.books[i] + "</li>";
  }
  authorBooksElement.innerHTML = booksHTML;
}


document.addEventListener("DOMContentLoaded", function () {
  startQuoteRotation();
  showAuthorOfDay();
});
