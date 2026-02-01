function renderSidebar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navItems = [
        { href: 'index.html', icon: 'fas fa-th-large', text: 'Dashboard' },
        { href: 'schedule.html', icon: 'fas fa-calendar-alt', text: 'Schedule' },
        { href: 'customers.html', icon: 'fas fa-user-friends', text: 'Customers' },
        { href: 'memberships.html', icon: 'fas fa-id-card', text: 'Membership Plans' },
        { href: 'subscriptions.html', icon: 'fas fa-clipboard-list', text: 'Subscriptions' },
        { href: 'batches.html', icon: 'fas fa-layer-group', text: 'Batches' },
        { href: 'trainers.html', icon: 'fas fa-user-tie', text: 'Trainers' },
        { href: 'leaves.html', icon: 'fas fa-calendar-minus', text: 'Leaves' },
        { href: 'billing.html', icon: 'fas fa-file-invoice-dollar', text: 'Billing & Invoices' },
        { href: 'incidents.html', icon: 'fas fa-exclamation-triangle', text: 'Incidents' },
        { href: 'logs.html', icon: 'fas fa-history', text: 'Activity Logs' },
        { href: 'users.html', icon: 'fas fa-users-cog', text: 'User Management' }
    ];

    const logoSrc = 'assets/logo.jpg';

    const navHTML = `
    <nav class="sidebar">
        <div class="logo-container">
            <img src="${logoSrc}" alt="Soham Studio Logo">
            <h2>SOHAM STUDIO</h2>
        </div>
        <ul class="nav-links">
            ${navItems.map(item => `
                <li class="nav-item">
                    <a href="${item.href}" class="nav-link ${currentPage === item.href ? 'active' : ''}">
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    </a>
                </li>
            `).join('')}
        </ul>
        <div class="nav-item" style="margin-top: auto;">
            <a href="#" class="nav-link">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
            </a>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

document.addEventListener('DOMContentLoaded', renderSidebar);
