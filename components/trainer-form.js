/**
 * Reusable Trainer Registration Form Component
 */

const TrainerFormStyles = `
<style>
    /* Reuse the same modal styles for consistency */
    .trainer-modal-overlay {
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

    .trainer-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .trainer-modal-content {
        background: rgba(255, 255, 255, 0.95);
        width: 100%;
        max-width: 600px;
        border-radius: 24px;
        padding: 2.5rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        transform: translateY(20px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-height: 90vh;
        overflow-y: auto;
    }

    .trainer-modal-overlay.active .trainer-modal-content {
        transform: translateY(0) scale(1);
    }

    /* ... shared form styles can be global or scoped. I'll scope here for safety */
    .trainer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .trainer-header h2 {
        font-size: 1.5rem;
        color: var(--primary);
        font-weight: 700;
        margin-bottom: 0.25rem;
    }
    
    .trainer-header p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
    }

    .form-group.full-width {
        grid-column: 1 / -1;
    }

    .form-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-left: 0.25rem;
        margin-bottom: 0.5rem;
        display: block;
    }

    .form-input {
        width: 100%;
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
</style>
`;

const TrainerFormHTML = `
<div class="trainer-modal-overlay" id="trainer-modal">
    <div class="trainer-modal-content">
        <div class="trainer-header">
            <div>
                <h2>Add New Trainer</h2>
                <p>Register a new instructor to the studio roster.</p>
            </div>
            <button class="close-btn" id="close-trainer-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="trainer-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" placeholder="e.g. Sarah Connor" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" placeholder="sarah@example.com" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Primary Specialization</label>
                    <select class="form-input">
                        <option value="hatha">Hatha Yoga</option>
                        <option value="vinyasa">Vinyasa Flow</option>
                        <option value="ashtanga">Ashtanga</option>
                        <option value="yin">Yin Yoga</option>
                        <option value="meditation">Meditation</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Experience (Years)</label>
                    <input type="number" class="form-input" placeholder="e.g. 5" min="0">
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Bio / Profile Description</label>
                    <textarea class="form-input" style="min-height: 100px; resize: vertical;" placeholder="Brief introduction..."></textarea>
                </div>
                
                <div class="form-group full-width">
                    <label class="form-label">Profile Image URL</label>
                    <input type="url" class="form-input" placeholder="https://...">
                </div>
            </div>

            <div class="modal-footer" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                <button type="button" class="btn btn-secondary" id="cancel-trainer-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Save Trainer
                </button>
            </div>
        </form>
    </div>
</div>
`;

class TrainerForm {
    constructor() {
        this.init();
    }

    init() {
        if (!document.getElementById('trainer-modal')) {
            document.body.insertAdjacentHTML('beforeend', TrainerFormStyles + TrainerFormHTML);
        }

        this.modal = document.getElementById('trainer-modal');
        this.openBtn = document.getElementById('add-trainer-btn');
        this.closeBtn = document.getElementById('close-trainer-modal');
        this.cancelBtn = document.getElementById('cancel-trainer-modal');
        this.form = document.getElementById('trainer-form');

        this.bindEvents();
    }

    bindEvents() {
        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }

        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
        if (this.cancelBtn) this.cancelBtn.addEventListener('click', () => this.close());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleSubmit() {
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Saving...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Trainer added successfully!');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TrainerForm();
});
