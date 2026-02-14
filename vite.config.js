import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
<<<<<<< HEAD
  ], // <--- Kasih koma di sini
  server: {
    allowedHosts: ['.ngrok-free.dev']
  } // <--- Tambahkan ini sebelum kurung tutup terakhir
})
server: {
  allowedHosts: ['.ngrok-free.dev']
}
=======
  ],
  server: {
    allowedHosts: ['.ngrok-free.dev']
  }
})
>>>>>>> c791abc (fix: resolve import error and clean up vite config)
