// layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner' // ✅ Use Sonner's Toaster
import { AuthProvider } from '@/context/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuperU',
  description: 'Collaborative web content editing tool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors /> {/* ✅ Sonner Toaster */}
        </AuthProvider>
      </body>
    </html>
  )
}
