<div align="center">

# 🛒 BazarDor (বাজার দর)

**A high-performance, responsive commodity price tracker providing real-time grocery insights across Dhaka's key markets.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://bazar-dor-lamiakajal.vercel.app)
[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lamiakajal/bazar-dor)

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Overview

**BazarDor** simplifies daily grocery shopping decisions by providing transparency into market prices. It aggregates daily commodity rates across wholesale and retail wet markets (Karwan Bazar, Sadar Bazar, Mirpur Green Market), formatting all pricing metrics and fluctuations into localized Bengali numerals alongside automated trend analysis.

---

## 🌐 Deployment & Repository

| Service            | Link                                                                               |
| :----------------- | :--------------------------------------------------------------------------------- |
| **Production URL** | [https://bazar-dor-lamiakajal.vercel.app](https://bazar-dor-lamiakajal.vercel.app) |
| **Source Code**    | [https://github.com/lamiakajal/bazar-dor](https://github.com/lamiakajal/bazar-dor) |

---

## 🛠️ Architecture & Tech Stack

| Category           | Technology                                                                      | Purpose                                          |
| :----------------- | :------------------------------------------------------------------------------ | :----------------------------------------------- |
| **Framework**      | [Next.js (App Router)](https://nextjs.org/)                                     | Hybrid Server & Client Rendering, API proxying   |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)                                   | End-to-end type safety                           |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                                        | Responsive UI components & custom layouts        |
| **Authentication** | [BetterAuth](https://better-auth.com/)                                          | Email/Password, Google & GitHub OAuth            |
| **Database**       | [MongoDB Atlas](https://www.mongodb.com/atlas)                                  | Persistent storage for users, sessions, and logs |
| **Icons & Alerts** | [Lucide React](https://lucide.dev/) / [Hot Toast](https://react-hot-toast.com/) | Visual assets & non-blocking toast notifications |

---

## ✨ Key Features

1. **Live Market Ticker & Fluctuation Trends**
   - Continuous auto-scrolling ticker under the primary navigation bar highlighting intraday price movements.
   - Automated algorithmic sorting for **Top Risers (আজ দাম বেড়েছে ▲)** and **Top Fallers (আজ দাম কমেছে ▼)**.

2. **Complete Native Localization**
   - Dynamic real-time calculation and formatting of the localized Bengali calendar date.
   - Universal translation pipeline formatting prices, rates, and unit measurements into standard Bengali numerals.

3. **Dynamic Category Browsing & Numerical Sorting**
   - Instant category filters across staple produce (Rice, Lentils, Oil, Vegetables, Fish, and Meat).
   - Tri-state numerical sorting engine (**ডিফল্ট**, **দাম: কম থেকে বেশি**, **দাম: বেশি থেকে কম**) resolving prices via parsed numeric values rather than raw character strings.

4. **Protected Product Details & Market Breakdown**
   - Middleware-level route security guarding commodity breakdown pages (`/product/[slug]`), automatically re-routing guest visitors to `/signin`.
   - Cross-market pricing breakdowns comparing wholesale and neighborhood market rates.

5. **Integrated Authentication & Account Management**
   - Multi-provider authentication using BetterAuth supporting OAuth 2.0 (Google, GitHub) and traditional email/password credentials.
   - Profile configuration module (`/profile/update`) with direct database mutation.

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed on your machine.

### 2. Clone the Repository

```bash
git clone [https://github.com/lamiakajal/bazar-dor.git](https://github.com/lamiakajal/bazar-dor.git)
cd bazar-dor
```
