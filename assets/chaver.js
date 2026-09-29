document.addEventListener('DOMContentLoaded', function () {
  // Shopify renders policy text from Admin, not from the theme repository.
  // Enhance its headings without deleting or changing the legal content.
  if (window.location.pathname === '/policies/privacy-policy' || window.location.pathname === '/policies/privacy-policy/') {
    const policyBody = document.querySelector('.shopify-policy__body');
    const content = policyBody && (policyBody.querySelector('.rte') || policyBody);
    if (content) {
      const headings = Array.from(content.children).filter(function (element) {
        return /^H[2-4]$/.test(element.tagName);
      });
      headings.forEach(function (heading) {
        const details = document.createElement('details');
        details.className = 'chaver-policy-accordion';
        const summary = document.createElement('summary');
        summary.textContent = heading.textContent.trim();
        details.appendChild(summary);
        const panel = document.createElement('div');
        panel.className = 'chaver-policy-panel';
        let next = heading.nextSibling;
        while (next && !(next.nodeType === 1 && /^H[2-4]$/.test(next.tagName))) {
          const current = next;
          next = next.nextSibling;
          panel.appendChild(current);
        }
        details.appendChild(panel);
        heading.replaceWith(details);
      });
    }
  }

  const prelaunchEnabled = document.body.dataset.prelaunch === 'true';

  if (prelaunchEnabled) {
    document.addEventListener('submit', function (event) {
      const form = event.target;
      if (form instanceof HTMLFormElement && /\/cart\/add(?:\.js)?(?:\?|$)/.test(form.action)) {
        event.preventDefault();
      }
    });

    document.addEventListener('click', function (event) {
      const purchaseControl = event.target.closest('a[href*="/cart"], a[href*="/checkout"], [name="add"], [name="checkout"]');
      if (purchaseControl) {
        event.preventDefault();
      }
    });
  }

  const header = document.querySelector('.site-header');
  const announcement = document.querySelector('.announcement');
  const mobileMenu = document.getElementById('mobile-menu');
  if (header) {
    const headerSpacer = document.createElement('div');
    headerSpacer.setAttribute('aria-hidden', 'true');
    headerSpacer.style.display = 'none';
    header.parentNode.insertBefore(headerSpacer, header.nextSibling);
    let previousY = window.scrollY;
    let directionDistance = 0;
    let scheduled = false;
    function updateHeader() {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      const menuOpen = document.body.classList.contains('menu-open');
      const pastTop = currentY > (announcement ? announcement.offsetHeight : 0) + header.offsetHeight;
      if (!pastTop || menuOpen) {
        header.classList.remove('header-hidden');
        directionDistance = 0;
      } else {
        if (delta * directionDistance < 0) directionDistance = 0;
        directionDistance += delta;
        if (directionDistance <= -3) {
          header.classList.remove('header-hidden');
          directionDistance = 0;
        } else if (directionDistance >= 8) {
          header.classList.add('header-hidden');
          directionDistance = 0;
        }
      }
      const floating = pastTop;
      header.classList.toggle('header-floating', floating);
      headerSpacer.style.display = floating ? 'block' : 'none';
      headerSpacer.style.height = floating ? header.offsetHeight + 'px' : '0';
      if (mobileMenu) mobileMenu.classList.toggle('mobile-menu-floating', floating);
      previousY = currentY;
      scheduled = false;
    }
    window.addEventListener('scroll', function () {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
    updateHeader();
  }

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    function closeMobileMenu(returnFocus) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      document.body.classList.remove('menu-open');
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      document.body.classList.toggle('menu-open', !open);
      if (!open && header) header.classList.remove('header-hidden');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closeMobileMenu(true);
      }
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
      openPopup(trigger.chaverReturnFocus || trigger);
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
