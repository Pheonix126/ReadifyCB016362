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
  if (email === null || email === undefined) {
    return false;
  }

  const emailText = String(email);

  const hasAt = emailText.indexOf("@") !== -1;
  const hasDot = emailText.indexOf(".") !== -1;

  if (hasAt && hasDot) {
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
  const newsletterEmailBox = document.getElementById("newsletterEmail");
  const newsletterMessageText = document.getElementById("newsletterMessage");

  if (newsletterForm === null || newsletterEmailBox === null || newsletterMessageText === null) {
    return;
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = newsletterEmailBox.value.trim();

    if (looksLikeEmail(email) === false) {
      newsletterMessageText.textContent = "Please enter a valid email address.";
      return;
    }

    newsletterMessageText.textContent = "Thanks! You are subscribed.";
    newsletterEmailBox.value = "";
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
  setupFaqAccordion();
});

// FAQ 
function setupFaqAccordion() {
  const buttons = document.querySelectorAll('.faq-question');

  if (!buttons || buttons.length === 0) {
    return;
  }

  buttons.forEach((btn) => {
    const item = btn.closest('.faq-item');
    if (!item) return;
    const answer = item.querySelector('.faq-answer');
    if (!answer) return;

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', answer.id || '');

    answer.style.maxHeight = '0px';

    btn.addEventListener('click', function () {
      const currentlyOpen = document.querySelector('.faq-item.open');

      if (currentlyOpen && currentlyOpen !== item) {
        const otherBtn = currentlyOpen.querySelector('.faq-question');
        const otherAns = currentlyOpen.querySelector('.faq-answer');
        currentlyOpen.classList.remove('open');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAns) {
          otherAns.style.maxHeight = otherAns.scrollHeight + 'px';
          void otherAns.offsetHeight;
          otherAns.style.maxHeight = '0px';
        }
      }

      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        const clearMax = function () {
          if (item.classList.contains('open')) {
            answer.style.maxHeight = 'none';
          }
          answer.removeEventListener('transitionend', clearMax);
        };
        answer.addEventListener('transitionend', clearMax);
      } else {
        if (answer.style.maxHeight === 'none') {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          void answer.offsetHeight;
        }
        answer.style.maxHeight = '0px';
      }
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// Feedback page

function setErrorText(elementId, messageText) {
  const errorElement = document.getElementById(elementId);
  if (errorElement === null) {
    return;
  }
  errorElement.textContent = messageText;
}

function clearAllErrors() {
  setErrorText("nameError", "");
  setErrorText("emailError", "");
  setErrorText("messageError", "");
}

function validateFeedbackForm() {
  const nameBox = document.getElementById("userName");
  const emailBox = document.getElementById("userEmail");
  const messageBox = document.getElementById("message");

  let userName = "";
  let userEmail = "";
  let userMessage = "";

  if (nameBox !== null) {
    userName = nameBox.value.trim();
  }
  if (emailBox !== null) {
    userEmail = emailBox.value.trim();
  }
  if (messageBox !== null) {
    userMessage = messageBox.value.trim();
  }

  let formIsValid = true;

  clearAllErrors();

  if (userName.length < 2) {
    setErrorText("nameError", "Please enter your name.");
    formIsValid = false;
  }

  if (looksLikeEmail(userEmail) === false) {
    setErrorText("emailError", "Please enter a valid email.");
    formIsValid = false;
  }

  if (userMessage.length < 10) {
    setErrorText("messageError", "Message should be at least 10 characters.");
    formIsValid = false;
  }

  return formIsValid;
}

document.addEventListener("DOMContentLoaded", function () {
  const feedbackForm = document.getElementById("feedbackForm");
  const confirmationBox = document.getElementById("confirmationMessage");

  if (confirmationBox !== null) {
    confirmationBox.style.display = "none";
  }

  if (feedbackForm === null) {
    return;
  }

  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateFeedbackForm();
    if (isValid === false) {
      return;
    }

    if (confirmationBox !== null) {
      confirmationBox.textContent = "Thanks! Your feedback was received.";
      confirmationBox.style.display = "block";
    }

    feedbackForm.reset();
    clearAllErrors();
  });
});
