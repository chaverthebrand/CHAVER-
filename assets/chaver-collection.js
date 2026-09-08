(function () {
  const showcase = document.querySelector('[data-collection-showcase]');
  if (!showcase) return;

  const lightbox = showcase.querySelector('[data-product-lightbox]');
  const dialog = lightbox && lightbox.querySelector('[role="dialog"]');
  const image = lightbox && lightbox.querySelector('[data-product-lightbox-image]');
  const title = lightbox && lightbox.querySelector('[data-product-lightbox-title]');
  const detail = lightbox && lightbox.querySelector('[data-product-lightbox-detail]');
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
    window.requestAnimationFrame(function () { dialog.focus(); });
  }

  function closeProduct() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('product-lightbox-open');
    image.src = '';
    if (lastTrigger) lastTrigger.focus();
  }

  showcase.querySelectorAll('[data-product-open]').forEach(function (trigger) {
    trigger.addEventListener('click', function () { openProduct(trigger); });
  });

  lightbox.querySelectorAll('[data-product-close]').forEach(function (close) {
    close.addEventListener('click', closeProduct);
  });

  const newsletterTrigger = lightbox.querySelector('[data-newsletter-trigger]');
  if (newsletterTrigger) {
    newsletterTrigger.addEventListener('click', closeProduct);
  }

  document.addEventListener('keydown', function (event) {
    if (!lightbox.hidden && event.key === 'Escape') {
      event.preventDefault();
      closeProduct();
    }
  });
})();
