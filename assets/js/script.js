document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return; // biar aman kalau tombol tidak ada di halaman tertentu

  // Ambil tema yang tersimpan di localStorage
  const savedTheme = localStorage.getItem("theme");

  // Fungsi untuk menerapkan tema
  function applyTheme(theme) {
    // Hapus semua kelas tema
    document.body.classList.remove("theme-white", "theme-green-gold");
    // Tambahkan kelas tema yang baru
    document.body.classList.add(theme);

    // Ubah teks tombol sesuai tema
    toggleBtn.textContent = theme === "theme-white" ? "🌙 Tema" : "☀️ Tema";

    // Opsional: ganti warna tombol outline sesuai tema (kalau perlu override)
    const btns = document.querySelectorAll(".btn-outline-success");
    btns.forEach(btn => {
      if (theme === "theme-green-gold") {
        btn.style.color = "#fff";
        btn.style.borderColor = "#fff";
      } else {
        btn.style.color = "#198754";
        btn.style.borderColor = "#198754";
      }
    });
  }

  // Terapkan tema awal
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      applyTheme("theme-green-gold"); // siang
    } else {
      applyTheme("theme-white"); // malam
    }
  }

  // Event klik tombol toggle
  toggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("theme-white")) {
      applyTheme("theme-green-gold");
      localStorage.setItem("theme", "theme-green-gold");
    } else {
      applyTheme("theme-white");
      localStorage.setItem("theme", "theme-white");
    }
  });
});








