const darkModeBtn = document.getElementById('dark-mode');
const lightModeBtn = document.getElementById('light-mode');
const togleBtn = document.getElementById('togle-btn');
darkModeBtn.addEventListener('click', () =>{
    togleBtn.style.left = "87px";
    document.body.classList.add('darkMmode');
  }
)

lightModeBtn.addEventListener('click', () =>{
    togleBtn.style.left = "2px";
    document.body.classList.remove('darkMmode');
  }
)

const menuBtn = document.getElementById('menu');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

function handleResize() {
    if (window.innerWidth > 768) {
        navList.classList.add('desktop');
        navList.classList.remove('active');
    } else {
        navList.classList.remove('desktop');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

 const sections = document.querySelectorAll('.text-section');
  let currentIndex = 0;
  let timer;
  
  sections.forEach(section => {
    const p = section.querySelector('p');
    p.dataset.fullText = p.textContent;
    p.textContent = '';
  });

  function typeWriter(element, text, speed = 20, callback) {
    let i = 0;
    element.style.visibility = 'visible';

    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, speed);
  }

  function showSection(index) {
    const section = sections[index];
    const p = section.querySelector('p');

    section.classList.add('active');

    typeWriter(p, p.dataset.fullText, 20, () => {
      timer = setTimeout(() => {
        changeSection();
      }, 5000);
    });
  }

  function hideSection(index) {
    const section = sections[index];
    const p = section.querySelector('p');

    section.classList.remove('active');
    section.classList.add('exit-left');

    setTimeout(() => {
      section.classList.remove('exit-left');
      p.textContent = '';
      p.style.visibility = 'hidden';
    }, 800);
  }

  function changeSection() {
    hideSection(currentIndex);
    currentIndex = (currentIndex + 1) % sections.length;

    setTimeout(() => {
      showSection(currentIndex);
    }, 900);
  }

  showSection(currentIndex);

  function animateCounter(el, start, end, duration) {
    let startTime = null;

    function update(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);

        const value = Math.floor(start + (end - start) * progress);
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const viewsEl  = document.querySelector(".views");
const likesEl = document.querySelector(".likes");
const sharesEl = document.querySelector(".shares");

let views  = parseInt(viewsEl.textContent);
let likes = parseInt(likesEl.textContent);
let shares = parseInt(sharesEl.textContent);

setInterval(() => {
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1

    likes = Math.max(0, likes + change);
    shares = Math.max(0, shares + change);

    animateCounter(likesEl, parseInt(likesEl.textContent), likes, 300);
    animateCounter(sharesEl, parseInt(sharesEl.textContent), shares, 300);
}, 1200);

setInterval(() => {
    const increment = Math.floor(Math.random() * 3) + 1; // +1 до +3
    views += increment;

    const minViews = Math.max(likes, shares) + 5;
    if (views < minViews) views = minViews;

    animateCounter(viewsEl, parseInt(viewsEl.textContent), views, 500);
}, 1500);

window.onload = () => {
  const spinner = document.getElementById("spinner");
  setTimeout(() => {
    spinner.classList.add('hidden');
  }, 5000); 
};

//project .jsconst projectsLink = document.querySelector('a[href="#projects"]');
const projectsMobileLink = document.querySelector('.nav-list a[href="#projects"]');
const mainSection = document.querySelector('.main-section');
const projectsSection = document.getElementById('projects-section');
const backBtn = document.getElementById('back-to-home');


function openProjects(e) {
    e.preventDefault();
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
    }
    mainSection.classList.add('slide-up');
    projectsSection.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjects() {
    mainSection.classList.remove('slide-up');
    projectsSection.classList.remove('active');
    document.body.style.overflow = 'auto';
}

projectsLink.addEventListener('click', openProjects);
projectsMobileLink.addEventListener('click', openProjects);
backBtn.addEventListener('click', closeProjects);