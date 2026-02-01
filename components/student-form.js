/**
 * Reusable Student Registration Form Component
 * Handles the creation, styling, and logic for the registration modal.
 */

const StudentFormStyles = `
<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background: rgba(255, 255, 255, 0.95);
        width: 100%;
        max-width: 550px;
        border-radius: 24px;
        padding: 2.5rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        transform: translateY(20px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-overlay.active .modal-content {
        transform: translateY(0) scale(1);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .modal-title h2 {
        font-size: 1.5rem;
        color: var(--primary);
        font-weight: 700;
        letter-spacing: -0.5px;
        margin-bottom: 0.25rem;
    }

    .modal-title p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .close-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        background: rgba(0,0,0,0.05);
        color: var(--text-primary);
        transform: rotate(90deg);
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form-group.full-width {
        grid-column: 1 / -1;
    }

    .form-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-left: 0.25rem;
    }

    .form-input {
        background: var(--bg-dark);
        border: 1px solid var(--glass-border);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-size: 0.95rem;
        color: var(--text-primary);
        transition: all 0.2s;
        outline: none;
    }

    .form-input:focus {
        border-color: var(--primary);
        background: white;
        box-shadow: 0 0 0 4px rgba(74, 108, 86, 0.1);
    }

    textarea.form-input {
        min-height: 100px;
        resize: vertical;
    }

    .modal-footer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--glass-border);
    }

    /* Animation for inputs */
    .form-group {
        animation: slideUp 0.4s ease forwards;
        opacity: 0;
        transform: translateY(10px);
    }

    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-group:nth-child(1) { animation-delay: 0.1s; }
    .form-group:nth-child(2) { animation-delay: 0.15s; }
    .form-group:nth-child(3) { animation-delay: 0.2s; }
    .form-group:nth-child(4) { animation-delay: 0.25s; }
    .form-group:nth-child(5) { animation-delay: 0.3s; }
</style>
`;

const StudentFormHTML = `
<div class="modal-overlay" id="student-modal">
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-title">
                <h2>New Student</h2>
                <p>Register a new member to the studio</p>
            </div>
            <button class="close-btn" id="close-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="registration-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" placeholder="e.g. Jane Doe" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" placeholder="jane@example.com" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Membership Plan</label>
                    <select class="form-input">
                        <option value="monthly">Monthly Pass</option>
                        <option value="silver">Silver Monthly</option>
                        <option value="gold">Gold Annual</option>
                        <option value="dropin">Drop-in Session</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="date" class="form-input" required>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Notes (Optional)</label>
                    <textarea class="form-input" placeholder="Any medical conditions or special requests..."></textarea>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Register Student
                </button>
            </div>
        </form>
    </div>
</div>
`;

class StudentRegistrationForm {
    constructor() {
        this.init();
    }

    init() {
        // Inject Styles and HTML
        document.body.insertAdjacentHTML('beforeend', StudentFormStyles + StudentFormHTML);

        // Cache DOM elements
        this.modal = document.getElementById('student-modal');
        this.openBtn = document.getElementById('register-student-btn');
        this.closeBtn = document.getElementById('close-modal');
        this.cancelBtn = document.getElementById('cancel-modal');
        this.form = document.getElementById('registration-form');

        // Bind Events
        this.bindEvents();

        // Set default date to today
        const dateInput = this.modal.querySelector('input[type="date"]');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
    }

    bindEvents() {
        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }

        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.cancelBtn) this.cancelBtn.addEventListener('click', () => this.close());

        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Handle Form Submit
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleSubmit() {
        // Here you would typically gather data and send to backend
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        // Show loading state
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Registering...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Student registered successfully!');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StudentRegistrationForm();
});
