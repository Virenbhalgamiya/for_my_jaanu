# 🎨 Customization Guide

This guide shows you how to personalize the website with your own content, colors, and preferences.

---

## 📝 Step 1: Update Content (Easiest)

### Edit Page 1 (Smile)
Open `index.html` and find this section:

```html
<!-- PAGE 1: SMILE - Light & Playful -->
<div id="page-1" class="page enter">
    <section class="section">
        <div data-text-reveal>
            <h1 class="text-line">I needed a better way to say something.</h1>
        </div>
    </section>
    <!-- ... more content ... -->
</div>
```

Change the text to your own message:
```html
<h1 class="text-line">Your custom message here.</h1>
<p class="hindi-line hindi-text">आपका कस्टम संदेश यहाँ।</p>
```

### Edit Page 2 (Realization)
Update the reflection log:
```html
<div class="reflection-log reveal reveal-stagger-2">
    <ul>
        <li class="text-line">Your first reflection</li>
        <li class="text-line">Your second reflection</li>
        <li class="text-line">Your third reflection</li>
    </ul>
</div>
```

### Edit Page 3 (Why You Matter)
Update the three cards:
```html
<div class="card reveal reveal-stagger-1">
    <h3 class="card-title">
        <span class="text-line">Your first reason</span>
    </h3>
    <p class="card-text text-line">Your detailed explanation</p>
    <p class="hindi-text text-line">आपका हिंदी अनुवाद।</p>
</div>
```

### Edit Page 4 (Ending)
Personalize the closing:
```html
<p style="font-size: 0.8rem; color: var(--text-light); margin-top: 1rem;">
    For [Her/His Name].
</p>
```

---

## 🎨 Step 2: Change Colors

Open `css/styles.css` and find the `:root` section:

```css
:root {
  /* Primary Romantic Colors */
  --cream: #faf8f5;           /* Main background */
  --blush: #f5e6e1;           /* Primary accent */
  --rose: #e8d4cc;            /* Secondary accent */
  --warm-beige: #dcc9bc;      /* Tertiary */
  --soft-mauve: #d9c4d4;      /* Emotional warmth */
  --deep-rose: #a67c7c;       /* Emphasis / Hover state */
  
  /* Text Colors */
  --text-dark: #3d3d3d;       /* Main text */
  --text-muted: #6b6b6b;      /* Secondary text */
  --text-light: #8b8b8b;      /* Light text */
  
  /* Accents */
  --accent-warm: #c9a697;     /* Hindi text color */
  --white: #ffffff;           /* White */
}
```

### Example: Change to Blue Palette
```css
:root {
  --cream: #f0f3f7;           /* Light blue-gray */
  --blush: #d4e0f0;           /* Soft blue */
  --rose: #b3cde8;            /* Medium blue */
  --warm-beige: #92b0d9;      /* Deeper blue */
  --soft-mauve: #8fa3c9;      /* Blue-purple */
  --deep-rose: #4a6fa5;       /* Dark blue */
  
  --text-dark: #1a3a52;
  --text-muted: #3d5a7a;
  --text-light: #6b7f99;
  
  --accent-warm: #6b8fcf;
  --white: #ffffff;
}
```

### Example: Change to Warm Gold Palette
```css
:root {
  --cream: #fdf8f0;           /* Warm white */
  --blush: #fce9d3;           /* Soft peach */
  --rose: #f5dfc0;            /* Light gold */
  --warm-beige: #ead9b5;      /* Warm tan */
  --soft-mauve: #e8d5c4;      /* Mauve-gold */
  --deep-rose: #c9a87a;       /* Deep gold */
  
  --text-dark: #4a3a2a;
  --text-muted: #6b5a4a;
  --text-light: #8b7a6a;
  
  --accent-warm: #d4a574;
  --white: #ffffff;
}
```

### Use a Color Picker
1. Go to https://colorhexa.com or https://www.color-hex.com
2. Find a color you like
3. Copy the hex code (e.g., `#ff6b9d`)
4. Replace in CSS

---

## 🔤 Step 3: Change Fonts

Open `css/styles.css` and modify typography:

