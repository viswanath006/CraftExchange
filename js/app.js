/**
 * CraftExchange — Interactive Frontend Logic
 * Machilipatnam Heritage Artisan Marketplace Concept
 */

// Craft Concept Database for Quick View Modals
const CRAFT_CONCEPTS = {
  'pottery-1': {
    title: 'Earthy Terracotta Cookware & Water Pitchers',
    category: 'Handmade Pottery',
    location: 'Krishna River Basin / Kummaripalem',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Generational potters in the Krishna river delta collect fertile alluvial clay after seasonal rains. Hand-thrown on ancient stone potter’s wheels, each pot is burnished with river stones and pit-fired with rice husk fuel to achieve natural heat retention and non-toxic breathability.',
    features: [
      '100% natural, unglazed, zero chemical sealants',
      'Naturally alkaline: balances food acidity and enhances flavor',
      'Keeps water cool naturally without electricity',
      'Moulded by Kummaripalem artisan families'
    ]
  },
  'clothing-1': {
    title: 'Authentic Machilipatnam Kalamkari Sarees & Yardage',
    category: 'Traditional Clothing & Textiles',
    location: 'Pedana & Machilipatnam Clusters',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    description: 'Machilipatnam Kalamkari (GI Tagged) is one of India’s most venerated art forms. Unlike Sri Kalahasti’s pen-drawn style, Machilipatnam artisans use meticulously hand-carved teakwood blocks. The fabric undergoes up to 17 distinct steps including milk treatment, boiling in copper cauldrons with madder root, and washing in natural river currents.',
    features: [
      'Natural vegetable dyes: pomegranate peel, indigo, myrobalan',
      'Pure organic cotton handloom fabric',
      'Authentic Geographical Indication (GI) heritage craft',
      'Directly supports block-carvers and dye masters in Pedana'
    ]
  },
  'jewellery-1': {
    title: 'Traditional Temple & Filigree Brass Jewellery',
    category: 'Handcrafted Jewellery',
    location: 'Machilipatnam Town Artisan Guild',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'Machilipatnam has a century-old reputation for gold-dipped temple imitation jewellery. Master metal smiths shape pure copper and brass wires into intricate jhumkas, chokers, and waistbands using centuries-old repoussé and filigree techniques.',
    features: [
      'Artisan-crafted base in pure brass and bell metal',
      'Antique matte gold polish with skin-safe lac coating',
      'Traditional South Indian classical motifs (Peacock, Lotus, Goddess)',
      'Fraction of gold cost with superior artisanal longevity'
    ]
  },
  'woven-1': {
    title: 'Hand-Braided River Grass Mats & Jute Planters',
    category: 'Woven & Natural Fibre Products',
    location: 'Coastal Andhra Wetland Belt',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    description: 'Harvested along river banks and coastal plains, wild Korai grass and natural jute are hand-spun and braided on bamboo looms. Women artisan self-help groups create zero-waste home storage, yoga mats, and garden planters that return safely to the earth at the end of their lifecycle.',
    features: [
      '100% biodegradable and zero plastic composition',
      'Provides supplemental income to women weavers in coastal villages',
      'Durable, mold-resistant, and naturally textured',
      'Perfect for modern minimalist and rustic interiors'
    ]
  },
  'decor-1': {
    title: 'Carved Wood Printing Blocks & Brass Oil Lamps',
    category: 'Earthy Home Décor',
    location: 'Pedana Woodcraft Pocket',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    description: 'The master wood carvers of Pedana craft printing blocks from seasoned teak and sheesham wood using tiny iron chisels. CraftExchange repurposes heritage block patterns into standalone statement wall art, bookends, and handcrafted brass diya decor.',
    features: [
      'Reclaimed seasoned seasoned timber with linseed oil finish',
      'Detailed floral and mythological motifs carved freehand',
      'Preserves the endangered trade of specialized block-chiseling',
      'Unique heritage conversational accent piece'
    ]
  },
  'pottery-2': {
    title: 'Hand-Painted Terracotta Floral Urlis & Planters',
    category: 'Handmade Pottery',
    location: 'Krishna Valley Potters',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional wide-mouthed clay floating vessels (Urlis) used for centuries to float fresh marigolds and water lilies at entrance thresholds. Hand-pinched and fired with natural red slips for outdoor resistance.',
    features: [
      'Rooted in Vastu and traditional welcoming rituals',
      'High-grade kiln fired terracotta clay',
      'Porous texture promotes root breathing in garden planters',
      'Handcrafted by rural potters in Krishna District'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCategoryFilters();
  initSmoothScroll();
});

/* ---------------- Navigation ---------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on click outside or link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ---------------- Category Filtering ---------------- */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Add CSS keyframe dynamically for card animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

/* ---------------- Smooth Scrolling & Active State ---------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ---------------- Concept Preview Modal ---------------- */
function openConceptModal(conceptId) {
  const data = CRAFT_CONCEPTS[conceptId];
  if (!data) return;

  const modal = document.getElementById('conceptModal');
  const container = document.getElementById('modalDynamicContent');

  const featureItems = data.features.map(f => `<li>${f}</li>`).join('');

  container.innerHTML = `
    <div class="concept-modal-detail">
      <img src="${data.image}" alt="${data.title}" class="concept-modal-img">
      <div class="concept-modal-inner">
        <div class="concept-modal-meta">
          <span><i class="fa-solid fa-shapes"></i> ${data.category}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${data.location}</span>
          <span style="color: var(--primary-green); font-weight:700;"><i class="fa-solid fa-seedling"></i> Upcoming Release</span>
        </div>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        
        <div class="craft-highlights">
          <h5><i class="fa-solid fa-certificate"></i> Authentic Craftsmanship Details:</h5>
          <ul>${featureItems}</ul>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="closeConceptModal(); openWaitlistModal('artisan');">
            <i class="fa-solid fa-hand-holding-heart"></i> Pre-Register For This Collection
          </button>
          <button class="btn btn-outline" onclick="closeConceptModal()">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeConceptModal() {
  const modal = document.getElementById('conceptModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ---------------- Fast Waitlist Modal ---------------- */
function openWaitlistModal(role = 'artisan') {
  const modal = document.getElementById('waitlistModal');
  const roleSelect = document.getElementById('qRole');
  const title = document.getElementById('waitlistModalTitle');
  const subtitle = document.getElementById('waitlistModalSubtitle');

  if (role === 'artisan') {
    roleSelect.value = 'Local Artisan (Machilipatnam / AP)';
    title.innerText = 'Register as a Local Artisan';
    subtitle.innerText = 'Join our Machilipatnam onboarding drive. Zero listing fees, direct buyer connection.';
  } else {
    roleSelect.value = 'Conscious Buyer / Craft Lover';
    title.innerText = 'Join Buyer Priority Waitlist';
    subtitle.innerText = 'Get early access and launch invitations for authentic Andhra craft collections.';
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeWaitlistModal() {
  const modal = document.getElementById('waitlistModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function handleQuickModalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('qName').value.trim();
  const phone = document.getElementById('qPhone').value.trim();
  const role = document.getElementById('qRole').value;

  // Persist locally
  const submissions = JSON.parse(localStorage.getItem('craftExchangeWaitlist') || '[]');
  submissions.push({
    name,
    phone,
    role,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('craftExchangeWaitlist', JSON.stringify(submissions));

  document.getElementById('modalQuickForm').style.display = 'none';
  document.getElementById('modalSuccess').style.display = 'block';

  showToast(`Namaste ${name}! You are registered on the ${role} waitlist.`);

  setTimeout(() => {
    closeWaitlistModal();
    // Reset modal form
    document.getElementById('modalQuickForm').reset();
    document.getElementById('modalQuickForm').style.display = 'block';
    document.getElementById('modalSuccess').style.display = 'none';
  }, 2500);
}

/* ---------------- Main Contact Form ---------------- */
function switchFormType(type) {
  const tabArtisan = document.getElementById('tabArtisan');
  const tabShopper = document.getElementById('tabShopper');
  const userRole = document.getElementById('userRole');
  const categoryLabel = document.getElementById('categoryLabel');
  const submitBtn = document.getElementById('submitBtn');

  if (type === 'artisan') {
    tabArtisan.classList.add('active');
    tabShopper.classList.remove('active');
    userRole.value = 'Artisan';
    categoryLabel.innerHTML = 'What Craft Do You Make? <span class="req">*</span>';
    submitBtn.innerHTML = '<i class="fa-solid fa-hands-holding"></i> Register My Craft Workshop';
  } else {
    tabShopper.classList.add('active');
    tabArtisan.classList.remove('active');
    userRole.value = 'Shopper';
    categoryLabel.innerHTML = 'What Crafts Are You Most Interested In? <span class="req">*</span>';
    submitBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Join Craft Lovers Waitlist';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const role = document.getElementById('userRole').value;
  const fullName = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const location = document.getElementById('location').value.trim();
  const craftCategory = document.getElementById('craftCategory').value;
  const message = document.getElementById('message').value.trim();

  const payload = {
    role,
    fullName,
    phone,
    email,
    location,
    craftCategory,
    message,
    date: new Date().toLocaleDateString('en-IN')
  };

  // Save to local storage for demonstration
  const existing = JSON.parse(localStorage.getItem('craftExchangeInquiries') || '[]');
  existing.push(payload);
  localStorage.setItem('craftExchangeInquiries', JSON.stringify(existing));

  // Update UI to success state
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccessMessage');
  const successDetail = document.getElementById('successDetailText');

  if (role === 'Artisan') {
    successDetail.innerText = `Thank you, ${fullName}! We have noted your ${craftCategory} craft located in ${location}. Our Machilipatnam field coordinator will call you at ${phone} to discuss cataloging.`;
  } else {
    successDetail.innerText = `Welcome aboard, ${fullName}! You will receive exclusive early invitations when our first verified artisan collections from ${location} and Machilipatnam go live.`;
  }

  form.style.display = 'none';
  successBox.style.display = 'block';

  showToast('Submission received successfully!');
}

function resetContactForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').style.display = 'flex';
  document.getElementById('formSuccessMessage').style.display = 'none';
}

/* ---------------- Toast Notification ---------------- */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeConceptModal();
    closeWaitlistModal();
  }
});

