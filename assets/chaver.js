document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      document.body.classList.toggle('menu-open', !open);
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        document.body.classList.remove('menu-open');
      });
    });
  }

  const popupLayer = document.getElementById('chaver-newsletter-layer');
  const popup = document.getElementById('chaver-newsletter');

  if (!popupLayer || !popup) return;

  const closeButton = popup.querySelector('.popup-close');
  const emailField = popup.querySelector('input[type="email"]');
  const successMessage = popup.querySelector('.form-success');
  const errorMessage = popup.querySelector('.form-error');
  const storageKey = 'chaverNewsletterDismissedAt';
  const dismissalLength = 14 * 24 * 60 * 60 * 1000;
  let lastFocusedElement = null;

  function readDismissedAt() {
    try {
      window.localStorage.removeItem('chaverPopup');
      return Number(window.localStorage.getItem(storageKey) || 0);
    } catch (error) {
      return 0;
    }
  }

  function rememberDismissal() {
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch (error) {
      // The popup still closes when browser storage is unavailable.
    }
  }

  function getFocusableElements() {
    return Array.from(
      popup.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (element) {
      return element.offsetParent !== null;
    });
  }

  function openPopup(trigger) {
    lastFocusedElement = trigger || document.activeElement;
    popupLayer.hidden = false;
    popupLayer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('popup-open');

    window.requestAnimationFrame(function () {
      if (successMessage) successMessage.focus();
      else if (emailField) emailField.focus();
      else popup.focus();
    });
  }

  function closePopup(persist) {
    popupLayer.hidden = true;
    popupLayer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('popup-open');
    if (persist) rememberDismissal();

    if (lastFocusedElement && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
  }

  if (closeButton) {
    closeButton.addEventListener('click', function () {
      closePopup(true);
    });
  }

  popupLayer.addEventListener('click', function (event) {
    if (event.target === popupLayer) closePopup(true);
  });

  document.addEventListener('keydown', function (event) {
    if (popupLayer.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closePopup(true);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (!focusableElements.length) {
      event.preventDefault();
      popup.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  document.querySelectorAll('a[href="#chaver-newsletter"], [data-newsletter-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      openPopup(trigger);
    });
  });

  const mustShowFormResult = Boolean(successMessage || errorMessage);
  const dismissedRecently = Date.now() - readDismissedAt() < dismissalLength;

  if (mustShowFormResult) {
    openPopup(null);
  } else if (!dismissedRecently) {
    const delay = Number(popup.dataset.delay || 3000);
    window.setTimeout(function () {
      openPopup(null);
    }, delay);
  }
});
