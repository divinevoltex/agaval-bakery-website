/* ===============================
   AGAVAL BAKERY - MAIN SCRIPT
================================ */

(() => {
  const STORAGE_KEY = "agaval_cart";

  /* ---------- CART ---------- */
  const readCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const saveCart = (cart) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  };

  function updateCartCount() {
    const count = readCart().reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll("#cart-count").forEach(e => e.textContent = count);
  }

  function addToCart(name, price) {
    const cart = readCart();
    const item = cart.find(i => i.name === name);
    item ? item.qty++ : cart.push({ name, price, qty: 1 });
    saveCart(cart);
  }

  /* ---------- CART PAGE ---------- */
  function renderCart() {
    const wrap = document.getElementById("cart-items");
    if (!wrap) return;

    const cart = readCart();
    if (!cart.length) {
      wrap.innerHTML = `<p class="muted">Your cart is empty.</p>`;
      document.getElementById("cart-total").textContent = "0";
      return;
    }

    let total = 0;
    wrap.innerHTML = cart.map((i, idx) => {
      total += i.price * i.qty;
      return `
        <div class="cart-item">
          <div>
            <strong>${i.name}</strong>
            <div class="muted">₹${i.price} × ${i.qty}</div>
          </div>
          <div class="controls">
            <button class="btn small inc" data-i="${idx}">+</button>
            <button class="btn small dec" data-i="${idx}">−</button>
          </div>
        </div>`;
    }).join("");

    document.getElementById("cart-total").textContent = total;

    wrap.querySelectorAll(".inc").forEach(b => {
      b.onclick = () => {
        const c = readCart();
        c[b.dataset.i].qty++;
        saveCart(c);
        renderCart();
      };
    });

    wrap.querySelectorAll(".dec").forEach(b => {
      b.onclick = () => {
        const c = readCart();
        c[b.dataset.i].qty > 1 ? c[b.dataset.i].qty-- : c.splice(b.dataset.i, 1);
        saveCart(c);
        renderCart();
      };
    });
  }

  /* ---------- ORDER PAGE ---------- */
  function fillOrder() {
    const ta = document.getElementById("order-items");
    if (!ta) return;
    ta.value = readCart().map(i => `${i.qty} × ${i.name}`).join("\n") || "No items";
  }

  /* ---------- ADD TO CART BUTTONS ---------- */
  function wireButtons() {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      if (btn.dataset.wired) return;
      btn.dataset.wired = "1";
      btn.onclick = () => {
        addToCart(btn.dataset.name, +btn.dataset.price);
        btn.textContent = "Added ✓";
        setTimeout(() => btn.textContent = "Add to Cart", 900);
      };
    });
  }

  /* ---------- GSAP ---------- */
  function initGSAP() {
    if (!window.gsap) return;

    gsap.from(".site-nav", { y: -40, opacity: 0, duration: 0.8 });

    gsap.utils.toArray(".menu-card, .about-box").forEach(el => {
      gsap.from(el, {
        scrollTrigger: el,
        y: 40,
        opacity: 0,
        duration: 0.8
      });
    });
  }

  /* ---------- FIRELIES ---------- */
  function fireflies() {
    const canvas = document.getElementById("fireflies");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h;
    const flies = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.001,
      dy: Math.random() * 0.001
    }));

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(212,175,55,0.8)";
      flies.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x * w, f.y * h, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.x += f.dx;
        f.y += f.dy;
        if (f.x > 1 || f.x < 0) f.dx *= -1;
        if (f.y > 1 || f.y < 0) f.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
    fillOrder();
    wireButtons();
    fireflies();
    initGSAP();
  });
})();    let total = 0;
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

const canvas = document.getElementById("fireflies");
const ctx = canvas.getContext("2d");

let w, h, flies = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 60; i++) {
  flies.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(212,175,55,0.8)";

  flies.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    f.x += f.dx;
    f.y += f.dy;

    if (f.x < 0 || f.x > w) f.dx *= -1;
    if (f.y < 0 || f.y > h) f.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();


document.querySelectorAll('.about-box').forEach((box, i) => {
  box.style.opacity = 0;
  box.style.transform = "translateY(30px)";

  setTimeout(() => {
    box.style.transition = "0.8s ease";
    box.style.opacity = 1;
    box.style.transform = "translateY(0)";
  }, i * 200);
});
