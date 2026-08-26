// Elements
const menu = document.getElementById("menu");
const closeButton = document.getElementById("close-mobile");
const nav = document.getElementById("nav-mobile");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const langToggle = document.getElementById("lang-toggle");

// --- MOBILE MENU LOGIC ---
menu.addEventListener("click", () => {
  nav.classList.add("show");
  document.body.style.overflow = "hidden";
});

closeButton.addEventListener("click", () => {
  nav.classList.remove("show");
  document.body.style.overflow = "auto";
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    document.body.style.overflow = "auto";
  });
});

// --- THEME SWITCHING LOGIC ---
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  document.body.classList.add("light-mode");
  if (themeIcon) {
    themeIcon.classList.replace('bxs-moon', 'bxs-sun');
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  
  if (themeIcon) {
    if (isLight) {
      themeIcon.classList.replace('bxs-moon', 'bxs-sun');
    } else {
      themeIcon.classList.replace('bxs-sun', 'bxs-moon');
    }
  }
  
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// --- LANGUAGE SWITCHING LOGIC ---
let currentLang = localStorage.getItem("lang") || "id";

const translations = {
  update() {
    const elements = document.querySelectorAll("[data-en]");
    elements.forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (!text) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", text);
      } else {
        // Use innerHTML so HTML tags (<br>, <span>, etc.) render correctly
        el.innerHTML = text;
        if (el.hasAttribute("data-text")) {
          el.setAttribute("data-text", text);
        }
      }
    });
    
    // Update Flag Icon: show the OTHER flag to switch to
    const flagImg = langToggle.querySelector("img");
    if (currentLang === "en") {
      flagImg.setAttribute("src", "https://flagcdn.com/w40/id.png");
      flagImg.setAttribute("alt", "ID");
    } else {
      flagImg.setAttribute("src", "https://flagcdn.com/w40/gb.png");
      flagImg.setAttribute("alt", "EN");
    }
  }
};

// Initialize language
translations.update();

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "id" : "en";
  localStorage.setItem("lang", currentLang);
  translations.update();
  if (typeof updateProjectSpotlight === "function") {
    updateProjectSpotlight(activeCategoryFilter);
  }
});

