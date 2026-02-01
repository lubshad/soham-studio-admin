/**
 * Reusable User Management Form Component
 */

const UserFormStyles = `
<style>
    .user-modal-overlay {
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

    .user-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .user-modal-content {
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

    .user-modal-overlay.active .user-modal-content {
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

const UserFormHTML = `
<div class="user-modal-overlay" id="user-modal">
    <div class="user-modal-content">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
                <h2 style="font-size: 1.5rem; color: var(--primary); font-weight: 700; margin-bottom: 0.25rem;">Create New Admin User</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Grant system access to staff.</p>
            </div>
            <button class="close-btn" id="close-user-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="user-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" placeholder="e.g. Michael Scott" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" placeholder="michael@sohamstudio.com" required>
                </div>

                 <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" placeholder="+1..." required>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Role / Group</label>
                    <select class="form-input">
                        <option value="receptionist">Receptionist (Front Desk)</option>
                        <option value="manager">Studio Manager</option>
                        <option value="admin">App Admin (Full Access)</option>
                        <option value="trainer">Trainer (Schedule Only)</option>
                    </select>
                </div>

                 <div class="form-group">
                    <label class="form-label">Temporary Password</label>
                    <input type="password" class="form-input" value="Welcome123!" readonly style="background: var(--glass); cursor: not-allowed; color: var(--text-secondary);">
                </div>
                
                 <div class="form-group">
                     <label class="form-label">Status</label>
                     <select class="form-input">
                         <option value="active" selected>Active</option>
                         <option value="inactive">Inactive</option>
                     </select>
                </div>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(74, 108, 86, 0.1); border-radius: 12px; font-size: 0.85rem; color: var(--primary);">
                <i class="fas fa-info-circle"></i> An email invitation will be sent to the user to set their own password.
            </div>

            <div class="modal-footer" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                <button type="button" class="btn btn-secondary" id="cancel-user-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i> Create User
                </button>
            </div>
        </form>
    </div>
</div>
`;

class UserForm {
    constructor() {
        this.init();
    }

    init() {
        if (!document.getElementById('user-modal')) {
            document.body.insertAdjacentHTML('beforeend', UserFormStyles + UserFormHTML);
        }

        this.modal = document.getElementById('user-modal');
        this.openBtn = document.getElementById('add-user-btn');
        this.closeBtn = document.getElementById('close-user-modal');
        this.cancelBtn = document.getElementById('cancel-user-modal');
        this.form = document.getElementById('user-form');

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
            alert('User account created successfully! Invitation sent.');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UserForm();
});
