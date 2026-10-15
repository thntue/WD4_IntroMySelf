/**
 * ==============================================================================
 * JAVASCRIPT LOGIC - PORTFOLIO & GIỚI THIỆU BẢN THÂN (thntue)
 * Features:
 *   - Dark/Light mode switcher with LocalStorage
 *   - Dynamic Typewriter Effect for Hero Headline
 *   - Mobile Hamburger Menu Toggle
 *   - ScrollSpy & Smooth Active Navigation
 *   - Animated Number Counters (Statistics)
 *   - Dynamic Category Filter (Skills & Projects)
 *   - Interactive Project Details Modal
 *   - Contact Form Validation & Simulated Submission
 *   - Custom Toast Notifications
 *   - Back-to-Top Button
 * ==============================================================================
 */

// Đảm bảo toàn bộ DOM đã sẵn sàng trước khi thực thi
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initMobileMenu();
  initScrollSpy();
  initCounterAnimation();
  initFilterSystem();
  initContactForm();
  initBackToTop();
  initDownloadCV();
});

/* ==========================================================================
   1. THEME SWITCHER (Giao diện Sáng / Tối)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Lấy theme đã lưu trong LocalStorage hoặc mặc định là 'dark'
  const savedTheme = localStorage.getItem('thntue_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  // Sự kiện khi click nút đổi giao diện
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Đã chuyển sang giao diện ${nextTheme === 'dark' ? 'Tối' : 'Sáng'}`, 'info', 2000);
  });
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('thntue_portfolio_theme', theme);
}

/* ==========================================================================
   2. TYPING EFFECT (Hiệu ứng gõ chữ máy đánh chữ tự động)
   ========================================================================== */
function initTypingEffect() {
  const typedElement = document.getElementById('typed-text');
  if (!typedElement) return;

  const roles = [
    'Lập trình viên Web (Frontend)',
    'Người đam mê công nghệ & sáng tạo',
    'Sinh viên Công nghệ Thông tin',
    'Người luôn học hỏi không ngừng (Lifelong Learner)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenRoles = 2000;

  function typeStep() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    // Khi gõ xong một cụm từ
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeStep, pauseBetweenRoles);
      return;
    }

    // Khi xóa hết một cụm từ
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeStep, 400);
      return;
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeStep, currentSpeed);
  }

  typeStep();
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU (Menu di động)
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  // Bật/tắt menu mobile
  mobileToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Đóng menu khi click vào bất kỳ liên kết nào
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

/* ==========================================================================
   4. SCROLLSPY (Đánh dấu menu đang xem khi cuộn trang)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
}

/* ==========================================================================
   5. ANIMATED STATS COUNTER (Bộ đếm số thống kê)
   ========================================================================== */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const duration = 1800; // 1.8 giây
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counterInterval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease-out quad
        const currentCount = Math.round(target * (progress * (2 - progress)));

        stat.textContent = currentCount;

        if (frame === totalFrames) {
          stat.textContent = target;
          clearInterval(counterInterval);
        }
      }, frameDuration);
    });
  }

  // Sử dụng IntersectionObserver để chỉ kích hoạt khi lướt tới
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-container');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   6. DYNAMIC CATEGORY FILTER (Lọc Kỹ Năng & Dự Án)
   ========================================================================== */
function initFilterSystem() {
  // Lọc Kỹ năng
  setupFilter('skills-filter', '.skill-card');

  // Lọc Dự án
  setupFilter('projects-filter', '.project-card');
}