### Change Main Font (Currently Georgia)
```css
h1, h2 {
  font-family: 'Georgia', serif;  /* Change this */
}
```

Popular alternatives:
```css
/* Modern serif */
font-family: 'Merriweather', serif;

/* Classic serif */
font-family: 'Playfair Display', serif;

/* Elegant serif */
font-family: 'Cormorant Garamond', serif;

/* Clean sans-serif */
font-family: '-apple-system', 'Segoe UI', 'Helvetica Neue', sans-serif;

/* Warm sans-serif */
font-family: 'Inter', 'Open Sans', sans-serif;
```

### Add from Google Fonts
1. Go to https://fonts.google.com
2. Find a font you like
3. Click "Select this style"
4. Copy the import line at top of `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

Then update CSS:
```css
h1, h2 {
  font-family: 'Playfair Display', serif;
}
```

---

## ⏱️ Step 4: Adjust Animation Timing

Open `css/styles.css`:

### Slow Down All Animations
```css
/* Find and modify duration values */
animation: pageEnter 1.2s var(--ease-gentle) forwards;
/* Change 1.2s to 1.8s or 2.0s for slower animations */
```

### Speed Up Specific Animations
```css
/* Text reveals (default 0.8s) */
@keyframes textLineReveal {
  animation: textLineReveal 0.5s var(--ease-gentle) forwards;  /* Faster */
}

/* Button hover (default 0.6s) */
.button:hover {
  transition: all 0.3s var(--ease-smooth);  /* Faster */
}
```

### Change Easing (Feel)

Current easing functions:
```css
--ease-gentle: cubic-bezier(0.22, 1, 0.36, 1);  /* Soft arrival */
--ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);  /* Button responses */
--ease-soft: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Card reveals */
```

Try these alternatives:
```css
/* More snappy/quick */
--ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);

/* More bouncy */
--ease-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);

/* More linear/mechanical */
--ease-linear: cubic-bezier(0.25, 0.25, 0.75, 0.75);

/* Very slow, dramatic arrival */
--ease-dramatic: cubic-bezier(0.04, 0.04, 0.12, 0.96);
```

---

## 🌍 Step 5: Customize Hindi Text

### Use Hindi Online Typing Tool
https://www.google.com/inputtools/try/

Or directly replace in HTML:

```html
<!-- Change this -->
<p class="hindi-text">Aur haan… text mein thoda fail ho gaya tha.</p>

<!-- To this (romanized Hindi still works!) -->
<p class="hindi-text">कुछ और कहना चाहता हूँ तुमसे।</p>
```

### Keep English Transliteration Only
If you prefer not to use Devanagari script:
```html
<!-- Remove the Devanagari font requirement -->
<p class="hindi-text">Aur haan… text mein thoda fail ho gaya tha.</p>
<!-- Keep it in Latin letters (still readable as Hindi) -->
```

---

## 📱 Step 6: Adjust Responsive Breakpoints

Open `css/styles.css` and find media queries:

```css
@media (max-width: 768px) {
  /* Tablet styles */
}

@media (max-width: 480px) {
  /* Mobile styles */
}
```

Customize for your needs:
```css
/* Large screens (1200px+) */
@media (min-width: 1200px) {
  h1 {
    font-size: 4rem;
  }
}

/* Tablets (768px - 1199px) */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}

/* Mobile (max 767px) */
@media (max-width: 767px) {
  h1 {
    font-size: 1.75rem;
  }
}
```

---

## 🎯 Step 7: Add Your Name/Recipient Info

### Option 1: Replace Generic Text
In Page 4, find:
```html
<p style="font-size: 0.8rem; color: var(--text-light); margin-top: 1rem;">
    For you.
</p>
```

Change to:
```html
<p style="font-size: 0.8rem; color: var(--text-light); margin-top: 1rem;">
    For [Her Beautiful Name].
</p>
```

### Option 2: Use JavaScript to Personalize
Add a prompt on page load:

In `js/animations.js`:
```javascript
// Add at end of init() method
this.personalizeWebsite();

