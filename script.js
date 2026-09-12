const gallery = document.querySelector('#gallery');
const photo = document.querySelector('#gallery-image');
const video = document.querySelector('#gallery-video');
const caption = document.querySelector('#gallery-caption');
const slides = [
  ['img/canios.jpeg', 'Cânions de Furnas'],
  ['img/passeio2.jpeg', 'Sua lancha para explorar o Mar de Minas'],
  ['img/passeio3.jpeg', 'Bons momentos a bordo'],
  ['img/b.jpeg', 'O visual de dentro dos cânions'],
  ['img/cacho.jpeg', 'Cachoeiras pelo caminho'],
  ['img/passeio.jpeg', 'Um passeio para curtir em boa companhia'],
  ['img/c.jpeg', 'O Mar de Minas espera por você'],
  ['img/vale-dos-tucanos.mp4', 'Vale dos Tucanos · vídeo do passeio']
];
let current = 0;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  const [src, label] = slides[current];
  const isVideo = src.endsWith('.mp4');
  video.pause(); video.hidden = !isVideo; photo.hidden = isVideo;
  if (!isVideo) { photo.src = src; photo.alt = label; }
  caption.textContent = `${current + 1} / ${slides.length} — ${label}`;
}
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    showSlide(Number(button.dataset.photo)); gallery.showModal();
    document.body.classList.add('gallery-open');
  });
});
document.querySelector('#close-gallery').addEventListener('click', () => gallery.close());
document.querySelector('#previous').addEventListener('click', () => showSlide(current - 1));
document.querySelector('#next').addEventListener('click', () => showSlide(current + 1));
gallery.addEventListener('close', () => { video.pause(); document.body.classList.remove('gallery-open'); });
gallery.addEventListener('click', event => {
  const bounds = gallery.getBoundingClientRect();
  if (event.target === gallery && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) gallery.close();
});
gallery.addEventListener('keydown', event => {
  if (event.target === video) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
});