// --- SWIPER SLIDER LOGIC ---
window.addEventListener('load', () => {
  const swiper = new Swiper('.projects-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: false,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
});

// --- BLOG ARTICLE MODAL POPUP LOGIC ---
const articlesData = {
  1: {
    tag: { id: "Laravel & Alpine.js", en: "Laravel & Alpine.js" },
    tagClass: "tag-laravel",
    title: {
      id: "Membangun Aplikasi Web Skala Institusi dengan Laravel & Alpine.js",
      en: "Building Institutional Web Apps with Laravel & Alpine.js"
    },
    body: {
      id: `
        <p>Dalam merancang sistem informasi institusi seperti <strong>Sistem Layanan Penjaminan Mutu</strong> dan <strong>Profil Kampus</strong>, efisiensi, keamanan, serta kemudahan integrasi antarmuka menjadi kunci utama.</p>
        
        <h3>1. Arsitektur Clean &amp; Modular</h3>
        <p>Menggunakan framework <strong>Laravel</strong> memungkinkan pembuatan struktur backend yang rapi berkat fitur Eloquent ORM, Service Layer, dan Middleware otentikasi bertingkat untuk memisahkan hak akses Admin, Dosen, dan Staf.</p>
        
        <h3>2. Interaktivitas Ringan dengan Alpine.js</h3>
        <p>Daripada menggunakan SPA framework yang relatif berat untuk sistem dokumen institusi, <strong>Alpine.js</strong> dikombinasikan dengan Laravel Blade memberikan reaktivitas penuh langsung di dalam template tanpa mengorbankan performa load halaman.</p>

        <pre><code>// Contoh Komponen Dynamic Upload & Filter Alpine.js
&lt;div x-data="{ search: '', category: 'all' }"&gt;
  &lt;input type="text" x-model="search" placeholder="Cari Dokumen Mutu..." /&gt;
&lt;/div&gt;</code></pre>
        
        <h3>3. Hasil &amp; Dampak Implementasi</h3>
        <p>Sistem ini berhasil memotong waktu proses pelaporan dokumen mutu secara signifikan dan mempermudah pengarsipan dokumen akreditasi secara digital dan terpusat.</p>
      `,
      en: `
        <p>When designing institutional information systems such as <strong>Quality Assurance Services</strong> and <strong>Campus Profiles</strong>, efficiency, security, and interface integration are key priorities.</p>
        
        <h3>1. Clean &amp; Modular Architecture</h3>
        <p>Utilizing <strong>Laravel</strong> allows building a clean backend structure using Eloquent ORM, Service Layers, and multi-tier Authentication Middleware to isolate access rights between Admin, Faculty, and Staff.</p>
        
        <h3>2. Lightweight Interactivity with Alpine.js</h3>
        <p>Instead of heavy SPA frameworks, pairing <strong>Alpine.js</strong> with Laravel Blade delivers full component reactivity right within Blade templates without sacrificing page load performance.</p>

        <pre><code>// Example Dynamic Search Component with Alpine.js
&lt;div x-data="{ search: '', category: 'all' }"&gt;
  &lt;input type="text" x-model="search" placeholder="Search QA Documents..." /&gt;
&lt;/div&gt;</code></pre>
        
        <h3>3. Results &amp; Impact</h3>
        <p>The implementation significantly reduced institutional quality document reporting times and enabled centralized digital archiving for accreditation audits.</p>
      `
    }
  },
  2: {
    tag: { id: "MikroTik & Networking", en: "MikroTik & Networking" },
    tagClass: "tag-network",
    title: {
      id: "Optimasi Jaringan Kampus: Manajemen Bandwidth MikroTik dengan Metode PCQ",
      en: "Campus Network Optimization: MikroTik Bandwidth Management using PCQ"
    },
    body: {
      id: `
        <p>Mengelola bandwidth total 750 Mbps untuk ratusan pengguna di lingkungan laboratorium dan gedung kampus membutuhkan distribusi trafik yang adil agar tidak ada pengguna yang menghabiskan alokasi bandwidth.</p>
        
        <h3>1. Mengapa Memilih Per Connection Queue (PCQ)?</h3>
        <p>Metode <strong>PCQ (Per Connection Queue)</strong> di RouterOS MikroTik memungkinkan pembagian bandwidth dinamis yang secara otomatis membagi kuota secara merata kepada setiap perangkat yang aktif dalam antrean.</p>
        
        <h3>2. Pembagian Alokasi Dosen vs Mahasiswa</h3>
        <p>Dengan skrip DHCP Leases dinamis dan Queue Trees, alokasi bandwidth dipisahkan berdasarkan segmentasi IP:</p>
        <ul>
          <li><strong>Segment Dosen / Staf:</strong> Prioritas tinggi (High Priority Queue) untuk mendukung kelancaran administrasi &amp; perkuliahan.</li>
          <li><strong>Segment Mahasiswa / Lab:</strong> Equal Share PCQ untuk mencegah bottleneck akibat aktivitas download berlebih.</li>
        </ul>

        <pre><code># Konfigurasi PCQ Rate MikroTik CLI
/queue type
add name="PCQ_Download" kind=pcq pcq-rate=5M pcq-classifier=dst-address
add name="PCQ_Upload" kind=pcq pcq-rate=2M pcq-classifier=src-address</code></pre>
        
        <h3>3. Pemantauan Real-Time dengan Torch</h3>
        <p>Penggunaan fitur pemantauan <em>Torch</em> di MikroTik membantu mendeteksi lonjakan trafik dan mengidentifikasi IP yang terindikasi menggunakan aplikasi bandwidth-heavy secara real-time.</p>
      `,
      en: `
        <p>Managing a total 750 Mbps bandwidth for hundreds of concurrent users across campus laboratories requires fair traffic distribution to prevent network starvation.</p>
        
        <h3>1. Why Per Connection Queue (PCQ)?</h3>
        <p><strong>PCQ (Per Connection Queue)</strong> in MikroTik RouterOS dynamically redistributes available bandwidth equally among all active client streams inside a queue.</p>
        
        <h3>2. Faculty vs Student Allocation Segmentation</h3>
        <p>Using dynamic DHCP leases scripts and Queue Trees, traffic is segmented based on IP subnets:</p>
        <ul>
          <li><strong>Faculty / Staff Segment:</strong> High Priority Queue to ensure uninterrupted academic administration &amp; lectures.</li>
          <li><strong>Student / Lab Segment:</strong> Equal-share PCQ to prevent bottlenecks caused by heavy background downloads.</li>
        </ul>

        <pre><code># MikroTik CLI PCQ Rate Configuration
/queue type
add name="PCQ_Download" kind=pcq pcq-rate=5M pcq-classifier=dst-address
add name="PCQ_Upload" kind=pcq pcq-rate=2M pcq-classifier=src-address</code></pre>
        
        <h3>3. Real-time Traffic Monitoring via Torch</h3>
        <p>Utilizing MikroTik's <em>Torch</em> tool enables real-time packet inspection to identify IP spikes and isolate bandwidth-heavy connections.</p>
      `
    }
  },
  3: {
    tag: { id: "Linux & VPS Admin", en: "Linux & VPS Admin" },
    tagClass: "tag-linux",
    title: {
      id: "Panduan Praktis Deployment Aplikasi Web ke VPS Linux",
      en: "Practical Guide to Deploying Web Applications to Linux VPS"
    },
    body: {
      id: `
        <p>Memindahkan aplikasi web dari lingkungan lokal (Localhost) ke server Virtual Private Server (VPS) berspesifikasi produksi membutuhkan tahapan konfigurasi yang aman dan terstruktur.</p>
        
        <h3>1. Persiapan Server &amp; Pengamanan Awal</h3>
        <p>Langkah awal meliputi update repositori Linux (Ubuntu/Debian), pembuat akun sudoer khusus, mengaktifkan UFW Firewall (membuka port 80, 443, SSH), serta mengonfigurasi autentikasi SSH Key publik/privat.</p>
        
        <h3>2. Instalasi Web Server (Nginx) &amp; Database (MySQL)</h3>
        <p>Mengonfigurasi <strong>Nginx</strong> sebagai Reverse Proxy untuk melayani request HTTP/HTTPS dengan performa tinggi, diikuti penataan basis data MySQL dan pengaturan user privilese yang aman.</p>

        <pre><code># Menghubungkan Domain Akademik .ac.id & SSL Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d poltek-cendrawasih.ac.id</code></pre>
        
        <h3>3. Manajemen Domain (.ac.id) &amp; SSL</h3>
        <p>Mengoordinasikan A-Record DNS institusi menuju IP publik VPS dan memasang sertifikat SSL TLS gratis dari Let's Encrypt dengan perpanjangan otomatis (*auto-renewal*).</p>
      `,
      en: `
        <p>Migrating web applications from a localhost environment to a production Linux VPS requires a structured, secure deployment workflow.</p>
        
        <h3>1. Server Preparation &amp; Hardening</h3>
        <p>Initial steps include updating Linux package repositories, creating dedicated sudo users, configuring UFW Firewall rules (ports 80, 443, SSH), and enforcing SSH Key authentication.</p>
        
        <h3>2. Nginx Reverse Proxy &amp; MySQL Setup</h3>
        <p>Configuring <strong>Nginx</strong> as a high-performance Reverse Proxy to handle HTTP/HTTPS traffic, followed by MySQL database creation and user privilege isolation.</p>

        <pre><code># Linking Academic Domain .ac.id & Certbot SSL
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d poltek-cendrawasih.ac.id</code></pre>
        
        <h3>3. Domain Management (.ac.id) &amp; Free SSL</h3>
        <p>Mapping institutional DNS A-Records to the VPS public IP address and installing Let's Encrypt SSL/TLS certificates with automated renewal crons.</p>
      `
    }
  }
};

const blogModal = document.getElementById("blog-modal");
const blogModalClose = document.getElementById("blog-modal-close");
const modalTag = document.getElementById("modal-tag");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

function openArticleModal(articleId) {
  const data = articlesData[articleId];
  if (!data) return;

  const lang = localStorage.getItem("lang") || "id";

  if (modalTag) {
    modalTag.className = `tech-tag ${data.tagClass}`;
    modalTag.textContent = data.tag[lang] || data.tag["id"];
  }
  if (modalTitle) {
    modalTitle.textContent = data.title[lang] || data.title["id"];
  }
  if (modalBody) {
    modalBody.innerHTML = data.body[lang] || data.body["id"];
  }

  if (blogModal) {
    blogModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeArticleModal() {
  if (blogModal) {
    blogModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Event Delegation for Opening Blog Modal Popup
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-read-more");
  if (btn) {
    e.preventDefault();
    const articleId = btn.getAttribute("data-article");
    if (articleId) openArticleModal(articleId);
    return;
  }

  const card = e.target.closest(".blog-card");
  if (card) {
    const cardBtn = card.querySelector(".btn-read-more");
    if (cardBtn) {
      const articleId = cardBtn.getAttribute("data-article");
      if (articleId) openArticleModal(articleId);
    }
  }
});

if (blogModalClose) {
  blogModalClose.addEventListener("click", closeArticleModal);
}

if (blogModal) {
  blogModal.addEventListener("click", (e) => {
    if (e.target === blogModal) {
      closeArticleModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && blogModal && blogModal.classList.contains("active")) {
    closeArticleModal();
  }
});

// --- CONTACT FORM SUBMISSION LOGIC ---
const contactForm = document.querySelector(".contact-form-new");

function showToast(message, type = "success") {
  let toast = document.getElementById("custom-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "custom-toast";
    toast.className = "custom-toast";
    document.body.appendChild(toast);
  }

  const iconClass = type === "success" ? "bx-check-circle" : "bx-error-circle";
  toast.innerHTML = `<i class='bx ${iconClass}'></i><span>${message}</span>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !subject || !message) {
      const errText = (typeof currentLang !== "undefined" && currentLang === "en") ? "Please fill in all fields." : "Harap isi semua kolom formulir.";
      showToast(errText, "error");
      return;
    }

    // Format WhatsApp Message
    const formattedMsg = `Halo Nanang, perkenalkan saya *${name}* (${email}).%0A%0A*Subjek:* ${subject}%0A*Pesan:* ${message}`;
    const waUrl = `https://wa.me/6285140778581?text=${formattedMsg}`;

    // Show Success Toast
    const successText = (typeof currentLang !== "undefined" && currentLang === "en")
      ? "Message prepared! Opening WhatsApp..."
      : "Pesan berhasil disiapkan! Mengalihkan ke WhatsApp...";
    showToast(successText, "success");

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, "_blank");
      contactForm.reset();
    }, 1000);
  });
}

