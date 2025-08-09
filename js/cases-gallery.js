(function () {
  const modal = document.querySelector('.gallery-modal');
  if (!modal) return;

  const titleEl = modal.querySelector('.gallery-modal__title');
  const tagsEl = modal.querySelector('.gallery-modal__tags');
  const imgEl = modal.querySelector('.gallery-modal__image');
  const thumbsEl = modal.querySelector('.gallery-modal__thumbs');

  const btnCloseEls = modal.querySelectorAll('[data-close]');
  const btnPrev = modal.querySelector('[data-prev]');
  const btnNext = modal.querySelector('[data-next]');
  const backdrop = modal.querySelector('.gallery-modal__backdrop');

  let images = [];
  let index = 0;

  function openModal({ title, tags, imgs }) {
    titleEl.textContent = title || 'Projeto';
    tagsEl.innerHTML = '';
    (tags || '').split(',').map(t => t.trim()).filter(Boolean).forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    images = imgs || [];
    index = 0;
    renderThumbs();
    renderImage();
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    thumbsEl.innerHTML = '';
    imgEl.removeAttribute('src');
    imgEl.removeAttribute('alt');
  }

  function renderImage() {
    const src = images[index];
    imgEl.src = src;
    imgEl.alt = `${titleEl.textContent} - imagem ${index + 1}`;
    Array.from(thumbsEl.querySelectorAll('img')).forEach((t, i) => {
      t.classList.toggle('is-active', i === index);
    });
  }

  function renderThumbs() {
    thumbsEl.innerHTML = '';
    images.forEach((src, i) => {
      const t = document.createElement('img');
      t.loading = 'lazy';
      t.decoding = 'async';
      t.src = src;
      t.alt = `Miniatura ${i + 1}`;
      if (i === index) t.classList.add('is-active');
      t.addEventListener('click', () => { index = i; renderImage(); });
      thumbsEl.appendChild(t);
    });
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.case-card');
    if (card) {
      const title = card.dataset.title || '';
      const tags = card.dataset.tags || '';
      let imgs = [];
      try { imgs = JSON.parse(card.dataset.images || '[]'); } catch {}
      if (!imgs.length) return;
      openModal({ title, tags, imgs });
    }
  });

  btnPrev.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    renderImage();
  });
  btnNext.addEventListener('click', () => {
    index = (index + 1) % images.length;
    renderImage();
  });
  btnCloseEls.forEach(b => b.addEventListener('click', closeModal));
  backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') { index = (index - 1 + images.length) % images.length; renderImage(); }
    if (e.key === 'ArrowRight') { index = (index + 1) % images.length; renderImage(); }
  }, { passive: true });
})();
