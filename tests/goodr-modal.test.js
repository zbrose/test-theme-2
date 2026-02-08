import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { GoodrPopup } from "../assets/goodr-popup.js";

describe("GoodrPopup Focus Trap", () => {
  let container;
  let user;

  beforeEach(() => {
    vi.useFakeTimers();
    user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    document.body.innerHTML = `
      <div class="gdr-popup" data-section-id="test-123" data-delay="0">
        <div class="gdr-popup__overlay"></div>
        <button class="gdr-popup__close-btn">Close</button>
        <button data-popup-close class="dismiss">Dismiss</button>
        <input type="text" id="first-input" />
      </div>
    `;
    container = document.querySelector(".gdr-popup");
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should wrap focus from last element to first element on Tab", async () => {
    const popup = new GoodrPopup(container);
    popup.init();
    popup.show();
    // Run timers so the show()'s setTimeout for focus finishes
    vi.runOnlyPendingTimers();

    const firstElement = container.querySelector(".gdr-popup__close-btn");
    const lastElement = container.querySelector("#first-input");

    // 1. Manually move focus to the last element
    lastElement.focus();
    expect(document.activeElement).toBe(lastElement);

    // 2. Simulate Tab
    await user.tab();

    // 3. Expect focus to wrap to the first element
    expect(document.activeElement).toBe(firstElement);
  });

  it("should wrap focus from first element to last element on Shift+Tab", async () => {
    const popup = new GoodrPopup(container);
    popup.init();
    popup.show();
    vi.runOnlyPendingTimers();

    const firstElement = container.querySelector(".gdr-popup__close-btn");
    const lastElement = container.querySelector("#first-input");

    // 1. Start at the first element
    firstElement.focus();

    // 2. Simulate Shift+Tab
    await user.tab({ shift: true });

    // 3. Expect focus to wrap to the last element
    expect(document.activeElement).toBe(lastElement);
  });
});
