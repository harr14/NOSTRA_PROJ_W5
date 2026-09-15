// ===== DOM ELEMENTS =====
const offerBar = document.getElementById('offerBar');
const offerClose = document.getElementById('offerClose');
const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');
const mobileShopButton = document.getElementById('mobileShopButton');
const mobileShopLinks = document.getElementById('mobileShopLinks');
const searchButton = document.getElementById('searchButton');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

// ===== CART =====
let cart = JSON.parse(localStorage.getItem('nostraCart')) || [];

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== OFFER BAR =====
offerClose.addEventListener('click', () => {
    offerBar.style.display = 'none';
});

// ===== MOBILE MENU =====
menuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Mobile shop dropdown
mobileShopButton.addEventListener('click', () => {
    mobileShopLinks.classList.toggle('active');
});

// ===== SEARCH OVERLAY =====
searchButton.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.getElementById('largeSearchInput').focus();
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

// ===== HERO SLIDER =====
const heroImages = [
    './img/mark-broadhead-woY16fVpZ6s-unsplash.jpg',
    './img/trendy.jpg',
    './img/jk.ck.jpg'
];

let currentSlide = 0;
const heroImage = document.getElementById('heroImage');
const heroDots = document.querySelectorAll('.hero-dot');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');

function showSlide(index) {
    currentSlide = (index + heroImages.length) % heroImages.length;
    heroImage.src = heroImages[currentSlide];
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

heroPrev.addEventListener('click', () => showSlide(currentSlide - 1));
heroNext.addEventListener('click', () => showSlide(currentSlide + 1));

heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
        showSlide(parseInt(dot.dataset.slide));
    });
});

// Auto slide
setInterval(() => showSlide(currentSlide + 1), 5000);

// ===== ADD TO CART =====
document.querySelectorAll('.add-cart-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const name = card.dataset.name;
        const price = card.dataset.price;

        cart.push({ name, price });
        localStorage.setItem('nostraCart', JSON.stringify(cart));
        updateCartCount();
        showToast(`${name} added to cart`);
    });
});

// ===== WISHLIST =====
document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const icon = button.querySelector('i');
        if (button.classList.contains('active')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            showToast('Added to wishlist');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            showToast('Removed from wishlist');
        }
    });
});

// ===== NEWSLETTER =====
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    newsletterMessage.textContent = `Thank you! ${email} has been subscribed.`;
    newsletterForm.reset();
    setTimeout(() => {
        newsletterMessage.textContent = '';
    }, 4000);
});

// ===== INIT =====
updateCartCount();