const sideList = document.getElementById('side-nav');

function toggleMenu(){
  if (window.innerWidth < 1024 && sideList.style.display === 'none'){
    sideList.classList.add('show');

  }
}

document.addEventListener("DOMContentLoaded", () => {
  const jobInfos = document.querySelectorAll(".job-info");
  let IdIndex = 0;
  const intervalTime = 5000; // 5 seconds

  // Initialize: show the first section
  jobInfos.forEach((info, index) => {
    info.classList.add("fade-out");
    if (index === 0) info.classList.replace("fade-out", "fade-in");
  });

  function showJobInfo() {
    const current = jobInfos[IdIndex];
    current.classList.replace("fade-in", "fade-out"); // fade current out

    IdIndex = (IdIndex + 1) % jobInfos.length;
    const next = jobInfos[IdIndex];

    setTimeout(() => {
      next.classList.replace("fade-out", "fade-in"); // fade next in after short delay
    }, 500); // match CSS transition speed
  }

  setInterval(showJobInfo, intervalTime);
});

window.addEventListener("load", () => {
  setInterval( () => {
  const spinner = document.querySelector(".spinner");
  spinner.style.opacity = 0;
  }, 3000);
});