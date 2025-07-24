// === 整页滚动逻辑 ===
const pageContainer = document.getElementById('pageContainer');
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let isScrolling = false;

function scrollToPage(index) {
  if (index < 0 || index >= pages.length) return;
  isScrolling = true;
  pages[index].scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { isScrolling = false; }, 800);
}

// 鼠标滚轮切换页面
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  if (e.deltaY > 0 && currentPage < pages.length - 1) {
    currentPage++;
    scrollToPage(currentPage);
  } else if (e.deltaY < 0 && currentPage > 0) {
    currentPage--;
    scrollToPage(currentPage);
  }
});

// 上下页按钮
document.getElementById('btnUp').addEventListener('click', () => {
  if (currentPage > 0 && !isScrolling) {
    currentPage--;
    scrollToPage(currentPage);
  }
});
document.getElementById('btnDown').addEventListener('click', () => {
  if (currentPage < pages.length - 1 && !isScrolling) {
    currentPage++;
    scrollToPage(currentPage);
  }
});

// === 淡入淡出 ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// === 地图图像切换 ===
const mapImage = document.getElementById('mapImage');
const sliderX = document.getElementById('sliderX');
const sliderY = document.getElementById('sliderY');
function updateMapImage() {
  const x = parseInt(sliderX.value);
  const y = parseInt(sliderY.value);
  const index = y * 3 + x;
  mapImage.classList.remove('active');
  setTimeout(() => {
    mapImage.src = `images/map_${index}.jpg`;
    mapImage.classList.add('active');
  }, 100);
}
sliderX?.addEventListener('input', updateMapImage);
sliderY?.addEventListener('input', updateMapImage);

// === 背景图切换 ===
const bgImage = document.getElementById('bgImage');
function setBgImage(index) {
  bgImage.classList.remove('active');
  setTimeout(() => {
    bgImage.src = `images/bg_0${index + 1}.jpg`;
    bgImage.classList.add('active');
  }, 100);
}
