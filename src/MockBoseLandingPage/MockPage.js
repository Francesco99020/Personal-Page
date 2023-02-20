function scrollToAboutSection(){
  const element = document.getElementById('about');
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function scrollToFeaturesSection(){
  const element = document.getElementById('features');
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function scrollToReviewSection(){
  const element = document.getElementById('review');
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({ behavior: 'smooth' });
  }
};


stickyElem = document.querySelector(".skicky-header-nav");
currStickyPos = stickyElem.getBoundingClientRect().top + window.pageYOffset;
window.onscroll = function() {
    if(window.pageYOffset > currStickyPos) {
        stickyElem.style.position = "fixed";
        stickyElem.style.top = "0px";
    } else {
        stickyElem.style.position = "relative";
        stickyElem.style.top = "initial";
    }
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function SetWhite(){
  currentSlide(4);
  let white = document.getElementById('Product-White-Background');
  let black = document.getElementById('Product-Black-Background');
  white.classList.add('SelectedProductBackground');
  black.classList.remove('SelectedProductBackground');
}

function SetBlack(){
  currentSlide(1);
  let white = document.getElementById('Product-White-Background');
  let black = document.getElementById('Product-Black-Background');
  black.classList.add('SelectedProductBackground');
  white.classList.remove('SelectedProductBackground');
}