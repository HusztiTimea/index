document.addEventListener('DOMContentLoaded', () => {
    // Slider funkcionalitás
    const slides = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.setAttribute('aria-hidden', i !== index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Automatikus váltás 5 másodpercenként
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Szüneteltetés hover/fókusz esetén
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    });

    showSlide(currentSlide);

    // Dropdown menü
    const dropbtn = document.querySelector('#menu-btn');
    const dropdown = document.querySelector('#dropdown-menu');

    dropbtn.addEventListener('click', () => {
        const isExpanded = dropbtn.getAttribute('aria-expanded') === 'true';
        dropbtn.setAttribute('aria-expanded', !isExpanded);
        dropdown.style.display = isExpanded ? 'none' : 'block';
    });

    // Billentyűzet-navigáció
    dropbtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropbtn.click();
        }
    });

    // Dropdown bezárása, ha máshova kattintunk
    document.addEventListener('click', (e) => {
        if (!dropbtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropbtn.setAttribute('aria-expanded', 'false');
            dropdown.style.display = 'none';
        }
    });

    // Akadálymentesítés: fókusz kezelése
    const dropdownLinks = dropdown.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropbtn.setAttribute('aria-expanded', 'false');
                dropdown.style.display = 'none';
                dropbtn.focus();
            }
        });
    });

    // Keresési funkció (alap mockup)
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.querySelector('#search-input').value;
        alert(`Keresés: ${query}`); // Mockup, valós implementáció szerveroldali logikát igényel
    });
});