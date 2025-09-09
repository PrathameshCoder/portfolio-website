import { Poppins } from 'next/font/google'
import "./globals.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'], // choose the weights you want
  variable: '--font-poppins' // this allows using it in CSS
})

export const metadata = {
  title: "Prathamesh | Portfolio",
  description: "Proudly created by Prathamesh.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={poppins.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

