// 淡入淡出
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fade').forEach(el => {
  observer.observe(el);
});

// 地图切换
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

sliderX.addEventListener('input', updateMapImage);
sliderY.addEventListener('input', updateMapImage);

// 背景切换按钮
const bgImage = document.getElementById('bgImage');
function setBgImage(index) {
  bgImage.classList.remove('active');
  setTimeout(() => {
    bgImage.src = `images/bg_0${index + 1}.jpg`;
    bgImage.classList.add('active');
  }, 100);
}