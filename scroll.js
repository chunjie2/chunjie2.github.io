// === LAX Photo Hover Transition ===
const laxPhoto = document.getElementById("laxPhoto");
const laxTitle = document.getElementById("laxTitle");

if (laxPhoto && laxTitle) {
  laxPhoto.addEventListener("mouseenter", () => {
    laxTitle.textContent = "2025 LAX";
    laxTitle.classList.remove("text-gray-400");
    laxTitle.classList.add("text-white");
    laxPhoto.src = "LAX photo/newlaxphoto.png";
  });

  laxPhoto.addEventListener("mouseleave", () => {
    laxTitle.textContent = "Early LAX";
    laxTitle.classList.remove("text-white");
    laxTitle.classList.add("text-gray-400");
    laxPhoto.src = "LAX photo/oldlaxphoto.png";
  });
}

// === 背景图按钮切换 ===
const bgImage = document.getElementById('bgImage');
window.setBgImage = function (index) {
  if (!bgImage) return;
  bgImage.classList.remove('active');
  setTimeout(() => {
    bgImage.src = `images/bg_0${index + 1}.jpg`;
    bgImage.classList.add('active');
  }, 100);
};

// === 目录跳转到指定 section ===
window.goToSection = function(name) {
  const target = document.querySelector(`.page[data-section="${name}"]`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

// === 地图切换 ===
const mapImageCurrent = document.getElementById('mapImageCurrent');
const mapImageNext = document.getElementById('mapImageNext');
const sliderX = document.getElementById('sliderX');
const sliderY = document.getElementById('sliderY');

function updateMapImage() {
  const x = parseInt(sliderX?.value || 0);
  const y = parseInt(sliderY?.value || 0);
  const index = y * 3 + x + 1;
  const newSrc = `airport diagram/scale-0${index}.png`;

  if (!mapImageCurrent || !mapImageNext) return;
  if (mapImageCurrent.src.includes(newSrc)) return;

  mapImageNext.src = newSrc;
  mapImageNext.classList.add('z-20');
  mapImageNext.classList.remove('opacity-0');
  mapImageNext.classList.add('opacity-100');

  setTimeout(() => {
    mapImageCurrent.src = newSrc;
    mapImageNext.classList.remove('z-20', 'opacity-100');
    mapImageNext.classList.add('opacity-0');
  }, 500);
}

sliderX?.addEventListener('input', updateMapImage);
sliderY?.addEventListener('input', updateMapImage);

// === 视频播放按钮 ===
const video = document.getElementById('simulationVideo');
const resimulateBtn = document.getElementById('resimulateBtn');
let currentSimulation = 1;
const totalSimulations = 10;

resimulateBtn?.addEventListener('click', () => {
  currentSimulation++;
  if (currentSimulation > totalSimulations) currentSimulation = 1;
  const videoPath = `videos/simulation${currentSimulation}.mp4`;
  const posterPath = `videos/simulation${currentSimulation}.jpg`;
  video.pause();
  video.setAttribute('poster', posterPath);
  video.querySelector('source').setAttribute('src', videoPath);
  video.load();
  video.play();
});
