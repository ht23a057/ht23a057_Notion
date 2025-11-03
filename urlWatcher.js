export function watchUrlChange(callback) {
    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        callback(currentUrl);
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  }
  