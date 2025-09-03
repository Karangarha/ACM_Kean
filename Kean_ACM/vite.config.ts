import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Kean_ACM/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
