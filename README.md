# 🌟 WD4_IntroMySelf - Website Giới Thiệu Bản Thân (Portfolio)

Dự án trang web hồ sơ cá nhân giới thiệu bản thân được xây dựng bằng các công nghệ nền tảng **HTML5, CSS3 và JavaScript ES6 thuần** (Vanilla JS). Giao diện hiện đại, tối ưu trải nghiệm người dùng, tương thích đa thiết bị (Responsive Design) và hỗ trợ chế độ Sáng / Tối (Light / Dark mode).

---

## 🌐 Đường Dẫn Trực Tiếp (Live Demo)

- 🔗 **Link Web để nộp bài (GitHub Pages):** [https://thntue.github.io/WD4_IntroMySelf/](https://thntue.github.io/WD4_IntroMySelf/)
- 📁 **Link Kho lưu trữ (GitHub Repository):** [https://github.com/thntue/WD4_IntroMySelf](https://github.com/thntue/WD4_IntroMySelf)

---

## 🛠️ Công Nghệ & Kỹ Thuật Sử Dụng

### 1. HTML5 (`index.html`)
- Cấu trúc ngữ nghĩa chuẩn SEO (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Form nhập liệu tương tác với các thuộc tính kiểm tra (`required`, `type`, `placeholder`).
- Thiết kế hỗ trợ khả năng tiếp cận (Accessibility - a11y) với các thuộc tính `aria-label`, `aria-hidden`, `aria-expanded`.
- Tích hợp Google Fonts (*Plus Jakarta Sans*) và thư viện biểu tượng vector *Font Awesome 6*.

### 2. CSS3 (`style.css`)
- **CSS Custom Properties (Variables):** Quản lý bảng màu tập trung, hỗ trợ chuyển đổi giao diện Dark Mode & Light Mode tức thì.
- **Modern Layouts:** Kết hợp linh hoạt giữa **CSS Flexbox** và **CSS Grid System**.
- **Hiệu ứng & Hoạt ảnh:** 
  - Hiệu ứng phát sáng mềm mại (Glassmorphism & Radial Glow).
  - Hoạt ảnh lượn sóng, xoay vòng nhẹ, và các huy hiệu công nghệ bay lơ lửng (`@keyframes`).
  - Thanh tiến độ (Progress Bars) thể hiện mức độ thông thạo kỹ năng.
- **Responsive Web Design:** Tối ưu hiển thị hoàn hảo trên mọi kích thước màn hình (Điện thoại, Máy tính bảng, Laptop, Màn hình lớn).

### 3. JavaScript (`script.js`)
Trang bị đầy đủ các hàm xử lý logic và tương tác người dùng:
1. `initTheme()` & `setTheme()`: Bật/tắt chế độ Sáng/Tối và lưu trữ trạng thái vào `localStorage`.
2. `initTypingEffect()`: Hiệu ứng gõ chữ và xóa chữ tự động (Typewriter Effect) cho tiêu đề nghề nghiệp.
3. `initMobileMenu()`: Xử lý mở/đóng thanh điều hướng Hamburger trên thiết bị di động, tự động đóng khi chọn mục hoặc bấm ra ngoài.
4. `initScrollSpy()`: Lắng nghe sự kiện cuộn trang để đánh dấu liên kết đang xem trên thanh điều hướng.
5. `initCounterAnimation()`: Sử dụng `IntersectionObserver` kích hoạt bộ đếm số thống kê tăng dần sinh động khi người dùng cuộn đến vị trí.
6. `setupFilter()`: Bộ lọc động phân loại danh mục Kỹ năng và Dự án theo thời gian thực không cần tải lại trang.
7. `openProjectModal()` & `closeProjectModal()`: Cửa sổ Modal Popup xem chi tiết dự án, công nghệ và tính năng nổi bật (hỗ trợ phím `ESC` để đóng).
8. `initContactForm()`: Kiểm tra tính hợp lệ dữ liệu (Validation) các trường Họ tên, Email (Regex), Tiêu đề, Nội dung; mô phỏng trạng thái gửi bất đồng bộ.
9. `showToast()`: Hệ thống thông báo nổi (Toast Notification) với các trạng thái thành công, cảnh báo, thông tin.
10. `initBackToTop()`: Nút cuộn mượt mà quay lại đầu trang.
11. `initDownloadCV()`: Tự động khởi tạo và tải file tóm tắt hồ sơ về máy người dùng.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
WD4_IntroMySelf/
├── index.html        # Trang giao diện chính của website
├── style.css         # Toàn bộ định kiểu, hiệu ứng và responsive
├── script.js         # Các hàm xử lý logic JavaScript tương tác
└── README.md         # Tài liệu mô tả và hướng dẫn sử dụng
```

---

## 🚀 Hướng Dẫn Kích Hoạt GitHub Pages (Nếu Cần)

1. Truy cập vào kho lưu trữ: [https://github.com/thntue/WD4_IntroMySelf](https://github.com/thntue/WD4_IntroMySelf).
2. Vào mục **Settings** (Cài đặt) > chọn **Pages** ở thanh menu bên trái.
3. Tại phần **Build and deployment**:
   - **Source:** Chọn `Deploy from a branch`.
   - **Branch:** Chọn `main` và thư mục `/ (root)`.
   - Nhấn **Save**.
4. Chờ 1 - 2 phút, trang web sẽ được xuất bản tại:  
   👉 **`https://thntue.github.io/WD4_IntroMySelf/`**

---

*Dự án hoàn thành bởi **thntue** - 2026.*