personalizeWebsite() {
  const name = localStorage.getItem('recipient-name');
  if (!name) {
    const enteredName = prompt('Who is this for? (Leave blank to skip)', '');
    if (enteredName) {
      localStorage.setItem('recipient-name', enteredName);
      document.querySelector('[data-recipient]').textContent = `For ${enteredName}.`;
    }
  }
}
```

Then in HTML, add:
```html
<p style="font-size: 0.8rem; color: var(--text-light);" data-recipient>For you.</p>
```

---

## 🎨 Step 8: Advanced Customization

### Create a Custom Color Scheme
Use https://coolors.co to create a palette, then:

```css
:root {
  --primary: #e8d4cc;      /* From your palette */
  --secondary: #a67c7c;    /* From your palette */
  --accent: #fdf8f0;       /* From your palette */
  --dark: #3d3d3d;         /* From your palette */
  --light: #8b8b8b;        /* From your palette */
}

/* Apply throughout */
.button {
  background-color: var(--primary);
  border-color: var(--secondary);
}

.card {
  box-shadow: 0 4px 24px rgba(var(--secondary), 0.06);
}
```

### Add Custom Sections
Create new sections on any page:

```html
<!-- Add new page or section -->
<div id="page-5" class="page hidden">
  <div class="page-content">
    <section class="section">
      <h1 class="reveal reveal-stagger-1">Your custom heading</h1>
      <p class="reveal reveal-stagger-2">Your custom content</p>
    </section>
    
    <button class="button" data-next-page="1">
      Back to beginning
      <span class="button-arrow">↻</span>
    </button>
  </div>
</div>
```

Then update JavaScript:
```javascript
transitionToPage(pageNumber) {
  if (pageNumber === 5) {
    // Handle page 5 as needed
  }
  // ... existing code
}
```

### Add Background Images
```css
.page {
  background-image: url('assets/texture.png');
  background-blend-mode: lighten;
  background-size: cover;
}
```

---

## 🚀 Step 9: Deploy Your Personalized Version

### On GitHub Pages
1. Fork the repo
2. Edit files in GitHub's web editor
3. Changes deploy automatically

### On Vercel
1. Import repo to Vercel
2. Edit files in GitHub
3. Vercel auto-deploys on commit

### On Your Server
1. Edit files locally
2. FTP/upload to server
3. Visit your domain

---

## 🎯 Quick Checklist

- [ ] Updated all text content to your message
- [ ] Chosen a color palette (optional)
- [ ] Selected fonts (optional)
- [ ] Adjusted animation timing (optional)
- [ ] Customized Hindi text or removed it
- [ ] Added recipient's name
- [ ] Tested on mobile device
- [ ] Tested animations in browser
- [ ] Deployed to GitHub Pages / Vercel
- [ ] Shared link with recipient

---

## 💡 Pro Tips

1. **Test on Phone**: Open `index.html` on your phone to verify mobile experience
2. **Read Aloud**: Have someone read the text aloud to check flow and tone
3. **Animation Testing**: Open DevTools (F12) and use Chrome DevTools Rendering tab to see animation performance
4. **Color Contrast**: Use https://webaim.org/resources/contrastchecker/ to ensure text is readable
5. **Load Time**: Use https://pagespeed.web.dev to check website speed

---

## 🆘 Troubleshooting

### Animations aren't working?
1. Check browser console (F12) for errors
2. Verify CSS file is loading (check Network tab)
3. Try refreshing the page
4. Clear browser cache (Ctrl+Shift+Delete)

### Text looks weird?
1. Check font is loading from Google Fonts
2. Verify character encoding is UTF-8
3. For Hindi text, ensure `Noto Sans Devanagari` font is selected

### Colors look wrong?
1. Try different browser (color management varies)
2. Check CSS variable is spelled correctly
3. Use browser DevTools to inspect element's styles

### Page navigation broken?
1. Verify `data-next-page="X"` is set correctly on buttons
2. Check that all page divs have correct IDs (`page-1`, `page-2`, etc.)
3. Open console and run `window.animationController.transitionToPage(2)` to test

---

## 📞 Need Help?

- Check ANIMATIONS.md for motion details
- Review the inline code comments in CSS/JS
- Test in browser DevTools
- Start with small changes and work up to larger ones

---

**Remember**: The goal is to make someone feel important and loved. Every change you make should support that goal. ❤︎**
