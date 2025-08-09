# ⚓ MilitaryManagement_Frontend

Frontend εφαρμογή διαχείρισης στρατιωτικού προσωπικού & εκπαιδεύσεων για το Πολεμικό Ναυτικό.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-%5E4.0-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Vitest](https://img.shields.io/badge/Vitest-tested-brightgreen?logo=vitest)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-teal?logo=tailwindcss)
![Last Commit](https://img.shields.io/github/last-commit/GiorgosPanagopoulos/MilitaryManagement_Frontend)

---

## 🧰 Τεχνολογίες

- ✅ React 18 + TypeScript
- ✅ Vite
- ✅ React Router DOM
- ✅ Axios
- ✅ Tailwind CSS (με responsive breakpoints & dark mode)
- ✅ Vitest + React Testing Library
- ✅ Role-based authentication (JWT)
- ✅ Protected routes (PrivateRoute)
- ✅ Context API για Auth (AuthContext)
- ✅ Πλήρης υποστήριξη CRUD (Προσωπικό, Εκπαίδευση, Χρήστες)
- ✅ Responsive Design
- ✅ Γραφήματα στατιστικών (Recharts)
- ✅ Εξαγωγή PDF/CSV
- ✅ Ειδοποιήσεις (Toasts)
- ✅ Ημερολόγιο Εκπαιδεύσεων
- ✅ Upload αρχείων (πτυχία, αποδείξεις)

---

## 🚀 Τοπική Ανάπτυξη

### 📂 Κλωνοποίηση Αποθετηρίου

```bash
git clone https://github.com/GiorgosPanagopoulos/MilitaryManagement_Frontend.git
cd MilitaryManagement_Frontend
```

### 📦 Εγκατάσταση εξαρτήσεων

```bash
npm install
```

### 🟢 Εκκίνηση Εφαρμογής

```bash
npm run dev
```

👉 Η εφαρμογή θα τρέχει στη διεύθυνση: **http://localhost:5173**

---

## 🧪 Τεστ

### ✅ Εκτέλεση με Vitest

```bash
npm test
```

> Εκτελεί unit tests με χρήση Vitest και React Testing Library.

### 📊 Κάλυψη

```bash
npm run coverage
```

> Δημιουργεί αναφορά κάλυψης κώδικα.

---

## 🏗️ Δημιουργία Build Παραγωγής

```bash
npm run build
```

Ο φάκελος `dist/` περιέχει τα αρχεία παραγωγής για deploy.

---

## 📤 Deploy

Μπορεί να γίνει σε οποιαδήποτε static hosting πλατφόρμα (π.χ. GitHub Pages, Netlify, Vercel).

---

## 🔐 Authentication / Authorization

- JWT-based authentication
- Αποθήκευση token στο localStorage
- Ανίχνευση ρόλου χρήστη (π.χ. admin vs χρήστης)
- Προστατευμένα routes
- Δυναμικό navbar με βάση τον ρόλο
- Logout & session cleanup

---

## 📊 Στατιστικά

- 📌 Γραφήματα ανά βαθμό, μονάδα, συμμετοχές σε εκπαιδεύσεις
- 📌 Bar και pie charts με Recharts
- 📌 Responsive παρουσίαση

---

## 📅 Ημερολόγιο Εκπαιδεύσεων

- Δυναμική προβολή όλων των εκπαιδεύσεων στο ημερολόγιο
- Υποστήριξη πολλών συμμετεχόντων

---

## 📝 PDF / CSV Αναφορές

- Αναφορές ανά άτομο, μονάδα ή εκπαίδευση
- Λήψη αναφοράς σε μορφή PDF ή CSV

---

## 📌 Σημειώσεις

- Το backend λειτουργεί ξεχωριστά (Node.js + MongoDB)
- Η επικοινωνία γίνεται μέσω Axios
- Προτείνεται περιβάλλον Node 18+

---

## 👤 Συντάκτης

George Panagopoulos  
📧 george6627@hotmail.com  
🔗 [GitHub](https://github.com/GiorgosPanagopoulos)

---

## 📄 Άδεια

MIT © 2025 Giorgos Panagopoulos