import { TrpcProvider } from "./TrpcProvider";
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}
export { reportWebVitals } from 'next-axiom';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><TrpcProvider>{children}</TrpcProvider></body>
    </html>
  )
}
