document.addEventListener('DOMContentLoaded', function() {
    // Cambiar entre demos
    const demoButtons = document.querySelectorAll('.demo-btn');
    const checkoutForms = document.querySelectorAll('.checkout-form');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const demo = this.getAttribute('data-demo');
            
            // Actualizar botones activos
            demoButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar el formulario correspondiente
            checkoutForms.forEach(form => form.classList.remove('visible'));
            document.getElementById(`${demo}-checkout`).classList.add('visible');
        });
    });
    
    // Mostrar el primer demo por defecto
    document.querySelector('.demo-btn[data-demo="bad"]').click();
    
    // Formulario MALO - No hay validaciones
    const badForm = document.getElementById('bad-checkout');
    badForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessModal();
    });
    
    // Formulario BUENO - Acordeón
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            accordion.classList.toggle('active');
        });
    });
    
    // Activar el primer paso
    document.querySelector('.accordion').classList.add('active');
    
    // Navegación entre pasos
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentAccordion = this.closest('.accordion');
            const nextAccordion = currentAccordion.nextElementSibling;
            
            if (nextAccordion && nextAccordion.classList.contains('accordion')) {
                currentAccordion.classList.remove('active');
                nextAccordion.classList.add('active');
                
                // Desplazar a la vista
                nextAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentAccordion = this.closest('.accordion');
            const prevAccordion = currentAccordion.previousElementSibling;
            
            if (prevAccordion && prevAccordion.classList.contains('accordion')) {
                currentAccordion.classList.remove('active');
                prevAccordion.classList.add('active');
                
                // Desplazar a la vista
                prevAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Métodos de pago
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.getAttribute('data-method');
            
            // Actualizar selección
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar detalles correspondientes
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            document.getElementById(`${methodType}-payment`).style.display = 'block';
        });
    });
    
    // Enviar formulario BUENO
    const goodForm = document.getElementById('good-checkout');
    goodForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessModal();
    });
    
    // Formulario MINIMALISTA
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const guestForm = document.getElementById('guest-form');
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        guestForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
    
    document.getElementById('continue-guest').addEventListener('click', function() {
        loginForm.style.display = 'none';
        guestForm.style.display = 'block';
    });
    
    // Navegación por pasos
    const nextSteps = document.querySelectorAll('.next-step');
    const prevSteps = document.querySelectorAll('.prev-step');
    
    nextSteps.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            const currentStep = this.closest('.form-step');
            
            currentStep.style.display = 'none';
            document.querySelector(`.form-step[data-step="${nextStep}"]`).style.display = 'block';
        });
    });
    
    prevSteps.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = this.getAttribute('data-prev');
            const currentStep = this.closest('.form-step');
            
            currentStep.style.display = 'none';
            document.querySelector(`.form-step[data-step="${prevStep}"]`).style.display = 'block';
        });
    });
    
    // Métodos de pago minimalista
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const paymentType = this.getAttribute('data-payment');
            
            // Actualizar selección
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar detalles correspondientes
            document.querySelectorAll('#guest-form .payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            document.getElementById(`minimal-${paymentType}`).style.display = 'block';
        });
    });
    
    // Enviar formulario minimalista
    const minimalForm = document.getElementById('minimal-checkout');
    minimalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessModal();
    });
    
    // Modal de éxito
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const confettiBtn = document.getElementById('confetti-btn');
    
    function showSuccessModal() {
        successModal.style.display = 'flex';
    }
    
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    confettiBtn.addEventListener('click', function() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Máscaras para inputs (simulación básica)
    document.querySelectorAll('[data-mask]').forEach(input => {
        input.addEventListener('input', function() {
            const mask = this.getAttribute('data-mask');
            const value = this.value.replace(/\D/g, '');
            let maskedValue = '';
            let valueIndex = 0;
            
            for (let i = 0; i < mask.length; i++) {
                if (mask[i] === '0') {
                    if (value[valueIndex]) {
                        maskedValue += value[valueIndex];
                        valueIndex++;
                    } else {
                        break;
                    }
                } else {
                    maskedValue += mask[i];
                }
            }
            
            this.value = maskedValue;
        });
    });
});
