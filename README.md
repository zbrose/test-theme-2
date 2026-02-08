# The OFFICIAL goodr popup

Welcome to the goodr popup (official)! This is a reuseable popup component developed by the goodr team to take hassle out of developing your own popup/pop-up from scratch.

## Features

### Open/Close on Delay

Popup opens and closes on a timed delay that can be customized wiithin the SHopify Editor. An overlay focuses the popup with a dark background.

![popup gif](/assets/show.gif)

### Desktop/Mobile Responsive

The popup is fully responsive on desktop and mobile platforms.

![popup gif](/assets/responsive.gif)

### Composable Design

Design the popup of your dreams with movable blocks allowing users to reuse and customize the popup's layout.

![popup gif](/assets/composable.gif)

### Customizable Settings

Go even in the editor to customize color schemes, images, text and more.

![popup gif](/assets/customize.gif)

### Accessible

An implemented focus trap allows screen readers to interact with focusable elements without getting lost in the background noise.

![popup gif](/assets/focus.gif)

### Persisted Session Storage

Popup state is stored within session storage and won't reappear unless the user opens a new tab or window.

![popup gif](/assets/session.gif)

## Installation

### Prerequisites

- The Shopify CLI intalled on your machine: `npm install -g @shopify/cli@latest`
- An IDE such as VS Code
- Shopify development environment setup
- Basic knowledge of Liquid templating

### Steps

1. **Clone or download this repository** into your Shopify theme's `sections/` directory:

   ```bash
   # If using git
   git clone <repository-url>

   # Or manually copy the files and place them within the corresponding directories
   cp -r goodr-popup/sections/* your-theme/sections/
   cp -r goodr-popup/assets/* your-theme/assets/
   cp -r goodr-popup/assets/* your-theme/assets/
   ```

2. **Add the popup section to your theme** by including it in your Liquid template OR add and configure using the Shopify Theme Editor or by editing the section's schema settings

   ```liquid
   {% section 'goodr-popup' %}
   ```

3. **Test locally** using Shopify CLI:
   ```bash
   shopify theme dev
   ```

## Usage

### Basic Implementation

Add the section to your theme and configure via the Shopify Theme Editor or directly in your template:

```liquid
{% section 'goodr-popup' %}
```

### Customization

Refer to the schema settings in [sections/goodr-popup.liquid](sections/goodr-popup.liquid) to customize:

- Popup color and text
- Trigger button text
- Styling and animations
- Close behavior

## Tradeoffs & Assumptions

### Assumptions

- **Single popup per page**: This component is optimized for a single popup instance per page load
- **Modern browser support**: Uses ES6+ JavaScript; targets browsers with ES2015+ support
- **Liquid templating**: Assumes usage within a Shopify theme with Liquid templating engine
- **CSS scope**: Assumes no conflicting global CSS selectors

### Tradeoffs

- **No framework dependencies**: Built with vanilla JavaScript to minimize bundle size, but lacks some advanced state management features
- **Limited animation options**: Pre-defined animations to keep CSS lightweight; custom animations require CSS knowledge
- **Accessibility basics**: Includes ARIA attributes but may need enhancement for complex use cases
- **Browser compatibility**: Does not support Internet Explorer 11; targets modern browsers only
- **Responsive design**: Mobile-first approach may require theme-specific adjustments

## Future Improvements

### High Priority

- [ ] **Accessibility enhancements**: Full WCAG 2.1 AA compliance, improved keyboard navigation
- [ ] **Unit tests**: Add test coverage for JavaScript functionality
- [ ] **Performance optimization**: Lazy load popup assets until first interaction

### Medium Priority

- [ ] **Animation presets**: Expand animation library with fade, slide, scale variants
- [ ] **TypeScript migration**: Add type safety to JavaScript code
- [ ] **Configuration API**: Expose JavaScript API for programmatic control
- [ ] **Theme customization**: Support Shopify Theme Settings for font, color customization

### Low Priority

- [ ] **Internationalization (i18n)**: Multi-language label support
- [ ] **Analytics integration**: Built-in event tracking for popup interactions
- [ ] **Advanced styling**: CSS-in-JS or SCSS preprocessing support
- [ ] **Mobile gestures**: Swipe-to-close and gesture detection

## Contributing

To contribute improvements:

1. Create a feature branch
2. Test thoroughly in a Shopify development store
3. Submit a pull request with a detailed description

## License

© goodr. All rights reserved.

## Support

For issues or questions, please refer to the Shopify Theme Development documentation or contact the development team.
