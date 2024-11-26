import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Expose the server to the network
    port: process.env.PORT || 5173, // Use the Render-provided port or default to 5173
  },
});
