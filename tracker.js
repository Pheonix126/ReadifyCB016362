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

// Run common setup
document.addEventListener("DOMContentLoaded", function () {
  setupHamburger();
  setupNewsletter();
  setupServiceWorker();
});

// Progress Tracker

const PROGRESS_LIST_KEY = "readify_progress_list";
let lastCalculatedProgress = null;

function getSavedProgressList() {
  const savedList = getFromStorage(PROGRESS_LIST_KEY);

  if (Array.isArray(savedList) === false) {
    return [];
  }

  return savedList;
}

function saveProgressList(progressList) {
  saveToStorage(PROGRESS_LIST_KEY, progressList);
}

function formatDate(dateObject) {
  const year = dateObject.getFullYear();

  const monthNumber = dateObject.getMonth() + 1;
  let monthText = String(monthNumber);
  if (monthText.length === 1) {
    monthText = "0" + monthText;
  }

  const dayNumber = dateObject.getDate();
  let dayText = String(dayNumber);
  if (dayText.length === 1) {
    dayText = "0" + dayText;
  }

  return year + "-" + monthText + "-" + dayText;
}

function calculateProgress(totalPages, pagesRead, pagesPerDay) {
  let percent = Math.round((pagesRead / totalPages) * 100);

  if (percent < 0) {
    percent = 0;
  }

  if (percent > 100) {
    percent = 100;
  }

  let remainingPages = totalPages - pagesRead;
  if (remainingPages < 0) {
    remainingPages = 0;
  }

  let remainingDays = 0;
  if (pagesPerDay > 0) {
    remainingDays = Math.ceil(remainingPages / pagesPerDay);
  }

  const finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + remainingDays);

  return {
    percent: percent,
    remainingPages: remainingPages,
    remainingDays: remainingDays,
    finishDate: finishDate
  };
}

function showResults(progressInfo) {
  const percentEl = document.getElementById("completionPercent");
  const pagesLeftEl = document.getElementById("pagesRemaining");
  const daysLeftEl = document.getElementById("daysRemaining");
  const finishDateEl = document.getElementById("finishDate");

  if (percentEl !== null) {
    percentEl.textContent = progressInfo.percent + "%";
  }
  if (pagesLeftEl !== null) {
    pagesLeftEl.textContent = String(progressInfo.remainingPages);
  }
  if (daysLeftEl !== null) {
    daysLeftEl.textContent = String(progressInfo.remainingDays);
  }
  if (finishDateEl !== null) {
    finishDateEl.textContent = formatDate(progressInfo.finishDate);
  }

  // Progress bar
  const progressFill = document.getElementById("progressFill");
  if (progressFill !== null) {
    progressFill.style.width = progressInfo.percent + "%";
  }

  // Results card
  const resultsCard = document.getElementById("resultsCard");
  if (resultsCard !== null) {
    resultsCard.style.display = "block";
  }
}

function showSavedProgressList() {
  const listBox = document.getElementById("savedBooksList");
  if (listBox === null) {
    return;
  }

  const progressList = getSavedProgressList();

  if (progressList.length === 0) {
    listBox.innerHTML = '<p class="empty-message">No saved progress yet.</p>';
    return;
  }

  let listHTML = "";
  for (let i = 0; i < progressList.length; i++) {
    const item = progressList[i];
    const metaText = item.pagesRead + "/" + item.totalPages + " pages • " + item.percent + "% • finish " + item.finishDate;
    listHTML = listHTML + '<div class="saved-item"><div class="saved-title">' + item.bookTitle + '</div><div class="saved-meta">' + metaText + '</div><button class="btn small-btn" onclick="deleteSavedProgress(' + i + ')">Remove</button></div>';
  }
  listBox.innerHTML = listHTML;
}

function deleteSavedProgress(index) {
  const listNow = getSavedProgressList();
  listNow.splice(index, 1);
  saveProgressList(listNow);
  showSavedProgressList();
}

function onSubmitProgressForm(event) {
  event.preventDefault();

  const titleInput = document.getElementById("bookTitle");
  const totalInput = document.getElementById("totalPages");
  const readInput = document.getElementById("pagesRead");
  const perDayInput = document.getElementById("dailyPages");

  if (titleInput === null || totalInput === null || readInput === null || perDayInput === null) {
    return;
  }

  const bookTitle = titleInput.value.trim();
  const totalPages = Number(totalInput.value);
  const pagesRead = Number(readInput.value);
  const pagesPerDay = Number(perDayInput.value);

  if (bookTitle === "") {
    alert("Please enter a book title.");
    return;
  }

  if (totalPages <= 0) {
    alert("Total pages must be greater than 0.");
    return;
  }

  if (pagesRead < 0 || pagesRead > totalPages) {
    alert("Pages read must be between 0 and total pages.");
    return;
  }

  if (pagesPerDay <= 0) {
    alert("Daily pages must be greater than 0.");
    return;
  }

  const progressInfo = calculateProgress(totalPages, pagesRead, pagesPerDay);
  showResults(progressInfo);

  lastCalculatedProgress = {
    bookTitle: bookTitle,
    totalPages: totalPages,
    pagesRead: pagesRead,
    dailyPages: pagesPerDay,
    percent: progressInfo.percent,
    finishDate: formatDate(progressInfo.finishDate)
  };
}

function onSaveProgress() {
  if (lastCalculatedProgress === null) {
    alert("Calculate your progress first.");
    return;
  }

  var progressList = getSavedProgressList();
  progressList.unshift(lastCalculatedProgress);

  saveProgressList(progressList);
  showSavedProgressList();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("progressForm");
  const saveButton = document.getElementById("saveProgress");

  if (form !== null) {
    form.addEventListener("submit", onSubmitProgressForm);
  }

  if (saveButton !== null) {
    saveButton.addEventListener("click", onSaveProgress);
  }

  const resultsCard = document.getElementById("resultsCard");
  if (resultsCard !== null) {
    resultsCard.style.display = "none";
  }

  showSavedProgressList();
});
