/* =============================================
   MAAN FOUNDATION – main.js
   Animations, 3D tilt, particles, interactions
   ============================================= */

// -------- PARTICLES --------
(function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#f9a8d4', '#fbcfe8', '#fda4af', '#f472b6', '#fce7f3'];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 18 + 6;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 14 + 10}s;
      animation-delay: ${Math.random() * -20}s;
    `;
    container.appendChild(p);
  }
})();

// -------- NAVBAR SCROLL --------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// -------- MOBILE MENU --------
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMob() {
  mobileMenu.classList.remove('open');
}

// new
document.querySelectorAll(".mob-drop-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    this.parentElement.classList.toggle("active");
  });
});





// -------- SMOOTH SCROLL --------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// -------- SCROLL REVEAL --------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// -------- 3D TILT ON PROJECT CARDS --------
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-12px)`;
    card.style.boxShadow = `${-rotY * 3}px ${rotX * 3}px 40px rgba(233,30,140,0.25)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// -------- 3D TILT ON HERO CARD --------
const heroCard = document.getElementById('heroCard');
if (heroCard) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroCard.style.transform = `rotateY(${-10 + dx * 8}deg) rotateX(${5 - dy * 5}deg) translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
  });
}

// -------- TEAM CARDS 3D TILT --------
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y - rect.height / 2) / rect.height) * -12;
    const rotY = ((x - rect.width / 2) / rect.width) * 12;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// -------- DONATE AMOUNT SELECTOR --------
function selectAmt(btn, amt) {
  document.querySelectorAll('.amt-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('customAmt').value = '';
  document.getElementById('customAmt').placeholder = `Selected: ₹${Number(amt).toLocaleString('en-IN')}`;
}

// -------- DONATE HANDLER --------
function handleDonate() {
  const customAmt = document.getElementById('customAmt').value;
  const activeBtn = document.querySelector('.amt-btn.active');
  const project = document.getElementById('projSelect').value;

  let amount = customAmt || (activeBtn ? activeBtn.textContent : '₹1,000');
  if (customAmt && !isNaN(customAmt) && Number(customAmt) > 0) {
    amount = '₹' + Number(customAmt).toLocaleString('en-IN');
  }

  const projectText = project ? ` for ${project}` : '';
  document.getElementById('modalMsg').textContent =
    `Your generous donation of ${amount}${projectText} will help transform lives across India. We will reach out to confirm your contribution shortly.`;

  openModal();
}

// -------- CONTACT FORM --------
function submitForm(btn) {
  btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
  btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
  btn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.4)';
  btn.disabled = true;
  document.querySelectorAll('.cf-input').forEach(i => { if (i.tagName !== 'TEXTAREA') i.value = ''; else i.value = ''; });
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 3500);
}

// -------- MODAL --------
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// -------- COUNTER ANIMATION --------
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// Trigger counters when stats section is visible
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const val = el.textContent;
        if (val === '7') animateCounter(el, 7);
        else if (val === '5') animateCounter(el, 5);
      });
      statsObs.disconnect();
    }
  }, { threshold: 0.5 });
  statsObs.observe(statsSection);
}

// -------- ACTIVE NAV HIGHLIGHT --------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.background = a.getAttribute('href') === '#' + current ? 'var(--pink-light)' : '';
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--pink)' : '';
  });
});

// -------- FLOATING LABEL INPUTS --------
document.querySelectorAll('.cf-input').forEach(inp => {
  inp.addEventListener('focus', () => {
    inp.closest('.cf-group') && (inp.closest('.cf-group').style.transform = 'scale(1.01)');
  });
  inp.addEventListener('blur', () => {
    inp.closest('.cf-group') && (inp.closest('.cf-group').style.transform = '');
  });
});

// -------- RIPPLE EFFECT ON BUTTONS --------
document.querySelectorAll('.btn-primary, .donate-cta, .proj-donate-btn, .nav-donate, .footer-donate-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(255,255,255,0.35);
      transform:scale(0);
      animation:rippleAnim 0.55s linear;
      pointer-events:none;
      width:${rect.width}px;
      height:${rect.width}px;
      left:${e.clientX - rect.left - rect.width/2}px;
      top:${e.clientY - rect.top - rect.width/2}px;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleAnim{to{transform:scale(2.5);opacity:0;}}';
document.head.appendChild(rippleStyle);

console.log('%c💗 MAAN Foundation Website Loaded', 'color:#e91e8c;font-size:16px;font-weight:bold;');


// hero slider


const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    dots.forEach((dot)=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide = index;
        showSlide(currentSlide);

    });

});

function autoSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

setInterval(autoSlide,4000);
// careerForm

document.getElementById("careerForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thank you for your interest in MANN CARE FOUNDATION. Our team will contact you soon.");
    this.reset();
});







