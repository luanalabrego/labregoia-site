// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            mobileMenuBtn.classList.toggle('menu-open');
        });
    }
    
    // Floating contact button with menu
    const floatingContactBtn = document.getElementById('floatingContact');
    const floatingContactWrapper = document.getElementById('floatingContactWrapper');
    const floatingContactElement = document.querySelector('.floating-contact');
    if (floatingContactBtn) {
        floatingContactBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (floatingContactWrapper) {
                floatingContactWrapper.classList.toggle('open');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (floatingContactWrapper && !floatingContactWrapper.contains(e.target)) {
                floatingContactWrapper.classList.remove('open');
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.name || !data.email) {
                showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Show loading state
            contactForm.classList.add('loading');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando...';
            
            // Simulate form submission
            setTimeout(() => {
                contactForm.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                
                // Show success message
                showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Log form data (in a real application, this would be sent to a server)
                console.log('Form submitted:', data);
            }, 2000);
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('menu-open');
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Ensure floating button remains visible
        if (floatingContactElement) {
            floatingContactElement.style.opacity = '1';
            floatingContactElement.style.visibility = 'visible';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '';
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .differential, .step, .contact-form-container, .benefit');
    animatedElements.forEach(el => observer.observe(el));

    // Fade in sections between page folds
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // Service details modal
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        const serviceModalBody = document.getElementById('serviceModalBody');
        const serviceModalClose = document.getElementById('serviceModalClose');

        const serviceDetails = {
            aplicativos: {
                title: 'Aplicativos Sob Medida',
                content: `
                    <p>Desenvolvemos aplicativos web e mobile que eliminam planilhas e processos manuais, criando sistemas eficientes que escalam com seu crescimento.</p>
                    <p>Nossos aplicativos priorizam a experiência do usuário e a eficiência operacional.</p>
                    <ul>
                        <li>Escalabilidade Garantida</li>
                        <li>Acesso Multiplataforma</li>
                        <li>Segurança Avançada</li>
                    </ul>
                `
            },
            automacao: {
                title: 'Automação de Processos',
                content: `
                    <p>Eliminamos tarefas repetitivas através de automação inteligente, liberando sua equipe para o que realmente importa.</p>
                    <p>Soluções que conectam sistemas e funcionam 24/7, garantindo consistência e precisão.</p>
                    <ul>
                        <li>Economia de Tempo</li>
                        <li>Aumento de Produtividade</li>
                        <li>Redução de Erros</li>
                    </ul>
                `
            },
            ia: {
                title: 'Inteligência Artificial Aplicada',
                content: `
                    <p>Transformamos dados em insights acionáveis, otimizando decisões e automatizando processos complexos.</p>
                    <p>Machine learning, NLP e visão computacional que evoluem com seu negócio.</p>
                    <ul>
                        <li>Decisões Inteligentes</li>
                        <li>Previsões Precisas</li>
                        <li>Automação Inteligente</li>
                    </ul>
                `
            },
            agentes: {
                title: 'Agentes Inteligentes',
                content: `
                    <p>Chatbots e voicebots que entendem contexto e resolvem problemas complexos.</p>
                    <p>Atendimento personalizado 24 horas por dia, 7 dias por semana.</p>
                    <ul>
                        <li>Disponibilidade 24/7</li>
                        <li>Resposta Instantânea</li>
                        <li>Escalabilidade Infinita</li>
                    </ul>
                `
            }
        };

        function openServiceModal(key) {
            const detail = serviceDetails[key];
            if (!detail) return;
            serviceModalBody.innerHTML = `<div class="service-details"><h2>${detail.title}</h2>${detail.content}</div>`;
            serviceModal.classList.add('open');
        }

        document.querySelectorAll('.service-card[data-service]').forEach(card => {
            card.addEventListener('click', () => {
                openServiceModal(card.dataset.service);
            });
        });

        function closeModal() {
            serviceModal.classList.remove('open');
        }

        if (serviceModalClose) {
            serviceModalClose.addEventListener('click', closeModal);
        }

        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                closeModal();
            }
        });
    }
    
    // Button click handlers
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific button actions
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Fale Conosco') || buttonText.includes('Agendar Reunião')) {
                // Scroll to contact section
                const contactSection = document.querySelector('#contato');
                if (contactSection) {
                    e.preventDefault();
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('Vitriny')) {
                // Scroll to Vitriny section
                const vitrinySection = document.querySelector('#vitriny');
                if (vitrinySection) {
                    e.preventDefault();
                    vitrinySection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Social icons hover effects
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Statistics counter animation
    const stats = document.querySelectorAll('.stat-number');

    // Initialize stats with zero while preserving final value
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numberMatch = finalValue.match(/\d+/);
        if (numberMatch) {
            const number = parseInt(numberMatch[0]);
            const prefix = finalValue.split(number)[0];
            const suffix = finalValue.split(number)[1];
            stat.dataset.finalValue = finalValue;
            stat.textContent = prefix + '0' + suffix;
        }
    });

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.dataset.finalValue || stat.textContent;

                // Simple counter animation for numbers
                animateCounter(stat, finalValue);

                statsObserver.unobserve(stat);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));

    // Case cards modal gallery
    const caseModal = document.getElementById('caseModal');
    const caseModalImg = document.getElementById('caseModalImg');
    const casePrev = document.getElementById('casePrev');
    const caseNext = document.getElementById('caseNext');
    const caseClose = document.getElementById('caseClose');
    let caseImages = [];
    let caseIndex = 0;

    function showCaseImage(index) {
        caseIndex = (index + caseImages.length) % caseImages.length;
        caseModalImg.src = caseImages[caseIndex];
    }

    function openCase(images) {
        caseImages = images;
        showCaseImage(0);
        caseModal.classList.add('open');
    }

    function attachCaseCardEvents() {
        document.querySelectorAll('.case-card').forEach(card => {
            if (card.dataset.bound) return;
            card.dataset.bound = 'true';
            card.addEventListener('click', () => {
                const imgs = card.dataset.images;
                if (!imgs) return;
                openCase(imgs.split(',').map(i => i.trim()));
            });
        });
    }

    attachCaseCardEvents();

    if (casePrev) casePrev.addEventListener('click', () => showCaseImage(caseIndex - 1));
    if (caseNext) caseNext.addEventListener('click', () => showCaseImage(caseIndex + 1));
    if (caseClose) caseClose.addEventListener('click', () => caseModal.classList.remove('open'));
    if (caseModal) {
        caseModal.addEventListener('click', (e) => {
            if (e.target === caseModal) caseModal.classList.remove('open');
        });
    }

    // Load custom cases from localStorage
    const customCases = JSON.parse(localStorage.getItem('customCases') || '[]');
    const casesGrid = document.querySelector('.cases-grid');
    if (casesGrid && customCases.length) {
        customCases.forEach(c => {
            const card = document.createElement('div');
            card.className = 'case-card';
            card.dataset.category = c.category || 'outro';
            card.dataset.images = (c.images || []).join(',');
            card.innerHTML = `
                <div class="case-header">
                    <div class="case-category">${c.category || ''}</div>
                </div>
                <h3>${c.title || ''}</h3>
                <p>${c.description || ''}</p>
            `;
            casesGrid.appendChild(card);
        });
        attachCaseCardEvents();
    }

    // Floating particles in hero section and header
    const heroFloating = document.querySelector('.hero-home .floating-elements');
    const headerFloating = document.querySelector('.header-floating');
    function createParticle(container) {
        if (!container) return;
        const particle = document.createElement('div');
        particle.innerHTML = '<i class="fas fa-circle"></i>';
        particle.style.position = 'absolute';
        particle.style.fontSize = '0.5rem';
        particle.style.opacity = '0.1';
        particle.style.color = 'white';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatUp ${3 + Math.random() * 3}s linear forwards`;
        container.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }

    if (heroFloating || headerFloating) {
        function spawnParticles() {
            createParticle(heroFloating);
            createParticle(headerFloating);
        }
        setInterval(spawnParticles, 2000);
    }

    // Simple carousel for Vitriny images
    const carouselInner = document.querySelector('.vitriny-carousel-inner');
    if (carouselInner) {
        const slides = carouselInner.querySelectorAll('.vitriny-image');
        slides.forEach(slide => {
            slide.style.width = '100%';
        });
        let currentSlide = 0;
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');

        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });

            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 4000);
    }
    
    function animateCounter(element, finalValue) {
        const isNumber = /\d+/.test(finalValue);
        if (!isNumber) return;

        const number = parseInt(finalValue.match(/\d+/)[0]);
        const prefix = finalValue.split(number)[0];
        const suffix = finalValue.split(number)[1];

        let current = 0;
        element.textContent = prefix + '0' + suffix;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = prefix + Math.floor(current) + suffix;
        }, 30);
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            if (nav && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('menu-open');
                }
            }
        }
    });
    
    // Initialize floating contact button visibility
    if (floatingContactElement) {
        floatingContactElement.style.opacity = '1';
        floatingContactElement.style.visibility = 'visible';
        floatingContactElement.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    
    // Add loading complete class to body
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Form message display function
function showFormMessage(message, type) {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Remove existing messages
    const existingMessage = contactForm.querySelector('.form-success, .form-error');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'form-success' : 'form-error';
    messageDiv.textContent = message;
    
    // Insert message at the beginning of the form
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openContactModal() {
    // Scroll to contact section instead of modal
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export functions for potential use in other scripts
window.LabregoIA = {
    scrollToTop,
    openContactModal,
    showFormMessage
};

<script>
(function(){
  const root = document.querySelector('.bh-carousel');
  if(!root) return;

  const viewport = root.querySelector('.bh-viewport');
  const track    = root.querySelector('.bh-track');
  const slides   = Array.from(track.children);
  const prev     = root.querySelector('.bh-nav.prev');
  const next     = root.querySelector('.bh-nav.next');
  const dotsWrap = root.nextElementSibling; // .bh-dots

  let index = 0, perView = 3, gap = 24;

  function calcPerView(w){
    if (w >= 1200) return 3;
    if (w >= 900)  return 3;
    if (w >= 700)  return 2;
    return 1;
  }

  function layout(){
    const w = viewport.clientWidth;
    perView = calcPerView(w);
    const slideW = (w - (perView-1)*gap) / perView;
    slides.forEach(s => s.style.setProperty('--bh-w', slideW+'px'));
    buildDots();
    index = Math.min(index, Math.max(0, slides.length - perView));
    update();
  }

  function buildDots(){
    dotsWrap.innerHTML = '';
    const pages = Math.max(1, Math.ceil(slides.length / perView));
    for(let i=0;i<pages;i++){
      const b=document.createElement('button');
      if(i===Math.floor(index/perView)) b.classList.add('active');
      b.onclick=()=>goTo(i*perView);
      dotsWrap.appendChild(b);
    }
  }

  function update(){
    const first = slides[0].getBoundingClientRect();
    const second= slides[1]?slides[1].getBoundingClientRect():first;
    const step  = second.left - first.left; // largura + gap
    track.style.transform = `translateX(${-index*step}px)`;
    prev.disabled = index<=0;
    next.disabled = index >= slides.length - perView;

    const page = Math.floor(index/perView);
    const dots = dotsWrap.querySelectorAll('button');
    dots.forEach((d,i)=>d.classList.toggle('active', i===page));
  }

  function goTo(i){ index=Math.max(0,Math.min(i,slides.length-perView)); update(); }
  prev.addEventListener('click', ()=>goTo(index - perView));
  next.addEventListener('click', ()=>goTo(index + perView));
  window.addEventListener('resize', layout);

  // swipe (mobile)
  let startX=0, drag=false;
  viewport.addEventListener('pointerdown', e=>{
    drag=true; startX=e.clientX; viewport.setPointerCapture(e.pointerId);
    track.style.transition='none';
  });
  function end(e){
    if(!drag) return; drag=false; track.style.transition='';
    const delta=(e.clientX??startX)-startX, thr=60;
    if(delta<-thr) goTo(index+1);
    else if(delta>thr) goTo(index-1);
    else update();
  }
  viewport.addEventListener('pointermove', e=>{
    if(!drag) return;
    const dx=e.clientX-startX;
    const first=slides[0].getBoundingClientRect();
    const second=slides[1]?slides[1].getBoundingClientRect():first;
    const step=second.left-first.left;
    track.style.transform=`translateX(${(-index*step)+dx}px)`;
  });
  viewport.addEventListener('pointerup', end);
  viewport.addEventListener('pointercancel', end);
  viewport.addEventListener('pointerleave', end);

  layout();
})();
</script>

// Carousel functionality for cases section
class CasesCarousel {
    constructor() {
        this.carousel = document.querySelector('[data-cases]');
        this.track = this.carousel.querySelector('.bh-track');
        this.cards = this.carousel.querySelectorAll('.bh-card');
        this.prevBtn = this.carousel.querySelector('.bh-nav.prev');
        this.nextBtn = this.carousel.querySelector('.bh-nav.next');
        this.dotsContainer = this.carousel.querySelector('.bh-dots');
        
        this.currentIndex = 0;
        this.cardWidth = 400; // 380px + 20px margin
        this.visibleCards = this.getVisibleCards();
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.bindEvents();
        this.updateCarousel();
        this.handleResize();
    }
    
    getVisibleCards() {
        const containerWidth = this.carousel.offsetWidth;
        return Math.floor(containerWidth / this.cardWidth);
    }
    
    createDots() {
        const totalDots = Math.max(1, this.cards.length - this.visibleCards + 1);
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'bh-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });
        
        // Bind card click events for modal
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.openModal(card));
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.visibleCards = this.getVisibleCards();
            this.createDots();
            this.updateCarousel();
        });
    }
    
    prevSlide() {
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateCarousel();
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        this.updateCarousel();
    }
    
    goToSlide(index) {
        const maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        this.currentIndex = Math.min(maxIndex, Math.max(0, index));
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.bh-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update navigation buttons
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.cards.length - this.visibleCards ? '0.5' : '1';
    }
    
    openModal(card) {
        const modal = new CaseModal(card);
        modal.open();
    }
}

// Modal functionality for case gallery
class CaseModal {
    constructor(card) {
        this.card = card;
        this.modal = document.getElementById('caseModal');
        this.modalImg = document.getElementById('caseModalImg');
        this.modalCaption = document.getElementById('caseModalCaption');
        this.modalThumbs = document.getElementById('caseModalThumbs');
        this.closeBtn = this.modal.querySelector('[data-modal-close]');
        this.prevBtn = this.modal.querySelector('[data-modal-prev]');
        this.nextBtn = this.modal.querySelector('[data-modal-next]');
        
        this.title = card.dataset.title;
        this.subtitle = card.dataset.subtitle;
        this.gallery = JSON.parse(card.dataset.gallery || '[]');
        this.currentImageIndex = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.createThumbnails();
        this.updateImage();
    }
    
    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
    
    createThumbnails() {
        this.modalThumbs.innerHTML = '';
        
        this.gallery.forEach((imageSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imageSrc;
            thumb.alt = `${this.title} - Imagem ${index + 1}`;
            thumb.addEventListener('click', () => this.goToImage(index));
            this.modalThumbs.appendChild(thumb);
        });
    }
    
    updateImage() {
        if (this.gallery.length === 0) return;
        
        const currentImage = this.gallery[this.currentImageIndex];
        this.modalImg.src = currentImage;
        this.modalImg.alt = `${this.title} - Imagem ${this.currentImageIndex + 1}`;
        this.modalCaption.textContent = `${this.title} - ${this.currentImageIndex + 1} de ${this.gallery.length}`;
        
        // Update thumbnail active state
        const thumbs = this.modalThumbs.querySelectorAll('img');
        thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
        
        // Update navigation buttons
        this.prevBtn.style.opacity = this.currentImageIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentImageIndex === this.gallery.length - 1 ? '0.5' : '1';
    }
    
    prevImage() {
        this.currentImageIndex = Math.max(0, this.currentImageIndex - 1);
        this.updateImage();
    }
    
    nextImage() {
        this.currentImageIndex = Math.min(this.gallery.length - 1, this.currentImageIndex + 1);
        this.updateImage();
    }
    
    goToImage(index) {
        this.currentImageIndex = index;
        this.updateImage();
    }
    
    open() {
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Vitriny carousel functionality
class VitrinyCarousel {
    constructor() {
        this.carousel = document.querySelector('.vitriny-carousel-inner');
        this.images = document.querySelectorAll('.vitriny-image');
        this.prevBtn = document.querySelector('.vitriny-images .carousel-btn.prev');
        this.nextBtn = document.querySelector('.vitriny-images .carousel-btn.next');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        if (this.carousel && this.images.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        this.startAutoplay();
        this.updateCarousel();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.prevSlide();
                this.startAutoplay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.nextSlide();
                this.startAutoplay();
            });
        }
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    prevSlide() {
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('header-scrolled');
            } else {
                this.header.classList.remove('header-scrolled');
            }
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.nav = document.querySelector('.nav');
        this.init();
    }
    
    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => {
                this.nav.classList.toggle('active');
                this.menuBtn.classList.toggle('active');
            });
        }
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate
        document.querySelectorAll('.benefit, .service-card, .step-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CasesCarousel();
    new VitrinyCarousel();
    new HeaderScroll();
    new SmoothScroll();
    new MobileMenu();
    new ScrollAnimations();
});

// Add floating elements to hero
document.addEventListener('DOMContentLoaded', () => {
    const heroFloating = document.querySelector('.hero-home .floating-elements');
    if (heroFloating) {
        const icons = ['fas fa-brain', 'fas fa-robot', 'fas fa-chart-line', 'fas fa-cogs', 'fas fa-mobile-alt'];
        
        icons.forEach((iconClass, index) => {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.innerHTML = `<i class="${iconClass}"></i>`;
            heroFloating.appendChild(element);
        });
    }
});