function setupFilter(filterContainerId, itemSelector) {
  const filterContainer = document.getElementById(filterContainerId);
  if (!filterContainer) return;

  const filterButtons = filterContainer.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll(itemSelector);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Đổi trạng thái active nút bấm
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
          item.style.animation = 'fadeInItem 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECT DETAILS MODAL (Xem chi tiết dự án)
   ========================================================================== */
// Cơ sở dữ liệu mẫu về các dự án
const projectDataStore = {
  1: {
    title: 'WD4_IntroMySelf - Portfolio Cá Nhân',
    bannerClass: 'thumb-portfolio',
    bannerIcon: 'fa-solid fa-id-card-clip',
    description: 'Trang web hồ sơ cá nhân toàn diện được xây dựng bằng HTML5 chuẩn ngữ nghĩa, CSS3 hiện đại kết hợp CSS Custom Properties và JavaScript ES6 thuần. Trang web tích hợp chuyển đổi giao diện Sáng/Tối, lọc kỹ năng, bộ đếm thống kê sinh động và form phản hồi trực tiếp.',
    tags: ['HTML5', 'CSS3 Flex/Grid', 'JavaScript ES6', 'Responsive Web', 'GitHub Pages'],
    features: [
      'Giao diện tương thích hoàn hảo từ điện thoại di động đến màn hình máy tính lớn.',
      'Hiệu ứng gõ chữ (Typewriter Effect) đa chức danh tại phần đầu trang.',
      'Chế độ Dark/Light Mode lưu giữ tùy chọn của người dùng qua LocalStorage.',
      'Bộ lọc kỹ năng và dự án tương tác động mượt mà không cần tải lại trang.',
      'Form gửi tin nhắn có kiểm tra tính hợp lệ dữ liệu (Validation) kèm thông báo Toast.'
    ],
    repoLink: 'https://github.com/thntue/WD4_IntroMySelf'
  },
  2: {
    title: 'TaskFlow - Quản Lý Công Việc Cá Nhân',
    bannerClass: 'thumb-task',
    bannerIcon: 'fa-solid fa-list-check',
    description: 'Ứng dụng Web Todo & Quản lý tiến độ công việc theo bảng Kanban cá nhân. Cho phép người dùng thêm, sửa, đánh dấu hoàn thành, phân loại mức độ ưu tiên và tìm kiếm nhanh các nhiệm vụ trong ngày.',
    tags: ['JavaScript ES6', 'HTML5 Drag & Drop', 'LocalStorage', 'CSS Grid'],
    features: [
      'Lưu trữ trạng thái danh sách công việc tự động qua LocalStorage, không bị mất khi F5.',
      'Phân loại công việc theo mức độ quan trọng: Khẩn cấp, Cao, Trung bình, Thấp.',
      'Tính năng lọc và tìm kiếm từ khóa công việc theo thời gian thực.',
      'Giao diện trực quan với thanh tiến độ % hoàn thành các đầu việc trong ngày.'
    ],
    repoLink: 'https://github.com/thntue'
  },
  3: {
    title: 'WeatherWise - Dự Báo Thời Tiết Toàn Cầu',
    bannerClass: 'thumb-weather',
    bannerIcon: 'fa-solid fa-cloud-sun-rain',
    description: 'Ứng dụng tra cứu thông tin thời tiết theo thời gian thực sử dụng OpenWeatherMap API. Hiển thị nhiệt độ, độ ẩm, tốc độ gió, chỉ số UV và dự báo nhiệt độ các ngày tiếp theo với giao diện thay đổi theo thời tiết hiện tại.',
    tags: ['Fetch API', 'Async / Await', 'RESTful API', 'CSS Variables'],
    features: [
      'Tìm kiếm thời tiết theo tên thành phố bất kỳ trên toàn cầu.',
      'Giao diện đổi màu động (nắng, mưa, mây mù, ban đêm) dựa theo điều kiện thời tiết thực.',
      'Xử lý ngoại lệ mạng và hiển thị thông báo lỗi thân thiện khi không tìm thấy địa điểm.',
      'Chuyển đổi linh hoạt giữa thang đo nhiệt độ Độ C (°C) và Độ F (°F).'
    ],
    repoLink: 'https://github.com/thntue'
  },
  4: {
    title: 'WebDev Quiz Battle - Trắc Nghiệm Web Tương Tác',
    bannerClass: 'thumb-quiz',
    bannerIcon: 'fa-solid fa-brain',
    description: 'Trò chơi trắc nghiệm vui về kiến thức Frontend (HTML, CSS, JS) với đồng hồ đếm ngược, tính điểm theo tốc độ trả lời và bảng tổng kết thành tích kèm giải thích cặn kẽ từng câu hỏi.',
    tags: ['Game Logic', 'DOM API', 'Audio Effects', 'CSS Keyframes'],
    features: [
      'Bộ câu hỏi phong phú phân cấp từ cơ bản đến nâng cao.',
      'Đồng hồ đếm ngược 15 giây cho mỗi câu hỏi kích thích tư duy nhanh.',
      'Âm thanh và hiệu ứng hạt rực rỡ khi trả lời đúng các chuỗi combo liên tiếp.',
      'Màn hình tổng kết điểm chi tiết kèm phân tích điểm mạnh - điểm cần cải thiện.'
    ],
    repoLink: 'https://github.com/thntue'
  }
};

window.openProjectModal = function(projectId) {
  const modal = document.getElementById('project-modal');
  const project = projectDataStore[projectId];
  if (!modal || !project) return;

  // Điền dữ liệu vào Modal
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  document.getElementById('modal-repo-link').setAttribute('href', project.repoLink);

  // Banner
  const banner = document.getElementById('modal-banner');
  banner.className = `modal-banner ${project.bannerClass}`;
  banner.innerHTML = `<i class="${project.bannerIcon}"></i>`;

  // Tags
  const tagsContainer = document.getElementById('modal-tags');
  tagsContainer.innerHTML = '';
  project.tags.forEach(t => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    tagsContainer.appendChild(span);
  });

  // Features
  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = '';
  project.features.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f;
    featuresList.appendChild(li);
  });

  // Hiển thị modal
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Ngăn cuộn trang ngầm
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

// Đóng modal khi nhấn ra nền đen ngoài hộp thoại hoặc bấm phím Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

