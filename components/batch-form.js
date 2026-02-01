/**
 * Reusable Batch Creation Form Component
 */

const BatchFormStyles = `
<style>
    .batch-modal-overlay {
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

    .batch-modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .batch-modal-content {
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

    .batch-modal-overlay.active .batch-modal-content {
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

    .day-selector {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .day-checkbox {
        display: none;
    }

    .day-label {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--glass-border);
        background: var(--bg-dark);
        color: var(--text-secondary);
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
    }

    .day-checkbox:checked + .day-label {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
        box-shadow: 0 4px 6px -1px rgba(74, 108, 86, 0.2);
    }
</style>
`;

const BatchFormHTML = `
<div class="batch-modal-overlay" id="batch-modal">
    <div class="batch-modal-content">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
                <h2 style="font-size: 1.5rem; color: var(--primary); font-weight: 700; margin-bottom: 0.25rem;">Create New Batch</h2>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Schedule classes and assign instructors.</p>
            </div>
            <button class="close-btn" id="close-batch-modal"><i class="fas fa-times"></i></button>
        </div>
        
        <form id="batch-form">
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Batch Name</label>
                    <input type="text" class="form-input" placeholder="e.g. Morning Wellness" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Assigned Instructor</label>
                    <select class="form-input">
                        <option value="">Select Trainer...</option>
                        <option value="1">Elena Rodriguez</option>
                        <option value="2">David Lee</option>
                        <option value="3">Maria Garcia</option>
                    </select>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Weekly Schedule</label>
                    <div class="day-selector">
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Mon">
                            <div class="day-label">M</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Tue">
                            <div class="day-label">T</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Wed">
                            <div class="day-label">W</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Thu">
                            <div class="day-label">T</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Fri">
                            <div class="day-label">F</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Sat">
                            <div class="day-label">S</div>
                        </label>
                        <label>
                            <input type="checkbox" class="day-checkbox" value="Sun">
                            <div class="day-label">S</div>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Start Time</label>
                    <input type="time" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Duration (Minutes)</label>
                    <select class="form-input">
                        <option value="45">45 min</option>
                        <option value="60" selected>60 min</option>
                        <option value="90">90 min</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Max Capacity</label>
                    <input type="number" class="form-input" value="20" min="1">
                </div>
                
                 <div class="form-group">
                    <label class="form-label">Room / Location</label>
                    <select class="form-input">
                        <option value="main">Main Studio</option>
                        <option value="roof">Rooftop Garden</option>
                        <option value="private">Private Suite A</option>
                    </select>
                </div>
            </div>

            <div class="modal-footer" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                <button type="button" class="btn btn-secondary" id="cancel-batch-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-check"></i> Create Batch
                </button>
            </div>
        </form>
    </div>
</div>
`;

class BatchForm {
    constructor() {
        this.init();
    }

    init() {
        if (!document.getElementById('batch-modal')) {
            document.body.insertAdjacentHTML('beforeend', BatchFormStyles + BatchFormHTML);
        }

        this.modal = document.getElementById('batch-modal');
        this.openBtn = document.getElementById('new-batch-btn');
        this.closeBtn = document.getElementById('close-batch-modal');
        this.cancelBtn = document.getElementById('cancel-batch-modal');
        this.form = document.getElementById('batch-form');

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
            alert('Batch scheduled successfully!');
            this.form.reset();
            this.close();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BatchForm();
});
