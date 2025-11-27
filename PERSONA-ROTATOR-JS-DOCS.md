# CME Persona Rotator - Complete Usage Documentation

A lightweight JavaScript component that displays rotating persona showcases with smart gender selection, image preloading, and click-through functionality.

## 🎯 Features

- **Smart Selection**: Automatically picks one exemplar from each persona type with different genders
- **Image Preloading**: Prevents layout shifts with preloaded images and fixed containers
- **UTM Preservation**: Maintains tracking parameters when clicked
- **Responsive Design**: Adapts perfectly to all screen sizes
- **Flexible Caption Display**: Overlay, below, or hidden options
- **Click-through Support**: Entire rotator clickable with URL parameter preservation
- **No Dependencies**: Pure JavaScript, no external libraries required

## 📁 Required Files

1. **JavaScript**: `persona-rotator.js` - Main component logic
2. **JSON Data**: `personas.json` - Persona data structure
3. **CDN Images**: WebP persona images hosted on CDN

## 🚀 Quick Setup

### Step 1: Upload Files

Upload to your CDN or WordPress media library:
- `persona-rotator.js`
- `personas.json` (or use CDN URL)

### Step 2: Configure CSP Headers

For CDN usage, add to your Content Security Policy:
- **script-src**: `cdn.cruisemadeeasy.com`
- **connect-src**: `cdn.cruisemadeeasy.com`
- **img-src**: `cdn.cruisemadeeasy.com`

### Step 3: Add to Page

#### WordPress/Elementor (HTML Widget):
```html
<div id="persona-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-click-url="https://your-quiz-url.com">
</div>

<script src="https://cdn.cruisemadeeasy.com/persona-rotator.js"></script>
```

#### GeneratePress (Custom HTML Block):
Same HTML as above in a Custom HTML Gutenberg block.

#### Manual JavaScript Initialization:
```html
<div id="my-rotator"></div>

<script>
new CMEPersonaRotator('my-rotator', {
    jsonUrl: 'https://cdn.cruisemadeeasy.com/personas.json',
    clickUrl: 'https://your-quiz-url.com',
    rotationSpeed: 5000,
    showNavigation: true
});
</script>
```

## ⚙️ Configuration Options

### Data Attributes (HTML Method)

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-json-url` | URL string | CDN URL | Path to personas.json file |
| `data-click-url` | URL string | `null` | Quiz/landing page URL |
| `data-rotation-speed` | Number (ms) | `5000` | Time between slides |
| `data-auto-rotate` | `true`/`false` | `true` | Enable automatic rotation |
| `data-show-navigation` | `true`/`false` | `false` | Show navigation controls |
| `data-fade-transition` | `true`/`false` | `false` | Use fade instead of instant |
| `data-open-in-new-tab` | `true`/`false` | `true` | Open click URL in new tab |
| `data-caption-position` | `overlay`/`below`/`none` | `overlay` | Caption display location |
| `data-show-title` | `true`/`false` | `true` | Show persona names |
| `data-limit` | Number | `3` | Max personas (keep at 3) |

### JavaScript Options (Manual Method)

```javascript
{
    jsonUrl: 'https://cdn.cruisemadeeasy.com/personas.json',
    inlineData: null,              // Bypass CORS with inline JSON
    rotationSpeed: 5000,           // Milliseconds between slides
    limit: 3,                      // Max personas to show
    autoRotate: true,              // Auto-advance slides
    showNavigation: false,         // Navigation dots/arrows
    fadeTransition: false,         // Fade vs instant transition
    clickUrl: null,                // Target URL when clicked
    openInNewTab: true,            // Open links in new tab
    captionPosition: 'overlay',    // 'overlay', 'below', 'none'
    showTitle: true                // Show persona names
}
```

## 📋 Usage Examples

### Basic Auto-Rotating Display
```html
<div id="basic-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-click-url="https://your-quiz.com">
</div>
```

### With Navigation Controls
```html
<div id="nav-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-show-navigation="true"
     data-fade-transition="true"
     data-click-url="https://your-quiz.com">
</div>
```

### Caption Below Image
```html
<div id="below-caption-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-caption-position="below"
     data-click-url="https://your-quiz.com">
</div>
```

### Images Only (No Captions)
```html
<div id="images-only-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-caption-position="none"
     data-click-url="https://your-quiz.com">
