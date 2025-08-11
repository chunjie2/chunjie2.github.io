// === LAX Photo Hover Transition (Page 3) ===
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

window.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  let currentPage = 0;
  let isScrolling = false;

  function scrollToPage(index) {
    if (index < 0 || index >= pages.length) return;
    isScrolling = true;
    pages[index].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isScrolling = false; }, 800);
    updateNavHighlight(index);
  }

  // 键盘左右控制翻页
  window.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    if (e.key === 'ArrowRight' && currentPage < pages.length - 1) {
      currentPage++;
      scrollToPage(currentPage);
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
      currentPage--;
      scrollToPage(currentPage);
    }
  });

  // 点击右侧目录跳转
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetIndex = parseInt(item.dataset.page);
      if (!isNaN(targetIndex) && targetIndex < pages.length) {
        scrollToPage(targetIndex);
      }
    });
  });

  // 高亮当前导航
  function updateNavHighlight(index) {
    navItems.forEach((btn, i) => {
      btn.classList.toggle('active', parseInt(btn.dataset.page) === index);
    });
  }

  // 页面滚动监听
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(pages).indexOf(entry.target);
        currentPage = index;
        updateNavHighlight(index);

        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
          if (index === 0) {
            navMenu.classList.add('translate-x-full', 'opacity-0');
          } else {
            navMenu.classList.remove('translate-x-full', 'opacity-0');
          }
        }
      }
      entry.target.classList.toggle('show', entry.isIntersecting);
    });
  }, { threshold: 0.3 });

  pages.forEach(page => observer.observe(page));
  document.querySelectorAll('.fade').forEach(el => observer.observe(el));

  // === 地图滑块控制 ===
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
      mapImageNext.classList.remove('z-20');
      mapImageNext.classList.remove('opacity-100');
      mapImageNext.classList.add('opacity-0');
    }, 500);
  }

  sliderX?.addEventListener('input', updateMapImage);
  sliderY?.addEventListener('input', updateMapImage);

  // === 背景图切换 ===
  const bgImage = document.getElementById('bgImage');
  window.setBgImage = function (index) {
    if (!bgImage) return;
    bgImage.classList.remove('active');
    setTimeout(() => {
      bgImage.src = `images/bg_0${index + 1}.jpg`;
      bgImage.classList.add('active');
    }, 100);
  };

  // === 视频播放控制 ===
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
});
