document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.project-card, .skill-group');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => {
    observer.observe(el);
  });

  // Modal logic
  const modal = document.getElementById('project-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const closeBtn = document.querySelector('.modal-close');
  const backdrop = document.querySelector('.modal-backdrop');
  const projectCards = document.querySelectorAll('.project-card[data-project]');

  function openModal(projectUrl) {
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
    modalIframe.src = projectUrl;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      modalIframe.src = '';
    }, 250);
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const url = card.getAttribute('data-project');
      openModal(url);
    });
  });
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeModal();
    }
  });
});

// Add .visible class CSS for reveal
// (This is a note for the CSS file: .visible { opacity: 1 !important; transform: none !important; }) 