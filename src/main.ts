import "ids-enterprise-wc/components/ids-button/ids-button";
import "ids-enterprise-wc/components/ids-container/ids-container";
import "ids-enterprise-wc/components/ids-hyperlink/ids-hyperlink";
import "ids-enterprise-wc/components/ids-modal-button/ids-modal-button";
import "ids-enterprise-wc/components/ids-modal/ids-modal";
import "ids-enterprise-wc/components/ids-text/ids-text";
import "ids-enterprise-wc/components/ids-theme-switcher/ids-theme-switcher";

import "./style.css";

import type IdsButton from "ids-enterprise-wc/components/ids-button/ids-button";
import type IdsModal from "ids-enterprise-wc/components/ids-modal/ids-modal";
import type IdsText from "ids-enterprise-wc/components/ids-text/ids-text";

setupNetworkStatusCheck(document.getElementById("network-status") as IdsText);
if (import.meta.env.PROD) {
  console.log("Registering service worker...");
  setupServiceWorker();
}

setupModal(
  document.getElementById("modal") as IdsModal,
  document.getElementById("modal-trigger") as IdsButton
);

function setupNetworkStatusCheck(element: IdsText) {
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

function setupModal(modal: IdsModal, trigger: IdsButton) {
  const okButton = modal.querySelector("#button-ok") as HTMLButtonElement;

  trigger.addEventListener("click", () => {
    modal.show();
  });

  okButton.addEventListener("click", () => {
    modal.hide();
  });
}
