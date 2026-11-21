/**
 * Leny Khoirina Portfolio - Contact Form Handler
 * Powered by Web3Forms API (100% Client-Side AJAX)
 * 
 * Fitur:
 * - Tidak ada redirect ke halaman lain
 * - Tidak ada jendela pop-up atau aplikasi email yang terbuka
 * - Pesan dikirim hening di latar belakang (background)
 * - Muncul notifikasi sukses "✅ Pesan Berhasil Terkirim!" di tempat
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('form-status');

  // Access Key resmi Web3Forms milik lenyykhoirina@gmail.com
  const ACCESS_KEY = '2246448f-4df9-48f8-a972-ad253a781ce7';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Deteksi bahasa aktif (Bahasa Indonesia jika radio lang-id checked)
    const langIdRadio = document.getElementById('lang-id');
    const isIndonesian = langIdRadio ? langIdRadio.checked : false;

    // Simpan konten asli tombol (teks bilingual)
    const originalBtnHTML = submitBtn.innerHTML;

    // Ubah tampilan tombol saat proses kirim
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.innerHTML = isIndonesian
      ? '<span>Mengirim pesan...</span>'
      : '<span>Sending message...</span>';

    // Bersihkan status sebelumnya
    if (statusDiv) {
      statusDiv.className = 'form-status';
      statusDiv.style.display = 'none';
      statusDiv.textContent = '';
    }

    // Ambil data dari input form
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const subject = document.getElementById('contact-subject')?.value.trim() || '';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    // Susun payload data untuk Web3Forms
    const payload = {
      access_key: ACCESS_KEY,
      from_name: 'Portofolio Leny Khoirina',
      subject: subject || (isIndonesian
        ? `Pesan Baru dari ${name} (Portofolio)`
        : `New Message from ${name} (Portfolio)`),
      name: name,
      email: email,
      message: message
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && (result.success === true || result.success === 'true')) {
        // Pesan sukses terkirim!
        form.reset();

        if (statusDiv) {
          statusDiv.className = 'form-status success';
          statusDiv.style.display = 'block';
          statusDiv.innerHTML = isIndonesian
            ? '<strong>✅ Pesan Berhasil Terkirim!</strong><br>Terima kasih sudah menghubungi. Pesan Anda telah langsung masuk ke email saya.'
            : '<strong>✅ Message Sent Successfully!</strong><br>Thank you for reaching out. Your message has been delivered to my inbox.';
        }
      } else {
        const errorDetail = result && result.message ? result.message : 'Submission failed';
        throw new Error(errorDetail);
      }
    } catch (error) {
      console.error('Error sending message:', error);

      if (statusDiv) {
        statusDiv.className = 'form-status error';
        statusDiv.style.display = 'block';

        // Deteksi jika dibuka langsung via file://
        if (window.location.protocol === 'file:') {
          statusDiv.innerHTML = isIndonesian
            ? '<strong>⚠️ Browser Membatasi Pengiriman (file://)</strong><br>Browser memblokir pengiriman AJAX dari file lokal. Buka proyek ini lewat <em>Live Server</em> (VS Code) agar pesan dapat terkirim secara online.'
            : '<strong>⚠️ Local File Restriction (file://)</strong><br>Browser blocks local AJAX requests. Please run via <em>Live Server</em> in VS Code.';
        } else {
          statusDiv.innerHTML = isIndonesian
            ? '<strong>⚠️ Gagal Mengirim Pesan</strong><br>Terjadi kendala koneksi. Silakan periksa jaringan internet Anda atau kirim langsung ke <a href="mailto:lenyykhoirina@gmail.com" style="color: inherit; text-decoration: underline;">lenyykhoirina@gmail.com</a>.'
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
