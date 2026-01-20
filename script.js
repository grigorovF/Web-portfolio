const togleBtn = document.getElementById('togle-btn');
const light = document.getElementById('light-mode');
const dark = document.getElementById('dark-mode');

light.addEventListener('click', ()=>{
    document.body.classList.remove('darkTheme');
    togleBtn.style.left = '2px';
});

dark.addEventListener('click', ()=>{
    document.body.classList.add('darkTheme');
    togleBtn.style.left = '93px';
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