// --- CV QUICK PREVIEW MODAL LOGIC ---
const cvModal = document.getElementById("cv-modal");
const cvModalClose = document.getElementById("cv-modal-close");
const btnOpenCv = document.getElementById("btn-open-cv");

function openCvModal() {
  if (cvModal) {
    cvModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCvModal() {
  if (cvModal) {
    cvModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

if (btnOpenCv) {
  btnOpenCv.addEventListener("click", (e) => {
    e.preventDefault();
    openCvModal();
  });
}

if (cvModalClose) {
  cvModalClose.addEventListener("click", closeCvModal);
}

if (cvModal) {
  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) {
      closeCvModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cvModal && cvModal.classList.contains("active")) {
    closeCvModal();
  }
});

// --- TOP SCROLL PROGRESS BAR & BACK TO TOP BUTTON LOGIC ---
const scrollProgressBar = document.getElementById("scroll-progress");
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgressBar) {
    scrollProgressBar.style.width = `${scrollPercent}%`;
  }

  if (backToTopBtn) {
    if (scrollTop > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// --- PROJECT CATEGORY FILTER & SPOTLIGHT LOGIC ---
const categorySpotlightData = {
  all: {
    tag: { id: "⭐ Total Showcase", en: "⭐ Total Showcase" },
    title: { id: "Kumpulan Proyek Web & IT Administrator", en: "Web & IT Administrator Projects Portfolio" },
    desc: {
      id: "Menampilkan integrasi 12+ proyek pengembangan aplikasi web Laravel, administrasi server Linux VPS, dan optimasi jaringan MikroTik.",
      en: "Showcasing 12+ integrated projects in Laravel web application development, Linux VPS server administration, and MikroTik network optimization."
    },
    tags: ["Laravel", "MikroTik", "Linux VPS", "MySQL", "Alpine.js"]
  },
  laravel: {
    tag: { id: "💻 Full-Stack Web Development", en: "💻 Full-Stack Web Development" },
    title: { id: "Sistem Aplikasi Web Laravel & Academic Systems", en: "Laravel Web Apps & Academic Systems" },
    desc: {
      id: "Pengembangan web institusi meliputi Sistem Layanan Penjaminan Mutu (SPMI) dan Sistem E-Library dengan arsitektur Blade, Alpine.js, dan REST API.",
      en: "Institutional web development including Quality Assurance Service System (SPMI) and E-Library System with Blade, Alpine.js, and REST API."
    },
    tags: ["Laravel 10", "Blade Engine", "Alpine.js", "MySQL Relational", "Tailwind/CSS"]
  },
  infra: {
    tag: { id: "🖥️ IT Infrastructure & Linux Server", en: "🖥️ IT Infrastructure & Linux Server" },
    title: { id: "Manajemen VPS Server & Domain Administrator", en: "VPS Server Management & Domain Admin" },
    desc: {
      id: "Deployment web apps ke Linux VPS (Ubuntu/Debian), konfigurasi Nginx Reverse Proxy, SSL/TLS HTTPS, dan pengelolaan domain institusi (.ac.id).",
      en: "Web app deployment to Linux VPS (Ubuntu/Debian), Nginx Reverse Proxy configuration, SSL/TLS HTTPS, and institutional DNS domain management (.ac.id)."
    },
    tags: ["Linux Ubuntu Server", "Nginx Reverse Proxy", "SSL/TLS Certs", "DNS Admin (.ac.id)", "Git Deployment"]
  },
  database: {
    tag: { id: "🗄️ Database Architecture & Design", en: "🗄️ Database Architecture & Design" },
    title: { id: "Perancangan Basis Data Relasional & Optimasi SQL", en: "Relational Database Design & SQL Tuning" },
    desc: {
      id: "Perancangan ERD, indexing basis data MySQL, skema penjaminan mutu, serta optimasi query untuk mendukung performa sistem berefisiensi tinggi.",
      en: "ERD design, MySQL database indexing, quality assurance schemas, and query tuning to ensure high-performance system execution."
    },
    tags: ["MySQL Database", "Relational Schema", "Indexing & Querying", "Data Migration", "Security Backup"]
  },
  network: {
    tag: { id: "🌐 Network Engineering & Security", en: "🌐 Network Engineering & Security" },
    title: { id: "MikroTik Bandwidth Manager & Security Firewall", en: "MikroTik Bandwidth Manager & Security Firewall" },
    desc: {
      id: "Konfigurasi MikroTik RouterOS (PCQ Dynamic Queue 750 Mbps), Hotspot Login Portal melayani ~400 pengguna kampus, serta aturan keamanan Firewall.",
      en: "MikroTik RouterOS configuration (PCQ Dynamic Queue 750 Mbps), Hotspot Login Portal serving ~400 campus users, and Firewall security rules."
    },
    tags: ["MikroTik RouterOS", "PCQ Dynamic Queue", "Hotspot Portal", "Firewall Filter Rules", "Campus Wi-Fi AP"]
  }
};

let activeCategoryFilter = "all";

function updateProjectSpotlight(catKey) {
  activeCategoryFilter = catKey;
  const data = categorySpotlightData[catKey] || categorySpotlightData.all;
  const lang = (typeof currentLang !== "undefined") ? currentLang : "id";

  const tagElem = document.getElementById("spotlight-tag");
  const titleElem = document.getElementById("spotlight-title");
  const descElem = document.getElementById("spotlight-desc");
  const tagsElem = document.getElementById("spotlight-tags");

  if (tagElem) tagElem.textContent = data.tag[lang] || data.tag.id;
  if (titleElem) titleElem.textContent = data.title[lang] || data.title.id;
  if (descElem) descElem.textContent = data.desc[lang] || data.desc.id;
  if (tagsElem) {
    tagsElem.innerHTML = data.tags.map(t => `<span class="mini-tag">${t}</span>`).join("");
  }

  // Update Collage Badge Highlights
  const badgeFrames = document.querySelectorAll(".works-badge-frame");
  badgeFrames.forEach(frame => {
    const frameCat = frame.getAttribute("data-category");
    if (catKey === "all" || frameCat === catKey) {
      frame.classList.remove("dimmed");
      frame.classList.add("highlighted");
    } else {
      frame.classList.add("dimmed");
      frame.classList.remove("highlighted");
    }
  });
}

const filterBtns = document.querySelectorAll(".project-filter-bar .filter-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.getAttribute("data-filter");
    updateProjectSpotlight(cat);
  });
});

// --- PROJECT SHOWCASE MODAL LOGIC ---
const projectsData = {
  network: {
    badge: { id: "🌐 Jaringan & Keamanan", en: "🌐 Network & Security" },
    title: {
      id: "Manajemen Bandwidth MikroTik PCQ 750 Mbps & Portal Kampus",
      en: "MikroTik PCQ 750 Mbps Bandwidth Manager & Campus Portal"
    },
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000",
    role: "Network Engineer & IT Admin",
    body: {
      id: `
        <h3><i class='bx bx-info-circle'></i> Ringkasan Proyek &amp; Tantangan</h3>
        <p>Merancang dan mengonfigurasi infrastruktur jaringan kampus melayani <strong>~400 mahasiswa dan staf akademik</strong> dengan total bandwidth ISP <strong>750 Mbps</strong>. Tantangan utama adalah mencegah monopoli bandwidth oleh segelintir user saat penggunaan puncaknya (jam kuliah/laboratorium).</p>

        <h3><i class='bx bx-wrench'></i> Solusi &amp; Teknologi Yang Diterapkan</h3>
        <ul>
          <li><strong>MikroTik PCQ (Per Connection Queue):</strong> Membagi alokasi bandwidth secara dinamis dan otomatis presisi sama rata bagi seluruh pengguna aktif tanpa membebani CPU router.</li>
          <li><strong>Hotspot Login Portal &amp; User Manager:</strong> Sistem otentikasi login berbasis akun pengguna kampus dengan manajemen masa aktif sesi.</li>
          <li><strong>Firewall Filter &amp; Raw Rules:</strong> Proteksi jaringan dari serangan DDoS, Port Scanning, serta pemblokiran situs bereputasi buruk/malware.</li>
          <li><strong>Ruijie Cloud Access Point Integration:</strong> Cakupan sinyal Wi-Fi kampus tanpa hambatan (*seamless roaming*).</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Hasil &amp; Dampak Utama</h3>
        <p>Performa jaringan kampus meningkat drastis dengan penurunan tingkat keluhan ketersediaan koneksi sebesar <strong>90%</strong>. Distribusi bandwidth 750 Mbps berjalan stabil 24/7 tanpa *lag* saat penggunaan bersamaan.</p>
      `,
      en: `
        <h3><i class='bx bx-info-circle'></i> Project Overview &amp; Challenge</h3>
        <p>Designed and configured campus network infrastructure serving <strong>~400 students and academic staff</strong> with total ISP bandwidth of <strong>750 Mbps</strong>. Main challenge was preventing bandwidth hogs during peak lecture hours.</p>

        <h3><i class='bx bx-wrench'></i> Implemented Solution &amp; Tech Stack</h3>
        <ul>
          <li><strong>MikroTik PCQ (Per Connection Queue):</strong> Dynamically and equally distributes bandwidth across all active connections automatically.</li>
          <li><strong>Hotspot Login Portal &amp; User Manager:</strong> Account-based authentication portal with active session management.</li>
          <li><strong>Firewall Filter &amp; Raw Rules:</strong> Network security protection against DDoS, Port Scanning, and malicious site blocking.</li>
          <li><strong>Ruijie Cloud Access Point Integration:</strong> Seamless Wi-Fi coverage across campus buildings.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Key Results &amp; Impact</h3>
        <p>Campus network performance drastically improved with a <strong>90% reduction</strong> in connection complaints. 750 Mbps bandwidth allocation runs stably 24/7 during concurrent usage.</p>
      `
    }
  },
  laravel: {
    badge: { id: "💻 Laravel Web App", en: "💻 Laravel Web App" },
    title: {
      id: "Sistem Layanan Penjaminan Mutu Institusi & E-Library",
      en: "Institutional Quality Assurance & E-Library System"
    },
    img: "assets/images/lpm_cendrawasih.png",
    role: "Full-Stack Web Developer",
    body: {
      id: `
        <h3><i class='bx bx-info-circle'></i> Ringkasan Proyek</h3>
        <p>Mengembangkan aplikasi web penjaminan mutu akademik institusi (SPMI) dan Sistem Informasi E-Library berbasis <strong>Laravel 10</strong> dan <strong>Alpine.js</strong> untuk efisiensi digitalisasi dokumen audit dan perpustakaan.</p>

        <h3><i class='bx bx-wrench'></i> Arsitektur &amp; Fitur Teknis</h3>
        <ul>
          <li><strong>Laravel 10 &amp; Blade Templates:</strong> Struktur MVC modular dengan *Clean Code architecture*.</li>
          <li><strong>Alpine.js Frontend Interactivity:</strong> Pengalaman interaktif tanpa beban berat framework SPA.</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Hak akses berlapis untuk Administrator, Dosen, Auditor, dan Mahasiswa.</li>
          <li><strong>Manajemen Sirkulasi &amp; Katalog PDF:</strong> Pencarian buku instan, e-book reader, dan modul peminjaman online.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Hasil &amp; Manfaat Institusi</h3>
        <p>Mempercepat proses audit penjaminan mutu institusi hingga <strong>3x lebih cepat</strong> dan mempermudah akses koleksi e-library bagi seluruh civitas akademika.</p>
      `,
      en: `
        <h3><i class='bx bx-info-circle'></i> Project Overview</h3>
        <p>Developed institutional Quality Assurance (SPMI) web app and E-Library System powered by <strong>Laravel 10</strong> and <strong>Alpine.js</strong> to digitize audit workflows and library access.</p>

        <h3><i class='bx bx-wrench'></i> Architecture &amp; Technical Features</h3>
        <ul>
          <li><strong>Laravel 10 &amp; Blade Templates:</strong> Modular MVC structure built with Clean Code principles.</li>
          <li><strong>Alpine.js Frontend Interactivity:</strong> Reactive client experience without heavy SPA overhead.</li>
          <li><strong>Role-Based Access Control (RBAC):</strong> Multi-tier permissions for Administrators, Faculty, Auditors, and Students.</li>
          <li><strong>Circulation &amp; PDF Catalog Management:</strong> Instant book searching, e-book reader, and online circulation modules.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Key Impact</h3>
        <p>Accelerated institutional quality audit process by up to <strong>3x faster</strong> while digitizing academic library access.</p>
      `
    }
  },
  infra: {
    badge: { id: "🖥️ Infrastruktur IT", en: "🖥️ IT Infrastructure" },
    title: {
      id: "Deployment Server Linux VPS, Nginx Proxy & Domain Admin",
      en: "Linux VPS Deployment, Nginx Reverse Proxy & Domain Admin"
    },
    img: "assets/images/vps_server.png",
    role: "IT Administrator & DevOps",
    body: {
      id: `
        <h3><i class='bx bx-info-circle'></i> Ringkasan Proyek</h3>
        <p>Mengelola pengalihan domain institusi <strong>.ac.id</strong>, deployment Virtual Private Server (VPS Linux Ubuntu/Debian), dan otomatisasi keamanan sertifikat SSL/TLS.</p>

        <h3><i class='bx bx-wrench'></i> Spesifikasi Server &amp; Konfigurasi</h3>
        <ul>
          <li><strong>Linux Ubuntu/Debian VPS:</strong> Konfigurasi dasar server, manajemen user SSH key, hardening firewall UFW.</li>
          <li><strong>Nginx High-Performance Reverse Proxy:</strong> Melayani lalu lintas request HTTP/HTTPS dengan performa kecepatan tinggi.</li>
          <li><strong>SSL/TLS HTTPS (Let's Encrypt / Commercial Certs):</strong> Enkripsi komunikasi data 100% aman.</li>
          <li><strong>DNS Domain Transfer &amp; Admin (.ac.id):</strong> Konfigurasi A Record, CNAME, MX Record, dan propagasi DNS.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Hasil Utama</h3>
        <p>Situs profil dan aplikasi web institusi berjalan dengan ketersediaan <strong>99.9% uptime</strong> dan keamanan HTTPS terverifikasi penuh.</p>
      `,
      en: `
        <h3><i class='bx bx-info-circle'></i> Project Overview</h3>
        <p>Managed institutional <strong>.ac.id</strong> DNS domain migration, Virtual Private Server deployment (Linux Ubuntu/Debian), and automated SSL/TLS HTTPS security.</p>

        <h3><i class='bx bx-wrench'></i> Server Specs &amp; Configurations</h3>
        <ul>
          <li><strong>Linux Ubuntu/Debian VPS:</strong> Base server provisioning, SSH key management, UFW firewall hardening.</li>
          <li><strong>Nginx High-Performance Reverse Proxy:</strong> High-throughput HTTP/HTTPS traffic routing.</li>
          <li><strong>SSL/TLS HTTPS Certificates:</strong> 100% encrypted data communication protocols.</li>
          <li><strong>DNS Domain Migration (.ac.id):</strong> A Record, CNAME, MX Record configuration and DNS propagation.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Key Results</h3>
        <p>Institutional web profiles and apps run with <strong>99.9% uptime</strong> and fully verified HTTPS security badges.</p>
      `
    }
  },
  database: {
    badge: { id: "🗄️ Database & Web", en: "🗄️ Database & Web" },
    title: {
      id: "Optimasi Basis Data Relasional MySQL & Arsitektur Sistem",
      en: "MySQL Relational Database Optimization & System Architecture"
    },
    img: "assets/images/database_mysql.png",
    role: "Database Architect & Developer",
    body: {
      id: `
        <h3><i class='bx bx-info-circle'></i> Ringkasan Proyek</h3>
        <p>Merancang skema database relasional MySQL yang terstruktur, efisien, dan dinormalisasi untuk sistem data akademik dan dokumen mutu institusi.</p>

        <h3><i class='bx bx-wrench'></i> Pekerjaan Teknis Basis Data</h3>
        <ul>
          <li><strong>Relational Database Modeling (ERD):</strong> Perancangan tabel dengan kunci primer/asing (*foreign keys*) yang konsisten.</li>
          <li><strong>Indexing &amp; Query Optimization:</strong> Mengubah pemrosesan pencarian data besar agar berjalan instan di bawah 50ms.</li>
          <li><strong>Skema Cadangan (Automated Backup):</strong> Otomatisasi jadwal backup basis data ke penyimpanan aman.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Hasil Utama</h3>
        <p>Integritas data terjamin 100% tanpa ada data duplikat, serta kecepatan query data meningkat hingga <strong>2.5x lebih responsif</strong>.</p>
      `,
      en: `
        <h3><i class='bx bx-info-circle'></i> Project Overview</h3>
        <p>Designed structured, normalized relational MySQL database schemas for institutional academic data and quality document management.</p>

        <h3><i class='bx bx-wrench'></i> Technical Database Engineering</h3>
        <ul>
          <li><strong>Relational Database Modeling (ERD):</strong> Schema table design with consistent primary and foreign key constraints.</li>
          <li><strong>Indexing &amp; Query Optimization:</strong> Speeding up query searches under 50ms for large dataset processing.</li>
          <li><strong>Automated Data Backup:</strong> Scheduled database backups to secure external storage.</li>
        </ul>

        <h3><i class='bx bx-trending-up'></i> Key Results</h3>
        <p>100% data integrity with zero redundancy and up to <strong>2.5x faster query performance</strong> responsiveness.</p>
      `
    }
  }
};

