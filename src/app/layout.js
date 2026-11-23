import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './globals.css'
import Providers from '../components/v2/Providers'
import Preloader from '../components/v2/Preloader'
import Nav from '../components/v2/Nav'
import SceneLayer from '../components/SceneLayer'
import { Analytics } from '@vercel/analytics/next'

// The address used for links and the preview image when the site is shared.
// On Vercel it is filled in automatically from the production domain; set
// NEXT_PUBLIC_SITE_URL to override it (for example with a custom domain).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

const title = 'Prathamesh Gongle - Portfolio'
const description =
  "Master's student in Information Systems at FAU, based in Nuremberg. I build practical AI prototypes and lead student teams from requirements to delivery. Available as a working student."

// The preview card itself comes from opengraph-image.jpg and twitter-image.jpg in this folder.
export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Prathamesh Gongle',
    title,
    description,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: { icon: '/favicon.ico' },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-mode="dark" data-section="top">
      <body>
        <a className="skip" href="#siemens">
          Skip to the work
        </a>
        <Providers />
        <Preloader />
        <SceneLayer />
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
