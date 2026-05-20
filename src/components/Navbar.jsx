import { useState } from 'preact/hooks'
import { NAV_TABS } from '../data/movies'
import styles from './Navbar.module.css'

export function Navbar({ nightMode, onToggleNight }) {
  const [active, setActive] = useState(0)

  return (
    <nav class={styles.nav}>
      <div class={styles.logo}>
        <span class={styles.logoText}>VID30</span>
        <span class={styles.logoMark}>AI CINEMA</span>
      </div>

      <ul class={styles.tabs}>
        {NAV_TABS.map((tab, i) => (
          <li key={tab}>
            <button
              class={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
              data-focusable
              data-focus-id={`nav-tab-${i}`}
            >
              {tab}
              {active === i && <span class={styles.tabLine} />}
            </button>
          </li>
        ))}
      </ul>

      <div class={styles.controls}>
        <button 
          class={styles.creatorBtn}
          data-focusable
          data-focus-id="nav-creator"
        >
          Devenir prompteur
        </button>

        <div class={styles.socials}>
          {['F', 'X', '▶'].map((s, idx) => (
            <button 
              key={s} 
              class={styles.socialBtn}
              data-focusable
              data-focus-id={`nav-social-${idx}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
