/**
 * Vid30 Focus Engine v2
 * ──────────────────────
 * Handles ALL remote control navigation.
 * This is the most critical module for TV UX.
 *
 * Algorithm:
 *   1. On arrow key → find all [data-focusable] elements
 *   2. Filter elements that are in the correct direction (dot product)
 *   3. Score by: distance + angle penalty
 *   4. Focus the winner
 *
 * VIDAA OS key codes (Hisense remote):
 *   ← → ↑ ↓  ArrowLeft/Right/Up/Down
 *   OK        Enter
 *   Back      Backspace or GoBack
 *   Play/Pause MediaPlayPause or p
 *   FastFwd   MediaFastForward
 *   Rewind    MediaRewind
 */

// ─── Key maps (VIDAA + standard) ───────────────────────────────
export const KEYS = {
  UP:         ['ArrowUp', 'Up'],
  DOWN:       ['ArrowDown', 'Down'],
  LEFT:       ['ArrowLeft', 'Left'],
  RIGHT:      ['ArrowRight', 'Right'],
  OK:         ['Enter', 'Return'],
  BACK:       ['Backspace', 'Escape', 'GoBack', 'XF86Back'],
  PLAY_PAUSE: ['MediaPlayPause', 'p', ' ', 'XF86PlayPause'],
  PLAY:       ['MediaPlay', 'XF86AudioPlay'],
  PAUSE:      ['MediaPause', 'XF86AudioPause'],
  STOP:       ['MediaStop', 'XF86AudioStop'],
  FWD:        ['MediaFastForward', 'XF86FastForward'],
  RWD:        ['MediaRewind', 'XF86Rewind'],
  RED:        ['ColorF0Red',   'XF86Red'],
  GREEN:      ['ColorF1Green', 'XF86Green'],
  YELLOW:     ['ColorF2Yellow','XF86Yellow'],
  BLUE:       ['ColorF3Blue',  'XF86Blue'],
}

// ─── State ──────────────────────────────────────────────────────
let _focused = null
let _backHandler = null
let _mediaHandlers = {}
let _destroyed = false

// ─── Helpers ────────────────────────────────────────────────────
function getFocusables() {
  return Array.from(
    document.querySelectorAll('[data-focusable]:not([data-focusable-disabled])')
  ).filter(el => {
    const r = el.getBoundingClientRect()
    // Must be visible and in viewport
    return (
      r.width > 0 && r.height > 0 &&
      r.bottom > 0 && r.top < window.innerHeight * 2
    )
  })
}

