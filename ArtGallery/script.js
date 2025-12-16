(function () {
  const portfolioEl = document.getElementById('portfolio');
  if (!portfolioEl) return;

  // Refresh clears everything (projects + media)
  (function clearOnRefresh() {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type === 'reload') {
      sessionStorage.removeItem('projects');
      Object.keys(sessionStorage).forEach(k => {
        if (k.startsWith('projectMedia_')) sessionStorage.removeItem(k);
      });
    }
  })();

  function getProjects() {
    try { return JSON.parse(sessionStorage.getItem('projects') || '[]'); }
    catch { return []; }
  }

  function getMediaKey(projectId) {
    return `projectMedia_${projectId}`;
  }

  function getMedia(projectId) {
    try { return JSON.parse(sessionStorage.getItem(getMediaKey(projectId)) || '[]'); }
    catch { return []; }
  }

  function setMedia(projectId, arr) {
    sessionStorage.setItem(getMediaKey(projectId), JSON.stringify(arr));
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // current project
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('projectId') || sessionStorage.getItem('selectedProjectId');
  if (!projectId) {
    window.location.replace('index.html');
    return;
  }

  const projects = getProjects();
  const project = projects.find(p => String(p.id) === String(projectId));
  if (!project) {
    window.location.replace('index.html');
    return;
  }

  // header
  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDesc');
  if (titleEl) titleEl.textContent = project.name;
  if (descEl) descEl.textContent = project.description;

  // popup refs
  const uploadPop = document.getElementById('uploadPop');
  const mediaFileInput = document.getElementById('mediaFile');
  const preview = document.getElementById('uploadPreview');

  let currentFile = null;
  let currentDataUrl = '';
  let currentMime = '';

  window.togglePopup = function togglePopup() {
    const isOpen = uploadPop.style.display === 'block';
    uploadPop.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) resetPopup();
  };

  window.uploadFile = function uploadFile() {
    mediaFileInput.click();
  };

  function resetPopup() {
    currentFile = null;
    currentDataUrl = '';
    currentMime = '';
    mediaFileInput.value = '';
    const t = document.getElementById('title');
    const d = document.getElementById('description');
    if (t) t.value = '';
    if (d) d.value = '';
    preview.innerHTML = 'Click to choose an image or audio file';
  }

  mediaFileInput.addEventListener('change', async () => {
    const file = mediaFileInput.files && mediaFileInput.files[0];
    if (!file) return;

    const ok = file.type.startsWith('image/') || file.type.startsWith('audio/');
    if (!ok) {
      alert('Only image or audio files allowed.');
      resetPopup();
      return;
    }

    currentFile = file;
    currentMime = file.type;
    currentDataUrl = await fileToDataUrl(file);

    preview.innerHTML = '';
    if (currentMime.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = currentDataUrl;
      img.alt = 'preview';
      preview.appendChild(img);
    } else {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = currentDataUrl;
      preview.appendChild(audio);
    }
  });

  window.uploadMedia = function uploadMedia() {
    if (!currentFile || !currentDataUrl) {
      alert('Choose a file first.');
      return;
    }

    const title = (document.getElementById('title')?.value || '').trim() || currentFile.name;
    const description = (document.getElementById('description')?.value || '').trim();

    const mediaArr = getMedia(projectId);
    mediaArr.push({
      id: Date.now(),
      title,
      description,
      mime: currentMime,
      dataUrl: currentDataUrl
    });

    setMedia(projectId, mediaArr);
    renderMediaGrid();
    window.togglePopup();
  };

  // view toggle: 3 -> 2 -> 1 columns
  let viewMode = 0;
  window.cycleView = function cycleView() {
    viewMode = (viewMode + 1) % 3;
    const btn = document.getElementById('view');

    if (viewMode === 0) {
      portfolioEl.style.gridTemplateColumns = '1fr 1fr 1fr';
      if (btn) btn.textContent = 'gallery view';
    } else if (viewMode === 1) {
      portfolioEl.style.gridTemplateColumns = '1fr 1fr';
      if (btn) btn.textContent = 'wide view';
    } else {
      portfolioEl.style.gridTemplateColumns = '1fr';
      if (btn) btn.textContent = 'list view';
    }
  };

  function renderMediaGrid() {
    const mediaArr = getMedia(projectId);
    portfolioEl.innerHTML = '';

    mediaArr.forEach(item => {
      const tile = document.createElement('div');
      tile.className = 'portfolio-item';

      if (item.mime.startsWith('image/')) {
        const img = document.createElement('img');
        img.className = 'portfolioImage';
        img.src = item.dataUrl;
        img.alt = item.title || 'image';
        tile.appendChild(img);
      } else {
        // Audio block with border section like your original layout
        const top = document.createElement('div');
        top.style.borderBottom = '2px solid';
        const wrap = document.createElement('div');
        wrap.className = 'previewWrap';
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = item.dataUrl;
        wrap.appendChild(audio);
        top.appendChild(wrap);
        tile.appendChild(top);
      }

      const caption = document.createElement('div');
      caption.className = 'item-title';
      caption.textContent = item.title || 'Untitled';
      tile.appendChild(caption);

      portfolioEl.appendChild(tile);
    });

    // Add-tile
    const add = document.createElement('div');
    add.className = 'portfolio-item add-tile';
    add.innerHTML = `
      <img class="portfolioImage" src="images/plus_icon.png" alt="Add Media">
      <div class="item-title">Add Media</div>
    `;
    add.addEventListener('click', () => window.togglePopup());
    portfolioEl.appendChild(add);
  }

  renderMediaGrid();
})();

