class GoodrPopup {
  constructor(container) {
    this.container = container;
    this.closeBtn = container.querySelector(".gdr-popup__close-btn");
    this.dismissButtons = container.querySelectorAll("[data-popup-close]");
    this.sectionId = container.getAttribute("data-section-id");

    this.previousFocus = null;
    this.focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  }

  init() {
    const delayTime =
      parseInt(this.container.getAttribute("data-delay")) * 1000;
    const isTestMode = this.container.classList.contains(
      "gdr-popup--test-mode",
    );
    const isShown = sessionStorage.getItem(
      `goodr-popup-shown-${this.sectionId}`,
    );

    if (!isShown || isTestMode) {
      setTimeout(() => this.show(), delayTime);
    }

    this.closeBtn.addEventListener("click", () => this.close());

    this.dismissButtons.forEach((button) => {
      button.addEventListener("click", () => this.close());
    });

    document.addEventListener("keydown", (e) => {
      if (!this.container.classList.contains("gdr-popup--active")) return;

      if (e.key === "Escape") {
        this.close();
      }

      if (e.key === "Tab") {
        this.handleFocusTrap(e);
      }
    });

    this.trackEvent("popup_view");
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

    this.container.classList.add("gdr-popup--active");
    sessionStorage.setItem(`goodr-popup-shown-${this.sectionId}`, "true");

    const firstFocusable = this.container.querySelectorAll(
      this.focusableElements,
    )[0];
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 10);
    }
  }

  close() {
    this.container.classList.add("gdr-popup--closing");

    setTimeout(() => {
      this.container.classList.remove(
        "gdr-popup--active",
        "gdr-popup--closing",
      );

      if (this.previousFocus) {
        this.previousFocus.focus();
      }
    }, 300);

    this.trackEvent("popup_dismiss");
  }

  trackEvent(eventName, eventData = {}) {
    // TODO: Integrate with analytics service

    const payload = {
      event: eventName,
      section_id: this.sectionId,
      timestamp: new Date().toISOString(),
      ...eventData,
    };

    console.log("Analytics Event:", payload);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const popupElement = document.querySelector(".gdr-popup[data-section-id]");
  const isEnabled = popupElement.dataset.enabled === "true";
  const isTestMode = popupElement.classList.contains("gdr-popup--test-mode");

  if (isEnabled || isTestMode) {
    const popup = document.querySelector(".gdr-popup");
    if (popup) {
      new GoodrPopup(popup).init();
    }
  } else {
    popupElement.style.display = "none";
  }
});
