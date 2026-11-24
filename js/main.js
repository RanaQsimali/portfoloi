/**
 * ============================================================================
 * Rana Qasim - Personal Portfolio
 * Frontend JavaScript
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element References ---
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // --- Sticky Header on Scroll ---
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial check on load in case page is already scrolled
  handleScroll();

  // --- Mobile Menu Toggle Logic ---
  const openMobileMenu = () => {
    if (!navToggle || !mobileMenu || !navOverlay) return;
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!navToggle || !mobileMenu || !navOverlay) return;
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  const toggleMobileMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close when clicking on the dimmed backdrop overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close when pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      navToggle.focus();
    }
  });

  // Close mobile menu and manage active state when any navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      closeMobileMenu();

      const targetHref = this.getAttribute('href');
      navLinks.forEach((item) => {
        if (item.getAttribute('href') === targetHref) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });

  // Reset mobile menu state on window resize (e.g., rotating or resizing to desktop)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 992) {
        closeMobileMenu();
      }
    }, 100);
  });

  // ==========================================================================
  // STEP 03: ANIMATED TYPING TEXT
  // ==========================================================================
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const roles = [
      'Frontend Web Developer',
      'Creative Web Designer',
      'JavaScript Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseDelay = 1800;
    const nextWordDelay = 400;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseDelay);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, nextWordDelay);
      } else {
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(typeLoop, speed);
      }
    }

    typeLoop();
  }

  // ==========================================================================
  // STEP 03: CV DOWNLOAD VERIFICATION & TOAST NOTIFICATION
  // ==========================================================================
  const cvBtn = document.querySelector('.btn-download-cv');
  const toast = document.getElementById('toast-notification');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (cvBtn) {
    cvBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const cvUrl = 'assets/cv.pdf';
      try {
        const response = await fetch(cvUrl, { method: 'HEAD' });
        if (response.ok) {
          const tempLink = document.createElement('a');
          tempLink.href = cvUrl;
          tempLink.download = 'Rana_Qasim_CV.pdf';
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
        } else {
          showToast('📄 CV file will be available soon. Please contact me at ranaqasimali555@gmail.com.');
        }
      } catch (err) {
        showToast('📄 CV file will be available soon. Please contact me at ranaqasimali555@gmail.com.');
      }
    });
  }

  // ==========================================================================
  // STEP 04: SCROLL REVEAL ANIMATIONS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Graceful fallback for non-supporting browsers/environments
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // STEP 05: ADVANCED 3D CARD TILT & MAGNETIC HOVER
  // ==========================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 3D Perspective Tilt on Project Cards (Desktop & fine pointer only)
  if (!prefersReducedMotion && isFinePointer) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const cardInner = card.querySelector('.project-card-inner');
      if (!cardInner) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        const rotateX = -deltaY * 7; // max ±7 deg tilt
        const rotateY = deltaX * 7;

        cardInner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // Subtle Magnetic Hover for Buttons
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ==========================================================================
  // STEP 05: SAMPLE PROJECT BUTTON INTERACTIONS
  // ==========================================================================
  const projectActionBtns = document.querySelectorAll('.project-btn');
  projectActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      const title = btn.getAttribute('data-title') || 'Project';
      const href = btn.getAttribute('href');

      if (href && href !== '#' && !href.startsWith('javascript:')) {
        return; // Allow smooth anchor navigation (e.g., #home)
      }

      e.preventDefault();
      if (action === 'demo') {
        showToast(`📌 [Sample Project] Live demo for "${title}" will be linked when Rana Qasim adds his deployment URL.`);
      } else if (action === 'source') {
        showToast(`💻 [Sample Project] Source code repository for "${title}" will be linked when repository is provided.`);
      }
    });
  });

  // ==========================================================================
  // STEP 05: COPY EMAIL ADDRESS BUTTON
  // ==========================================================================
  const copyBtn = document.querySelector('.btn-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'ranaqasimali555@gmail.com';
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<span>✓ Email Copied!</span>';
        showToast('✓ Email copied to clipboard: ' + email);
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = '<span>Copy Email Address</span> <span class="copy-icon">📋</span>';
        }, 2500);
      } catch (err) {
        showToast('Email: ' + email);
      }
    });
  }

  // ==========================================================================
  // STEP 05: INTERACTIVE CONTACT FORM & VALIDATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-alert');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Remove error state on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('has-error');
          if (formStatus && formStatus.classList.contains('alert-error')) {
            formStatus.className = 'form-status-alert';
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Reset error indicators
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
        if (inp) inp.classList.remove('has-error');
      });

      if (!name || name.length < 2) {
        if (nameInput) nameInput.classList.add('has-error');
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        if (emailInput) emailInput.classList.add('has-error');
        isValid = false;
      }

      if (!subject || subject.length < 3) {
        if (subjectInput) subjectInput.classList.add('has-error');
        isValid = false;
      }

      if (!message || message.length < 10) {
        if (messageInput) messageInput.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status-alert alert-error';
          formStatus.textContent = 'Please fill out all required fields with valid details.';
        }
        return;
      }

      // Valid form: display transparent feedback & trigger mailto draft
      if (formStatus) {
        formStatus.className = 'form-status-alert alert-success';
        formStatus.innerHTML = '<strong>✓ Message Prepared!</strong> Opening your email client to send to <strong>ranaqasimali555@gmail.com</strong>.<br><small style="color:#047857; margin-top:4px; display:inline-block;">(Note: Automated sending requires a server backend or form service like Formspree/EmailJS).</small>';
      }

      showToast('✓ Opening email draft with your message...');

      const mailtoUrl = `mailto:ranaqasimali555@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      contactForm.reset();
    });
  }

  // ==========================================================================
  // STEP 06: BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  const toggleBackToTop = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // STEP 06: BUTTON RIPPLE EFFECT
  // ==========================================================================
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (prefersReducedMotion) return;

      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  // ==========================================================================
  // STEP 06: PAGE PRELOADER DISMISSAL
  // ==========================================================================
  const preloader = document.getElementById('page-preloader');
  const dismissPreloader = () => {
    if (!preloader || preloader.classList.contains('loaded')) return;
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  };

  window.addEventListener('load', dismissPreloader);
  setTimeout(dismissPreloader, 600);

  // ==========================================================================
  // STEP 06: DESKTOP CUSTOM CURSOR
  // ==========================================================================
  if (!prefersReducedMotion && isFinePointer) {
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorOutline = document.getElementById('custom-cursor-outline');

    if (cursorDot && cursorOutline) {
      let mouseX = -100;
      let mouseY = -100;
      let outlineX = -100;
      let outlineY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      });

      const renderCursor = () => {
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(renderCursor);
      };
      requestAnimationFrame(renderCursor);

      const interactiveTargets = document.querySelectorAll('a, button, input, textarea, .project-card');
      interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
        target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
      });

      document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
      });
    }
  }
});
