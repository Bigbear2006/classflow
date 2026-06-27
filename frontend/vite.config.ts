import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';

export default defineConfig(({command}) => ({
  plugins: [tanstackStart(), react(), tailwindcss(), command === 'build' && nitro()].filter(Boolean),
  server: { host: '0.0.0.0', hmr: { host: 'localhost' } },
}));
