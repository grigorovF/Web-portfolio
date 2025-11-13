const sideList = document.getElementById('side-nav');


function toggleMenu() {
  sideList.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('web-developer').classList.add('active');
});
