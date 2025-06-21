/* global Chart */

// Utility Functions
const createGradient = (ctx, startColor, endColor) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    return gradient;
};

const generateData = (min, max, length) => {
    return Array(length)
        .fill(0)
        .map(() => Math.floor(Math.random() * (max - min)) + min);
};

const getLineChartOptions = (yMax = null, yMin = null) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
    },
    scales: {
        x: { display: false },
        y: {
            display: false,
            min: yMin,
            max: yMax,
        },
    },
});

// DOM Elements
const hamburgerBtn = document.querySelector('.hamburger-btn');
const container = document.querySelector('.container');
const nestedSidebar = document.querySelector('.nested-sidebar');
const mainContent = document.querySelector('.main-content');
const mainHeader = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
const dropdownMenu = document.querySelector('.dropdown-menu');
const profileTrigger = document.querySelector('.profile-trigger');

// Chart instances
let systemHealthLineChart = null;
let systemHealthDonutChart = null;
let alertsSummaryDonutChart = null;
let patchComplianceLineChart = null;
let cpuLoadChart = null;
let ramUsageChart = null;
let remoteOnessingeChart = null;

// Search functionality
const searchContainer = document.querySelector('.search-container');
const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');

// Initialize charts with a function
function initializeCharts() {
    // System Health Line Chart
    const systemHealthLineCtx = document
        .getElementById('systemHealthLineChart')
        .getContext('2d');
    systemHealthLineChart = new Chart(systemHealthLineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    data: [95, 93, 97, 94, 96, 95, 94],
                    borderColor: '#4a7dfc',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(74, 125, 252, 0.1)',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                    },
                    min: 85,
                    max: 100,
                },
            },
        },
    });

    // System Health Donut Chart
    const systemHealthDonutCtx = document
        .getElementById('systemHealthDonutChart')
        .getContext('2d');
    systemHealthDonutChart = new Chart(systemHealthDonutCtx, {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [94, 6],
                    backgroundColor: ['#4a7dfc', '#e9ecef'],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    // Alerts Summary Donut Chart
    const alertsSummaryDonutCtx = document
        .getElementById('alertsSummaryDonutChart')
        .getContext('2d');
    alertsSummaryDonutChart = new Chart(alertsSummaryDonutCtx, {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [78, 22],
                    backgroundColor: ['#22c55e', '#e9ecef'],
                    borderWidth: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    // Patch Compliance Line Chart
    const patchComplianceLineCtx = document
        .getElementById('patchComplianceLineChart')
        .getContext('2d');
    patchComplianceLineChart = new Chart(patchComplianceLineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    data: [75, 78, 76, 79, 78, 77, 78],
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                    min: 70,
                    max: 85,
                },
            },
        },
    });

    // Initialize other charts if needed
    const cpuLoadChartEl = document.getElementById('cpuLoadChart');
    if (cpuLoadChartEl) {
        cpuLoadChart = new Chart(cpuLoadChartEl, {
            type: 'line',
            data: {
                labels: Array(24).fill(''),
                datasets: [
                    {
                        data: generateData(10, 30, 24),
                        borderColor: '#4a7dfc',
                        backgroundColor: createGradient(
                            cpuLoadChartEl.getContext('2d'),
                            'rgba(74, 125, 252, 0.2)',
                            'rgba(74, 125, 252, 0)',
                        ),
                        fill: true,
                        borderWidth: 2,
                        tension: 0.4,
                    },
                ],
            },
            options: getLineChartOptions(),
        });
    }

    const ramUsageChartEl = document.getElementById('ramUsageChart');
    if (ramUsageChartEl) {
        ramUsageChart = new Chart(ramUsageChartEl, {
            type: 'line',
            data: {
                labels: Array(24).fill(''),
                datasets: [
                    {
                        data: generateData(40, 80, 24),
                        borderColor: '#4a7dfc',
                        backgroundColor: createGradient(
                            ramUsageChartEl.getContext('2d'),
                            'rgba(74, 125, 252, 0.2)',
                            'rgba(74, 125, 252, 0)',
                        ),
                        fill: true,
                        borderWidth: 2,
                        tension: 0.4,
                    },
                ],
            },
            options: getLineChartOptions(),
        });
    }

    // Remote Onessinge Line Chart
    const remoteOnessingeChartEl = document.getElementById(
        'remoteOnessingeLineChart',
    );
    if (remoteOnessingeChartEl) {
        remoteOnessingeChart = new Chart(remoteOnessingeChartEl, {
            type: 'line',
            data: {
                labels: Array(24).fill(''),
                datasets: [
                    {
                        data: generateData(20, 40, 24),
                        borderColor: '#4a7dfc',
                        backgroundColor: createGradient(
                            remoteOnessingeChartEl.getContext('2d'),
                            'rgba(74, 125, 252, 0.2)',
                            'rgba(74, 125, 252, 0)',
                        ),
                        fill: true,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        display: false,
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        });
    }
}

let resizeTimeout;

function handleResize() {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    resizeTimeout = setTimeout(() => {
        if (systemHealthLineChart) systemHealthLineChart.resize();
        if (systemHealthDonutChart) systemHealthDonutChart.resize();
        if (alertsSummaryDonutChart) alertsSummaryDonutChart.resize();
        if (patchComplianceLineChart) patchComplianceLineChart.resize();
        if (cpuLoadChart) cpuLoadChart.resize();
        if (ramUsageChart) ramUsageChart.resize();
        if (remoteOnessingeChart) remoteOnessingeChart.resize();
    }, 250);
}

// Sidebar navigation interactivity
function handleSidebarItemClick(e) {
    e.preventDefault();
    const listItem = e.target.closest('li');
    if (!listItem) return;

    // Remove active class from all items in this sidebar
    const sidebar = listItem.closest('aside');
    sidebar
        .querySelectorAll('.sidebar-nav li')
        .forEach((item) => item.classList.remove('active'));

    // Add active class to clicked item
    listItem.classList.add('active');
}

// Main sidebar navigation
document
    .querySelector('.main-sidebar .sidebar-nav')
    .addEventListener('click', handleSidebarItemClick);

// Nested sidebar navigation
document
    .querySelector('.nested-sidebar .sidebar-nav')
    .addEventListener('click', handleSidebarItemClick);

// Tab Switching
document.querySelector('.main-nav').addEventListener('click', (e) => {
    if (!e.target.classList.contains('nav-link')) return;
    e.preventDefault();

    const tabId = e.target.getAttribute('data-tab');
    if (!tabId) return;

    // Update navigation
    document
        .querySelectorAll('.nav-link')
        .forEach((link) => link.classList.remove('active'));
    e.target.classList.add('active');

    // Update content
    document
        .querySelectorAll('.tab-content')
        .forEach((content) => content.classList.remove('active'));
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
        // Resize charts if we're switching to the dashboard tab
        if (tabId === 'rmm-dashboard') {
            setTimeout(handleResize, 50);
        }
    }
});

// Sidebar Toggle
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    container.classList.toggle('sidebar-collapsed');
    nestedSidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    mainHeader.classList.toggle('expanded');

    // Trigger resize after transition
    setTimeout(handleResize, 300);
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});

// User Profile Dropdown
profileTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
});

document.addEventListener('click', () => {
    dropdownMenu.classList.remove('active');
});

dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Search functionality
searchIcon.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    }
});

// Close search when clicking outside
document.addEventListener('click', (e) => {
    if (
        !searchContainer.contains(e.target) &&
        searchContainer.classList.contains('active')
    ) {
        searchContainer.classList.remove('active');
    }
});

// Prevent search from closing when clicking inside the input
searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
});
