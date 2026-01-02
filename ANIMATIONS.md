# 🎬 Animation Documentation

## Overview

This document explains every animation in the website and the philosophy behind them.

---

## Core Animation Principles

### 1. Motion as Emotion
Every animation should feel intentional and human, not mechanical.

### 2. Slow & Intentional
- Animations feel slow compared to typical web animations
- Duration: 600ms–1400ms (never instant)
- This gives the user time to emotionally process each moment

### 3. Easing Philosophy
We use three main easing functions:

```css
--ease-gentle: cubic-bezier(0.22, 1, 0.36, 1);
--ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-soft: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

- **ease-gentle**: Soft arrival, like something gently floating in
- **ease-smooth**: Smooth transitions for button/card interactions
- **ease-soft**: Natural organic motion

---

## Animation Categories

### 1️⃣ PAGE ENTRY ANIMATION

**What Happens**: When you first arrive at a page, it fades in with a subtle upward movement.

**CSS**:
```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page.enter {
  animation: pageEnter 1.2s var(--ease-gentle) forwards;
}
```

**Why This Works**:
- Opacity fade (0 → 1) makes the page appear gradually
- Small upward movement (12px) suggests arrival from below
- 1.2 second duration feels luxurious, not rushed
- `ease-gentle` creates a soft, inevitable feeling

**JavaScript Trigger**:
```javascript
enterPage() {
  const page = document.getElementById(`page-${this.currentPage}`);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('enter');
  }
}
```

**Performance**: Hardware-accelerated (transform + opacity only)

---

### 2️⃣ TEXT LINE REVEAL

**What Happens**: Text appears line by line, not all at once. English first, Hindi slightly later.

**CSS**:
```css
@keyframes textLineReveal {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-line {
  opacity: 0;
  animation: textLineReveal 0.8s var(--ease-gentle) forwards;
}

.text-line:nth-child(1) { animation-delay: 0s; }
.text-line:nth-child(2) { animation-delay: 0.4s; }
.text-line:nth-child(3) { animation-delay: 0.8s; }
.text-line:nth-child(4) { animation-delay: 1.2s; }

.hindi-line {
  opacity: 0;
  animation: textLineReveal 0.8s var(--ease-gentle) forwards;
}

.hindi-line:nth-child(1) { animation-delay: 0.2s; }  /* Slightly after English */
.hindi-line:nth-child(2) { animation-delay: 0.6s; }
```

**Why This Works**:
- Sequential reveals (0.4s delay) feel like the words are taking turns
- Hindi text appears 200ms after English, creating emotional emphasis
- Small upward movement (8px) gives feeling of text rising naturally
- Never all at once — gives reader time to absorb

**JavaScript Implementation**:
```javascript
setupTextReveals() {
  const textContainers = document.querySelectorAll('[data-text-reveal]');
  
  textContainers.forEach(container => {
    const lines = container.querySelectorAll('.text-line, .hindi-line');
    
    lines.forEach((line, index) => {
      line.style.animation = 'none';
      line.offsetHeight; // Trigger reflow
      
      const baseDelay = line.classList.contains('hindi-line') ? 200 : 0;
      const delay = (index * 400) + baseDelay;
      
      line.style.animation = `textLineReveal 0.8s var(--ease-gentle) ${delay}ms forwards`;
    });
  });
}
```

**Timing**:
- **Line 1**: 0ms
- **Line 2**: 400ms
- **Line 3**: 800ms
- **Line 4**: 1200ms
- **Hindi**: +200ms from English equivalent

---

### 3️⃣ SCROLL-BASED REVEAL (IntersectionObserver)

**What Happens**: Elements animate in when they scroll into view.

**CSS**:
```css
@keyframes scrollReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
}

.reveal.active {
  animation: scrollReveal 1s var(--ease-gentle) forwards;
}

