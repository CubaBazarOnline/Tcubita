document.addEventListener('DOMContentLoaded', () => {
    // Mejoras de experiencia de usuario
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Efecto de carga progresiva para imágenes (si se añaden en el futuro)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Cargar polyfill para lazy loading si es necesario
    }
    
    // Manejo del botón de descarga
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animación de clic
            downloadBtn.classList.add('active');
            setTimeout(() => {
                downloadBtn.classList.remove('active');
            }, 300);
            
            // Mostrar mensaje
            showToast('La aplicación estará disponible pronto. ¡Gracias por tu interés!');
        });
    }
    
    // Intersection Observer para animaciones
    const animateElements = document.querySelectorAll('.animate-fade');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Detección de conexión
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    function updateNetworkStatus() {
        if (!navigator.onLine) {
            showToast('Estás sin conexión. Algunas funciones pueden no estar disponibles.');
        }
    }
    
    // Función para mostrar toasts
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Añadir estilos dinámicos para el toast
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 90%;
            text-align: center;
        }
        
        .toast-message.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(toastStyles);
    
    // Service Worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
    
    // Web Share API
    if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn-primary';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Compartir';
        shareBtn.style.marginLeft = '10px';
        
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Tcubita',
                    text: 'Descubre Tcubita, la plataforma para emprendedores cubanos',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error al compartir:', err);
            }
        });
        
        const ctaSection = document.querySelector('.cta .container > div');
        if (ctaSection) {
            ctaSection.appendChild(shareBtn);
        }
    }
    
    // Mejorar accesibilidad del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
});

// Añadir estilos para navegación con teclado
const keyboardNavStyles = document.createElement('style');
keyboardNavStyles.textContent = `
    .keyboard-nav a:focus,
    .keyboard-nav button:focus {
        outline: 3px solid var(--holographic-green);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardNavStyles);