import styles from './Footer.module.css'

const links = {
  Ecosystème: ['Vid30 Streaming', 'Marketplace', 'Vid30 Studio', 'Créateurs IA'],
  Ressources: ["Conditions d'utilisation", 'Confidentialité', 'Communauté', 'Presse'],
}

export function Footer() {
  return (
    <footer class={styles.footer}>
      <div class={styles.inner}>
        <div class={styles.brand}>
          <span class={styles.logo}>VID30</span>
          <span class={styles.logoSub}>Le futur du cinéma créatif</span>
          <p class={styles.brandText}>
            Une plateforme streaming et studio pour découvrir, publier et monétiser les films générés avec l'IA.
          </p>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} class={styles.col}>
            <h3 class={styles.colHeading}>{heading}</h3>
            <ul class={styles.colList}>
              {items.map(item => (
                <li key={item}>
                  <button 
                    class={styles.colLink}
                    data-focusable
                    data-focus-id={`footer-link-${item.replace(/\s+/g, '-').replace(/'/g, '').toLowerCase()}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div class={styles.col}>
          <h3 class={styles.colHeading}>S'abonner</h3>
          <p class={styles.subText}>Recevoir les sorties, appels à projets et nouveautés créateurs.</p>
          <div class={styles.emailRow}>
            <input
              class={styles.emailInput}
              type="email"
              placeholder="Votre e-mail"
              data-focusable
              data-focus-id="footer-email-input"
            />
            <button 
              class={styles.emailBtn} 
              aria-label="S'abonner"
              data-focusable
              data-focus-id="footer-email-btn"
            >
              →
            </button>
          </div>
        </div>

        <div class={styles.socials}>
          {['F', 'X', '▶'].map((s, idx) => (
            <button 
              key={s} 
              class={styles.socialBtn}
              data-focusable
              data-focus-id={`footer-social-${idx}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div class={styles.bottom}>
        <p>© 2026 VID30 Streaming sur VIDAA OS. Hisense Smart TV. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
