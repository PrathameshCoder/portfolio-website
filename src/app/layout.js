import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './globals.css'
import Providers from '../components/v2/Providers'
import Preloader from '../components/v2/Preloader'
import Nav from '../components/v2/Nav'
import SceneLayer from '../components/SceneLayer'

export const metadata = {
  title: 'Prathamesh Gongle | AI prototypes and digital transformation',
  description:
    "Master's student in International Information Systems at FAU Erlangen-Nürnberg. I build practical AI prototypes and lead student teams from requirements to delivery.",
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
      </body>
    </html>
  )
}
