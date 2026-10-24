'use strict';
const $ = (selector, scope = document) => scope.querySelector(selector);
const menu = $('.menu-toggle');
const navigation = $('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
}
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu(); menu.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('header')) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
const topButton = $('.back-top');
window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 500), { passive: true });
topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  $('.brand').focus({ preventScroll: true });
});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
const config = window.CLINIC_CONFIG || {};
document.querySelectorAll('[data-clinic-address]').forEach((element) => { if (config.address) element.textContent = config.address; });
const contact = $('[data-clinic-contact]');
if (contact && (config.phone || config.email)) {
  contact.replaceChildren();
  if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    const a = document.createElement('a'); a.href = 'mailto:' + config.email; a.textContent = config.email; contact.append(a, document.createElement('br'));
  }
  if (config.phone && /^[+\d\s().-]+$/.test(config.phone)) {
    const a = document.createElement('a'); a.href = 'tel:' + config.phone.replace(/[^+\d]/g, ''); a.textContent = config.phone; contact.append(a);
  }
}
const dialog = $('#info-dialog');
$('.close-dialog', dialog).addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
document.querySelectorAll('.profile-button').forEach((button) => button.addEventListener('click', () => {
  const panel = $('#dialog-content'); panel.replaceChildren();
  const label = document.createElement('span'); label.className = 'eyebrow'; label.textContent = button.dataset.specialty + ' · SAMPLE PROFILE';
  const title = document.createElement('h2'); title.textContent = button.dataset.name;
  const copy = document.createElement('p'); copy.textContent = 'This illustrative profile comes from the supplied design reference. The clinic will add verified qualifications, professional registration, experience and availability before launch.';
  const link = document.createElement('a'); link.className = 'button'; link.href = 'appointment.html?department=' + button.dataset.specialty.toLowerCase(); link.textContent = 'Explore appointment options →';
  panel.append(label, title, copy, link); dialog.showModal();
}));
function downloadDraft(text, filename) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function result(form, heading, description, text, filename) {
  const output = $('.form-result', form); output.replaceChildren();
  const h = document.createElement('h3'); h.textContent = heading;
  const p = document.createElement('p'); p.textContent = description;
  const pre = document.createElement('pre'); pre.textContent = text;
  const button = document.createElement('button'); button.type = 'button'; button.className = 'button'; button.textContent = 'Download my draft ↓';
  button.addEventListener('click', () => downloadDraft(text, filename));
  output.append(h, p, pre, button); output.hidden = false; output.focus();
  output.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
}
const booking = $('#appointment-form');
const query = new URLSearchParams(window.location.search);
if (booking) {
  const dateInput = $('[name=date]', booking);
  const now = new Date(); const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  dateInput.min = localToday;
  const requested = query.get('department');
  if ([...booking.elements.department.options].some((option) => option.value === requested)) booking.elements.department.value = requested;
  booking.addEventListener('submit', (event) => {
    event.preventDefault(); if (!booking.reportValidity()) return;
    const data = new FormData(booking);
    if (String(data.get('date')) < localToday) { dateInput.setCustomValidity('Choose today or a future date.'); dateInput.reportValidity(); return; }
    const selected = booking.elements.department.selectedOptions[0].textContent;
    const text = `APPOINTMENT REQUEST DRAFT\nNot sent. Not a confirmed booking.\n\nName: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\nDepartment: ${selected}\nPreferred date: ${data.get('date')}\nPreferred time: ${data.get('time')}\n\nPlease confirm availability directly with the clinic.`;
    result(booking, 'Your request is ready to review.', 'Nothing has been sent. You can download this draft and arrange your visit with the clinic when verified contact details are available.', text, 'appointment-request-draft.txt');
  });
  dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
  booking.addEventListener('input', () => { $('.form-result', booking).hidden = true; });
}
const contactForm = $('#contact-form');
if (contactForm) {
  const subject = query.get('subject');
  if ([...contactForm.elements.subject.options].some((option) => option.value === subject)) contactForm.elements.subject.value = subject;
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const text = `CONTACT MESSAGE DRAFT\nNot sent.\n\nName: ${data.get('firstName').trim()} ${data.get('lastName').trim()}\nEmail: ${data.get('email').trim()}\nSubject: ${data.get('subject')}\n\n${data.get('message').trim()}`;
    result(contactForm, 'Your message draft is ready.', 'Nothing has been sent. Review and download your draft. Clinic contact details need to be configured before messages can be delivered.', text, 'clinic-message-draft.txt');
  });
  contactForm.addEventListener('input', () => { $('.form-result', contactForm).hidden = true; });
}
