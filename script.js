const sideList = document.getElementById('side-nav');


function toggleMenu() {
  sideList.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', function () {
  const circles = document.querySelectorAll('.circle');
  const jobSections = document.querySelectorAll('.job-info');

  function changeJobInfo(targetId, clickedCircle) {
    // Remove active state from all circles and job sections
    circles.forEach(c => c.classList.remove('active'));
    jobSections.forEach(section => {
      section.classList.remove('active');  // Remove active
      section.classList.add('inactive');  // Add inactive (slide out)
    });

    // Add active state to clicked circle
    clickedCircle.classList.add('active');

    // Find and activate the correct job info section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove('inactive');  // Remove slide-out effect
      targetSection.classList.add('active');       // Add slide-in effect
    }
  }

  // Add click listeners to circles
  circles.forEach(circle => {
    circle.addEventListener('click', () => {
      const targetId = circle.getAttribute('data-target');
      changeJobInfo(targetId, circle);
    });
  });

  // Default active on load
  const defaultCircle = document.querySelector('#circle-web-dev');
  defaultCircle.classList.add('active');
  document.getElementById('web-developer').classList.add('active');
});
