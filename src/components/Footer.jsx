import styles from './Footer.module.css'

const links = {
  Corporate: ['NYSE: LGF-A', 'NYSE: LGF-B', "CONDITIONS D'UTILISATION", 'CONFIDENTIALITÉ'],
  Sitemap: ['Vid30 Streaming', 'Vid30 Marketplace', 'Vid30 Studio', 'Landingpage'],
}

export function Footer() {
  return (
    <footer class={styles.footer}>
      <div class={styles.inner}>
        <div class={styles.brand}>
          <span class={styles.logo}>VID30</span>
          <span class={styles.logoSub}>STREAMING</span>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} class={styles.col}>
            <h3 class={styles.colHeading}>{heading}</h3>
            <ul class={styles.colList}>
              {items.map(item => (
                <li key={item}><button class={styles.colLink}>{item}</button></li>
              ))}
            </ul>
          </div>
        ))}

        <div class={styles.col}>
          <h3 class={styles.colHeading}>S'abonner</h3>
          <p class={styles.subText}>Entrez votre e-mail pour recevoir les dernières nouvelles.</p>
          <div class={styles.emailRow}>
            <input
              class={styles.emailInput}
              type="email"
              placeholder="Votre e-mail"
            />
            <button class={styles.emailBtn}>→</button>
          </div>
        </div>

        <div class={styles.socials}>
          {['F', '𝕏', '▶'].map(s => (
            <button key={s} class={styles.socialBtn}>{s}</button>
          ))}
        </div>
      </div>

      <div class={styles.bottom}>
        <p>© 2026 VID30 Streaming — On VIDAA OS. Hisense Smart TV. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
