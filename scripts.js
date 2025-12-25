/* ===============================
   AGAVAL BAKERY – MAIN SCRIPT
================================ */

(() => {
  const STORAGE_KEY = "agaval_cart";

  /* ---------- CART CORE ---------- */
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
  function renderCartPage() {
    const el = document.getElementById("cart-items");
    if (!el) return;

    const cart = readCart();
    if (!cart.length) {
      el.innerHTML = `<p class="muted">Your cart is empty.</p>`;
      document.getElementById("cart-total").textContent = "0";
      return;
    }

    let total = 0;
    el.innerHTML = cart.map((it, i) => {
      total += it.price * it.qty;
      return `
        <div class="cart-item">
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
    }).join("");

    document.getElementById("cart-total").textContent = total;

    el.querySelectorAll(".inc").forEach(b => b.onclick = () => {
      const c = readCart(); c[b.dataset.i].qty++; saveCart(c); renderCartPage();
    });

    el.querySelectorAll(".dec").forEach(b => b.onclick = () => {
      const c = readCart();
      c[b.dataset.i].qty > 1 ? c[b.dataset.i].qty-- : c.splice(b.dataset.i, 1);
      saveCart(c); renderCartPage();
    });

    el.querySelectorAll(".rem").forEach(b => b.onclick = () => {
      const c = readCart(); c.splice(b.dataset.i, 1);
      saveCart(c); renderCartPage();
    });
  }

  /* ---------- ORDER PAGE ---------- */
  function fillOrderFromCart() {
    const ta = document.getElementById("order-items");
    if (!ta) return;

    const cart = readCart();
    ta.value = cart.length
      ? cart.map(i => `${i.qty} × ${i.name} — ₹${i.qty * i.price}`).join("\n")
      : "No items in cart";
  }

  /* ---------- ADD TO CART ---------- */
  function wireAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      if (btn.dataset.wired) return;
      btn.dataset.wired = "1";

      btn.onclick = () => {
        addToCart(btn.dataset.name, +btn.dataset.price);
        btn.textContent = "Added ✓";
        setTimeout(() => btn.textContent = "Add to Cart", 900);

        if (window.gsap) {
          gsap.fromTo(btn, { scale: 0.92 }, { scale: 1, duration: 0.3 });
        }
      };
    });
  }

  /* ---------- FIRELIES (SAFE) ---------- */
  function fireflies() {
    const canvas = document.getElementById("fireflies");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.style.zIndex = "0";

    let w, h;
    const flies = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.001,
      dy: (Math.random() - 0.5) * 0.001
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    (function animate() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(212,175,55,0.75)";
      flies.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x * w, f.y * h, f.r, 0, Math.PI * 2);
        ctx.fill();
        f.x += f.dx; f.y += f.dy;
        if (f.x < 0 || f.x > 1) f.dx *= -1;
        if (f.y < 0 || f.y > 1) f.dy *= -1;
      });
      requestAnimationFrame(animate);
    })();
  }

  /* ---------- GSAP ---------- */
  function initGSAP() {
    if (!window.gsap) return;

    gsap.from(".site-nav", { y: -40, opacity: 0, duration: 0.8 });

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray(".card, .menu-card, .about-box").forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.8
        });
      });
    }
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    wireAddToCartButtons();
    renderCartPage();
    fillOrderFromCart();
    fireflies();
    initGSAP();

    new MutationObserver(wireAddToCartButtons)
      .observe(document.body, { childList: true, subtree: true });
  });

  window.AgavalCart = { readCart, addToCart };
})();

/* ---------- NAV SCROLL ---------- */
window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 60);
});
