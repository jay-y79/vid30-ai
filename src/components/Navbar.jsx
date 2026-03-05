import { useState } from 'preact/hooks'
import { NAV_TABS } from '../data/movies'
import styles from './Navbar.module.css'

export function Navbar({ nightMode, onToggleNight }) {
  const [active, setActive] = useState(0)

  return (
    <nav class={styles.nav}>
      <div class={styles.logo}>
        <span class={styles.logoNum}>Vid30</span>
        {/* <span class={styles.logoNum}>30</span> */}
      </div>

      <ul class={styles.tabs}>
        {NAV_TABS.map((tab, i) => (
          <li key={tab}>
            <button
              class={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
              onClick={() => setActive(i)}
            >
              {tab}
              {active === i && <span class={styles.tabLine} />}
            </button>
          </li>
        ))}
      </ul>

      <div class={styles.controls}>
        <button class={styles.iconBtn} title="Rechercher">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <button class={styles.nightToggle} onClick={onToggleNight}>
          <span class={styles.nightLabel}>NIGHT MODE</span>
          <span class={`${styles.nightSwitch} ${nightMode ? styles.nightOn : ''}`}>
            <span class={styles.nightKnob} />
          </span>
          <span class={`${styles.nightStatus} ${nightMode ? styles.nightStatusOn : ''}`}>
            {nightMode ? 'ON' : 'OFF'}
          </span>
        </button>

        <div class={styles.socials}>
          {['f', 't', 'y'].map(s => (
            <button key={s} class={styles.socialBtn}>{s === 'f' ? 'F' : s === 't' ? '𝕏' : '▶'}</button>
          ))}
        </div>
      </div>
    </nav>
  )
}
