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

  const popup = document.getElementById('chaver-newsletter');
  const closeButton = popup ? popup.querySelector('.popup-close') : null;

  if (popup && window.localStorage.getItem('chaverPopup') === 'closed') {
    popup.classList.add('hidden');
  }

  if (popup && closeButton) {
    closeButton.addEventListener('click', function () {
      popup.classList.add('hidden');
      window.localStorage.setItem('chaverPopup', 'closed');
    });
  }
});