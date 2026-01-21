const togleBtn = document.getElementById('togle-btn');
const light = document.getElementById('light-mode');
const dark = document.getElementById('dark-mode');

light.addEventListener('click', ()=>{
    document.body.classList.remove('darkTheme');
    togleBtn.style.left = '2px';
});

dark.addEventListener('click', ()=>{
    document.body.classList.add('darkTheme');
    togleBtn.style.left = '87px';
});

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

  // зачувај оригинален текст
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
      // ⏱ чекај 5 секунди ПОСЛЕ пишување
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