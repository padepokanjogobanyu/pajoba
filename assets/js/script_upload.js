document.addEventListener("DOMContentLoaded", () => {
  const CLOUD_NAME = "dpcul0p7j";
  const UPLOAD_PRESET = "unsigned_preset"; // ganti sesuai upload preset unsigned kamu

  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const folderSelect = document.getElementById("folder");
  const preview = document.getElementById("preview");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const folder = folderSelect.value;

    console.log("📂 Folder dipilih:", folder);

    if (!file) {
      alert("Silakan pilih file dulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folder);
    formData.append("use_filename", "true"); // pakai nama asli file
    formData.append("unique_filename", "false"); // jangan tambahkan hash unik

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("✅ Response Cloudinary:", data);

      if (data.secure_url) {
        preview.innerHTML = `
          <p>✅ Upload berhasil!</p>
          <img src="${data.secure_url}" alt="preview" style="max-width:300px;margin-top:10px;">
          <p>Link: <a href="${data.secure_url}" target="_blank">${data.secure_url}</a></p>
        `;
      } else {
        preview.innerHTML = `<p style="color:red;">❌ Upload gagal! ${data.error?.message || ""}</p>`;
      }
    } catch (err) {
      console.error("🚨 Error:", err);
      preview.innerHTML = `<p style="color:red;">❌ Gagal upload!</p>`;
    }
  });
});













