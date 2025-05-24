function replaceUdemyLogo() {
  const logoSelectors = [
    '.desktop-header-module--logo--AwnFF img[src*="logo-udemy.svg"]',
    '.header--logo-image--2yYkw img[src*="logo-udemy.svg"]'
  ];
  
  const newLogoSrc = chrome.runtime.getURL("static/img/img.svg");
  let replaced = false;

  logoSelectors.forEach(selector => {
    const logo = document.querySelector(selector);
    if (logo) {
      logo.src = newLogoSrc;
      logo.alt = "Udemy Dark";
      logo.style.filter = "none";
      replaced = true;
    }
  });

  return replaced;
}

function initLogoReplacement() {
  if (!replaceUdemyLogo()) {
    const observer = new MutationObserver((_, obs) => {
      if (replaceUdemyLogo()) obs.disconnect();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Substituição do logo
initLogoReplacement();
window.addEventListener('spaload', replaceUdemyLogo);