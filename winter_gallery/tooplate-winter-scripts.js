/* JavaScript Document

Tooplate 2151 Winter Gallery

https://www.tooplate.com/view/2151-winter-gallery

*/

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
   navLinks.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
   link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
         targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });

         // Close mobile menu if open
         navLinks.classList.remove('active');
      }
   });
});

// Logo click handler
document.querySelector('.logo').addEventListener('click', (e) => {
   e.preventDefault();
   document.querySelector('#home').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
   });
   navLinks.classList.remove('active');
});

// Scroll spy for active menu states
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

function setActiveLink() {
   let currentSection = '';

   sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
         currentSection = section.getAttribute('id');
      }
   });

   navLinksArray.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
         link.classList.add('active');
      }
   });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // Set initial active state

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
   btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
         if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            // Re-trigger animation
            item.style.animation = 'none';
            setTimeout(() => {
               item.style.animation = 'fadeInUp 0.6s ease forwards';
            }, 10);
         } else {
            item.style.display = 'none';
         }
      });
   });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

let currentImageIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
   visibleImages = Array.from(galleryItems).filter(item =>
      item.style.display !== 'none'
   );
}

galleryItems.forEach((item, index) => {
   item.addEventListener('click', () => {
      updateVisibleImages();
      currentImageIndex = visibleImages.indexOf(item);
      openLightbox(item);
   });
});

function openLightbox(item) {
   const img = item.querySelector('img');
   const title = item.querySelector('.gallery-title');
   const category = item.querySelector('.gallery-category');

   lightboxImage.src = img.src;
   lightboxImage.alt = img.alt;
   lightboxTitle.textContent = title.textContent;
   lightboxCategory.textContent = category.textContent;

   lightbox.classList.add('active');
   document.body.style.overflow = 'hidden';
}

closeLightbox.addEventListener('click', () => {
   lightbox.classList.remove('active');
   document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
   if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
   }
});

prevImage.addEventListener('click', () => {
   currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
   openLightbox(visibleImages[currentImageIndex]);
});

nextImage.addEventListener('click', () => {
   currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
   openLightbox(visibleImages[currentImageIndex]);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
   if (!lightbox.classList.contains('active')) return;

   if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
   } else if (e.key === 'ArrowLeft') {
      prevImage.click();
   } else if (e.key === 'ArrowRight') {
      nextImage.click();
   }
});

// Initialize visible images
updateVisibleImages();

// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
   e.preventDefault();

   // Get form data
   const formData = new FormData(contactForm);
   const name = formData.get('name');

   // Show success message (in real implementation, this would send to a server)
   alert(`Thank you ${name}! Your message has been sent. We will get back to you soon.`);

   // Reset form
   contactForm.reset();
});