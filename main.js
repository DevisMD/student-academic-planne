document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Strive for progress, not perfection.",
        "The expert in anything was once a beginner.",
        "Your limitation—it's only your imagination.",
        "Push yourself, because no one else is going to do it for you.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson"
    ];

    const quoteElement = document.getElementById('motivational-quote');
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }

    // Active navigation link highlighting for HOME page
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === './') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});