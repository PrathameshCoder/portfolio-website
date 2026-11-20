import Hero from '../components/v2/Hero'
import Numbers from '../components/v2/Numbers'
import Journey from '../components/v2/Journey'
import SiemensChapter from '../components/v2/SiemensChapter'
import CranberryChapter from '../components/v2/CranberryChapter'
import { AiWork } from '../components/v2/AiWork'
import More from '../components/v2/More'
import Contact from '../components/v2/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Numbers />
      <Journey />
      <SiemensChapter />
      <CranberryChapter />
      <AiWork />
      <More />
      <Contact />
    </main>
  )
}
