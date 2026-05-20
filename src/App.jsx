import { useState, useEffect, useRef } from 'preact/hooks'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MovieRow } from './components/MovieRow'
import { Footer } from './components/Footer'
import { VideoPlayer } from './components/VideoPlayer'
import { CATEGORIES } from './data/movies'
import { initFocusEngine, getFocused, focusEl, focusFirst } from './utils/focusEngine'

export function App() {
  const [nightMode, setNightMode] = useState(true)
  const [activeFilm, setActiveFilm] = useState(null)
  
  const prevFocusedRef = useRef(null)

  // Initialize focus engine once on app mount
  useEffect(() => {
    const cleanup = initFocusEngine()
    return cleanup
  }, [])

  const playFilm = (film) => {
    // Keep track of the element that had focus before opening the player
    prevFocusedRef.current = getFocused()
    setActiveFilm(film)
  }

  const closePlayer = () => {
    setActiveFilm(null)
    // Slight delay to allow DOM to re-render, then restore focus
    setTimeout(() => {
      if (prevFocusedRef.current) {
        focusEl(prevFocusedRef.current)
      } else {
        focusFirst()
      }
    }, 50)
  }

  return (
    <div class={nightMode ? 'night' : 'day'}>
      <Navbar nightMode={nightMode} onToggleNight={() => setNightMode(n => !n)} />
      
      <Hero onPlay={playFilm} />
      
      {CATEGORIES.map((cat, i) => (
        <MovieRow
          key={cat.id}
          category={cat}
          light={i % 2 !== 0}
          onPlay={playFilm}
        />
      ))}
      
      <Footer />

      {activeFilm && (
        <VideoPlayer
          film={activeFilm}
          onClose={closePlayer}
        />
      )}
    </div>
  )
}
