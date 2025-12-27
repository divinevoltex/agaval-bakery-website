# 🥐 Agaval Bakery Website 🍰  
*(Baked with code, served with style)*

Welcome to **Agaval Bakery** — a digital bakery where pixels are crispy, animations are smooth, and carts never forget your pastries.

No calories here. Just pure frontend goodness.

---

## 🍞 What’s Inside the Oven?

- 🎬 Hero video (yes, it plays like a movie intro)
- ✨ Fireflies animation (because why not)
- 🛒 Add to Cart (powered by browser memory, not magic)
- 💾 Cart survives refreshes (strong like Indian chai)
- 📧 Order form sends emails (FormsFree does the delivery)
- 📱 Fully responsive (works on phones, tablets, and that old laptop)
- 🧠 Clean CSS logic (no page fights… mostly 😄)

---

## 🧁 Tech Ingredients

- HTML5 (the flour)
- CSS3 (the butter)
- JavaScript (the yeast)
- GSAP (extra cream)
- FormsFree (email delivery boy)
- LocalStorage (the fridge)

---

## 🏗️ Project Structure (Neatly Arranged)

Agaval-Bakery  
├── index.html → Home (first impression matters)  
├── menu.html → Menu (temptation zone)  
├── cart.html → Cart (dangerous place)  
├── order.html → Order (point of no return)  
├── about.html → About (our emotional backstory)  
├── order-unavailable.html → Sorry, kitchen closed 😢  
├── styles.css → All the beauty  
├── scripts.js → All the brains  
├── asset/ → Images & videos  
└── README.md → You’re reading it  

---

## 🛒 Cart System (No Basket Required)

- Click **Add to Cart**
- Item goes into LocalStorage
- Refresh the page → still there 😎
- Increase, decrease, remove (power is yours)

---

## 📬 Order System (No Backend Drama)

- Built using **FormsFree**
- Orders arrive directly in email
- Cart items auto-fill (lazy but smart)
- No database, no server, no headaches

---

## 🚀 How to Run This Bakery

1. Download the files  
2. Open the folder  
3. Use Live Server OR double-click `index.html`  
4. Enjoy the smell of fresh code  

---

## 🌍 Hosting Options

Host it anywhere:
- GitHub Pages
- Netlify
- Vercel
- Firebase

If it supports static files, it supports Agaval Bakery.

---

## ⚠️ Important Notes

- No real food is delivered 😢
- Cart data lives in your browser only
- Best enjoyed in modern browsers
- Fireflies may cause happiness ✨

---

## 🟢 Project Status

✔ Fully Functional  
✔ Indexed  
✔ Orders Working  
✔ Mobile Friendly  
✔ Zero Bugs (until someone finds one 😅)

---

## 👑 Final Words

Agaval Bakery isn’t just a website —  
it’s a **frontend experience with a royal touch**.

Built with ❤️, ☕, and lots of Ctrl + Z  
Crafted in India 🇮🇳
Redirects to success page after submission



---

📂 Project Structure

AGAVAL BAKERY/
│
├── index.html        # Home page
├── about.html        # About page
├── menu.html         # Menu page
├── cart.html         # Cart page
├── order.html        # Order form
│
├── styles.css        # All styles & theme
├── scripts.js        # All animations & JS logic
│
├── send_order.php    # Sends email using Gmail SMTP
├── config.php        # Gmail credentials
│
├── phpmailer/
│   └── src/          # PHPMailer files (no Composer)
│
└── assets/
    ├── hero.mp4
    ├── hero banner.png
    └── images/


---

⚙️ Requirements

XAMPP / WAMP / any PHP local server

PHP 7.4 or higher

Internet connection (for Gmail SMTP)

Google account with App Password



---

🚀 How to Run (Localhost)

1. Copy the project folder into:

C:\xampp\htdocs\


2. Start Apache in XAMPP.


3. Open browser and visit:

http://localhost/AGAVAL%20BAKERY/index.html




---

📧 Gmail Setup (IMPORTANT)

This project uses PHPMailer without Composer.

Step 1: Enable App Password

Go to Google Account → Security

Enable 2-Step Verification

Create App Password → Mail

Copy the 16-digit password


Step 2: Edit config.php

<?php
$gmailUser = "yourgmail@gmail.com";
$gmailPass = "your-app-password";
$ownerEmail = "yourgmail@gmail.com";
?>

⚠️ Do NOT use your normal Gmail password.


---

🧪 How Order Flow Works

1. User adds items → Cart


2. Goes to Order Page


3. Cart items auto-filled


4. Form submits to send_order.php


5. Email sent to bakery owner


6. Redirects to success.html




---

🛡️ Notes

No database required (email-based orders)

No Composer used

Works on free hosting that supports PHP

Safe to customize styles & animations



---

🌟 Credits

Designed & developed for Agaval Bakery
Crafted with ❤️ using HTML, CSS, JavaScript, GSAP

[*note by developer*: some file are prohibited(config.php,send_order.php) as it can't able to do it as I want to host it sorry]
