/**
 * Reusable Incident Reporting Form Component
 */

const IncidentFormStyles = `
<style>
    .incident-modal-overlay {
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

    .incident-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .incident-modal-content {
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

    .incident-modal-overlay.active .incident-modal-content {
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

    textarea.form-input {
        min-height: 100px;
        resize: vertical;
    }
</style>
`;

const IncidentFormHTML = `
<div class="incident-modal-overlay" id="incident-modal">
    <div class="incident-modal-content">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
                <h2 style="font-size: 1.5rem; color: #ff6b6b; font-weight: 700; margin-bottom: 0.25rem;">Report Incident</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Log a facility or safety issue.</p>
            </div>
            <button class="close-btn" id="close-incident-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="incident-form">
            <div class="form-grid">
                <div class="form-group full-width">
                    <label class="form-label">Incident Title</label>
                    <input type="text" class="form-input" placeholder="e.g. Broken Mirror in Studio A" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Location</label>
                    <select class="form-input">
                        <option value="reception">Reception Area</option>
                        <option value="studio-a">Studio A (Main)</option>
                        <option value="studio-b">Studio B (Small)</option>
                        <option value="changing-room">Changing Rooms</option>
                        <option value="parking">Parking Lot</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Severity Level</label>
                    <select class="form-input" style="color: #ff6b6b; font-weight: 600;">
                        <option value="low" style="color: var(--text-primary);">Low (Cosmetic)</option>
                        <option value="medium" style="color: #ff922b;">Medium (Needs Fix)</option>
                        <option value="high" style="color: #ff6b6b;">High (Urgent)</option>
                        <option value="critical" style="color: #c92a2a; font-weight: 700;">Critical (Safety Hazard)</option>
                    </select>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Description</label>
                    <textarea class="form-input" placeholder="Describe what happened or what is broken..." required></textarea>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Upload Photo (Optional)</label>
                    <div style="border: 2px dashed var(--glass-border); border-radius: 12px; padding: 1.5rem; text-align: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--glass-border)'">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 1.5rem; color: var(--text-secondary); margin-bottom: 0.5rem;"></i>
                        <p style="font-size: 0.85rem; color: var(--text-secondary);">Click to upload image evidence</p>
                    </div>
                </div>
            </div>

            <div class="modal-footer" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                <button type="button" class="btn btn-secondary" id="cancel-incident-modal">Cancel</button>
                <button type="submit" class="btn btn-primary" style="background: #ff6b6b; border-color: #ff6b6b;">
                    <i class="fas fa-exclamation-triangle"></i> Report Issue
                </button>
            </div>
        </form>
    </div>
</div>
`;

class IncidentForm {
    constructor() {
        this.init();
    }

    init() {
        if (!document.getElementById('incident-modal')) {
            document.body.insertAdjacentHTML('beforeend', IncidentFormStyles + IncidentFormHTML);
        }

        this.modal = document.getElementById('incident-modal');
        this.openBtn = document.getElementById('report-incident-btn');
        this.closeBtn = document.getElementById('close-incident-modal');
        this.cancelBtn = document.getElementById('cancel-incident-modal');
        this.form = document.getElementById('incident-form');

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
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Submitting...';
        btn.disabled = true;

        setTimeout(() => {
            alert('Incident reported successfully. Maintenance team notified.');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new IncidentForm();
});
