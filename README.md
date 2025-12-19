🥐 Agaval Bakery Website

A modern black & gold themed bakery website with elegant animations, cart system, and email-based order submission using PHP.
Designed to feel royal, premium, and smooth, inspired by luxury bakery brands.


---

✨ Features

🎨 Design & UI

Black & Gold luxury theme

Fullscreen hero section with video background

Responsive (mobile + desktop)

Elegant typography (Playfair Display & Inter)


🎬 Animations & Effects

Golden sparkle background (subtle & behind content)

Smooth page fade-in on load

Navbar slide-in animation

Floating hero title animation

Scroll-based card reveal (GSAP)

Menu card hover lift effect

Gold shimmer button hover

Add-to-cart feedback animation


🛒 Cart System

Add to cart from Home & Menu pages

Cart stored in localStorage

Increase / decrease / remove items

Live cart total calculation

Cart count shown in navbar


📦 Order System

Order page auto-fills cart items

Customer details form

Submits order to backend PHP

Sends order details to Gmail

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
