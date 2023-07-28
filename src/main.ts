import "ids-enterprise-wc/components/ids-button/ids-button";
import "ids-enterprise-wc/components/ids-container/ids-container";
import "ids-enterprise-wc/components/ids-hyperlink/ids-hyperlink";
import "ids-enterprise-wc/components/ids-text/ids-text";
import "ids-enterprise-wc/components/ids-theme-switcher/ids-theme-switcher";

import "./style.css";

setupNetworkStatusCheck(document.getElementById("network-status")!);
if (import.meta.env.PROD) {
  console.log("Registering service worker...");
  setupServiceWorker();
}

function setupNetworkStatusCheck(element: HTMLElement) {
  const onlineText = "You are online 🟢";
  const offlineText = "You are offline 🔴";

  if (navigator.onLine) {
    element.textContent = onlineText;
  } else {
    element.textContent = offlineText;
  }

  window.addEventListener("online", () => {
    element.textContent = onlineText;
  });

  window.addEventListener("offline", () => {
    element.textContent = offlineText;
  });
}

async function setupServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      "service-worker.js",
      {
        scope: "./",
        type: "module",
      }
    );
    console.log("Service worker registered:", registration);
  }
}
