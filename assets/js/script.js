document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return; // kalau di halaman tertentu tidak ada tombol, biar aman

  const savedTheme = localStorage.getItem("theme");

  function applyTheme(theme) {
    document.body.classList.remove("theme-white", "theme-green-gold");
    document.body.classList.add(theme);
    toggleBtn.textContent = theme === "theme-white" ? "🌙 Tema" : "☀️ Tema";
  }

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

/* Tombol pada Tema Hijau + Gold */
body.theme-green-gold .btn-success {
  background-color: #b8860b;  /* gold */
  border-color: #b8860b;
  color: #fff;                /* teks putih agar terlihat */
}
body.theme-green-gold .btn-outline-success {
  color: #fff;
  border-color: #fff;
}
body.theme-green-gold .btn-outline-success:hover {
  background-color: #fff;
  color: #146c43;
}

/* Tombol pada Tema Putih (default) */
body.theme-white .btn-success {
  background-color: #146c43;
  border-color: #146c43;
  color: #fff;
}
body.theme-white .btn-outline-success {
  color: #198754;
  border-color: #198754;
}
body.theme-white .btn-outline-success:hover {
  background-color: #198754;
  color: #fff;
}


