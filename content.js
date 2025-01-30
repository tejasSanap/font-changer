
chrome.storage.sync.get(['selectedFont'], function(result) {
    if (result.selectedFont) {
      updateStyles(result.selectedFont);
    }
  });
  

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateFont') {
      updateStyles(request.font);
    }
  });
  
  function updateStyles(font) {
    // Create or update the style element
    let styleEl = document.getElementById('font-changer-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'font-changer-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      * {
        font-family: "${font}" !important;
      }
    `;
  }