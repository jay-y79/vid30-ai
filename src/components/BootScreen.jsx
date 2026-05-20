import { useEffect, useState } from 'preact/hooks'
import styles from './BootScreen.module.css'

export function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 22 + 5
      if (p >= 100) {
        p = 100
        setProgress(100)
        clearInterval(id)
        setTimeout(onDone, 450)
      } else {
        setProgress(p)
      }
    }, 100)
    return () => clearInterval(id)
  }, [])

  return (
    <div class={styles.boot}>
      <div class={styles.grid} />
      <div class={styles.center}>
        <div class={styles.logo}>
          VID<span>30</span>
        </div>
        <p class={styles.sub}>FILMS GÉNÉRÉS PAR INTELLIGENCE ARTIFICIELLE</p>
        <div class={styles.barWrap}>
          <div class={styles.bar} style={{ width: `${progress}%` }} />
        </div>
        <p class={styles.hint}>
          {progress < 40 ? 'Initialisation...' : progress < 80 ? 'Chargement du catalogue...' : 'Prêt'}
        </p>
      </div>
      <div class={styles.footer}>VIDAA OS · Hisense Smart TV</div>
    </div>
  )
}
