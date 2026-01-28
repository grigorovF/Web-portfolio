//dark-mode
const darkModeBtn = document.getElementById('dark-mode');
const lightModeBtn = document.getElementById('light-mode');
const togleBtn = document.getElementById('togle-btn');

darkModeBtn.addEventListener('click', () => {
  togleBtn.style.left = "87px";
  document.body.classList.add('darkMode');
});

lightModeBtn.addEventListener('click', () => {
  togleBtn.style.left = "2px";
  document.body.classList.remove('darkMode');
});

//nav-bar
const menuBtn = document.getElementById('menu');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', ()=> {
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

document.body.addEventListener('click', (e) =>{
   if (
        navList.classList.contains('active') &&
        !navList.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navList.classList.remove('active');
    }
})

window.addEventListener('resize', handleResize);
handleResize();

//text-animate
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

//numbers
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

//spinner

function showSpinner() {
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
}
//sections
const allNavLinks = document.querySelectorAll('a[href^="#"]');
const homeSec    = document.getElementById('about-section');
const projSec    = document.getElementById('projects-section');
const contactSec = document.getElementById('contacts-section');

const pages = [homeSec, projSec, contactSec];

function showPage(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  showSpinner();

  setTimeout(() => {
    pages.forEach(page => {
      page.classList.remove("active-page", "animate");
      page.classList.add("hide-page");
      page.style.zIndex = 0;
    });

    target.classList.remove("hide-page");
    target.classList.add("active-page");
    target.style.zIndex = 10;

    void target.offsetWidth;

    target.classList.add("animate");

    hideSpinner();

    if (targetId === "projects-section") {
      resetSkills();
      animateSkillsSequential();
    }

  }, 700);
}


window.addEventListener('DOMContentLoaded', () => {
    showPage('about-section');
});

allNavLinks.forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href').substring(1);
        const validSections = ['about-section', 'projects-section', 'contact-section'];
        
        if (validSections.includes(targetId)) {
            e.preventDefault();
            showPage(targetId);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    showPage('about-section');
});


//projects-page

//range

document.querySelectorAll(".progress-bar").forEach(bar => {
  const value = bar.dataset.value;
  const fill = bar.querySelector(".progress-fill");
  const percent = bar.previousElementSibling.querySelector(".percent");

  let current = 0;
  const speed = 15;

  const interval = setInterval(() => {
    if (current >= value) {
      clearInterval(interval);
      current = value;
    }
    fill.style.width = current + "%";
    percent.textContent = current + "%";
    current++;
  }, speed);
});

let skillsAnimated = false;
function animateSkillsSequential() {
  const items = document.querySelectorAll("#projects-section .skills-list li");

  let index = 0;

  function animateNext() {
    if (index >= items.length) return;

    const item = items[index];
    const bar = item.querySelector(".progress-bar");
    const fill = bar.querySelector(".progress-fill");
    const percent = item.querySelector(".percent");
    const value = +bar.dataset.value;

    // 1️⃣ појавување
    item.classList.add("visible");

    // 2️⃣ полнење (по мало доцнење)
    setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= value) {
          clearInterval(interval);
          current = value;
        }
        fill.style.width = current + "%";
        percent.textContent = current + "%";
        current++;
      }, 15);
    }, 300);

    index++;
    setTimeout(animateNext, 600); // чека пред следен бар
  }

  animateNext();
}

function playProjectsAnimations() {
  projSec.classList.remove("animate");
  void projSec.offsetWidth;
  projSec.classList.add("animate");

  resetSkills();
  animateSkillsSequential();
}

function resetSkills() {
  skillsAnimated = false;

  document.querySelectorAll("#projects-section .skills-list li").forEach(item => {
    item.classList.remove("visible");
  });

  document.querySelectorAll("#projects-section .progress-fill").forEach(fill => {
    fill.style.width = "0%";
  });

  document.querySelectorAll("#projects-section .percent").forEach(p => {
    p.textContent = "0%";
  });
}
