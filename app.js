/* ==========================================================================
   Nour Mohamed - Type Foundry Interactivity Engine (etharee.com 1:1 Replica)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Remove Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 300);
  }

  // 2. Seamless 100% Fullscreen Background Color Shifting on Hover
  const linkWrappers = document.querySelectorAll('.link-wrapper[data-bg]');

  linkWrappers.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const color = item.getAttribute('data-bg');
      if (color) {
        document.body.style.backgroundColor = color;
        document.documentElement.style.backgroundColor = color;
      }
    });
  });

  // 3. Sliding Knob Grid/List View Switcher on fonts.html
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const fontsGrid = document.getElementById('fontsGrid');
  const switcherPill = document.getElementById('switcherPill');

  if (gridViewBtn && listViewBtn && fontsGrid && switcherPill) {
    gridViewBtn.addEventListener('click', () => {
      fontsGrid.classList.remove('list-view');
      switcherPill.classList.remove('list-active');
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
    });

    listViewBtn.addEventListener('click', () => {
      fontsGrid.classList.add('list-view');
      switcherPill.classList.add('list-active');
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
    });
  }

  // 4. Specimen Lab Live Controls
  const fontCanvasInput = document.getElementById('specimenInput');
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const lineHeightSlider = document.getElementById('lineHeightSlider');

  if (fontCanvasInput) {
    if (fontSizeSlider && fontSizeDisplay) {
      fontSizeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        fontCanvasInput.style.fontSize = `${val}px`;
        fontSizeDisplay.textContent = `${val}px`;
      });
    }

    if (lineHeightSlider) {
      lineHeightSlider.addEventListener('input', (e) => {
        fontCanvasInput.style.lineHeight = e.target.value;
      });
    }
  }
});
