/* scripts.js
   - Sparkles background
   - GSAP animations (nav, hero, cards)
   - Cart (localStorage) + UI wiring
   - Fills order textarea with cart contents
*/

(function () {
  // Helpers
  const STORAGE_KEY = 'agaval_cart';

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  }
  function updateCartCount() {
    const cart = readCart();
    const count = cart.reduce((s, i) => s + (i.qty || 0), 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
  }

  // Sparkles
  function createSparkles(num = 30) {
    for (let i = 0; i < num; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.width = (6 + Math.random() * 8) + 'px';
      s.style.height = s.style.width;
      s.style.opacity = 0.5 + Math.random() * 0.6;
      s.style.animationDuration = (3 + Math.random() * 5) + 's';
      // put into body but keep behind content by low z-index (styles.css sets z-index:0)
      document.body.appendChild(s);
    }
  }

  // Add item to cart
  function addToCart(name, price) {
    const cart = readCart();
    const idx = cart.findIndex(i => i.name === name);
    if (idx >= 0) cart[idx].qty++;
    else cart.push({ name, price: Number(price), qty: 1 });
    saveCart(cart);
    return cart;
  }

  // Render cart page
  function renderCartPage() {
    const el = document.getElementById('cart-items');
    if (!el) return;
    const cart = readCart();
    if (cart.length === 0) {
      el.innerHTML = '<p class="muted">Your cart is empty — add some treats!</p>';
      document.getElementById('cart-total').textContent = '0';
      return;
    }
    let total = 0;
    const html = cart.map((it, i) => {
      total += it.price * it.qty;
      return `<div class="cart-item">
        <div>
          <strong>${it.name}</strong>
          <div class="muted">₹${it.price} × ${it.qty}</div>
        </div>
        <div class="controls">
          <button class="btn small dec" data-i="${i}">−</button>
          <button class="btn small inc" data-i="${i}">+</button>
          <button class="btn small danger rem" data-i="${i}">Remove</button>
        </div>
      </div>`;
    }).join('');
    el.innerHTML = html;
    document.getElementById('cart-total').textContent = total;

    // wire controls
    el.querySelectorAll('.inc').forEach(b => b.onclick = () => {
      const i = +b.dataset.i; const c = readCart();
      c[i].qty++; saveCart(c); renderCartPage();
    });
    el.querySelectorAll('.dec').forEach(b => b.onclick = () => {
      const i = +b.dataset.i; const c = readCart();
      if (c[i].qty > 1) c[i].qty--; else c.splice(i, 1);
      saveCart(c); renderCartPage();
    });
    el.querySelectorAll('.rem').forEach(b => b.onclick = () => {
      const i = +b.dataset.i; const c = readCart();
      c.splice(i, 1); saveCart(c); renderCartPage();
    });
  }

  // Fill order textarea on order page
  function fillOrderFromCart() {
    const ta = document.getElementById('order-items');
    if (!ta) return;
    const cart = readCart();
    if (cart.length === 0) ta.value = 'No items in cart';
    else {
      const lines = cart.map(i => `${i.qty} × ${i.name}  — ₹${i.price}  (subtotal ₹${i.qty * i.price})`);
      ta.value = lines.join('\n');
    }
  }

  // Wire add-to-cart buttons on pages
  function wireAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      if (btn.__wired) return;
      btn.__wired = true;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = btn.dataset.name;
        const price = btn.dataset.price || btn.getAttribute('data-price') || 0;
        addToCart(name, price);
        // small feedback
        const old = btn.innerHTML;
        btn.innerHTML = 'Added ✓';
        setTimeout(() => btn.innerHTML = old, 900);
        // ripple GSAP effect
        if (window.gsap) {
          gsap.fromTo(btn, { scale: 0.92 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.6)' });
        }
      });
    });
  }

  // GSAP page animations
  function initGsap() {
    if (!window.gsap) return;
    // nav slide-in
    gsap.from('.nav', { y: -40, opacity: 0, duration: 0.8 });

    // hero title float
    if (document.querySelector('.hero-inner h1')) {
      gsap.to('.hero-inner h1', { y: -10, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
    }

    // reveal cards and menu-cards
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.card, .menu-card, .about-card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 30, opacity: 0, duration: 0.8, delay: i * 0.08
        });
      });
    } else {
      gsap.utils.toArray('.card, .menu-card').forEach((el, i) => {
        gsap.from(el, { y: 30, opacity: 0, duration: 0.8, delay: i * 0.08 });
      });
    }

    // button shimmer on hover
    gsap.utils.toArray('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.fromTo(btn, { boxShadow: '0 0 0px rgba(212,175,55,0.0)' }, { boxShadow: '0 0 18px rgba(212,175,55,0.45)', duration: 0.45 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { boxShadow: '0 0 0px rgba(0,0,0,0)', duration: 0.4 });
      });
    });
  }

  // Page transitions (smooth fade on load)
  function pageFadeIn() {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 0.6s ease';
    setTimeout(() => document.body.style.opacity = 1, 30);
  }

  // Init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    pageFadeIn();
    createSparkles(35);
    updateCartCount();
    wireAddToCartButtons();
    renderCartPage();
    fillOrderFromCart();
    initGsap();

    // If on menu page, re-wire buttons after content loads
    // Also keep watching (in case menu items injected later)
    const observer = new MutationObserver(() => wireAddToCartButtons());
    observer.observe(document.body, { childList: true, subtree: true });

    // Auto-insert cart contents into checkout button link (go-checkout)
    const goCheckout = document.getElementById('go-checkout');
    if (goCheckout) {
      goCheckout.addEventListener('click', (e) => {
        // let native navigation happen; order page will read cart
      });
    }
  });

  // Expose some functions for console debugging (optional)
  window.AgavalCart = {
    readCart, saveCart, addToCart
  };

})();

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});
