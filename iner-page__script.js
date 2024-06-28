document.addEventListener("DOMContentLoaded", function () {

    // alinght the menu

    const dropdownMenus = document.querySelectorAll('.desctop-menu .nav-item.dd');

    dropdownMenus.forEach(menu => {
        const link = menu.querySelector('.nav-link');
        const icon = link.querySelector('i');
        const dropdownMenu = menu.querySelector('.dropdownMenu');

        menu.addEventListener('mouseover', () => {
            const iconRect = icon.getBoundingClientRect();
            const menuRect = menu.getBoundingClientRect();
            const iconCenter = iconRect.left + (iconRect.width / 2);
            const menuCenter = menuRect.left + (menuRect.width / 2);
            const offset = iconCenter - menuCenter;

            dropdownMenu.style.left = `calc(55% + ${offset}px)`;
        });

        menu.addEventListener('mouseleave', () => {
            dropdownMenu.style.left = '50%';
        });
    });


    // best sites
    const sites = document.querySelectorAll(".site");
    const button = document.getElementById('show-more');
    let showMore = true;

    sites.forEach(site => {
        const checkbox = site.querySelector(".feature-toggle");
        const bottomSection = site.querySelector(".bottom-section");

        function toggleBottomSection() {
            if (checkbox.checked) {
                bottomSection.classList.remove("hidden");
            } else {
                bottomSection.classList.add("hidden");
            }
        }
        toggleBottomSection();
        checkbox.addEventListener("change", toggleBottomSection);
    });

    sites.forEach((site, index) => {
        site.setAttribute('data-index', `#${index + 1}`);
        if (index >= 5) {
            site.classList.add('hidden');
        }
    });

    button.addEventListener('click', () => {
        sites.forEach((site, index) => {
            if (index >= 5) {
                if (showMore) {
                    site.classList.remove('hidden');
                } else {
                    site.classList.add('hidden');
                }
            }
        });
        button.querySelector("p").textContent = showMore ? `Show less Casinos ` :
            `Show more Casinos `;
        button.querySelector("i").style.transform = showMore ? 'rotate(180deg)' :
            'rotate(0deg)';
        showMore = !showMore;
    });

    // accordion section

    var headers = document.querySelectorAll('.dropdown-container .clearfix');

    for (var i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', openCurrAccordion);
    }

    function openAccordion(e) {
        var parent = this.parentElement;
        var article = this.nextElementSibling;

        if (!parent.classList.contains('open')) {
            parent.classList.add('open');
            article.style.maxHeight = article.scrollHeight + 'px';
        } else {
            parent.classList.remove('open');
            article.style.maxHeight = '0px';
        }
    }

    function openCurrAccordion(e) {
        for (var i = 0; i < headers.length; i++) {
            var parent = headers[i].parentElement;
            var article = headers[i].nextElementSibling;

            if (this === headers[i] && !parent.classList.contains('open')) {
                parent.classList.add('open');
                article.style.maxHeight = article.scrollHeight + 'px';
            } else {
                parent.classList.remove('open');
                article.style.maxHeight = '0px';
            }
        }
    }


    // table of content
    const links = document.querySelectorAll('.table a');
    const sections = document.querySelectorAll(".table-answer-box .box[id]");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio >= 0.3) {
                document.querySelector(`.table a[href="#${id}"]`).classList.add(
                    'active');
            } else {
                document.querySelector(`.table a[href="#${id}"]`).classList.remove(
                    'active');
            }
        });
    }, {
        threshold: 0.3
    });

    // Track all sections that have an `id` applied
    sections.forEach((section) => {
        observer.observe(section);
    });

});




// Функція для відображення конкретного dropdown
function showDropdown(dropdownContent) {
    dropdownContent.classList.add('show');
    dropdownContent.previousElementSibling.classList.add('open');
}

// Функція для приховання всіх dropdown
function hideAllDropdowns() {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            openDropdown.previousElementSibling.classList.remove('open');
        }
    }
}

