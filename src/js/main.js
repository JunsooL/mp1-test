const slides = document.querySelectorAll(".slides .slide");
const images = document.querySelectorAll('.slide img');
const artistData = {
    'ookiitora': { x: 'ookiitora128706' },
    'kanji': { x: 'kanji55755948' }
};

let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", () => {
    initializeSlider();
    initializeImgClicks();
    initializeModal();
    initializeNavbar();
});

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index){

    if(index >= slides.length) {
        slideIndex = 0;
    } else if(index < 0) {
        slideIndex = slides.length -1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    clearInterval(intervalId);    
    slideIndex++;
    showSlide(slideIndex);
}

//MODAL

function initializeImgClicks() {
    images.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=> {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) =>{
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const artistCredit = document.getElementById('artist-credit');
    const socialIcons = document.querySelector('.social-icons');
    
    modalImg.src = img.src;
    const artistName = img.alt;
    const artistX = artistData[artistName].x;

    //console.log(artist);

    artistCredit.textContent = `Art by: ${artistName}`;
        
    socialIcons.innerHTML = `
            <a id="xLogo" href="https://x.com/${artistX}" target="_blank">
                <i class="fa-brands fa-twitter fa-2x"></i>
            </a>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

//navbar

function initializeNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll("#navbar a");
  const sections = [...document.querySelectorAll("header, .body-1, footer")];

  function onScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      navbar.classList.add("small");
    } else {
      navbar.classList.remove("small");
    }

    let currentSection = sections[0];
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navbar.offsetHeight && rect.bottom > navbar.offsetHeight) {
        currentSection = section;
      }
    });

    links.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`#navbar a[href="#${currentSection.id}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); 
}
