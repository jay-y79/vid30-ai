export const FEATURED = {
  id: 'f1',
  title: 'La Carotte',
  genre: 'Court-métrage GenAI / Action & Comédie',
  year: 2026,
  rating: 'GenAI Original',
  score: '4 438 vues',
  duration: '11 min 30',
  creator: 'Collectif Vid30',
  description: "Deux jeunes volent une voiture pour rentrer chez eux, puis bifurquent vers une cité de proche banlieue. Un plan improvisé, une tension qui monte, et une esthétique IA pensée comme un nouveau terrain de jeu pour le cinéma populaire.",
  backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80',
  trailer: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=420&q=80',
  logo: null,
  awards: '',
  nominations: 'GenAI',
  hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8',
}

export const CATEGORIES = [
  {
    id: 'signature',
    product: 'Streaming Platform',
    label: 'Créations signature',
    tagline: 'Films IA immersifs, cinématographiques et pensés pour le grand écran.',
    movies: [
      { id: 'sg1', title: 'La Carotte', year: 2026, prompteur: 'Collectif Vid30', badge: 'Original', cover: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'sg2', title: 'Neon Banlieue', year: 2026, prompteur: 'Maya Prompt', badge: '4K', cover: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'sg3', title: 'Dernier Plan', year: 2025, prompteur: 'Nadir Studio', badge: null, cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'sg4', title: 'Foule Fantôme', year: 2025, prompteur: 'Lina Renders', badge: 'Primé', cover: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'sg5', title: 'Plan Séquence 30', year: 2026, prompteur: 'AI Motion Club', badge: 'Nouveau', cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'sg6', title: 'Nocturne Data', year: 2025, prompteur: 'Elio Frames', badge: null, cover: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
    ],
  },
  {
    id: 'creators',
    product: 'Marketplace',
    label: 'Prompteurs à suivre',
    tagline: 'Créateurs IA, motion designers et studios génératifs prêts à collaborer.',
    movies: [
      { id: 'cr1', title: 'Maya Prompt Reel', year: 2026, prompteur: 'Maya Prompt', badge: 'Top', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cr2', title: 'Studio Mirage', year: 2026, prompteur: 'Mirage Lab', badge: null, cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'cr3', title: 'Human Loop', year: 2025, prompteur: 'Samir Gen', badge: 'Mission', cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cr4', title: 'Runway Stories', year: 2026, prompteur: 'Lina Renders', badge: 'HD', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'cr5', title: 'Pitch Machine', year: 2025, prompteur: 'Oscar Nodes', badge: null, cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cr6', title: 'Prompt Couture', year: 2026, prompteur: 'Noa Visuals', badge: 'Studio', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
    ],
  },
  {
    id: 'studio',
    product: 'Vid30 Studio',
    label: 'Atelier créatif',
    tagline: 'Projets, uploads, analytics et monétisation pour cinéastes IA.',
    movies: [
      { id: 'st1', title: 'Storyboard IA', year: 2026, prompteur: 'Vid30 Studio', badge: 'Outil', cover: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'st2', title: 'Render Room', year: 2026, prompteur: 'Pipeline Beta', badge: null, cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'st3', title: 'Creator Analytics', year: 2025, prompteur: 'Dashboard', badge: 'Live', cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'st4', title: 'Collab Hub', year: 2026, prompteur: 'Equipe Vid30', badge: 'Beta', cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'st5', title: 'Rights & Revenue', year: 2025, prompteur: 'Monétisation', badge: null, cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'st6', title: 'Release Desk', year: 2026, prompteur: 'Distribution', badge: 'Soon', cover: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
    ],
  },
  {
    id: 'culture',
    product: 'Communauté',
    label: 'Culture GenAI',
    tagline: 'Une scène créative, ambitieuse et immédiatement reconnaissable.',
    movies: [
      { id: 'cu1', title: 'Festival 30', year: 2026, prompteur: 'Vid30 Events', badge: 'Event', cover: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cu2', title: 'Street Poster Lab', year: 2026, prompteur: 'Affiche Club', badge: null, cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'cu3', title: 'Open Prompt Night', year: 2025, prompteur: 'Communauté', badge: 'Live', cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cu4', title: 'Merch Drop', year: 2026, prompteur: 'Vid30 Wear', badge: 'Drop', cover: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
      { id: 'cu5', title: 'Critiques IA', year: 2025, prompteur: 'Cinéphiles', badge: null, cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=420&q=80', hls: 'https://test-streams.mux.dev/x36xhg/x36xhg.m3u8' },
      { id: 'cu6', title: 'Future Cinema Talks', year: 2026, prompteur: 'Invités', badge: 'Talk', cover: 'https://images.unsplash.com/photo-1515169067865-5387ec356754?w=420&q=80', hls: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8' },
    ],
  },
]

export const NAV_TABS = ['Films', 'Créateurs', 'Marketplace', 'Studio']
export const MOVIE_TABS = ['En vedette', 'Nouveautés', 'Primés']
