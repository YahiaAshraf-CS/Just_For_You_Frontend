import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    build: {
        // زود الرقم ده مثلا لـ 1000 (يعني 1 ميجا) او 1600
        chunkSizeWarningLimit: 1600,
    },
});
