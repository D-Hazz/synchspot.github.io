const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const container = document.querySelector('.container');
const mainContent = document.querySelector('.main-content');
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header-title');
const posts = document.querySelectorAll('.post');
const postTexts = document.querySelectorAll('.post-text');
const postAuthors = document.querySelectorAll('.post-author');
const postTimes = document.querySelectorAll('.post-time');
const postActionsButtons = document.querySelectorAll('.post-actions button');
const bottomNav = document.querySelector('.bottom-nav');
const postOptionsButtons = document.querySelectorAll('.post-options button');
const commentInput = document.getElementById('comment-input');
const emojiButton = document.getElementById('emoji-button');
const emojiPicker = document.getElementById('emoji-picker');
const emojiPickerButtons = emojiPicker.querySelectorAll('button');
const sendButton = document.querySelector('.send-button');

// Gestion du modal de recherche
const searchToggleMobile = document.getElementById('search-toggle-mobile');
const searchModal = document.getElementById('search-modal');
const searchCloseButton = document.getElementById('search-close-button');
const searchInputModal = document.querySelector('.search-input-modal');
const searchBarDesktopInput = document.querySelector('.search-bar-desktop input');

searchToggleMobile.addEventListener('click', () => {
    searchModal.classList.add('show');
    searchInputModal.focus();
});

searchCloseButton.addEventListener('click', () => {
    searchModal.classList.remove('show');
});

window.addEventListener('click', (event) => {
    if (event.target === searchModal) {
        searchModal.classList.remove('show');
    }
});

// Gestion de la carte de notifications
const notificationsButton = document.getElementById('notifications-button');
const notificationCard = document.getElementById('notification-card');

notificationsButton.addEventListener('click', () => {
    notificationCard.classList.toggle('show');
});

window.addEventListener('click', (event) => {
    if (event.target !== notificationsButton && !notificationCard.contains(event.target)) {
        notificationCard.classList.remove('show');
    }
});

// Fonctions pour le thème sombre
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

function setTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark');
    container.classList.toggle('dark-mode', theme === 'dark');
    mainContent.classList.toggle('dark-mode', theme === 'dark');
    header.classList.toggle('dark-mode', theme === 'dark');
    headerTitle.classList.toggle('dark-mode', theme === 'dark');
    posts.forEach(post => post.classList.toggle('dark-mode', theme === 'dark'));
    postTexts.forEach(postText => postText.classList.toggle('dark-mode', theme === 'dark'));
    postAuthors.forEach(postAuthor => postAuthor.classList.toggle('dark-mode', theme === 'dark'));
    postTimes.forEach(postTime => postTime.classList.toggle('dark-mode', theme === 'dark'));
    postActionsButtons.forEach(button => button.classList.toggle('dark-mode', theme === 'dark'));
    bottomNav.classList.toggle('dark-mode', theme === 'dark');
    postOptionsButtons.forEach(button => button.classList.toggle('dark-mode', theme === 'dark'));
    commentInput.classList.toggle('dark-mode', theme === 'dark');
    sendButton.classList.toggle('dark-mode', theme === 'dark');
    if (searchBarDesktopInput) {
        searchBarDesktopInput.classList.toggle('dark-mode', theme === 'dark');
    }
    searchInputModal.classList.toggle('dark-mode', theme === 'dark');
    const searchModalContent = document.querySelector('.search-modal-content');
    if (searchModalContent) {
        searchModalContent.classList.toggle('dark-mode', theme === 'dark');
    }
    const searchCloseButtonElement = document.getElementById('search-close-button');
    if (searchCloseButtonElement) {
        searchCloseButtonElement.classList.toggle('dark-mode', theme === 'dark');
    }
    notificationCard.classList.toggle('dark-mode', theme === 'dark');
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => item.classList.toggle('dark-mode', theme === 'dark'));
    const notificationItemParagraphs = document.querySelectorAll('.notification-item p');
    notificationItemParagraphs.forEach(p => p.classList.toggle('dark-mode', theme === 'dark'));


    const sunIcon = themeToggle.querySelector('i.fa-sun');
    const moonIcon = themeToggle.querySelector('i.fa-moon');

    if (theme === 'dark') {
        if (sunIcon) sunIcon.classList.remove('fa-sun');
        if (!moonIcon) {
            const newMoonIcon = document.createElement('i');
            newMoonIcon.classList.add('fas', 'fa-moon');
            themeToggle.appendChild(newMoonIcon);
        }
    } else {
        if (moonIcon) moonIcon.classList.remove('fa-moon');
        if (!sunIcon) {
            const newSunIcon = document.createElement('i');
            newSunIcon.classList.add('fas', 'fa-sun');
            themeToggle.appendChild(newSunIcon);
        }
    }
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    saveTheme(newTheme);
});

emojiButton.addEventListener('click', (event) => {
    event.stopPropagation();
    emojiPicker.classList.toggle('show');
});

emojiPickerButtons.forEach(emoji => {
    emoji.addEventListener('click', (event) => {
        commentInput.value += event.target.textContent;
        commentInput.focus();
        emojiPicker.classList.remove('show');
    });
});
sendButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText) {
        // Logique pour envoyer le commentaire
        console.log('Commentaire envoyé:', commentText);
        commentInput.value = '';
    }
});
// Fermer le sélecteur d'emoji si l'utilisateur clique en dehors
document.addEventListener('click', (event) => {
    if (!emojiPicker.contains(event.target) && event.target !== emojiButton) {
        emojiPicker.classList.remove('show');
    }
});

// Load the theme on page load
loadTheme();