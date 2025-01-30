document.addEventListener('DOMContentLoaded', function() {
    // Load saved font when popup opens
    chrome.storage.sync.get(['selectedFont'], function(result) {
      if (result.selectedFont) {
        document.getElementById('fontSelect').value = result.selectedFont;
      }
    });
  
    document.getElementById('fontSelect').addEventListener('change', function(e) {
      const selectedFont = e.target.value;
      chrome.storage.sync.set({
        selectedFont: selectedFont
      }, function() {
        console.log('Font saved:', selectedFont);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'updateFont',
            font: selectedFont
          });
        });
      });
    });
  });