/* ==========================================================================
   8. CONTACT FORM VALIDATION & SUBMISSION (Form Liên Hệ)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('btn-submit-contact');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Xóa lỗi cũ
    clearErrors();

    let isValid = true;

    // 1. Kiểm tra Họ và tên
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'name-error', 'Vui lòng nhập họ và tên của bạn.');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showFieldError(nameInput, 'name-error', 'Họ tên phải có ít nhất 2 ký tự.');
      isValid = false;
    }

    // 2. Kiểm tra Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showFieldError(emailInput, 'email-error', 'Vui lòng nhập địa chỉ email.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, 'email-error', 'Định dạng email không hợp lệ (Ví dụ: name@example.com).');
      isValid = false;
    }

    // 3. Kiểm tra Tiêu đề
    if (!subjectInput.value.trim()) {
      showFieldError(subjectInput, 'subject-error', 'Vui lòng nhập tiêu đề tin nhắn.');
      isValid = false;
    }

    // 4. Kiểm tra Nội dung tin nhắn
    if (!messageInput.value.trim()) {
      showFieldError(messageInput, 'message-error', 'Vui lòng nhập nội dung tin nhắn.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showFieldError(messageInput, 'message-error', 'Nội dung tin nhắn cần ít nhất 10 ký tự.');
      isValid = false;
    }

    if (!isValid) {
      showToast('Vui lòng kiểm tra lại các trường thông tin bị lỗi.', 'error', 3000);
      return;
    }

    // Giả lập trạng thái gửi tin nhắn bất đồng bộ
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-flex';
    submitBtn.disabled = true;

    setTimeout(() => {
      btnText.style.display = 'inline-flex';
      btnSpinner.style.display = 'none';
      submitBtn.disabled = false;

      // Reset form và thông báo thành công
      form.reset();
      showToast('🎉 Tin nhắn của bạn đã được gửi thành công! Cảm ơn bạn đã liên hệ.', 'success', 5000);
    }, 1500);
  });

  // Lắng nghe sự kiện gõ phím để xóa lỗi ngay khi người dùng sửa
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const errorSpan = document.getElementById(`${input.id}-error`);
      if (errorSpan) errorSpan.textContent = '';
    });
  });
}

function showFieldError(inputElement, errorElementId, message) {
  inputElement.classList.add('is-invalid');
  const errorElem = document.getElementById(errorElementId);
  if (errorElem) {
    errorElem.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll('.form-control').forEach(input => input.classList.remove('is-invalid'));
  document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
}

/* ==========================================================================
   9. TOAST NOTIFICATION COMPONENT (Thông báo Toast)
   ========================================================================== */
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconHtml = '<i class="fa-solid fa-circle-info" style="color: var(--primary);"></i>';
  if (type === 'success') {
    iconHtml = '<i class="fa-solid fa-circle-check text-success"></i>';
  } else if (type === 'error') {
    iconHtml = '<i class="fa-solid fa-circle-exclamation text-danger"></i>';
  }

  toast.innerHTML = `${iconHtml}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInToast 0.3s ease-out reverse forwards';
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, duration);
}

/* ==========================================================================
   10. BACK TO TOP BUTTON (Nút quay lại đầu trang)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   11. DOWNLOAD CV SIMULATION (Tải CV)
   ========================================================================== */
function initDownloadCV() {
  const downloadBtn = document.getElementById('btn-download-cv');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    showToast('📄 Đang khởi tạo và chuẩn bị bản tóm tắt CV của thntue...', 'info', 2500);

    setTimeout(() => {
      // Tạo một file CV tóm tắt dạng Text/Markdown tải về trực tiếp
      const cvContent = `=====================================================
HỒ SƠ CÁ NHÂN & NĂNG LỰC CHUYÊN MÔN - THNTUE
=====================================================
- Họ và tên: Tuệ (thntue)
- Vị trí: Frontend Web Developer
- Email: contact.thntue@gmail.com
- GitHub: https://github.com/thntue
- Repo dự án: https://github.com/thntue/WD4_IntroMySelf

KỸ NĂNG CHUYÊN MÔN:
- HTML5 (Semantic, SEO, Accessibility)
- CSS3 (Flexbox, Grid, Animations, Responsive, Theme System)
- JavaScript ES6+ (DOM API, Async/Await, Fetch, LocalStorage)
- Version Control: Git & GitHub Pages

DỰ ÁN TIÊU BIỂU:
1. WD4_IntroMySelf - Website Hồ Sơ & Giới Thiệu Bản Thân
2. TaskFlow - Ứng dụng quản lý công việc Todo cá nhân
3. WeatherWise - Tra cứu thời tiết theo thời gian thực
4. WebDev Quiz Battle - Trò chơi trắc nghiệm kiến thức lập trình Web
=====================================================`;

      const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_thntue_FrontendDeveloper.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('✅ Tải CV thành công!', 'success', 3000);
    }, 1200);
  });
}