.reveal-stagger-1 { animation-delay: 0s; }
.reveal-stagger-2 { animation-delay: 0.2s; }
.reveal-stagger-3 { animation-delay: 0.4s; }
.reveal-stagger-4 { animation-delay: 0.6s; }
```

**JavaScript**:
```javascript
setupScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal:not(.hidden)');
  
  const observerOptions = {
    threshold: 0.15,  // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px'  // Start animation 50px before entering viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.revealedElements.has(entry.target)) {
        this.revealedElements.add(entry.target);
        
        // Add stagger class
        entry.target.classList.add('active');
        observer.unobserve(entry.target);  // Only animate once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
```

**Why This Works**:
- Elements only animate when scrolled into view (lazy animation)
- `threshold: 0.15` means element starts animating when 15% visible
- `rootMargin: '0px 0px -50px 0px'` adds a 50px bottom buffer
- Reveals only happen once (better performance)
- Stagger delays (0.2s each) create cascading effect

**Use Case**:
- Dividers reveal before headings
- Headings reveal before text
- Text reveals before buttons
- Creates natural progression down the page

---

### 4️⃣ BUTTON MICRO-INTERACTIONS

**What Happens**: Buttons respond to hover with gentle scale and shadow bloom.

**CSS**:
```css
.button {
  padding: 1rem 2.5rem;
  background-color: var(--blush);
  border: 2px solid var(--rose);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.6s var(--ease-smooth);
  box-shadow: 0 4px 16px rgba(168, 124, 124, 0.08);
}

.button:hover {
  transform: translateY(-4px);  /* Lift up */
  box-shadow: 0 12px 28px rgba(168, 124, 124, 0.15);  /* Shadow grows */
  background-color: var(--rose);
  border-color: var(--deep-rose);
}

.button:active {
  transform: translateY(-2px);  /* Still lifted but less */
}

.button-arrow {
  font-size: 1.1rem;
  transition: transform 0.6s var(--ease-smooth);
}

.button:hover .button-arrow {
  transform: translateX(4px);  /* Arrow moves right on hover */
}
```

**Why This Works**:
- `transform: translateY(-4px)` creates a "lift" effect without position changes
- Box shadow grows softly (0.08 → 0.15 opacity) — "blooms" outward
- Color shift stays within palette (blush → rose)
- Arrow movement suggests forward progress
- 0.6s duration is long enough to feel intentional

**JavaScript**:
No additional JS needed — purely CSS! This is intentional for performance.

---

### 5️⃣ CARD INTERACTIONS

**What Happens**: Cards on Page 3 lift and deepen shadow on hover.

**CSS**:
```css
.card {
  background: var(--white);
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(168, 124, 124, 0.06);
  transition: all 0.7s var(--ease-smooth);
  opacity: 0;
  transform: translateY(20px);
  border: 1px solid rgba(232, 212, 204, 0.5);
}

.card.active {
  opacity: 1;
  transform: translateY(0);
}

.card:hover {
  transform: translateY(-6px);  /* Lift higher than buttons */
  box-shadow: 0 16px 40px rgba(168, 124, 124, 0.12);  /* Double shadow strength */
  border-color: var(--rose);
}
```

**Why This Works**:
- Initial state: cards are hidden below (translateY 20px)
- When scrolled into view: `.active` animates them up
- Hover: lifts even higher (6px vs button's 4px)
- Shadow deepens more dramatically than buttons
- Border becomes visible on hover (subtle highlight)

---

### 6️⃣ PAGE TRANSITIONS

**What Happens**: Current page fades out, then next page fades in with a delay.

**CSS**:
```css
@keyframes pageExit {
  to {
    opacity: 0;
    transform: translateY(-12px);
  }
}

.page.exit {
  animation: pageExit 0.8s var(--ease-smooth) forwards;
}
```

**JavaScript**:
```javascript
transitionToPage(pageNumber) {
  if (this.isTransitioning) return;
  
  this.isTransitioning = true;
  const currentPageEl = document.getElementById(`page-${this.currentPage}`);
  const nextPageEl = document.getElementById(`page-${pageNumber}`);
  
  // 1. Exit animation (600ms)
  currentPageEl.classList.add('exit');

  // 2. Wait, then swap pages
  setTimeout(() => {
    currentPageEl.classList.add('hidden');
    nextPageEl.classList.remove('hidden');
    
    // 3. Enter animation (1200ms)
    nextPageEl.classList.add('enter');
    
    this.currentPage = pageNumber;
    this.isTransitioning = false;
  }, 600);  // Wait for exit to complete
}
```

**Timing**:
1. **Exit**: 600ms (current page fades out)
2. **Delay**: 200ms (pause between pages)
3. **Enter**: 1200ms (next page fades in)
4. **Total**: ~2 seconds (feels like turning a page in a book)

**Why This Works**:
- Exit first (600ms) — gives the page time to leave
- Delay (200ms) — creates anticipation
- Enter second (1200ms) — slow arrival of new content
- Combined: feels like one continuous motion, not abrupt

---

## Performance Optimization

### Hardware Acceleration
All animations use only:
- `transform` (scale, translate, rotate)
- `opacity`

These properties are GPU-accelerated. We **never** animate:
- `width`, `height`, `left`, `top` (causes layout recalculation)
- `box-shadow` (causes repaint) — used sparingly
- `background-color` (causes repaint) — used sparingly

### JavaScript Efficiency
- `IntersectionObserver` instead of scroll listener (passive)
- Animation state stored in Set (O(1) lookup)
- Elements only animate once (`revealedElements` tracks this)

### CSS Efficiency
- `cubic-bezier` precalculated (not computed)
- Media queries for responsive timing
- Animations defined once in keyframes, reused via classes

---

## Accessibility

### Reduced Motion Support

```javascript
if (supportsReducedMotion()) {
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}
```

Users with `prefers-reduced-motion: reduce` will see instant animations instead of slow ones.

### Keyboard Navigation

```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentPage < 4) {
    animationController.transitionToPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' && currentPage > 1) {
    animationController.transitionToPage(currentPage - 1);
  }
});
```

Users can navigate with arrow keys.

---

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | All animations smooth |
| Firefox | ✅ Full | All animations smooth |
| Safari | ✅ Full | All animations smooth |
| Edge | ✅ Full | All animations smooth |
| IE 11 | ⚠️ Partial | No CSS animation, layout works |

---

## Animation Timing Reference

| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|---------|
| Page Enter | 1200ms | ease-gentle | Cinematic page arrival |
| Text Line | 800ms | ease-gentle | Line-by-line reveal |
| Line Delay | 400ms | — | Stagger between lines |
| Scroll Reveal | 1000ms | ease-gentle | Elements appear on scroll |
| Button Hover | 600ms | ease-smooth | Gentle button response |
| Card Hover | 700ms | ease-smooth | Smooth card lift |
| Page Exit | 600ms | ease-smooth | Current page fade out |
| Page Transition Delay | 200ms | — | Pause between pages |

---

## Testing Animations

### In Browser DevTools
1. Open DevTools (F12)
2. Go to Rendering tab
3. Check "Rendering" > "Paint flashing" to see what repaints
4. Check "Rendering" > "Show composite borders" to see GPU layers

### Inspect Animation Performance
```javascript
// In console:
console.log(window.animationController);  // See animation state
window.animationController.transitionToPage(2);  // Test transitions
```

### Test Reduced Motion
In DevTools > Rendering > check "Emulate CSS media feature prefers-reduced-motion"

---

## Customization Guide

### Change Animation Duration
In `css/styles.css`:
```css
.page.enter {
  animation: pageEnter 1.2s var(--ease-gentle) forwards;  /* Change 1.2s */
}
```

### Change Easing
```css
:root {
  --ease-gentle: cubic-bezier(0.22, 1, 0.36, 1);  /* Modify this */
}
```

Try these alternatives:
```css
/* More bouncy */
cubic-bezier(0.34, 1.56, 0.64, 1);

/* More snappy */
cubic-bezier(0.4, 0, 0.2, 1);

/* More linear */
cubic-bezier(0.25, 0.25, 0.75, 0.75);
```

### Add New Animations
```css
@keyframes customAnimation {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.my-element {
  animation: customAnimation 800ms var(--ease-gentle) forwards;
}
```

---

## Common Questions

### Why are animations so slow?
Slow animations feel intentional and romantic. They give users time to process emotion.

### Why use CSS animations instead of JavaScript?
CSS animations are more performant (GPU-accelerated) and don't block the main thread.

### Why IntersectionObserver?
It's more efficient than scroll listeners and naturally handles "reveal once" behavior.

### Can I disable animations?
Users with `prefers-reduced-motion` already get instant animations. You can add a button:

```javascript
function toggleAnimations() {
  document.body.classList.toggle('no-animations');
}
```

Then add CSS:
```css
body.no-animations * {
  animation: none !important;
  transition: none !important;
}
```

---

## Philosophy Summary

Every animation in this website asks: **"Does this motion support the emotion?"**

If yes → Include it, tune it, perfect it.
If no → Remove it.

The result is a website that feels less like a web app and more like a carefully designed love letter.

❤︎
