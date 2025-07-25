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
