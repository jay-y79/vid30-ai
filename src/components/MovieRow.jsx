import { useState, useRef } from 'preact/hooks'
import { MOVIE_TABS } from '../data/movies'
import styles from './MovieRow.module.css'

function MovieCard({ movie, focused, onFocus, onPlay }) {
  return (
    <div
      class={`${styles.card} ${focused ? styles.cardFocused : ''}`}
      onMouseEnter={onFocus}
      tabIndex={0}
      onFocus={onFocus}
      onClick={() => onPlay?.(movie)}
      data-focusable
      data-focus-id={movie.id}
      role="button"
      aria-label={movie.title}
    >
      <div class={styles.cardImg}>
        <img src={movie.cover} alt={movie.title} loading="lazy" />
        <div class={styles.cardOverlay}>
          <button 
            class={styles.playBtn} 
            aria-label={`Regarder ${movie.title}`}
            tabIndex={-1} // The parent card handles the focus
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>
        </div>
        {movie.badge && (
          <span class={styles.badge}>{movie.badge}</span>
        )}
      </div>
      <div class={styles.cardInfo}>
        <p class={styles.cardTitle}>{movie.title}</p>
        <p class={styles.cardMeta}>{movie.prompteur}</p>
      </div>
    </div>
  )
}

export function MovieRow({ category, light, onPlay }) {
  const [activeTab, setActiveTab] = useState(0)
  const [focusedId, setFocusedId] = useState(null)
  const rowRef = useRef(null)

  const scroll = (dir) => {
    if (!rowRef.current) return
    rowRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <section class={`${styles.section} ${light ? styles.sectionLight : ''}`}>
      <div class={styles.tabBar}>
        {MOVIE_TABS.map((tab, i) => (
          <button
            key={tab}
            class={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
            data-focusable
            data-focus-id={`row-${category.id}-tab-${i}`}
          >
            {tab}
            {activeTab === i && <span class={styles.tabUnderline} />}
          </button>
        ))}
      </div>

      <div class={styles.body}>
        <div class={styles.label}>
          <span class={styles.labelEyebrow}>{category.product}</span>
          <h2 class={styles.labelTitle}>{category.label}</h2>
          <p class={styles.labelTagline}>{category.tagline}</p>
        </div>

        <div class={styles.cardsWrapper}>
          <button 
            class={`${styles.scrollBtn} ${styles.scrollLeft}`} 
            onClick={() => scroll(-1)} 
            aria-label="Précédent"
            data-focusable
            data-focus-id={`row-${category.id}-scroll-left`}
          >
            ‹
          </button>

          <div class={styles.cards} ref={rowRef}>
            {category.movies.map(m => (
              <MovieCard
                key={m.id}
                movie={m}
                focused={focusedId === m.id}
                onFocus={() => setFocusedId(m.id)}
                onPlay={onPlay}
              />
            ))}
          </div>

          <button 
            class={`${styles.scrollBtn} ${styles.scrollRight}`} 
            onClick={() => scroll(1)} 
            aria-label="Suivant"
            data-focusable
            data-focus-id={`row-${category.id}-scroll-right`}
          >
            ›
          </button>
        </div>

        <div class={styles.sideDots}>
          <span class={styles.slideNum}>1</span>
          {[0,1,2,3].map(i => (
            <span key={i} class={`${styles.sideDot} ${i === 0 ? styles.sideDotActive : ''}`} />
          ))}
        </div>
      </div>

      <div class={styles.navArrows}>
        <button 
          class={styles.navArrow} 
          onClick={() => scroll(-1)} 
          aria-label="Précédent"
          data-focusable
          data-focus-id={`row-${category.id}-nav-left`}
        >
          ←
        </button>
        <button 
          class={styles.navArrow} 
          onClick={() => scroll(1)} 
          aria-label="Suivant"
          data-focusable
          data-focus-id={`row-${category.id}-nav-right`}
        >
          →
        </button>
      </div>
    </section>
  )
}
