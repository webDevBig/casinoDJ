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


function showDropdown(dropdownContent) {
    dropdownContent.classList.add('show');
    dropdownContent.previousElementSibling.classList.add('open');
}

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

function syncFlags(flagSrc) {
    let flagElements = document.querySelectorAll('.selected-flag');
    flagElements.forEach(function (flagElement) {
        flagElement.src = flagSrc;
    });
}

function changeFlag(country, event) {
    event.preventDefault(); 
    let flagSrc = `img/flags/${country.charAt(0).toUpperCase() + country.slice(1)}.svg`;
    syncFlags(flagSrc);
    hideAllDropdowns();
}

function changeLang(language, event) {
    event.preventDefault(); 
    let languageElements = document.querySelector('#language');
    languageElements.innerHTML = `${language}`;
}

document.querySelectorAll('.dropbtn').forEach(function (a) {
    a.addEventListener('mouseover', function () {
        let dropdownContent = this.nextElementSibling;
        showDropdown(dropdownContent);
    });
});

document.querySelectorAll('.dropdown-content').forEach(function (dropdown) {
    dropdown.addEventListener('mouseleave', function () {
        hideAllDropdowns();
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn *')) {
        hideAllDropdowns();
    }
}

document.querySelectorAll('.dropdown-content a').forEach(function (item) {
    item.addEventListener('click', function (event) {
        changeFlag(this.getAttribute('data-country'), event);
        changeLang(this.getAttribute('data-language'), event);
    });
});


document.querySelectorAll('.dropdown-content').forEach(function (dropdown) {
    dropdown.addEventListener('touchstart', function (event) {
        hideAllDropdowns();
        showDropdown(dropdown);
        event.stopPropagation();
    });
});

window.addEventListener('touchstart', function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
        hideAllDropdowns();
    }
});





/* begin begin Back to Top a  */
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

document.addEventListener('DOMContentLoaded', function () {
    const goTopa = document.querySelector('[data-action="gotop"]');
    const windowViewPortHeight = window.innerHeight; // browser viewport height
    let isRequestingAnimationFrame = false;

    if (!goTopa) {
        return;
    }

    goTopa.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (!isRequestingAnimationFrame) {
            requestAnimationFrame(filterGoTopaVisibility);
            isRequestingAnimationFrame = true;
        }
    });

    function filterGoTopaVisibility(timestamp) {
        let windowPageYOffset = window.pageYOffset || document.documentElement.scrollTop;
        if (windowPageYOffset > windowViewPortHeight) {
            goTopa.classList.add('show');
            isRequestingAnimationFrame = false;
        } else {
            goTopa.classList.remove('show');
            requestAnimationFrame(filterGoTopaVisibility);
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
// Toggle main menu and set WAI-ARIA values when menu a is clicked
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
        this.preva = this.slider.querySelector('.prev');
        this.nexta = this.slider.querySelector('.next');
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
            const a = document.createElement('a');
            if (i === 0) a.classList.add('active');
            this.pagination.appendChild(a);
        }

        this.pagas = this.pagination.querySelectorAll('a');
    }

    addEventListeners() {
        this.slider.addEventListener('mousedown', this.startDrag.bind(this));
        this.slider.addEventListener('mouseup', this.endDrag.bind(this));
        this.slider.addEventListener('mouseleave', this.cancelDrag.bind(this));
        this.slider.addEventListener('mousemove', this.drag.bind(this));

        this.slider.addEventListener('touchstart', this.startDrag.bind(this));
        this.slider.addEventListener('touchend', this.endDrag.bind(this));
        this.slider.addEventListener('touchmove', this.drag.bind(this));

        this.pagas.forEach((a, i) => {
            a.addEventListener('click', () => {
                this.index = i;
                this.updateSlider();
            });
        });

        this.preva.addEventListener('click', this.prevSlide.bind(this));
        this.nexta.addEventListener('click', this.nextSlide.bind(this));

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
        this.pagas.forEach((btn, i) => {
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





document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.popup-slider .slide img');
 
    var popup = document.getElementById('popup');
    var popupImg = document.getElementById('popup-img');
    var popupClose = document.querySelector('.popup-close');
 
    function openPopup(event) {
        popup.style.display = 'flex';
        popupImg.src = event.target.src;
    }
  
    slides.forEach(function(slide) {
        slide.addEventListener('click', openPopup);
    });

    function closePopup() {
        popup.style.display = 'none';
    }
  
    popupClose.addEventListener('click', closePopup);

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            closePopup();
        }
    });
});

