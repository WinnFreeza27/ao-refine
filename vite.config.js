import { defineConfig  } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __SUPABASEKEY__: `"${process.env.SUPABASEKEY}"`,
    __SUPABASEURL__: `"${process.env.SUPABASEURL}"`
  },
})

