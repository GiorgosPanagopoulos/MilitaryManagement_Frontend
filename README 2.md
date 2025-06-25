# MilitaryManagement Frontend

## ⚙️ Τεχνολογίες

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Axios
- Toast notifications
- Recharts (Στατιστικά)
- react-big-calendar (Ημερολόγιο)
- React Hook Form
- React Testing Library + Vitest
- JWT Authentication + Authorization

---

## 🧭 Δομή

- `pages/` - σελίδες εφαρμογής (Dashboard, Προσωπικό, Εκπαίδευση, Login, Logout)
- `components/` - επαναχρησιμοποιούμενα στοιχεία
- `axios.ts` - axios client με interceptor
- `App.tsx` - routing + προστασία σελίδων
- `PrivateRoute.tsx`, `AdminRoute.tsx` - προστασία routes
- `tests/` - τεστ

---

## 🚀 Εκκίνηση

```bash
npm install
npm run dev
```

Η εφαρμογή τρέχει στο `http://localhost:5173`

---

## 🌐 Σύνδεση με Backend

Το `axios.ts` έχει:
```ts
baseURL: "http://localhost:5000/api"
```

---

## 🔐 Authentication / Authorization

- Σελίδα `Login`: POST `/auth/login`
- Αποθηκεύεται token & ρόλος (`localStorage`)
- Προστατευμένες σελίδες με `PrivateRoute`
- Διαχείριση ρόλων (`AdminRoute`)
- Εμφάνιση δυναμικού navbar βάσει ρόλου
- Σελίδα `Logout` για αποσύνδεση

---

## 📁 Διαθέσιμες Σελίδες

- `/` Dashboard
- `/login` Σύνδεση
- `/logout` Αποσύνδεση
- `/personnel` Προσωπικό (CRUD + Upload)
- `/training` Εκπαίδευση (CRUD)
- `/statistics` Γραφήματα
- `/calendar` Ημερολόγιο Εκπαιδεύσεων
- `/admin` (προστατευμένη σε admin)

---

## 🔔 Toasts

Εμφανίζονται σε επιτυχία ή σφάλμα.

---

## 🧪 Tests

```bash
npm run test
```

Χρήση: React Testing Library + Vitest
