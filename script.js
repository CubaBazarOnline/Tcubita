// Puedes agregar funcionalidad JavaScript aquí si es necesario
// Por ejemplo, para hacer el scroll suave al hacer clic en los enlaces del menú

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});

// También puedes agregar efectos adicionales o interacciones
document.addEventListener('DOMContentLoaded', function() {
    // Efecto de aparición gradual para las tarjetas
    const cards = document.querySelectorAll('.card, .feature, .tool-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index);
    });
});