document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("themeToggle");

  // cek dulu apakah ada pilihan manual user
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.body.className = savedTheme;
    toggleBtn.textContent = savedTheme === "theme-white" ? "🌙 Tema" : "☀️ Tema";
  } else {
    // kalau tidak ada, tentukan otomatis berdasarkan jam
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      document.body.className = "theme-green-gold";
      toggleBtn.textContent = "☀️ Tema";
    } else {
      document.body.className = "theme-white";
      toggleBtn.textContent = "🌙 Tema";
    }
  }

  // event klik tombol
  toggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("theme-white")) {
      document.body.classList.replace("theme-white", "theme-green-gold");
      toggleBtn.textContent = "☀️ Tema";
      localStorage.setItem("theme", "theme-green-gold");
    } else {
      document.body.classList.replace("theme-green-gold", "theme-white");
      toggleBtn.textContent = "🌙 Tema";
      localStorage.setItem("theme", "theme-white");
    }
  });
});
