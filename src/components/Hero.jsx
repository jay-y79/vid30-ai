import { useState, useEffect } from 'preact/hooks'
import { FEATURED } from '../data/movies'
import styles from './Hero.module.css'

export function Hero({ onPlay }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section class={styles.hero}>
      <div class={styles.backdrop}>
        <img
          src={FEATURED.backdrop}
          alt=""
          class={styles.backdropImg}
          loading="eager"
        />
        <div class={styles.backdropGrad} />
        <div class={styles.backdropVignette} />
        <div class={styles.lightBeam} />
        <div class={styles.scanline} />
      </div>

      <div class={`${styles.statsLeft} ${visible ? styles.visible : ''}`}>
        <p class={styles.kicker}>Le futur du cinéma créatif</p>
        <div class={styles.statBlock}>
          <span class={styles.statNumber}>30+</span>
          <span class={styles.statLabel}>Créateurs IA actifs</span>
        </div>
        <div class={styles.divider} />
        <div class={styles.statBlock}>
          <span class={styles.statNumber}>300+</span>
          <span class={styles.statLabel}>Films, shorts et essais GenAI</span>
        </div>
      </div>

      <div class={`${styles.content} ${visible ? styles.visible : ''}`}>
        <p class={styles.genre}>{FEATURED.genre}</p>
        <h1 class={styles.title}>{FEATURED.title}</h1>
        <p class={styles.description}>{FEATURED.description}</p>

        <div class={styles.meta}>
          <span class={styles.metaBadge}>{FEATURED.rating}</span>
          <span class={styles.metaItem}>{FEATURED.score}</span>
          <span class={styles.metaItem}>{FEATURED.year}</span>
          <span class={styles.metaItem}>{FEATURED.duration}</span>
        </div>

        <div class={styles.actions}>
          <button 
            class={styles.btnPlay}
            data-focusable
            data-focus-id="hero-play"
            onClick={() => onPlay?.(FEATURED)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Regarder
          </button>
          <button 
            class={styles.btnSecondary}
            data-focusable
            data-focus-id="hero-studio"
          >
            Explorer Vid30 Studio
          </button>
        </div>

        <div 
          class={styles.trailerCard}
          data-focusable
          data-focus-id="hero-trailer"
          onClick={() => onPlay?.(FEATURED)}
          role="button"
          aria-label={`Lire la bande-annonce de ${FEATURED.title}`}
        >
          <div class={styles.trailerThumb}>
            <img src={FEATURED.trailer} alt="" />
            <div class={styles.trailerPlay}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </div>
          <div class={styles.trailerInfo}>
            <span class={styles.trailerLabel}>Création originale</span>
            <span class={styles.trailerDur}>{FEATURED.duration}</span>
            <span class={styles.trailerTitle}>{FEATURED.title} par {FEATURED.creator}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
