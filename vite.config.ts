/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // Επιτρέπει πρόσβαση από τοπικό δίκτυο (κινητά, tablet)
    port: 5173,           // Προαιρετικά σταθερή πόρτα
  },
});