const projectModal = document.getElementById("project-modal");
const projectModalClose = document.getElementById("proj-modal-close");

function openProjectModal(key) {
  const data = projectsData[key] || projectsData.network;
  const lang = (typeof currentLang !== "undefined") ? currentLang : "id";

  const badgeElem = document.getElementById("proj-modal-badge");
  const titleElem = document.getElementById("proj-modal-title");
  const imgElem = document.getElementById("proj-modal-img");
  const bodyElem = document.getElementById("proj-modal-body");

  if (badgeElem) badgeElem.textContent = data.badge[lang] || data.badge.id;
  if (titleElem) titleElem.textContent = data.title[lang] || data.title.id;
  if (imgElem) imgElem.src = data.img;
  if (bodyElem) bodyElem.innerHTML = data.body[lang] || data.body.id;

  if (projectModal) {
    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeProjectModal() {
  if (projectModal) {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Bind click events on Dribbble collage badges & photo cards
document.addEventListener("click", (e) => {
  const badgeFrame = e.target.closest(".works-badge-frame");
  if (badgeFrame) {
    const cat = badgeFrame.getAttribute("data-category");
    if (cat) openProjectModal(cat);
    return;
  }

  const collageCard = e.target.closest(".collage-card");
  if (collageCard) {
    openProjectModal(activeCategoryFilter === "all" ? "network" : activeCategoryFilter);
  }
});

if (projectModalClose) {
  projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
    closeProjectModal();
  }
});



