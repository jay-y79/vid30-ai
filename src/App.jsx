import { useState } from 'preact/hooks'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MovieRow } from './components/MovieRow'
import { Footer } from './components/Footer'
import { CATEGORIES } from './data/movies'

export function App() {
  const [nightMode, setNightMode] = useState(true)

  return (
    <div class={nightMode ? 'night' : 'day'}>
      <Navbar nightMode={nightMode} onToggleNight={() => setNightMode(n => !n)} />
      <Hero />
      {CATEGORIES.map((cat, i) => (
        <MovieRow
          key={cat.id}
          category={cat}
          light={i % 2 !== 0}
        />
      ))}
      <Footer />
    </div>
  )
}
