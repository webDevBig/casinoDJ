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
    const a = document.getElementById('show-more');
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

    a.addEventListener('click', () => {
        sites.forEach((site, index) => {
            if (index >= 5) {
                if (showMore) {
                    site.classList.remove('hidden');
                } else {
                    site.classList.add('hidden');
                }
            }
        });
        a.querySelector("p").textContent = showMore ? `Show less Casinos ` :
            `Show more Casinos `;
        a.querySelector("i").style.transform = showMore ? 'rotate(180deg)' :
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