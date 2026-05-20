import { useEffect, useRef, useState, useCallback } from 'preact/hooks'
import { createHLSPlayer, fmtTime } from '../utils/hlsPlayer'
import { focusById, onBack, onMedia } from '../utils/focusEngine'
import styles from './VideoPlayer.module.css'

const UI_HIDE_DELAY = 5000 // ms before UI auto-hides

export function VideoPlayer({ film, onClose }) {
  const videoRef  = useRef(null)
  const playerRef = useRef(null)
  const timerRef  = useRef(null)

  const [playing,   setPlaying]   = useState(false)
  const [progress,  setProgress]  = useState(0)
  const [current,   setCurrent]   = useState(0)
  const [duration,  setDuration]  = useState(0)
  const [uiVisible, setUiVisible] = useState(true)
  const [buffering, setBuffering] = useState(true)
  const [volume,    setVolume]    = useState(100)
  const [qualities, setQualities] = useState([])
  const [showQuality, setShowQuality] = useState(false)

  // ── Show / hide UI ───────────────────────────────────────────
  const showUI = useCallback(() => {
    setUiVisible(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setUiVisible(false)
      setShowQuality(false)
    }, UI_HIDE_DELAY)
  }, [])

  // ── Init HLS ─────────────────────────────────────────────────
  useEffect(() => {
    if (!videoRef.current || !film) return

    const player = createHLSPlayer(videoRef.current)
    playerRef.current = player
    player.load(film.hls)

    const video = videoRef.current

    const onPlaying   = () => { setPlaying(true);  setBuffering(false) }
    const onPause     = () => { setPlaying(false) }
    const onWaiting   = () => setBuffering(true)
    const onCanPlay   = () => setBuffering(false)
    const onTimeUpdate = () => {
      if (!video.duration) return
      setCurrent(video.currentTime)
      setDuration(video.duration)
      setProgress((video.currentTime / video.duration) * 100)
    }
    const onLoadedMeta = () => {
      setDuration(video.duration)
      // Get quality levels after manifest parsed
      setTimeout(() => {
        setQualities(player.getQualities())
      }, 500)
    }

    video.addEventListener('playing',     onPlaying)
    video.addEventListener('pause',       onPause)
    video.addEventListener('waiting',     onWaiting)
    video.addEventListener('canplay',     onCanPlay)
    video.addEventListener('timeupdate',  onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoadedMeta)

    // Auto-play
    video.play().catch(() => setPlaying(false))

    return () => {
      player.destroy()
      video.removeEventListener('playing',     onPlaying)
      video.removeEventListener('pause',       onPause)
      video.removeEventListener('waiting',     onWaiting)
      video.removeEventListener('canplay',     onCanPlay)
      video.removeEventListener('timeupdate',  onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoadedMeta)
    }
  }, [film])

  // ── Register remote media keys ────────────────────────────────
  useEffect(() => {
    onBack(() => onClose?.())
    onMedia('PLAY_PAUSE', togglePlay)
    onMedia('PLAY',  () => videoRef.current?.play())
    onMedia('PAUSE', () => videoRef.current?.pause())
    onMedia('FWD',   () => skip(+10))
    onMedia('RWD',   () => skip(-10))

    // Show UI on any key
    showUI()
    focusById('player-play')

    return () => {
      onBack(null)
      onMedia('PLAY_PAUSE', null)
      onMedia('PLAY', null)
      onMedia('PAUSE', null)
      onMedia('FWD', null)
      onMedia('RWD', null)
    }
  }, [])

  // ── Controls ─────────────────────────────────────────────────
  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else          v.pause()
    showUI()
  }

  function skip(secs) {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + secs))
    showUI()
  }

  function seek(e) {
    const v = videoRef.current
    if (!v || !v.duration) return
    const bar = e.currentTarget
    const pct = e.offsetX / bar.offsetWidth
    v.currentTime = pct * v.duration
    showUI()
  }

  function handleMouseMove() { showUI() }

  // ── Render ───────────────────────────────────────────────────
  return (
    <div
      class={styles.overlay}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        // Click on black area = show UI
        if (e.target === e.currentTarget) showUI()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Lecture: ${film?.title}`}
    >
      {/* VIDEO ELEMENT */}
      <video
        ref={videoRef}
        class={styles.video}
        preload="auto"
        playsInline
        // No controls — we build custom ones for TV
      />

      {/* BUFFERING SPINNER */}
      {buffering && (
        <div class={styles.bufferWrap} aria-live="polite">
          <div class={styles.spinner} />
          <span class={styles.bufferText}>Chargement...</span>
        </div>
      )}

      {/* PLAYER UI — slides in/out */}
      <div class={`${styles.ui} ${uiVisible ? styles.uiVisible : ''}`}>
        {/* Top bar */}
        <div class={styles.topBar}>
          <div class={styles.filmInfo}>
            <p class={styles.filmTitle}>{film?.title}</p>
            <p class={styles.filmSub}>par {film?.prompteur} · {film?.genre}</p>
          </div>
          <button
            class={`${styles.closeBtn} player-btn`}
            data-focusable
            data-focus-id="player-close"
            onClick={onClose}
          >
            ✕ QUITTER
          </button>
        </div>

        {/* Bottom controls */}
        <div class={styles.bottomBar}>
          {/* Progress */}
          <div class={styles.progressWrap}>
            <span class={styles.timeLabel}>{fmtTime(current)}</span>
            <div
              class={styles.progressTrack}
              onClick={seek}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Progression"
            >
              <div class={styles.progressFill} style={{ width: `${progress}%` }}>
                <div class={styles.progressThumb} />
              </div>
            </div>
            <span class={styles.timeLabel}>{fmtTime(duration)}</span>
          </div>

          {/* Buttons row */}
          <div class={styles.controls}>
            {/* Skip back 10s */}
            <button
              class={`${styles.ctrlBtn} player-btn`}
              data-focusable
              data-focus-id="player-rwd"
              onClick={() => { skip(-10); showUI() }}
              aria-label="Reculer 10 secondes"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
              </svg>
              <span class={styles.skipLabel}>-10s</span>
            </button>

            {/* Play/Pause — MAIN button */}
            <button
              class={`${styles.playBtn} player-btn-play`}
              data-focusable
              data-focus-id="player-play"
              onClick={() => { togglePlay(); showUI() }}
              aria-label={playing ? 'Pause' : 'Lecture'}
            >
              {playing ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>

            {/* Skip forward 10s */}
            <button
              class={`${styles.ctrlBtn} player-btn`}
              data-focusable
              data-focus-id="player-fwd"
              onClick={() => { skip(+10); showUI() }}
              aria-label="Avancer 10 secondes"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
              </svg>
              <span class={styles.skipLabel}>+10s</span>
            </button>

            {/* Spacer */}
            <div class={styles.spacer} />

            {/* Quality selector */}
            {qualities.length > 1 && (
              <div class={styles.qualityWrap}>
                <button
                  class={`${styles.ctrlBtn} ${styles.ctrlBtnSmall} player-btn`}
                  data-focusable
                  data-focus-id="player-quality"
                  onClick={() => { setShowQuality(q => !q); showUI() }}
                  aria-label="Qualité vidéo"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  HD
                </button>
                {showQuality && (
                  <div class={styles.qualityMenu}>
                    <p class={styles.qualityTitle}>Qualité</p>
                    <button
                      class={styles.qualityOpt}
                      data-focusable
                      onClick={() => { playerRef.current?.setQuality(-1); setShowQuality(false) }}
                    >
                      AUTO
                    </button>
                    {qualities.map(q => (
                      <button
                        key={q.index}
                        class={styles.qualityOpt}
                        data-focusable
                        onClick={() => { playerRef.current?.setQuality(q.index); setShowQuality(false) }}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Volume indicator (read-only — TV uses system volume) */}
            <div class={styles.volumeIcon} aria-label="Volume">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            </div>
          </div>

          {/* Remote hints */}
          <div class={styles.hints}>
            <span>⬅ ➡ Naviguer</span>
            <span class={styles.hintDot}>·</span>
            <span>OK Lecture/Pause</span>
            <span class={styles.hintDot}>·</span>
            <span>⬅ (long) Quitter</span>
          </div>
        </div>
      </div>
    </div>
  )
}
