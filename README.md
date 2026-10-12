# 🛒 BazarDor (বাজার দর)

A fast, responsive, and localized commodity price tracking platform. It allows users to effortlessly track and compare daily prices of essential groceries across major wholesale and retail markets in Dhaka, Bangladesh.

---

## 🌐 Live URL & Repository

- **Live Application:** [https://bazar-dor-lamiakajal.vercel.app](https://bazar-dor-lamiakajal.vercel.app)
- **GitHub Repository:** [https://github.com/lamiakajal/bazar-dor](https://github.com/lamiakajal/bazar-dor)

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Server/Client Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [BetterAuth](https://better-auth.com/) (Email/Password, Google & GitHub OAuth)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ✨ Key Features

1. **Real-Time Market Ticker & Highlights:**
   - Smooth horizontal auto-scrolling ticker under the navbar showcasing daily commodity prices and trends.
   - Dynamic top risers and fallers computed to showcase the highest daily price swings.

2. **Full Bengali Localization:**
   - Complete localized Bengali numerical formatting for prices and percentage changes.
   - Dynamic real-time Bengali calendar date display.

3. **Dynamic Category Filtering & Sorting:**
   - Browse across staple categories including Rice, Lentils, Oil, Vegetables, Fish, and Meat.
   - Intuitive price sorting (Default, Low to High, High to Low) accurately sorted via parsed numerical values.

4. **Protected Product Details & Price Comparison:**
   - Middleware-protected detailed commodity breakdown routes (`/product/[slug]`) with redirect mechanisms for unauthenticated visitors.
   - Comparative pricing breakdown across major wet markets including Karwan Bazar, Sadar Bazar, and Mirpur Green Market.

5. **Secure Authentication & User Profile Management:**
   - Comprehensive authentication suite via BetterAuth with credentials, Google, and GitHub OAuth support.
   - User profile management allowing real-time account name updates directly tied to MongoDB Atlas.

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone [https://github.com/ProgrammingHero1/B14-A7-BazarDor.git](https://github.com/ProgrammingHero1/B14-A7-BazarDor.git)
cd bazar-dor
```
