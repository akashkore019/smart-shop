# Mega Store – Smart Kirana Frontend

This is a **Next.js + Tailwind CSS** web app for your local shop **Mega Store**.

It works as:

- A modern **website** on desktop
- A smooth **web app** on mobile (add to home screen)
- A smart **WhatsApp ordering system** for your customers

---

## ✨ Features

### 🛒 Customer Experience

- Browse products by **category**
- See **name, SKU, price, unit, stock status**
- Add items to a **cart**
- Adjust quantity (+ / -)
- Cart is stored in **localStorage** (stays after refresh)
- Checkout via **WhatsApp** with a pre-filled, well-formatted message
- Fill **name, address and payment mode** before sending
- Fully responsive UI (mobile-first but works great on desktop)

### 🔍 Search & Voice

- Search by:
  - Product name (e.g. `Harpic`)
  - SKU (e.g. `AGB-001`)
  - Hindi/Marathi synonyms (e.g. `अगरबत्ती`, `धूप`, `balti`)
- Voice search:
  - Uses browser SpeechRecognition with `hi-IN` locale
  - Works with Hindi / Marathi / English mix where supported

### 🧠 Smart Logic

- Centralized **product model** in `lib/types.ts`
- Product data in `lib/products.ts` (easy to extend)
- Search behavior defined in `lib/search.ts`
- Cart logic neatly isolated in `hooks/useCart.ts`
- Config (shop name, map link, WhatsApp number) in `lib/config.ts`

### 🌐 SEO & Sharing

- Uses Next.js **App Router**
- `app/layout.tsx` defines proper `Metadata`:
  - Title, description
  - Open Graph (link previews)
  - Twitter card
  - Keywords
- Products are rendered server-side for better SEO and faster first paint

---

## 🧱 Tech Stack

- **Next.js 14 (App Router)**
- **React 18**
- **Tailwind CSS v4 (new `@import "tailwindcss"` style)**
- TypeScript
- LocalStorage for cart persistence
- WhatsApp deep link for order submission

---

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` to configure your shop WhatsApp number (optional but recommended):

```bash
NEXT_PUBLIC_SHOP_WHATSAPP=918805925386
```

3. Run the dev server:

```bash
npm run dev
```

4. Open in browser:

- http://localhost:3000

---

## 📁 Project Structure

```text
app/
  layout.tsx        # Root layout + SEO metadata
  page.tsx          # Server component page (SSR)
  HomePageClient.tsx# Client component with cart/search logic
  globals.css       # Tailwind & base styles

components/
  layout/
    HeaderBar.tsx   # Top bar with shop name, map link, cart button
  shop/
    SearchBar.tsx   # Text + voice search, clear button
    VoiceSearchButton.tsx
    CategoryFilter.tsx
    ProductCard.tsx
  cart/
    CartDrawer.tsx  # Right-side sliding cart
    CheckoutDialog.tsx # Bottom sheet for name/address/payment

hooks/
  useCart.ts        # Cart logic + localStorage persistence

lib/
  config.ts         # SHOP_NAME, coords, WhatsApp number
  types.ts          # Product, CartItem, Category types
  products.ts       # mockProducts array (dummy items)
  search.ts         # filterProducts + synonym logic
```

---

## 🛒 How the Order Flow Works

1. Customer opens your app (on mobile or desktop)
2. Searches & browses products
3. Adds items to cart
4. Clicks **Cart** → adjusts quantities if needed
5. Clicks **Checkout via WhatsApp**
6. Enters:
   - Name
   - Delivery address / landmark
   - Payment mode (Cash / UPI)
7. Clicks **Confirm & Send WhatsApp**
8. A WhatsApp chat window opens with:
   - Line-by-line item list
   - SKU, name, quantity, line total
   - Total amount
   - Customer info

You then confirm the order in WhatsApp and deliver 🚚

---

## 🧩 Where to Customize

### 1. Shop Name & Location

`lib/config.ts`:

- `SHOP_NAME`
- `SHOP_COORDS`
- `SHOP_MAP_URL` (auto-built)
- `SHOP_WHATSAPP` (from env or default)

### 2. Products

`lib/products.ts`:

- Add / edit / remove products
- Fields:
  - `sku`, `name`, `category`, `price`, `unit`, `stock`, `image`

### 3. Search Logic

`lib/search.ts`:

- Add more synonyms for Hindi / Marathi / English
- Improve fuzzy matching if needed

---

## 📱 Making It a Web App (PWA)

This setup is ready to be extended into a PWA:

- Add a `manifest.json`
- Add icons in `/public`
- Update `app/layout.tsx` to include `<link rel="manifest" ...>`
- Use `next-pwa` or custom service worker

(You can ask ChatGPT later specifically: *"Turn this Mega Store app into a full PWA"* and we’ll do that next.)

---

## 🎯 Next Steps (for You)

- Deploy this frontend to **Vercel**
- Start using it for **your own shop orders**
- Once comfortable, we can:
  - Build an **Admin Panel** project (separate)
  - Connect both to a real database (e.g. Firebase / Supabase)
  - Add sales analytics, stock alerts, etc.

This project is intentionally structured to be **easy to extend** and **maintainable**.
