class GoodrPopup {
  constructor(container) {
    this.container = container;
    this.overlay = container.querySelector(".gdr-modal__overlay");
    this.closeBtn = container.querySelector(".gdr-modal__close-btn");
    this.dismissButtons = container.querySelectorAll("[data-modal-close]");
    this.sectionId = container.getAttribute("data-section-id");
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

    // Handle dismiss buttons
    this.dismissButtons.forEach((button) => {
      button.addEventListener("click", () => this.close());
    });

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.container.classList.contains("gdr-modal--active")
      ) {
        this.close();
      }
    });

    this.trackEvent("modal_view");
  }

  show() {
    this.container.classList.add("gdr-modal--active");
  }

  close() {
    this.container.classList.add("gdr-modal--closing");
    setTimeout(() => {
      this.container.classList.remove(
        "gdr-modal--active",
        "gdr-modal--closing",
      );
      sessionStorage.setItem(`goodr-modal-dismissed-${this.sectionId}`, "true");
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

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".gdr-modal");
  if (popup) {
    new GoodrPopup(popup).init();
  }
});
