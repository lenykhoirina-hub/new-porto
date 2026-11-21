/**
 * Leny Khoirina Portfolio - Contact Form Handler
 * Opsi A: Murni JavaScript Lokal & Buka Aplikasi Email / Gmail Langsung
 * 100% Client-Side JS: Tanpa FormSubmit, tanpa backend, tanpa perlu aktivasi email.
 */

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const statusDiv = document.getElementById('form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Deteksi bahasa aktif (Bahasa Indonesia jika radio lang-id checked)
    const langIdRadio = document.getElementById('lang-id');
    const isIndonesian = langIdRadio ? langIdRadio.checked : false;

    // Ambil data dari form input
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const subject = document.getElementById('contact-subject')?.value.trim() || '';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    // Target email penerima
    const recipient = 'lenyykhoirina@gmail.com';

    // Format subjek email
    const emailSubject = subject || (isIndonesian
      ? `Pesan Portofolio dari ${name}`
      : `Portfolio Message from ${name}`);

    // Format isi pesan (body)
    const emailBody = isIndonesian
      ? `Halo Leny Khoirina,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}\n\n---\nDikirim dari Formulir Kontak Portofolio Leny Khoirina`
      : `Hello Leny Khoirina,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Leny Khoirina Portfolio Contact Form`;

    // Encode URI untuk link mailto dan Gmail Web
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    const mailtoUrl = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;

    // Tampilkan notifikasi sukses langsung di bawah tombol
    if (statusDiv) {
      statusDiv.className = 'form-status success';
      statusDiv.style.display = 'block';
      statusDiv.innerHTML = isIndonesian
        ? `<strong>✅ Aplikasi Email Sedang Dibuka...</strong><br>
           Pesan Anda sudah otomatis terisi di aplikasi email. Cukup klik tombol <strong>Kirim (Send)</strong> untuk mengantarkannya ke <strong>${recipient}</strong>.<br>
           <span style="display:inline-block; margin-top:0.6rem; font-size:0.82rem;">
             Tidak otomatis terbuka? 
             <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; font-weight:700; text-decoration: underline;">Buka via Gmail Web</a> atau 
             <a href="${mailtoUrl}" style="color: inherit; font-weight:700; text-decoration: underline;">Buka Aplikasi Email</a>
           </span>`
        : `<strong>✅ Opening Your Email App...</strong><br>
           Your message has been pre-filled. Simply click <strong>Send</strong> to deliver it to <strong>${recipient}</strong>.<br>
           <span style="display:inline-block; margin-top:0.6rem; font-size:0.82rem;">
             Didn't open? 
             <a href="${gmailWebUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; font-weight:700; text-decoration: underline;">Open via Gmail Web</a> or 
             <a href="${mailtoUrl}" style="color: inherit; font-weight:700; text-decoration: underline;">Open Email App</a>
           </span>`;
    }

    // Buka aplikasi email default perangkat
    window.location.href = mailtoUrl;

    // Kosongkan form input
    setTimeout(function () {
      form.reset();
    }, 800);
  });
});
