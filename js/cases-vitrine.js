(function(){
  const qs   = (s, el=document) => el.querySelector(s);
  const qsa  = (s, el=document) => Array.from(el.querySelectorAll(s));

  const modal = qs('#vitrineModal');
  const imgEl = qs('.vitrine-image', modal);
  const titleEl = qs('.vitrine-modal__title', modal);
  const tagsEl = qs('.vitrine-modal__tags', modal);
  const thumbsEl = qs('.vitrine-modal__thumbs', modal);
  const progressEl = qs('.vitrine-modal__progress span', modal);
  const counterEl = qs('.vitrine-counter', modal);

  const btnPrev = qs('[data-prev]', modal);
  const btnNext = qs('[data-next]', modal);
  const btnCloseList = qsa('[data-close]', modal);
  const btnFs = qs('[data-fs-toggle]', modal);

  let state = {
    title: '',
    tags: '',
    images: [],
    index: 0,
    isOpen: false,
    startX: 0,
    deltaX: 0,
  };

  // Abrir ao clicar nos cards
  qsa('.case-card').forEach(card => {
    card.addEventListener('click', () => openCase(card));
    const btn = qs('.case-card__inner', card);
    if (btn) btn.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openCase(card); });
  });

  function openCase(card){
    state.title  = card.dataset.title || '';
    state.tags   = card.dataset.tags  || '';
    try { state.images = JSON.parse(card.dataset.images || '[]'); }
    catch { state.images = []; }

    state.index = 0;
    if(!state.images.length) return;

    titleEl.textContent = state.title;
    tagsEl.textContent  = state.tags;

    renderThumbs();
    show(0, false);

    modal.setAttribute('aria-hidden','false');
    state.isOpen = true;
    lockScroll(true);

    btnNext.focus();
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    state.isOpen = false;
    lockScroll(false);
    if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
  }

  function lockScroll(lock){
    document.documentElement.style.overflow = lock ? 'hidden' : '';
  }

  function renderThumbs(){
    thumbsEl.innerHTML = '';
    state.images.forEach((src, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ir para imagem ${i+1}`);
      const t = document.createElement('img');
      t.loading = 'lazy';
      t.decoding = 'async';
      t.src = src;
      t.alt = `${state.title} - ${i+1}`;
      b.appendChild(t);
      if(i === state.index) b.classList.add('is-active');
      b.addEventListener('click', ()=> show(i));
      thumbsEl.appendChild(b);
    });
  }

  function updateCounter(){
    counterEl.textContent = `${state.index+1} / ${state.images.length}`;
  }

  function updateProgress(){
    const pct = ((state.index+1) / state.images.length) * 100;
    progressEl.style.width = pct + '%';
  }

  function preloadNeighbour(idx){
    [idx-1, idx+1].forEach(i=>{
      if(i >=0 && i < state.images.length){
        const img = new Image();
        img.src = state.images[i];
      }
    });
  }

  function show(idx, animate=true){
    if(idx < 0) idx = state.images.length - 1;
    if(idx >= state.images.length) idx = 0;

    state.index = idx;
    updateCounter();
    updateProgress();

    if(animate){
      imgEl.style.opacity = 0;
      setTimeout(()=> {
        imgEl.src = state.images[state.index];
        imgEl.alt = `${state.title} - ${state.index+1}`;
        imgEl.onload = ()=> imgEl.style.opacity = 1;
      }, 120);
    } else {
      imgEl.src = state.images[state.index];
      imgEl.alt = `${state.title} - ${state.index+1}`;
    }

    qsa('.vitrine-modal__thumbs button', thumbsEl).forEach((b,i)=>{
      b.classList.toggle('is-active', i === state.index);
    });

    preloadNeighbour(state.index);
  }

  function next(){ show(state.index + 1); }
  function prev(){ show(state.index - 1); }

  // Controles
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  btnCloseList.forEach(b => b.addEventListener('click', closeModal));
  qs('.vitrine-modal__backdrop', modal).addEventListener('click', closeModal);

  // Teclado
  document.addEventListener('keydown', (e)=>{
    if(!state.isOpen) return;
    if(e.key === 'Escape') closeModal();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });

  // Gestos
  const viewport = qs('.vitrine-modal__viewport', modal);
  viewport.addEventListener('pointerdown', (e)=>{
    state.startX = e.clientX; state.deltaX = 0;
  });
  viewport.addEventListener('pointermove', (e)=>{
    if(!state.startX) return;
    state.deltaX = e.clientX - state.startX;
  });
  viewport.addEventListener('pointerup', ()=>{
    if(Math.abs(state.deltaX) > 60){
      state.deltaX < 0 ? next() : prev();
    }
    state.startX = 0; state.deltaX = 0;
  });

  // Fullscreen
  btnFs.addEventListener('click', ()=>{
    const shell = qs('.vitrine-modal__shell', modal);
    if(!document.fullscreenElement){
      shell.requestFullscreen?.().catch(()=>{});
    }else{
      document.exitFullscreen?.().catch(()=>{});
    }
  });

})();
