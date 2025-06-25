# MilitaryManagement

📌 **Ονομασία Εφαρμογής:** MilitaryManagement  
🎯 **Σκοπός:** Παρακολούθηση και διαχείριση στρατιωτικού προσωπικού, εκπαιδεύσεων, στατιστικών, ημερολογίου και αρχείων (βεβαιώσεις, πτυχία).  

---

## 🚀 Τεχνολογίες

### Frontend:
- React 18 + TypeScript
- React Router DOM v7
- Tailwind CSS
- FontAwesome Icons
- React Hook Form
- React Toastify
- React Tooltip
- Recharts
- React Big Calendar

### Backend:
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- Swagger (API Documentation)
- File Uploads
- CORS Enabled

---

## ⚙️ Οδηγίες Εκτέλεσης

### 1️⃣ Frontend

```bash
cd MilitaryManagement_Frontend
npm install
npm run dev
```

### 2️⃣ Backend

```bash
cd MilitaryManagement_Backend
npm install
npm run dev
```

🔐 Το backend χρησιμοποιεί MongoDB Atlas. Η σύνδεση γίνεται μέσω `.env` με URI του τύπου:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/MilitaryManagementDB
```

---

## 🧪 Tests (Frontend)

Έγινε ρύθμιση με:

- Jest
- React Testing Library
- TypeScript
- jsdom

Εκτέλεση:
```bash
npm test
```

---

## ✨ Features

- ✅ CRUD για **Προσωπικό** και **Εκπαίδευση**
- ✅ Ανέβασμα αρχείων (πτυχία/βεβαιώσεις)
- ✅ Στατιστικά και Διαγράμματα
- ✅ Ημερολόγιο Εκπαιδεύσεων
- ✅ Πλήρες Login/Logout με JWT Token
- ✅ Ρόλοι (π.χ. Admin)
- ✅ Responsive Design (Tailwind)
- ✅ Tooltips & Toast Ειδοποιήσεις
- ✅ Πλήρης οργάνωση κώδικα και μονάδων

---

## 🗂 Δομή Frontend

- `components/`: όλα τα components οργανωμένα σε υποφακέλους
- `pages/`: Personnel, Training, Statistics, Calendar, Login, Dashboard
- `App.tsx`: routing και setup
- `Navbar.tsx`: responsive navbar με logo & icons
- `assets/`: logo, εικόνες

---

## 👤 Στοιχεία Υλοποιητή

- **Όνομα:** Γεώργιος Παναγόπουλος  
- **Έτος Υλοποίησης:** 2025  
- **Τμήμα:** Coding Factory - Τελική Εργασία  
