/**
 * Vid30 HLS Player Utility
 * ─────────────────────────
 * Wraps hls.js with:
 *  - VIDAA OS native HLS fallback (some Hisense firmwares support native HLS)
 *  - Error recovery
 *  - Quality level management
 *
 * Usage:
 *   const player = createHLSPlayer(videoElement)
 *   player.load(hlsUrl)
 *   player.destroy()
 */

/**
 * @param {HTMLVideoElement} videoEl
 * @returns {{ load, destroy, getQualities, setQuality }}
 */
export function createHLSPlayer(videoEl) {
  let hlsInstance = null

  function load(url) {
    if (!url) return

    // Try native HLS first (some VIDAA OS versions support it)
    if (!window.Hls) {
      console.warn('[Vid30 Player] hls.js not loaded — trying native HLS')
      videoEl.src = url
      videoEl.load()
      return
    }

    if (window.Hls.isSupported()) {
      // Destroy previous instance
      destroy()

      hlsInstance = new window.Hls({
        // TV-optimized config
        maxBufferLength: 30,            // 30s buffer (TV has more RAM)
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000, // 60MB
        enableWorker: false,             // VIDAA OS worker support is flaky
        lowLatencyMode: false,
        backBufferLength: 10,

        // Reduce startup time
        startLevel: -1,         // auto quality on start
        abrEwmaDefaultEstimate: 5000000, // assume 5Mbps (TV wifi)
      })

      hlsInstance.loadSource(url)
      hlsInstance.attachMedia(videoEl)

      hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch(err => {
          console.warn('[Vid30 Player] Autoplay blocked:', err)
        })
      })

      hlsInstance.on(window.Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case window.Hls.ErrorTypes.NETWORK_ERROR:
              console.error('[Vid30] Network error — retrying...')
              hlsInstance.startLoad()
              break
            case window.Hls.ErrorTypes.MEDIA_ERROR:
              console.error('[Vid30] Media error — recovering...')
              hlsInstance.recoverMediaError()
              break
            default:
              console.error('[Vid30] Fatal error — destroying', data)
              destroy()
              break
          }
        }
      })

    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari / VIDAA OS native HLS
      videoEl.src = url
      videoEl.load()
    } else {
      console.error('[Vid30] HLS not supported on this device')
    }
  }

  function destroy() {
    if (hlsInstance) {
      hlsInstance.destroy()
      hlsInstance = null
    }
  }

  function getQualities() {
    if (!hlsInstance) return []
    return hlsInstance.levels.map((l, i) => ({
      index: i,
      height: l.height,
      bitrate: l.bitrate,
      label: l.height ? `${l.height}p` : `${Math.round(l.bitrate / 1000)}k`,
    }))
  }

  function setQuality(index) {
    if (!hlsInstance) return
    hlsInstance.currentLevel = index
  }

  return { load, destroy, getQualities, setQuality }
}

/**
 * Format seconds → M:SS
 */
export function fmtTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
