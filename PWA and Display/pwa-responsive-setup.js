// pwa setup
(function() {
  
  // add viewport
  function addViewport() {
    if (!document.querySelector('meta[name="viewport"]')) {
      let vp = document.createElement('meta');
      vp.name = 'viewport';
      vp.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(vp);
    }
  }

  // add manifest
  function addManifest() {
    if (!document.querySelector('link[rel="manifest"]')) {
      let link = document.createElement('link');
      link.rel = 'manifest';
      link.href = './manifest.json';
      document.head.appendChild(link);
    }
  }

  // add theme color
  function addTheme() {
    if (!document.querySelector('meta[name="theme-color"]')) {
      let meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#0969da';
      document.head.appendChild(meta);
    }
  }

  // register service worker
  function registerSW() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js')
          .catch(function(err) {
            console.log('sw error:', err);
          });
      });
    }
  }

  // make images responsive
  function fixImages() {
    let imgs = document.querySelectorAll('img');
    imgs.forEach(function(img) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }

  // prevent horizontal scroll
  function noScroll() {
    document.body.style.overflowX = 'hidden';
  }

  // init
  function init() {
    addViewport();
    addManifest();
    addTheme();
    registerSW();
    fixImages();
    noScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