</div>
```

### Static Showcase (No Auto-Rotation)
```html
<div id="static-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-auto-rotate="false"
     data-show-navigation="true"
     data-click-url="https://your-quiz.com">
</div>
```

### Same Tab Navigation
```html
<div id="same-tab-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-open-in-new-tab="false"
     data-click-url="https://your-quiz.com">
</div>
```

### Fast Rotation
```html
<div id="fast-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-rotation-speed="2000"
     data-click-url="https://your-quiz.com">
</div>
```

### Caption Only (No Titles)
```html
<div id="caption-only-rotator" 
     data-cme-persona-rotator
     data-json-url="https://cdn.cruisemadeeasy.com/personas.json"
     data-show-title="false"
     data-click-url="https://your-quiz.com">
</div>
```

## 🎨 CSS Customization

Override default styles by adding CSS after the component loads:

```css
/* Adjust rotator size */
.cme-persona-rotator {
    max-width: 600px;
    margin: 20px auto;
}

/* Customize overlay */
.cme-persona-overlay {
    background: linear-gradient(transparent, rgba(0, 100, 200, 0.9));
}

/* Style below captions */
.cme-persona-caption-below {
    background: #your-brand-color;
    color: white;
}

/* Adjust title styling */
.cme-persona-title {
    font-size: 2em;
    color: #your-color;
}

/* Caption text styling */
.cme-persona-caption {
    font-size: 16px;
    font-weight: bold;
}

/* Navigation button colors */
.cme-nav-btn {
    background: rgba(your-color, 0.8);
}

/* Active dot color */
.cme-nav-dot.active {
    background: #your-brand-color;
}

/* Hover effects */
.cme-persona-image-container.cme-clickable:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}
```

## 📊 JSON Data Structure

### Complete personas.json Format:
```json
{
  "personas": [
    {
      "id": "thrill-seeker-at-sea",
      "title": "Thrill Seeker at Sea",
      "slug": "thrill-seeker-at-sea",
      "exemplars": {
        "male": {
          "name": "Tahrush the Thrill Seeker at Sea",
          "caption": "Fast-paced thrills keep Tahrush going—every cruise is a new adventure playground.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Tahrush-the-Thrill-Seeker-at-Sea.webp"
        },
        "female": {
          "name": "Tahani the Thrill Seeker at Sea", 
          "caption": "Speed, sun, and pure adrenaline—Tahani craves high-energy fun on the water.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Tahani-the-Thrill-Seeker-at-Sea.webp"
        },
        "indeterminate": {
          "name": "Tenzin the Thrill Seeker at Sea",
          "caption": "Conquering new heights fuels Tenzin—every destination is a challenge to explore.", 
          "image": "https://cdn.cruisemadeeasy.com/Personas/Tenzin-the-Thrill-Seeker-at-Sea.webp"
        }
      }
    },
    {
      "id": "luxe-seafarer",
      "title": "Luxe Seafarer",
      "slug": "luxe-seafarer",
      "exemplars": {
        "male": {
          "name": "Leo the Luxe Seafarer",
          "caption": "The Haven Lounge, a top-shelf drink, and flawless service — this is Leo's kind of escape.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Leo-the-Luxe-Sefarer.webp"
        },
        "female": {
          "name": "Lana the Luxe Seafarer",
          "caption": "Lana loves an exquisite meal, impeccable ambiance, and not a single detail overlooked — perfection at sea.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Lana-the-Luxe-Sefarer.webp" 
        },
        "indeterminate": {
          "name": "London the Luxe Seafarer",
          "caption": "From designer boutiques to hidden gems, every port is an opportunity for London to indulge in something extraordinary.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/London-the-Luxe-Sefarer.webp"
        }
      }
    },
    {
      "id": "easy-breezy-cruiser", 
      "title": "Easy Breezy Cruiser",
      "slug": "easy-breezy-cruiser",
      "exemplars": {
        "male": {
          "name": "Ellis the Easy Breezy Cruiser",
          "caption": "Ellis loves his vacations easy and carefree. No overplanning, no stress—just smooth sailing, cocktails in hand, and a perfectly picked cruise to match his vibe.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Ethan-the-Easy-Breezy-Cruiser.webp"
        },
        "female": {
          "name": "Emma the Easy Breezy Cruiser", 
          "caption": "Emma is here for the fun! She thrives on live music, themed parties, and making new friends—all without sweating the details. Let's plan the perfect cruise for her social side.",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Emma-the-Easy-Breezy-Cruiser.webp"
        },
        "indeterminate": {
          "name": "Ethan the Easy Breezy Cruiser",
          "caption": "Ethan likes the perfect mix of adventure and relaxation. They want the best shore excursions and the chillest sea days—without the hassle of planning",
          "image": "https://cdn.cruisemadeeasy.com/Personas/Ellis-the-Easy-Breezy-Cruiser.webp"
        }
      }
    }
  ]
}
```

## 🔗 URL Parameter Preservation

When clicked, the rotator automatically preserves:
- **UTM Parameters**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- **Tracking IDs**: `gclid` (Google), `fbclid` (Facebook), `msclkid` (Microsoft) 
- **Referrer Info**: `ref`, `referrer`
- **Source Attribution**: Adds `utm_source=persona_rotator` if no source exists

### Example URL Building:
**Original Page**: `https://yoursite.com/landing?utm_source=google&utm_campaign=cruise2024&gclid=abc123`

