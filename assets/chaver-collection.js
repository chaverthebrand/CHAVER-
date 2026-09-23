(function () {
  const showcase = document.querySelector('[data-collection-showcase]');
  if (!showcase) return;

  const lightbox = showcase.querySelector('[data-product-lightbox]');
  const dialog = lightbox && lightbox.querySelector('[role="dialog"]');
  const image = lightbox && lightbox.querySelector('[data-product-lightbox-image]');
  const title = lightbox && lightbox.querySelector('[data-product-lightbox-title]');
  const detail = lightbox && lightbox.querySelector('[data-product-lightbox-detail]');
  const closeButton = lightbox && lightbox.querySelector('.product-lightbox-close');
  let lastTrigger = null;

  if (!lightbox || !dialog || !image || !title || !detail) return;

  function openProduct(trigger) {
    lastTrigger = trigger;
    image.src = trigger.dataset.productImage;
    image.alt = trigger.dataset.productTitle + ' with embroidered CHAVÉR logo';
    title.textContent = trigger.dataset.productTitle;
    detail.textContent = trigger.dataset.productDetail;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('product-lightbox-open');
    window.requestAnimationFrame(function () {
      if (closeButton) closeButton.focus();
      else dialog.focus();
    });
  }

  function closeProduct(restoreFocus) {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('product-lightbox-open');
    image.src = '';
    if (restoreFocus !== false && lastTrigger) lastTrigger.focus();
  }

  showcase.querySelectorAll('[data-product-open]').forEach(function (trigger) {
    trigger.addEventListener('click', function () { openProduct(trigger); });
  });

  lightbox.querySelectorAll('[data-product-close]').forEach(function (close) {
    close.addEventListener('click', function () { closeProduct(true); });
  });

  const newsletterTrigger = lightbox.querySelector('[data-newsletter-trigger]');
  if (newsletterTrigger) {
    newsletterTrigger.addEventListener('click', function () {
      newsletterTrigger.chaverReturnFocus = lastTrigger;
      closeProduct(false);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (lightbox.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeProduct(true);
      return;
    }

    if (event.key === 'Tab') {
      const focusable = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
