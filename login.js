const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('loginMessage');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    const isPasswordVisible = passwordInput.type === 'text';
    passwordInput.type = isPasswordVisible ? 'password' : 'text';
    togglePassword.querySelector('i').className = isPasswordVisible
        ? 'bi bi-eye'
        : 'bi bi-eye-slash';
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    loginMessage.classList.remove('d-none', 'alert-success', 'alert-danger');

    if (usernameInput.value !== 'admin' || passwordInput.value !== '1234') {
        loginMessage.classList.add('alert-danger');
        loginMessage.textContent = 'Credenciales incorrectas. Usa admin / 1234 para probar la demo.';
        usernameInput.focus();
        return;
    }

    loginMessage.classList.add('alert-success');
    loginMessage.textContent = 'Inicio de sesión aprobado.';
});