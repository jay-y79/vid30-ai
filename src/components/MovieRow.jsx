import { useState, useRef } from 'preact/hooks'
import { MOVIE_TABS } from '../data/movies'
import styles from './MovieRow.module.css'

function MovieCard({ movie, focused, onFocus }) {
  return (
    <div
      class={`${styles.card} ${focused ? styles.cardFocused : ''}`}
      onMouseEnter={onFocus}
      tabIndex={0}
      onFocus={onFocus}
      role="button"
      aria-label={movie.title}
    >
      <div class={styles.cardImg}>
        <img src={movie.cover} alt={movie.title} loading="lazy" />
        <div class={styles.cardOverlay}>
          <button class={styles.playBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>
          <button class={styles.addBtn}>+</button>
        </div>
        {movie.badge && (
          <span class={styles.badge}>{movie.badge}</span>
        )}
      </div>
      <div class={styles.cardInfo}>
        <p class={styles.cardTitle}>{movie.title}</p>
        <p class={styles.cardMeta}>{movie.year}</p>
      </div>
    </div>
  )
}

export function MovieRow({ category, light }) {
  const [activeTab, setActiveTab] = useState(0)
  const [focusedId, setFocusedId] = useState(null)
  const rowRef = useRef(null)

  const scroll = (dir) => {
    if (!rowRef.current) return
    rowRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section class={`${styles.section} ${light ? styles.sectionLight : ''}`}>
      {/* Tab bar */}
      <div class={styles.tabBar}>
        {MOVIE_TABS.map((tab, i) => (
          <button
            key={tab}
            class={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
            {activeTab === i && <span class={styles.tabUnderline} />}
          </button>
        ))}
      </div>

      <div class={styles.body}>
        {/* Left label */}
        <div class={styles.label}>
          <h2 class={styles.labelTitle}>{category.label}</h2>
          <p class={styles.labelTagline}>{category.tagline}</p>
          <button class={styles.browseBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
            </svg>
            VOIR PLUS
          </button>
        </div>

        {/* Cards + scroll buttons */}
        <div class={styles.cardsWrapper}>
          <button class={`${styles.scrollBtn} ${styles.scrollLeft}`} onClick={() => scroll(-1)}>‹</button>

          <div class={styles.cards} ref={rowRef}>
            {category.movies.map(m => (
              <MovieCard
                key={m.id}
                movie={m}
                focused={focusedId === m.id}
                onFocus={() => setFocusedId(m.id)}
              />
            ))}
          </div>

          <button class={`${styles.scrollBtn} ${styles.scrollRight}`} onClick={() => scroll(1)}>›</button>
        </div>

        {/* Side dots */}
        <div class={styles.sideDots}>
          <span class={styles.slideNum}>1</span>
          {[0,1,2,3].map(i => (
            <span key={i} class={`${styles.sideDot} ${i === 0 ? styles.sideDotActive : ''}`} />
          ))}
        </div>
      </div>

      {/* Nav arrows bottom-right */}
      <div class={styles.navArrows}>
        <button class={styles.navArrow} onClick={() => scroll(-1)}>←</button>
        <button class={styles.navArrow} onClick={() => scroll(1)}>→</button>
      </div>
    </section>
  )
}
