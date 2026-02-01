/**
 * Reusable Membership Plan Form Component
 */

const MembershipFormStyles = `
<style>
    .membership-modal-overlay {
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

    .membership-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .membership-modal-content {
        background: rgba(255, 255, 255, 0.95);
        width: 100%;
        max-width: 500px;
        border-radius: 24px;
        padding: 2.5rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        transform: translateY(20px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        max-height: 90vh;
        overflow-y: auto;
    }

    .membership-modal-overlay.active .membership-modal-content {
        transform: translateY(0) scale(1);
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

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
    }

    .form-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-left: 0.25rem;
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

    textarea.form-input {
        min-height: 100px;
        resize: vertical;
    }
</style>
`;

const MembershipFormHTML = `
<div class="membership-modal-overlay" id="membership-modal">
    <div class="membership-modal-content">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
                <h2 style="font-size: 1.5rem; color: var(--primary); font-weight: 700; margin-bottom: 0.25rem;">New Membership Plan</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Create a new subscription tier.</p>
            </div>
            <button class="close-btn" id="close-membership-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="membership-form">
            <div class="form-grid" style="grid-template-columns: 1fr;"> <!-- Single column for simple form -->
                <div class="form-group">
                    <label class="form-label">Plan Name</label>
                    <input type="text" class="form-input" placeholder="e.g. Diamond Unlimited" required>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label class="form-label">Price</label>
                        <div style="position: relative;">
                            <span style="position: absolute; left: 1rem; top: 0.75rem; color: var(--text-secondary);">$</span>
                            <input type="number" class="form-input" style="padding-left: 2rem;" placeholder="0.00" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Billing Cycle</label>
                        <select class="form-input">
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                            <option value="one-time">One-time</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Color Theme</label>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                        <input type="radio" name="color" value="primary" checked style="accent-color: var(--primary);"> Primary
                        <input type="radio" name="color" value="secondary" style="accent-color: var(--secondary);"> Gold
                        <input type="radio" name="color" value="blue" style="accent-color: #4dabf7;"> Blue
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Benefits (One per line)</label>
                    <textarea class="form-input" style="min-height: 120px; resize: vertical;" placeholder="• Unlimited Classes&#10;• Free Mat Rental&#10;• Guest Pass"></textarea>
                </div>
            </div>

            <div class="modal-footer" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                <button type="button" class="btn btn-secondary" id="cancel-membership-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Create Plan
                </button>
            </div>
        </form>
    </div>
</div>
`;

class MembershipForm {
    constructor() {
        this.init();
    }

    init() {
        if (!document.getElementById('membership-modal')) {
            document.body.insertAdjacentHTML('beforeend', MembershipFormStyles + MembershipFormHTML);
        }

        this.modal = document.getElementById('membership-modal');
        this.openBtn = document.getElementById('new-plan-btn');
        this.closeBtn = document.getElementById('close-membership-modal');
        this.cancelBtn = document.getElementById('cancel-membership-modal');
        this.form = document.getElementById('membership-form');

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
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Creating...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Membership plan created successfully!');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MembershipForm();
});