// Функція для синхронізації прапору
function syncFlags(flagSrc) {
    let flagElements = document.querySelectorAll('.selected-flag');
    flagElements.forEach(function (flagElement) {
        flagElement.src = flagSrc;
    });
}

// Функція для зміни прапору
function changeFlag(country, event) {
    event.preventDefault(); // Prevent the default action
    let flagSrc = `img/flags/${country.charAt(0).toUpperCase() + country.slice(1)}.svg`;
    syncFlags(flagSrc);
    hideAllDropdowns();
}

// Функція для зміни мови
function changeLang(language, event) {
    event.preventDefault(); // Prevent the default action
    let languageElements = document.querySelector('#language');
    languageElements.innerHTML = `${language}`;

}

// Додаємо обробники подій для всіх dropdown
document.querySelectorAll('.dropbtn').forEach(function (button) {
    button.addEventListener('mouseover', function () {
        let dropdownContent = this.nextElementSibling;
        showDropdown(dropdownContent);
    });
});

document.querySelectorAll('.dropdown-content').forEach(function (dropdown) {
    dropdown.addEventListener('mouseleave', function () {
        hideAllDropdowns();
    });
});

// Обробник кліку поза dropdown
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
        hideAllDropdowns();
    }
}

// Додаємо обробники подій для елементів dropdown
document.querySelectorAll('.dropdown-content a').forEach(function (item) {
    item.addEventListener('click', function (event) {
        changeFlag(this.getAttribute('data-country'), event);
        changeLang(this.getAttribute('data-language'), event);
    });
});







/* begin begin Back to Top button  */
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

document.addEventListener('DOMContentLoaded', function () {
    const goTopButton = document.querySelector('[data-action="gotop"]');
    const windowViewPortHeight = window.innerHeight; // browser viewport height
    let isRequestingAnimationFrame = false;

    if (!goTopButton) {
        return;
    }

    goTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (!isRequestingAnimationFrame) {
            requestAnimationFrame(filterGoTopButtonVisibility);
            isRequestingAnimationFrame = true;
        }
    });

    function filterGoTopButtonVisibility(timestamp) {
        let windowPageYOffset = window.pageYOffset || document.documentElement.scrollTop;
        if (windowPageYOffset > windowViewPortHeight) {
            goTopButton.classList.add('show');
            isRequestingAnimationFrame = false;
        } else {
            goTopButton.classList.remove('show');
            requestAnimationFrame(filterGoTopButtonVisibility);
        }
    }
})



/**
 * CLASS HELPERS
 * Plain JavaScript functions to add, remove, toggle, and check for classes, no jQuery required
 */

// hasClass
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// addClass
function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
    }
}

// removeClass
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// toggleClass
function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
            newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}



// Mobile navigation controls
var menuToggle = document.querySelector('.menu-toggle');
menuContainer = document.querySelector('.mobile-menu .navbar-nav');
navMenu = document.querySelector('.mobile-menu');
subMenu = menuContainer.querySelectorAll('.nav-item.dd');
content = document.querySelector('header .content')

// header .mobile-menu .navbar-nav .nav-link
// Toggle main menu and set WAI-ARIA values when menu button is clicked
menuToggle.onclick = function () {
    if (hasClass(menuContainer, 'toggled')) {
        removeClass(menuToggle, 'is-active');
        removeClass(menuContainer, 'toggled');
        addClass(navMenu, 'hide');
        removeClass(content, 'open');

        subMenu.forEach(menu => {
            if (hasClass(menu, 'open')) {
                removeClass(menu, 'open');
            }
        });

    } else {
        addClass(menuToggle, 'is-active');
        addClass(menuContainer, 'toggled');
        removeClass(navMenu, 'hide');
        addClass(content, 'open');
    }

};

subMenu.forEach(menu => {
    menu.querySelector('.nav-link').onclick = function () {
        if (hasClass(menu, 'open')) {
            removeClass(menu, 'open');

        } else {
            addClass(menu, 'open');
        }
    }
});



