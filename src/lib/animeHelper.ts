import { animate, stagger, createTimeline, svg } from 'animejs';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Staggered entrance of hero headline, subtitle, input, and cards
 */
export function animatePageEntrance(container: HTMLElement | null) {
  if (!container || prefersReducedMotion()) return;

  const elements = container.querySelectorAll<HTMLElement>('.anime-entrance');
  if (!elements.length) return;

  animate(elements, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 650,
    delay: stagger(70, { start: 120 }),
    ease: 'outExpo',
  });
}

/**
 * Validation error shake animation for the input field
 */
export function animateInputShake(target: HTMLElement | null) {
  if (!target || prefersReducedMotion()) return;

  animate(target, {
    translateX: [0, -8, 8, -6, 6, -3, 3, 0],
    duration: 420,
    ease: 'inOutQuad',
  });
}

/**
 * Checkmark SVG draw animation for valid input or export success
 */
export function animateCheckmarkDraw(pathTarget: SVGPathElement | null) {
  if (!pathTarget || prefersReducedMotion()) return;

  try {
    const drawable = svg.createDrawable(pathTarget);
    animate(drawable, {
      draw: ['0% 0%', '0% 100%'],
      duration: 500,
      ease: 'outQuad',
    });
  } catch {
    const len = pathTarget.getTotalLength?.() || 100;
    pathTarget.style.strokeDasharray = `${len}`;
    pathTarget.style.strokeDashoffset = `${len}`;
    animate(pathTarget, {
      strokeDashoffset: [len, 0],
      duration: 500,
      ease: 'outQuad',
    });
  }
}

/**
 * Sliding animated tab underline
 */
export function animateTabIndicator(
  indicatorEl: HTMLElement | null,
  left: number,
  width: number
) {
  if (!indicatorEl) return;

  if (prefersReducedMotion()) {
    indicatorEl.style.transform = `translateX(${left}px)`;
    indicatorEl.style.width = `${width}px`;
    return;
  }

  animate(indicatorEl, {
    translateX: left,
    width: width,
    duration: 300,
    ease: 'outExpo',
  });
}

/**
 * Button press micro-interaction
 */
export function animateButtonPress(buttonEl: HTMLElement | null) {
  if (!buttonEl || prefersReducedMotion()) return;

  animate(buttonEl, {
    scale: [1, 0.94, 1],
    duration: 260,
    ease: 'outQuad',
  });
}

/**
 * Logo pop animation in QR center
 */
export function animateLogoPop(logoEl: HTMLElement | null) {
  if (!logoEl || prefersReducedMotion()) return;

  animate(logoEl, {
    scale: [0, 1.15, 1],
    opacity: [0, 1],
    duration: 480,
    ease: 'outBack',
  });
}

/**
 * Floating background ambient animation
 */
export function animateFloatingBlobs(blob1: HTMLElement | null, blob2: HTMLElement | null) {
  if (prefersReducedMotion()) return;

  if (blob1) {
    animate(blob1, {
      translateX: [-25, 25],
      translateY: [-20, 20],
      rotate: [-6, 6],
      duration: 12000,
      alternate: true,
      loop: true,
      ease: 'inOutQuad',
    });
  }

  if (blob2) {
    animate(blob2, {
      translateX: [30, -30],
      translateY: [25, -25],
      rotate: [8, -8],
      duration: 14000,
      alternate: true,
      loop: true,
      ease: 'inOutQuad',
    });
  }
}

/**
 * Toast slide in and out animation
 */
export function animateToast(toastEl: HTMLElement | null, isEntering: boolean, onComplete?: () => void) {
  if (!toastEl) return;

  if (prefersReducedMotion()) {
    toastEl.style.opacity = isEntering ? '1' : '0';
    if (!isEntering && onComplete) onComplete();
    return;
  }

  if (isEntering) {
    animate(toastEl, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.92, 1],
      duration: 320,
      ease: 'outBack',
    });
  } else {
    animate(toastEl, {
      opacity: [1, 0],
      translateY: [0, 16],
      scale: [1, 0.94],
      duration: 250,
      ease: 'inQuad',
    }).then(() => {
      if (onComplete) onComplete();
    });
  }
}

/**
 * Scene-Specific Animations (Steam, Envelope slide, Scooter ride, Scribbles, Beer bubbles, Float tray)
 */
export function initSceneAnimation(container: SVGSVGElement | null, animationType: string) {
  if (!container || prefersReducedMotion()) return;

  // Ensure #qr-slot has no lingering CSS transform from anime.js
  const qrSlot = container.querySelector('#qr-slot') as SVGElement | null;
  if (qrSlot) {
    qrSlot.style.transform = '';
  }

  // 1. Steam rising animation (coffee cup, hot food)
  if (animationType === 'steam') {
    const steamPaths = container.querySelectorAll('#coffee-steam path');
    if (steamPaths.length) {
      animate(steamPaths, {
        translateY: [14, -18],
        opacity: [0.2, 0.8, 0],
        duration: 2200,
        delay: stagger(350),
        loop: true,
        ease: 'inOutQuad',
      });
    }
  }

  // 2. Slide out card from envelope (animating wrapper group containing card and QR slot)
  if (animationType === 'slide-out') {
    const cardEl = container.querySelector('#envelope-card-slide');
    if (cardEl) {
      animate(cardEl, {
        translateY: [65, 0],
        duration: 850,
        ease: 'outBack',
      });
    }
  }

  // 3. Scooter ride in (animating wrapper group containing scooter, box and QR slot)
  if (animationType === 'ride') {
    const scooterEl = container.querySelector('.anime-scooter-ride');
    if (scooterEl) {
      animate(scooterEl, {
        translateX: [-65, 0],
        duration: 800,
        ease: 'outBack',
      });
    }
  }

  // 4. Scribble frame drawing effect
  if (animationType === 'scribble') {
    const scribbles = container.querySelectorAll('#scribble-strokes path');
    if (scribbles.length) {
      scribbles.forEach((path) => {
        try {
          const drawable = svg.createDrawable(path as SVGPathElement);
          animate(drawable, {
            draw: ['0% 0%', '0% 100%'],
            duration: 800,
            delay: stagger(30),
            ease: 'outQuad',
          });
        } catch {
          // Fallback
        }
      });
    }
  }

  // 5. Serving tray floating gently (animating wrapper group containing tray, hand and QR slot)
  if (animationType === 'float') {
    const trayEl = container.querySelector('.anime-float-tray');
    if (trayEl) {
      animate(trayEl, {
        translateY: [-5, 5],
        duration: 2800,
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      });
    }
  }

  // 6. Beer bubbles rising and popping
  if (animationType === 'pour') {
    const bubbles = container.querySelectorAll('#beer-bubbles circle');
    if (bubbles.length) {
      animate(bubbles, {
        translateY: [0, -45],
        opacity: [0.8, 0],
        duration: 1600,
        delay: stagger(250),
        loop: true,
        ease: 'inQuad',
      });
    }
  }
}
