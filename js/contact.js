/**
 * Leny Khoirina Portfolio - Contact Form Handler (AJAX)
 * Mengirim pesan via FormSubmit secara asinkron (AJAX) tanpa reload atau redirect.
 * 
 * CATATAN PENGHAPUSAN:
 * File ini berdiri sendiri. Jika Anda berubah pikiran dan ingin kembali ke form murni HTML:
 * 1. Hapus file ini (js/contact.js), ATAU
 * 2. Hapus baris `<script src="js/contact.js"></script>` di index.html.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('form-status');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Deteksi bahasa aktif (Bahasa Indonesia jika radio lang-id checked)
    const langIdRadio = document.getElementById('lang-id');
    const isIndonesian = langIdRadio ? langIdRadio.checked : false;

    // Simpan konten asli tombol (teks bilingual)
    const originalBtnHTML = submitBtn.innerHTML;

    // Ubah status tombol saat sedang memproses
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.innerHTML = isIndonesian
      ? '<span>Mengirim pesan...</span>'
      : '<span>Sending message...</span>';

    // Bersihkan tampilan status sebelumnya
    if (statusDiv) {
      statusDiv.className = 'form-status';
      statusDiv.style.display = 'none';
      statusDiv.textContent = '';
    }

    // Ambil data form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/lenyykhoirina@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (!result || result.success === 'true' || result.success === true)) {
        // Sukses terkirim
        form.reset();

        if (statusDiv) {
          statusDiv.className = 'form-status success';
          statusDiv.style.display = 'block';
          statusDiv.innerHTML = isIndonesian
            ? '<strong>✅ Pesan Berhasil Terkirim!</strong><br>Terima kasih sudah menghubungi. Pesan Anda telah terkirim ke email saya.'
            : '<strong>✅ Message Sent Successfully!</strong><br>Thank you for reaching out. Your message has been delivered to my inbox.';
        }
      } else {
        throw new Error(result && result.message ? result.message : 'Submission failed');
      }
    } catch (error) {
      console.error('Form submit error:', error);

      if (statusDiv) {
        statusDiv.className = 'form-status error';
        statusDiv.style.display = 'block';

        // Berikan panduan khusus jika dibuka langsung via file://
        if (window.location.protocol === 'file:') {
          statusDiv.innerHTML = isIndonesian
            ? '<strong>⚠️ Browser Membatasi Pengiriman (file://)</strong><br>Browser memblokir pengiriman AJAX dari file lokal. Buka proyek ini lewat <em>Live Server</em> (VS Code) agar pesan dapat terkirim secara online.'
            : '<strong>⚠️ Local File Restriction (file://)</strong><br>Browser blocks local AJAX requests. Please run via <em>Live Server</em> in VS Code.';
        } else {
          statusDiv.innerHTML = isIndonesian
            ? '<strong>⚠️ Gagal Mengirim Pesan</strong><br>Terjadi kendala jaringan. Silakan coba lagi atau kirim email langsung ke <a href="mailto:lenyykhoirina@gmail.com" style="color: inherit; text-decoration: underline;">lenyykhoirina@gmail.com</a>.'
            : '<strong>⚠️ Failed to Send Message</strong><br>Network error occurred. Please try again or email directly to <a href="mailto:lenyykhoirina@gmail.com" style="color: inherit; text-decoration: underline;">lenyykhoirina@gmail.com</a>.';
        }
      }
    } finally {
      // Kembalikan tombol ke keadaan semula
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
});