// slider

class Slider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.slides = this.slider.querySelector('.slides');
        this.slide = this.slider.querySelectorAll('.slide');
        this.pagination = this.slider.querySelector('.pagination');
        this.prevButton = this.slider.querySelector('.prev');
        this.nextButton = this.slider.querySelector('.next');
        this.index = 0;
        this.slidesCount = this.slide.length;

        this.updateSlidesPerView();

        this.createPagination();
        this.addEventListeners();
    }

    updateSlidesPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1131) {
            this.slidesPerView = parseInt(this.slider.getAttribute('data-slides-per-view-desktop'));
        } else if (screenWidth >= 768) {
            this.slidesPerView = parseInt(this.slider.getAttribute('data-slides-per-view-tablet'));
        } else {
            this.slidesPerView = parseInt(this.slider.getAttribute('data-slides-per-view-mobile'));
        }
    }

    createPagination() {
        const pageCount = Math.ceil(this.slidesCount / this.slidesPerView);

        this.pagination.innerHTML = '';
        for (let i = 0; i < pageCount; i++) {
            const button = document.createElement('button');
            if (i === 0) button.classList.add('active');
            this.pagination.appendChild(button);
        }

        this.pagButtons = this.pagination.querySelectorAll('button');
    }

    addEventListeners() {
        this.slider.addEventListener('mousedown', this.startDrag.bind(this));
        this.slider.addEventListener('mouseup', this.endDrag.bind(this));
        this.slider.addEventListener('mouseleave', this.cancelDrag.bind(this));
        this.slider.addEventListener('mousemove', this.drag.bind(this));

        this.slider.addEventListener('touchstart', this.startDrag.bind(this));
        this.slider.addEventListener('touchend', this.endDrag.bind(this));
        this.slider.addEventListener('touchmove', this.drag.bind(this));

        this.pagButtons.forEach((button, i) => {
            button.addEventListener('click', () => {
                this.index = i;
                this.updateSlider();
            });
        });

        this.prevButton.addEventListener('click', this.prevSlide.bind(this));
        this.nextButton.addEventListener('click', this.nextSlide.bind(this));

        window.addEventListener('resize', this.updatePagination.bind(this));
    }

    startDrag(e) {
        this.startX = e.pageX || e.touches[0].pageX;
        this.isDragging = true;
        this.slides.style.transition = 'none';
    }

    endDrag(e) {
        this.isDragging = false;
        const endX = e.pageX || e.changedTouches[0].pageX;
        this.handleSwipe(this.startX, endX);
        this.slides.style.transition = 'transform 0.5s ease-in-out';
    }

    cancelDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.slides.style.transition = 'transform 0.5s ease-in-out';
        }
    }

    drag(e) {
        if (!this.isDragging) return;
        const currentX = e.pageX || e.touches[0].pageX;
        const diffX = currentX - this.startX;
        const translateX = -((this.index * this.slider.clientWidth) / this.slidesPerView) + diffX;
        this.slides.style.transform = `translateX(${translateX}px)`;
    }

    handleSwipe(startX, endX) {
        const diffX = endX - startX;
        if (diffX > 50 && this.index > 0) {
            this.index--;
        } else if (diffX < -50 && this.index < Math.ceil(this.slidesCount / this.slidesPerView) - 1) {
            this.index++;
        }
        this.updateSlider();
    }

    updateSlider() {
        const translateX = -(this.index * 100) / this.slidesPerView;
        this.slides.style.transform = `translateX(${translateX}%)`;
        this.pagButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === this.index);
        });
    }

    prevSlide() {
        if (this.index > 0) {
            this.index--;
            this.updateSlider();
        }
    }

    nextSlide() {
        if (this.index < Math.ceil(this.slidesCount / this.slidesPerView) - 1) {
            this.index++;
            this.updateSlider();
        }
    }

    updatePagination() {
        this.updateSlidesPerView();
        this.createPagination();
        this.updateSlider();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => new Slider(slider));
});