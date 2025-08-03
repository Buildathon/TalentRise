// Funcionalidades principales de la aplicación móvil
class MobileApp {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.userData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAnimations();
        this.loadUserData();
        this.setupSearch();
    }

    setupEventListeners() {
        // Navegación entre pantallas
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-screen]')) {
                const screenId = e.target.getAttribute('data-screen');
                this.showScreen(screenId);
            }
        });

        // Formularios
        const registerForm = document.getElementById('register-form');
        const loginForm = document.getElementById('login-form');

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Validación en tiempo real
        this.setupRealTimeValidation();
    }

    showScreen(screenId) {
        // Ocultar todas las pantallas
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.animation = 'none';
        });
        
        // Mostrar la pantalla seleccionada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.style.animation = 'fadeIn 0.5s ease';
            this.currentScreen = screenId;
        }

        // Actualizar navegación si es necesario
        this.updateNavigation(screenId);
    }

    updateNavigation(screenId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            
            // Determinar qué nav item debe estar activo
            if (screenId === 'main-screen' || screenId === 'profile-screen') {
                if (screenId === 'profile-screen' && item.textContent.includes('Perfil')) {
                    item.classList.add('active');
                } else if (screenId === 'main-screen' && !item.textContent.includes('Perfil')) {
                    item.classList.add('active');
                }
            }
        });
    }

    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            fullname: formData.get('fullname') || document.getElementById('fullname')?.value,
            email: formData.get('email') || document.getElementById('email')?.value,
            password: formData.get('password') || document.getElementById('password')?.value,
            confirmPassword: formData.get('confirm-password') || document.getElementById('confirm-password')?.value
        };

        if (this.validateRegistration(userData)) {
            this.registerUser(userData);
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email') || document.getElementById('login-email')?.value,
            password: formData.get('password') || document.getElementById('login-password')?.value
        };

        if (this.validateLogin(loginData)) {
            this.loginUser(loginData);
        }
    }

    validateRegistration(userData) {
        const errors = [];

        if (!userData.fullname || userData.fullname.length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!userData.email || !this.isValidEmail(userData.email)) {
            errors.push('Ingresa un email válido');
        }

        if (!userData.password || userData.password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres');
        }

        if (userData.password !== userData.confirmPassword) {
            errors.push('Las contraseñas no coinciden');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('\n'), 'error');
            return false;
        }

        return true;
    }

    validateLogin(loginData) {
        const errors = [];

        if (!loginData.email || !this.isValidEmail(loginData.email)) {
            errors.push('Ingresa un email válido');
        }

        if (!loginData.password || loginData.password.length < 1) {
            errors.push('Ingresa tu contraseña');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('\n'), 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    registerUser(userData) {
        // Simular registro exitoso
        this.showNotification('¡Cuenta creada exitosamente!', 'success');
        
        // Guardar datos del usuario
        this.userData = {
            fullname: userData.fullname,
            email: userData.email,
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(this.userData));
        
        // Redirigir a pantalla principal
        setTimeout(() => {
            this.showScreen('main-screen');
            this.updateUserInterface();
        }, 1500);
    }

    loginUser(loginData) {
        // Simular login exitoso
        this.showNotification('¡Inicio de sesión exitoso!', 'success');
        
        // Cargar datos del usuario (simulado)
        this.userData = {
            fullname: 'Usuario Ejemplo',
            email: loginData.email,
            lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(this.userData));
        
        // Redirigir a pantalla principal
        setTimeout(() => {
            this.showScreen('main-screen');
            this.updateUserInterface();
        }, 1500);
    }

    loadUserData() {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            this.userData = JSON.parse(savedUserData);
            this.updateUserInterface();
        }
    }

    updateUserInterface() {
        if (this.userData) {
            // Actualizar nombre de usuario en la pantalla principal
            const userNameElement = document.querySelector('.main-header h2');
            if (userNameElement) {
                userNameElement.textContent = `¡Hola, ${this.userData.fullname}!`;
            }

            // Actualizar información del perfil
            const profileNameElement = document.querySelector('.profile-info h3');
            const profileEmailElement = document.querySelector('.profile-info p');
            
            if (profileNameElement) {
                profileNameElement.textContent = this.userData.fullname;
            }
            if (profileEmailElement) {
                profileEmailElement.textContent = this.userData.email;
            }
        }
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const fieldType = input.type;
        const fieldName = input.id;

        let isValid = true;
        let errorMessage = '';

        switch (fieldType) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido';
                }
                break;
            case 'password':
                if (value && value.length < 8) {
                    isValid = false;
                    errorMessage = 'Mínimo 8 caracteres';
                }
                break;
            case 'text':
                if (fieldName === 'fullname' && value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Mínimo 2 caracteres';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(input, errorMessage);
        } else {
            this.clearFieldError(input);
        }
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }

    clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '#e1e5e9';
    }

    showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            z-index: 1000;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupAnimations() {
        // Agregar estilos CSS para animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    // Funcionalidades adicionales
    logout() {
        localStorage.removeItem('userData');
        this.userData = null;
        this.showScreen('welcome-screen');
        this.showNotification('Sesión cerrada exitosamente', 'info');
    }

    updateProfile(profileData) {
        if (this.userData) {
            this.userData = { ...this.userData, ...profileData };
            localStorage.setItem('userData', JSON.stringify(this.userData));
            this.updateUserInterface();
            this.showNotification('Perfil actualizado exitosamente', 'success');
        }
    }

    // Nuevas funcionalidades
    connectWallet(walletType) {
        const walletNames = {
            'metamask': 'MetaMask',
            'walletconnect': 'WalletConnect',
            'coinbase': 'Coinbase Wallet'
        };

        this.showNotification(`Conectando a ${walletNames[walletType]}...`, 'info');
        
        // Simular conexión de wallet
        setTimeout(() => {
            this.showNotification(`¡${walletNames[walletType]} conectado exitosamente!`, 'success');
            this.showScreen('profile-screen');
        }, 2000);
    }

    showPersonDetail(personId) {
        const people = {
            'maria-garcia': {
                name: 'María García',
                username: '@mariagarcia',
                avatar: '👩‍🎨',
                followers: '15.2K',
                posts: '234',
                following: '1.2K',
                bio: 'Artista digital apasionada por el diseño y la creatividad. Comparto mi proceso creativo y mis mejores trabajos con la comunidad. ¡Siempre aprendiendo y creciendo!'
            },
            'carlos-rodriguez': {
                name: 'Carlos Rodríguez',
                username: '@carlosrodriguez',
                avatar: '👨‍💻',
                followers: '12.8K',
                posts: '189',
                following: '890',
                bio: 'Desarrollador web y creador de contenido tecnológico. Comparto tutoriales y tips para programadores.'
            },
            'ana-martinez': {
                name: 'Ana Martínez',
                username: '@anamartinez',
                avatar: '👩‍🎭',
                followers: '10.5K',
                posts: '156',
                following: '1.5K',
                bio: 'Actriz y creadora de contenido teatral. Amante del arte escénico y la expresión corporal.'
            },
            'luis-perez': {
                name: 'Luis Pérez',
                username: '@luisperez',
                avatar: '👨‍🎵',
                followers: '9.3K',
                posts: '142',
                following: '756',
                bio: 'Músico y compositor. Creo música electrónica y comparto mis composiciones con la comunidad.'
            },
            'sofia-lopez': {
                name: 'Sofía López',
                username: '@sofialopez',
                avatar: '👩‍🎪',
                followers: '8.7K',
                posts: '98',
                following: '432',
                bio: 'Artista circense y acróbata. Comparto mi pasión por el circo y las artes escénicas.'
            }
        };

        const person = people[personId];
        if (person) {
            // Actualizar información en la pantalla de detalle
            const avatarElement = document.querySelector('.person-avatar');
            const nameElement = document.querySelector('.person-info h3');
            const usernameElement = document.querySelector('.person-info p');
            const followersElement = document.querySelector('.stat-number');
            const postsElement = document.querySelectorAll('.stat-number')[1];
            const followingElement = document.querySelectorAll('.stat-number')[2];
            const bioElement = document.querySelector('.person-bio');

            if (avatarElement) avatarElement.textContent = person.avatar;
            if (nameElement) nameElement.textContent = person.name;
            if (usernameElement) usernameElement.textContent = person.username;
            if (followersElement) followersElement.textContent = person.followers;
            if (postsElement) postsElement.textContent = person.posts;
            if (followingElement) followingElement.textContent = person.following;
            if (bioElement) bioElement.textContent = person.bio;

            this.showScreen('person-detail-screen');
        }
    }

    // Funcionalidad del bot de ayuda
    toggleBotChat() {
        const botChat = document.getElementById('bot-chat');
        if (botChat) {
            const isVisible = botChat.style.display === 'block';
            botChat.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                this.addBotMessage('¿En qué puedo ayudarte? Puedes preguntarme sobre:\n• Cómo usar la app\n• Conectar tu wallet\n• Buscar personas\n• Configurar notificaciones');
            }
        }
    }

    addBotMessage(message) {
        const botMessages = document.getElementById('bot-messages');
        if (botMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'bot-message';
            messageDiv.textContent = message;
            botMessages.appendChild(messageDiv);
            botMessages.scrollTop = botMessages.scrollHeight;
        }
    }

    // Funcionalidad de búsqueda
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterRanking(e.target.value);
            });
        }
    }

    filterRanking(searchTerm) {
        const rankingItems = document.querySelectorAll('.ranking-item');
        const searchLower = searchTerm.toLowerCase();

        rankingItems.forEach(item => {
            const nameElement = item.querySelector('.ranking-name');
            if (nameElement) {
                const name = nameElement.textContent.toLowerCase();
                if (name.includes(searchLower)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.mobileApp = new MobileApp();
});

// Funciones globales para compatibilidad con el HTML
function showScreen(screenId) {
    if (window.mobileApp) {
        window.mobileApp.showScreen(screenId);
    }
}

function setActiveNav(element) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

// Nuevas funciones globales
function connectWallet(walletType) {
    if (window.mobileApp) {
        window.mobileApp.connectWallet(walletType);
    }
}

function showPersonDetail(personId) {
    if (window.mobileApp) {
        window.mobileApp.showPersonDetail(personId);
    }
}

function toggleBotChat() {
    if (window.mobileApp) {
        window.mobileApp.toggleBotChat();
    }
} 