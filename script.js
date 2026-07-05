/* ==========================================================================
   WARISAN MELAYU PORTFOLIO - LOGIC & ANIMATIONS
   Pure JavaScript Implementation
   ========================================================================== */

// Cultural Database for Search Functionality
const databaseBudaya = [
    { nama: 'Rendang', kategori: 'kuliner', deskripsi: 'Masakan daging sapi kaya bumbu rempah kelapa kering asli Minangkabau.' },
    { nama: 'Gulai Ikan Patin', kategori: 'kuliner', deskripsi: 'Masakan khas kuah kuning gurih dari sungai Riau.' },
    { nama: 'Bolu Kemojo', kategori: 'kuliner', deskripsi: 'Kue manis tradisional berbentuk bunga kamboja beraroma daun pandan.' },
    { nama: 'Baju Kurung', kategori: 'pakaian', deskripsi: 'Busana longgar sopan melambangkan kesantunan moral wanita Melayu.' },
    { nama: 'Teluk Belanga', kategori: 'pakaian', deskripsi: 'Baju adat pria Melayu berkerah kancing tunggal disandingkan songket.' },
    { nama: 'Tanjak', kategori: 'pakaian', deskripsi: 'Penutup kepala songket lambang kehormatan & kepemimpinan pria Melayu.' },
    { nama: 'Rumah Lontik', kategori: 'rumah', deskripsi: 'Arsitektur atap melengkung mirip perahu khas Kampar, Riau.' },
    { nama: 'Rumah Selaso Jatuh Kembar', kategori: 'rumah', deskripsi: 'Balai pertemuan musyawarah besar adat Melayu Riau.' },
    { nama: 'Keris Melayu', kategori: 'pakaian', deskripsi: 'Pusaka tikam berluk dengan hulu ukiran burung lambang wibawa.' },
    { nama: 'Tari Zapin', kategori: 'tarian', deskripsi: 'Tarian dinamis berakar dari pengaruh budaya Arab-Melayu Islam.' },
    { nama: 'Tari Persembahan', kategori: 'tarian', deskripsi: 'Tarian agung penyambutan tamu dengan menyerahkan tepak sirih.' },
    { nama: 'Gambus', kategori: 'musik', deskripsi: 'Alat musik petik mirip mandolin pengiring syair melayu.' }
];

// Carousel state
let currentSlide = 0;
const totalSlides = 4;

// Initialize site scripts on DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Progression Handler
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 8;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Transition out the loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('opacity-0');
                    document.body.classList.remove('loading-active');
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                    }, 1000);
                }
            }, 500);
        }
        const progressBar = document.getElementById('loading-progress');
        const percentText = document.getElementById('loading-percent');
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentText) percentText.innerText = `${progress}%`;
    }, 80);

    // 2. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 3. Initialize Particle Background
    initParticles();
});

// 4. Mouse Glow Ambient Effect
const glow = document.getElementById('mouse-glow');
if (glow) {
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// 5. Toggle Mobile Menu Drawer
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');

    if (menu) {
        menu.classList.toggle('active');
        const isActive = menu.classList.contains('active');

        if (isActive) {
            if (openIcon) openIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        } else {
            if (openIcon) openIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        }
    }
}

// 6. Interactive Floating Particle System
function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * -0.5 - 0.2; // Moves upward slowly
            this.color = Math.random() > 0.6 ? '#D4AF37' : '#B00020';
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Populate particles
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// 7. Weapon Carousel Slider Navigation
function showSlide(index) {
    const carousel = document.getElementById('senjata-carousel');
    if (!carousel) return;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// 8. Pinterest Gallery Filter Controls
function filterGallery(category, buttonEl) {
    const items = document.querySelectorAll('.gallery-item');
    const btns = document.querySelectorAll('.gallery-btn');

    // Remove active styles from all buttons
    btns.forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active styling to current button
    if (buttonEl) {
        buttonEl.classList.add('active');
    }

    // Filter items visibility
    items.forEach(item => {
        if (category === 'semua') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// 9. Pakaian Detail Modal Handlers
function openPakaianModal(title, subtitle, desc, use, material) {
    const modal = document.getElementById('pakaian-modal');
    if (!modal) return;

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-subtitle').innerText = subtitle;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-use').innerText = use;
    document.getElementById('modal-material').innerText = material;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
    }, 50);
}

function closePakaianModal() {
    const modal = document.getElementById('pakaian-modal');
    if (!modal) return;

    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 10. Toggle Search Modal & Autofocus Input
function toggleSearchModal() {
    const modal = document.getElementById('search-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
        }, 50);
    } else {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}

// 11. Search Culture Logic
function searchCulture() {
    const searchInput = document.getElementById('search-input');
    const resultsDiv = document.getElementById('search-results');
    if (!searchInput || !resultsDiv) return;

    const query = searchInput.value.toLowerCase().trim();
    resultsDiv.innerHTML = '';

    if (query.length < 2) {
        resultsDiv.innerHTML = '<p class="text-xs text-brandCream/50 italic">Ketik minimal 2 karakter untuk memulai...</p>';
        return;
    }

    const filtered = databaseBudaya.filter(item =>
        item.nama.toLowerCase().includes(query) ||
        item.kategori.toLowerCase().includes(query) ||
        item.deskripsi.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = '<p class="text-xs text-brandCream/50 italic">Budaya tidak ditemukan, coba kata kunci lain...</p>';
        return;
    }

    filtered.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'search-result-item';
        itemDiv.onclick = () => {
            toggleSearchModal();
            openCustomAlert(item.nama, item.deskripsi);
        };
        itemDiv.innerHTML = `
            <div class="search-result-header">
                <h4 class="search-result-title">${item.nama}</h4>
                <span class="search-result-tag">${item.kategori}</span>
            </div>
            <p class="search-result-desc">${item.deskripsi}</p>
        `;
        resultsDiv.appendChild(itemDiv);
    });
}

// 12. Custom Alert Modal
function openCustomAlert(title, msg) {
    const alertModal = document.getElementById('custom-alert');
    if (!alertModal) return;

    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = msg;

    alertModal.classList.remove('hidden');
    setTimeout(() => {
        alertModal.classList.remove('opacity-0');
    }, 50);
}

// Close custom alert modal
function closeCustomAlert() {
    const alertModal = document.getElementById('custom-alert');
    if (!alertModal) return;

    alertModal.classList.add('opacity-0');
    setTimeout(() => {
        alertModal.classList.add('hidden');
    }, 300);
}

// 13. Dynamic Navbar Resizing on Scroll
const header = document.querySelector('nav');
const btt = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Floating Back-to-Top Button Toggle
    if (btt) {
        if (window.scrollY > 500) {
            btt.classList.remove('hidden');
            setTimeout(() => {
                btt.classList.remove('scale-0');
            }, 10);
        } else {
            btt.classList.add('scale-0');
            setTimeout(() => {
                if (btt.classList.contains('scale-0')) {
                    btt.classList.add('hidden');
                }
            }, 300);
        }
    }
});

// Smooth Scroll to Top on Action Click
if (btt) {
    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
