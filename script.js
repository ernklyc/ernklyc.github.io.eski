/**/


/***/
function openCustomBox() {
  document.getElementById("customBox").style.display = "block";
}

function closeCustomBox() {
  document.getElementById("customBox").style.display = "none";
}


/**/
window.onload = function () {
  var divElement = document.getElementById("myDiv");
  divElement.classList.add("active");
};

/**/
// canvas setup
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// watch for browser resizing, reinitialize stars
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Star class with color property
class Star {
  constructor(x, y, width, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = speed;
    this.color = "#fff";
  }

  // draw method for Star class
  draw() {
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }


  // update method for Star class
  update() {
    // check bounds
    if (this.x + this.width > innerWidth) {
      this.x = 0;
    }
    this.x += this.speed;

    this.draw();
  }
}

// Star dimensions and speed
const stars = {
  nearStar: {
    width: 3,
    speed: 0.2
  },
  midStar: {
    width: 2,
    speed: 0.1
  },
  farStar: {
    width: 1,
    speed: 0.025
  }
};

let starArray = [];

// clear starArray and generate 3 layers of stars randomly
function init() {

  starArray = [];
  // nearest stars
  for (let i = 0; i < 50; ++i) {
    const x = Math.random() * (innerWidth - stars.nearStar.width);
    const y = Math.random() * (innerHeight - stars.nearStar.width);
    starArray.push(new Star(x, y, stars.nearStar.width, stars.nearStar.speed));
  }

  // mid-distance stars
  for (let i = 0; i < 100; ++i) {
    const x = Math.random() * (innerWidth - stars.midStar.width);
    const y = Math.random() * (innerHeight - stars.midStar.width);
    starArray.push(new Star(x, y, stars.midStar.width, stars.midStar.speed));
  }

  // farthest stars
  for (let i = 0; i < 350; ++i) {
    const x = Math.random() * (innerWidth - stars.farStar.width);
    const y = Math.random() * (innerHeight - stars.farStar.width);
    starArray.push(new Star(x, y, stars.farStar.width, stars.farStar.speed));
  }
}

// loop to call update function on each star
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  // Increase brightness and frequency of stars
  for (let star of starArray) {
    // Increase brightness
    const newColor = `rgb(255, 255, ${Math.floor(Math.random() * 256)})`;
    star.color = newColor;

    // Increase frequency
    star.speed += 0.0001;

    star.update();
  }
}

init();
animate();

/**/

const imageSlider = document.querySelector('.image-slider');
const imageSliderImg = imageSlider.querySelectorAll('img');

for (let i = 1; i < 8; i++) {
  imageSliderImg.forEach(img => {
    const clone = img.cloneNode(true);
    imageSlider.appendChild(clone);
  });
}

// Get all links with hash
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });