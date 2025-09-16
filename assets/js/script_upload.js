// script_upload.js (revisi untuk unsigned uploads)
// Pastikan upload preset yang kamu pakai adalah "Unsigned" di Cloudinary
document.addEventListener("DOMContentLoaded", () => {
  const CLOUD_NAME = "dpcul0p7j";
  const UPLOAD_PRESET = "jogobanyu_upload"; // <-- ganti dengan nama preset unsigned kamu

  const form = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const folderSelect = document.getElementById("folder");
  const preview = document.getElementById("preview");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const folder = (folderSelect && folderSelect.value) ? folderSelect.value : "";

    console.log("📂 Folder dipilih:", folder);
    console.log("📄 File:", file ? file.name : "(tidak ada)");

    if (!file) {
      alert("Silakan pilih file dulu!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    // NOTE: jangan gunakan `use_filename` atau `unique_filename` untuk unsigned upload —
    // Cloudinary menolak parameter tersebut untuk unsigned. (lihat error sebelumnya)
    //
    // Jika preset unsigned-mu mengizinkan public_id (cek di console Cloudinary),
    // dan kamu mau pakai nama file sebagai public_id, kamu bisa
    // meng-uncomment baris di bawah ini. Namun ingat: overwrite = false untuk unsigned,
    // jadi upload baru dengan public_id yang sama *tidak* akan menimpa file lama.
    //
    // formData.append("public_id", file.name.split(".")[0]);

    try {
      console.log("➡️ Mengirim request ke Cloudinary... (endpoint upload)");
      // debug: tampilkan isi formData (untuk key non-file, file akan tampil sebagai File object)
      for (const pair of formData.entries()) {
        console.log("formData:", pair[0], pair[1]);
      }

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      // Cloudinary selalu mengembalikan JSON; bisa berisi error
      const data = await res.json();
      console.log("✅ Response Cloudinary:", data);

      if (data.error) {
        console.error("🔴 Cloudinary error:", data.error);
        preview.innerHTML = `<p style="color:red;">❌ Upload gagal! ${data.error.message}</p>`;
        return;
      }

      const url = data.secure_url || data.url;
      preview.innerHTML = `
        <p>✅ Upload berhasil!</p>
        <img src="${url}" alt="preview" style="max-width:300px;margin-top:10px;">
        <p>Link: <a href="${url}" target="_blank">${url}</a></p>
        <pre style="margin-top:8px;font-size:12px">public_id: ${data.public_id}\nresource_type: ${data.resource_type}\nformat: ${data.format}</pre>
      `;

    } catch (err) {
      console.error("🚨 Fetch error:", err);
      preview.innerHTML = `<p style="color:red;">❌ Gagal upload! ${err.message}</p>`;
    }
  });
});
















