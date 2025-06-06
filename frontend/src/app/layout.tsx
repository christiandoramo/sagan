import './globals.css'
import type { Metadata } from 'next'
import ThemeRegistry from './components/ThemeRegistry/ThemeRegistry'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './hooks/auth'


export const metadata: Metadata = {
  title: 'Gerenciador de eventos acadêmicos ',
  description: 'Organize seus eventos acadêmicos e publique os seus artigos científicos com o Sagan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      {/* <head>
        <link rel="icon" type="image/png" href="../../public/images/LogoDNA.png" />
      </head> */}
      <body>
        <ThemeRegistry>
          {/* <Navbar/> */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}