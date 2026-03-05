import { useState, useEffect } from 'preact/hooks'
import { FEATURED } from '../data/movies'
import styles from './Hero.module.css'

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section class={styles.hero}>
      {/* Backdrop */}
      <div class={styles.backdrop}>
        <img
          src={FEATURED.backdrop}
          alt=""
          class={styles.backdropImg}
          loading="eager"
        />
        <div class={styles.backdropGrad} />
        <div class={styles.backdropVignette} />
        <div class={styles.scanline} />
      </div>

      {/* Stats left */}
      <div class={`${styles.statsLeft} ${visible ? styles.visible : ''}`}>
        <div class={styles.statBlock}>
          <span class={styles.statNumber}>30</span>
          <span class={styles.statLabel}>Academy Awards</span>
        </div>
        <div class={styles.divider} />
        <div class={styles.statBlock}>
          <span class={styles.statNumber}>122</span>
          <span class={styles.statLabel}>Academy Award<br/>Nominations</span>
        </div>
      </div>

      {/* Content right */}
      <div class={`${styles.content} ${visible ? styles.visible : ''}`}>
        <p class={styles.genre}>{FEATURED.genre}</p>
        <h1 class={styles.title}>Vid30<br/>MOVIES</h1>
        <p class={styles.description}>{FEATURED.description}</p>

        <div class={styles.meta}>
          <span class={styles.metaBadge}>{FEATURED.rating}</span>
          <span class={styles.metaItem}>⭐ {FEATURED.score}</span>
          <span class={styles.metaItem}>{FEATURED.year}</span>
          <span class={styles.metaItem}>{FEATURED.duration}</span>
        </div>

        <div class={styles.actions}>
          <button class={styles.btnPlay}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            REGARDER
          </button>
          <button class={styles.btnSecondary}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            MA LISTE
          </button>
        </div>

        {/* Trailer card */}
        <div class={styles.trailerCard}>
          <div class={styles.trailerThumb}>
            <img src="https://images.unsplash.com/photo-1462899006636-339e08d1844e?w=200&q=80" alt="Trailer" />
            <div class={styles.trailerPlay}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </div>
          <div class={styles.trailerInfo}>
            <span class={styles.trailerLabel}>REGARDER BANDE-ANNONCE</span>
            <span class={styles.trailerDur}>02:35</span>
            <span class={styles.trailerTitle}>{FEATURED.title}</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div class={styles.scrollIndicator}>
        <div class={styles.scrollDots}>
          {[0,1,2,3].map(i => (
            <span key={i} class={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`} />
          ))}
        </div>
        <div class={styles.scrollArrows}>
          <span class={styles.arrowLeft}>←</span>
          <span class={styles.arrowRight}>→</span>
        </div>
      </div>
    </section>
  )
}
