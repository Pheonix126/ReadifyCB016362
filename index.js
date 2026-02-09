function looksLikeEmail(email) {
  if (!email) return false;
  return /.+@.+\..+/.test(email);
}



function setupHamburger() {
  const hamburgerButton = document.getElementById("hamburger");
  const navigationMenu = document.getElementById("navMenu");
  if (!hamburgerButton || !navigationMenu) return;
  hamburgerButton.addEventListener("click", function () {
    navigationMenu.classList.toggle("open");
  });
}

function setupNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmailInput = document.getElementById("newsletterEmail");
  const newsletterMessage = document.getElementById("newsletterMessage");
  if (!newsletterForm || !newsletterEmailInput || !newsletterMessage) return;
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailValue = newsletterEmailInput.value.trim();
    if (!looksLikeEmail(emailValue)) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      return;
    }
    newsletterMessage.textContent = "Thanks! You are subscribed.";
    newsletterEmailInput.value = "";
  });
}

function setupServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupHamburger();
  setupNewsletter();
  setupServiceWorker();
});

const quoteList = [
  { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
  { text: "So many books, so little time.", author: "Frank Zappa" },
  { text: "We are all broken, that's how the light gets in.", author: "Ernest Hemingway" },
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
  if (!quoteTextElement || !quoteAuthorElement) return;
  quoteTextElement.textContent = '"' + quoteInfo.text + '"';
  quoteAuthorElement.textContent = "- " + quoteInfo.author;
}

function startQuoteRotation() {
  let currentIndex = 0;
  showQuote(quoteList[currentIndex]);
  setInterval(function () {
    currentIndex = (currentIndex + 1) % quoteList.length;
    showQuote(quoteList[currentIndex]);
  }, 5000);
}

function showAuthorOfDay() {
  const now = new Date();
  const index = Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000) % authorList.length;
  const chosenAuthor = authorList[index];
  const authorNameElement = document.getElementById("authorName");
  const authorBioElement = document.getElementById("authorBio");
  const authorBooksElement = document.getElementById("authorBooks");
  const authorImageElement = document.getElementById("authorImage");
  if (!authorNameElement || !authorBioElement || !authorBooksElement) return;
  authorNameElement.textContent = chosenAuthor.name;
  authorBioElement.textContent = chosenAuthor.bio;
  if (authorImageElement) {
    authorImageElement.loading = 'lazy';
    authorImageElement.alt = chosenAuthor.name + " photo";
    authorImageElement.src = chosenAuthor.image || "images/jk.jpg";
    authorImageElement.onerror = function () {
      this.onerror = null;
      this.src = 'images/readify.png';
    };
  }
  authorBooksElement.innerHTML = chosenAuthor.books.map(book => `<li>${book}</li>`).join("");
}


document.addEventListener("DOMContentLoaded", function () {
  startQuoteRotation();
  showAuthorOfDay();
});
