import './globals.css'
import React from 'react'

export const metadata = {
  title: 'LeadJur - Inteligência em Prospecção Jurídica',
  description: 'Plataforma inteligente que identifica e fornece contatos de advogados por área de atuação e região.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}