**Generated Quiz URL**: `https://your-quiz.com?utm_source=google&utm_campaign=cruise2024&gclid=abc123&ref=https://yoursite.com/landing`

## 🚨 Troubleshooting

### "Unable to load personas" Error
1. **Check CSP Headers**: Ensure `connect-src` includes your CDN domain
2. **Verify JSON URL**: Test the personas.json URL directly in browser
3. **Use Inline Data**: For testing, use the `inlineData` option to bypass CORS
4. **Check Browser Console**: Look for specific network errors

### Layout Shifting Issues
- **Preloading**: The component preloads images to prevent shifts
- **Fixed Heights**: Container dimensions are calculated and fixed
- **Test locally**: Use browser dev tools to verify container height is set

### Click Not Working
1. **Check click URL**: Ensure `data-click-url` is set correctly
2. **Navigation interference**: Clicks on navigation buttons don't trigger the main click
3. **CSS pointer events**: Verify no CSS is blocking pointer events

### Images Not Loading
1. **Check CSP img-src**: Ensure CDN domain is allowed for images
2. **Test image URLs**: Verify image URLs work directly in browser
3. **CORS for images**: Images may need CORS headers depending on usage

## 📱 Mobile Responsiveness

The component is fully responsive with:
- **Breakpoints**: 768px (tablet) and 480px (mobile)
- **Scalable images**: Automatic height adjustment
- **Touch-friendly**: Navigation buttons sized for mobile
- **Readable text**: Font sizes scale appropriately

## 🔧 Advanced Usage

### CORS Bypass with Inline Data
```javascript
const personasData = { /* your JSON data */ };

new CMEPersonaRotator('rotator-id', {
    inlineData: personasData,  // Bypasses CORS completely
    clickUrl: 'https://your-quiz.com'
});
```

### Multiple Rotators on Same Page
```html
<div id="rotator-1" data-cme-persona-rotator data-json-url="..."></div>
<div id="rotator-2" data-cme-persona-rotator data-json-url="..."></div>
<div id="rotator-3" data-cme-persona-rotator data-json-url="..."></div>
```

Each rotator will have independent random selection and rotation.

### Dynamic Options Updates
```javascript
const rotator = new CMEPersonaRotator('my-rotator', options);

// Update options after initialization
rotator.updateOptions({
    rotationSpeed: 3000,
    showNavigation: true
});
```

## 🎉 Best Practices

1. **Always set click URL**: Maximize conversion opportunities
2. **Use appropriate rotation speed**: 4000-6000ms works well for readability
3. **Test on mobile**: Verify touch interactions work properly
4. **Monitor performance**: Check image loading times and optimization
5. **A/B test caption positions**: Different audiences prefer different layouts
6. **Keep personas at 3**: Maintains gender diversity and reasonable load times

---

## 📞 Support

For issues or questions:
1. Check browser console for specific error messages
2. Verify all files are accessible via direct URL
3. Test with inline data to isolate CORS issues
4. Ensure CSP headers are properly configured

The persona rotator provides a robust, flexible solution for showcasing cruise personas with excellent user experience and conversion optimization features.