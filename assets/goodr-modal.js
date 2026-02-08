export class GoodrModal {
  constructor(container) {
    this.container = container;
    this.overlay = container.querySelector(".gdr-modal__overlay");
    this.closeBtn = container.querySelector(".gdr-modal__close-btn");
    this.dismissButtons = container.querySelectorAll("[data-modal-close]");
    this.sectionId = container.getAttribute("data-section-id");

    this.previousFocus = null;
    this.focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  }

  init() {
    const delayTime =
      parseInt(this.container.getAttribute("data-delay")) * 1000;
    const isTestMode = this.container.classList.contains(
      "gdr-modal--test-mode",
    );
    const isDismissed = sessionStorage.getItem(
      `goodr-modal-dismissed-${this.sectionId}`,
    );

    if (!isDismissed || isTestMode) {
      setTimeout(() => this.show(), delayTime);
    }

    this.closeBtn.addEventListener("click", () => this.close());

    this.dismissButtons.forEach((button) => {
      button.addEventListener("click", () => this.close());
    });

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (!this.container.classList.contains("gdr-modal--active")) return;

      if (e.key === "Escape") {
        this.close();
      }

      if (e.key === "Tab") {
        this.handleFocusTrap(e);
      }
    });

    this.trackEvent("modal_view");
  }

  handleFocusTrap(e) {
    const focusables = this.container.querySelectorAll(this.focusableElements);
    const firstElement = focusables[0];
    const lastElement = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  show() {
    this.previousFocus = document.activeElement;
    this.container.classList.add("gdr-modal--active");

    // ADD THIS: Prevent background scrolling
    document.body.style.overflow = "hidden";

    const firstFocusable = this.container.querySelectorAll(
      this.focusableElements,
    )[0];
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 10);
    }
  }

  close() {
    this.container.classList.add("gdr-modal--closing");

    setTimeout(() => {
      this.container.classList.remove(
        "gdr-modal--active",
        "gdr-modal--closing",
      );
      sessionStorage.setItem(`goodr-modal-dismissed-${this.sectionId}`, "true");

      // ADD THIS: Restore background scrolling
      document.body.style.overflow = "";

      if (this.previousFocus) {
        this.previousFocus.focus();
      }
    }, 300);

    this.trackEvent("modal_dismiss");
  }

  trackEvent(eventName, eventData = {}) {
    // TODO: Integrate with analytics service
    // Examples:
    // - Google Analytics 4: gtag('event', eventName, eventData)
    // - Segment: analytics.track(eventName, eventData)
    // - Custom webhook: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({...}) })

    const payload = {
      event: eventName,
      section_id: this.sectionId,
      timestamp: new Date().toISOString(),
      ...eventData,
    };

    console.log("Analytics Event:", payload);
  }
}

const initModal = (container) => {
  const isEnabled = container.dataset.enabled === "true";
  const isTestMode = container.classList.contains("gdr-modal--test-mode");

  if (isEnabled || isTestMode) {
    // We check if an instance is already attached to avoid double-init
    if (!container.dataset.initialized) {
      new GoodrPopup(container).init();
      container.dataset.initialized = "true";
    }
  } else {
    container.style.display = "none";
  }
};

// 1. Standard Page Load
document.addEventListener("DOMContentLoaded", () => {
  const modalElement = document.querySelector(".gdr-modal[data-section-id]");
  if (modalElement) initModal(modalElement);
});

// 2. Shopify Theme Editor Support
document.addEventListener("shopify:section:load", (event) => {
  // Find the modal inside the section that just loaded
  const modalElement = event.target.querySelector(".gdr-modal");
  if (modalElement) initModal(modalElement);
});

document.addEventListener("shopify:section:select", (event) => {
  // Force show the modal when the merchant clicks on the section in the sidebar
  const modalElement = event.target.querySelector(".gdr-modal");
  if (modalElement) {
    // You'd add a method to your class to 'forceOpen' without delay/storage checks
    // e.g., modalInstance.show();
  }
});
