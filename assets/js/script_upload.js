document.addEventListener("DOMContentLoaded", () => {
  const CLOUD_NAME = "dpcul0p7j";  // cloud name kamu
  const UPLOAD_PRESET = "jogobanyu_upload";  // preset dari Cloudinary

  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const folderSelect = document.getElementById("folder");
  const preview = document.getElementById("preview");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const folder = folderSelect.value;

    console.log("📂 File yang dipilih:", file);
    console.log("📁 Folder tujuan:", folder);

    if (!file) {
      alert("Silakan pilih file dulu!");
      console.warn("⚠️ Tidak ada file dipilih");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folder);

    console.log("🚀 Data siap dikirim ke Cloudinary:", [...formData]);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("✅ Respon Cloudinary:", data);

      if (data.secure_url) {
        preview.innerHTML = `
          <p>✅ Upload berhasil!</p>
          <img src="${data.secure_url}" alt="preview" style="max-width:300px;margin-top:10px;">
          <p>Link: <a href="${data.secure_url}" target="_blank">${data.secure_url}</a></p>
        `;
      } else {
        preview.innerHTML = `<p style="color:red;">❌ Upload gagal: ${data.error?.message || "Unknown error"}</p>`;
      }
    } catch (err) {
      console.error("❌ Error saat upload:", err);
      preview.innerHTML = `<p style="color:red;">❌ Gagal upload!</p>`;
    }
  });
});