function center(el) {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

const DIR_VECTORS = {
  UP:    { dx: 0,  dy: -1 },
  DOWN:  { dx: 0,  dy:  1 },
  LEFT:  { dx: -1, dy:  0 },
  RIGHT: { dx:  1, dy:  0 },
}

function findBestCandidate(current, direction) {
  const all = getFocusables()
  const c   = center(current)
  const v   = DIR_VECTORS[direction]

  let best      = null
  let bestScore = Infinity

  for (const el of all) {
    if (el === current) continue

    const ec  = center(el)
    const dx  = ec.x - c.x
    const dy  = ec.y - c.y
    const dot = dx * v.dx + dy * v.dy

    // Must be in the correct direction
    if (dot <= 0) continue

    const dist        = Math.sqrt(dx * dx + dy * dy)
    const alignment   = dot / dist         // 1 = perfectly aligned
    const anglePenalty = (1 - alignment) * 300

    // Prefer elements that are closer AND more aligned
    const score = dist + anglePenalty

    if (score < bestScore) {
      bestScore = score
      best = el
    }
  }

  return best
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Apply TV focus to an element
 */
export function focusEl(el) {
  if (!el || _destroyed) return

  // Remove from previous
  if (_focused && _focused !== el) {
    _focused.classList.remove('tv-focused')
    _focused.removeAttribute('aria-selected')
    _focused.dispatchEvent(new CustomEvent('tv:blur', { bubbles: true }))
  }

  _focused = el
  el.classList.add('tv-focused')
  el.setAttribute('aria-selected', 'true')

  // Native focus for accessibility (silent scroll)
  try { el.focus({ preventScroll: true }) } catch (_) {}

  // Smart scroll: only if out of view
  const r = el.getBoundingClientRect()
  const margin = 80
  if (r.bottom > window.innerHeight - margin || r.top < margin) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  el.dispatchEvent(new CustomEvent('tv:focus', { bubbles: true }))
}

/**
 * Focus the first focusable element on the page
 */
export function focusFirst() {
  const all = getFocusables()
  if (all[0]) focusEl(all[0])
}

/**
 * Focus by data-focus-id attribute
 */
export function focusById(id) {
  const el = document.querySelector(`[data-focus-id="${id}"]`)
  if (el) focusEl(el)
  return !!el
}

/**
 * Get currently focused element
 */
export function getFocused() { return _focused }

/**
 * Register back button handler (replaces previous)
 */
export function onBack(fn) { _backHandler = fn }

/**
 * Register media key handler
 * @param {'PLAY_PAUSE'|'FWD'|'RWD'|'PLAY'|'PAUSE'} key
 */
export function onMedia(key, fn) { _mediaHandlers[key] = fn }

/**
 * Temporarily disable a focusable element
 */
export function disableFocusable(el) {
  el.setAttribute('data-focusable-disabled', '')
}

export function enableFocusable(el) {
  el.removeAttribute('data-focusable-disabled')
}

// ─── Keyboard handler ────────────────────────────────────────────
function handleKey(e) {
  const key = e.key

  // Directional
  if (KEYS.UP.includes(key))    { e.preventDefault(); _navigate('UP'); return }
  if (KEYS.DOWN.includes(key))  { e.preventDefault(); _navigate('DOWN'); return }
  if (KEYS.LEFT.includes(key))  { e.preventDefault(); _navigate('LEFT'); return }
  if (KEYS.RIGHT.includes(key)) { e.preventDefault(); _navigate('RIGHT'); return }

  // OK / Enter
  if (KEYS.OK.includes(key)) {
    e.preventDefault()
    if (_focused) _focused.click()
    return
  }

  // Back
  if (KEYS.BACK.includes(key)) {
    e.preventDefault()
    if (_backHandler) _backHandler()
    return
  }

  // Media keys
  for (const [name, keys] of Object.entries(KEYS)) {
    if (['PLAY_PAUSE','PLAY','PAUSE','STOP','FWD','RWD'].includes(name)) {
      if (keys.includes(key) && _mediaHandlers[name]) {
        e.preventDefault()
        _mediaHandlers[name]()
        return
      }
    }
  }

  // Color keys
  if (KEYS.RED.includes(key)    && _mediaHandlers.RED)    { e.preventDefault(); _mediaHandlers.RED(); }
  if (KEYS.GREEN.includes(key)  && _mediaHandlers.GREEN)  { e.preventDefault(); _mediaHandlers.GREEN(); }
  if (KEYS.YELLOW.includes(key) && _mediaHandlers.YELLOW) { e.preventDefault(); _mediaHandlers.YELLOW(); }
  if (KEYS.BLUE.includes(key)   && _mediaHandlers.BLUE)   { e.preventDefault(); _mediaHandlers.BLUE(); }
}

function _navigate(dir) {
  if (!_focused) { focusFirst(); return }
  const best = findBestCandidate(_focused, dir)
  if (best) focusEl(best)
}

// ─── Init / Destroy ──────────────────────────────────────────────

/**
 * Initialize focus engine — call once on app mount
 * @returns {Function} cleanup function
 */
export function initFocusEngine() {
  _destroyed = false
  document.addEventListener('keydown', handleKey, { passive: false })

  // Initial focus after render
  requestAnimationFrame(() => {
    setTimeout(focusFirst, 50) // slight delay for VIDAA OS DOM readiness
  })

  return () => {
    _destroyed = true
    document.removeEventListener('keydown', handleKey)
    _focused = null
    _backHandler = null
    _mediaHandlers = {}
  }
}
