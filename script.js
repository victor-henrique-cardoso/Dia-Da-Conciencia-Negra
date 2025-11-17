// Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Botão Saiba Mais
const btnPrimary = document.querySelector('.btn-primary');
btnPrimary.addEventListener('click', () => {
    document.getElementById('historia').scrollIntoView({ behavior: 'smooth' });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
const cards = document.querySelectorAll('.card, .contribution-item, .personality-card, .awareness-item, .fact-item');
cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Adicionar animação CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Animar seções ao carregar
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
        section.style.opacity = '0';
    });
});

// Contador animado para fatos
function animateCounter(element, final, duration = 2000) {
    let current = 0;
    const increment = final / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= final) {
            element.textContent = final;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Iniciar contadores quando visíveis
const factNumbers = document.querySelectorAll('.fact-number');
let countersStarted = false;

const factObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        factNumbers.forEach(number => {
            const finalValue = parseInt(number.textContent);
            animateCounter(number, finalValue);
        });
        factObserver.unobserve(entries[0].target);
    }
}, { threshold: 0.5 });

const factsSection = document.querySelector('.facts');
if (factsSection) {
    factObserver.observe(factsSection);
}

// Efeito de scroll suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animação de hover nos cards
const allCards = document.querySelectorAll('.card, .contribution-item, .personality-card, .awareness-item');
allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Adicionar classe ativa ao item de menu conforme scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const styleActive = document.createElement('style');
styleActive.textContent = `
    .nav-menu a.active {
        color: var(--primary-color) !important;
        border-bottom: 3px solid var(--primary-color);
        padding-bottom: 5px;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(styleActive);

// Efeito parallax (opcional - para foto de fundo)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    let scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});

console.log('✊ Consciência Negra - Site carregado com sucesso!');
