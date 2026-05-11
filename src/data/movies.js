export const FEATURED = {
  id: 'f1',
  title: 'La Carotte',
  genre: 'Action & Comédie',
  year: 2005,
  rating: 'GenAI',
  score: '4 438 vues',
  duration: '11.30 min',
  description: "Deux jeunes volent une voiture pour rentrer chez eux, mais ils font un détour par une cité quelconque en proche banlieue, Samy propose de « carotter » un dealer. Malheureusement pour eux, le projet ne va pas se dérouler comme prévu, plusieurs obstacles vont s'interposer jusqu'à ce que la police s'en mêle...",
  backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80',
  trailer: 'https://www.youtube.com/watch?v=b02UMZ57xPc&t=62s',
  logo: null,
  awards: '',
  nominations: 'GenAI',
}

export const CATEGORIES = [
   {
    id: 'scifi',
    label: 'Science-Fiction',
    tagline: 'Futuriste, vertigineux et visionnaire.',
    movies: [
      { id: 's1', title: 'Dune: Part Two', year: 2024 , prompteur: 'John Smith', badge: '4K', cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80' },
      { id: 's2', title: 'Interstellar', year: 2014, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80' },
      { id: 's3', title: 'Arrival', year: 2016, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80' },
      { id: 's4', title: 'Blade Runner 2049', year: 2017, prompteur: 'Bob Williams', badge: null, cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
      { id: 's5', title: 'Everything Everywhere', year: 2022, prompteur: 'Charlie Brown', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80' },
      { id: 's6', title: 'Dune: Part Two', year: 2024 , prompteur: 'John Smith', badge: '4K', cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80' },
      { id: 's7', title: 'Interstellar', year: 2014, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80' },
      { id: 's8', title: 'Arrival', year: 2016, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80' },
      { id: 's9', title: 'Blade Runner 2049', year: 2017, prompteur: 'Bob Williams', badge: null, cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
      { id: 's10', title: 'Everything Everywhere', year: 2022, prompteur: 'Charlie Brown', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80' },
    ],
  },
  {
    id: 'action',
    label: 'Action & Aventure',
    tagline: 'Héroïque, physique et frénétique.',
    movies: [
      { id: 'a1', title: 'Top Gun: Maverick', year: 2022 , prompteur: 'John Smith', badge: 'POPULAIRE', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 'a2', title: 'Mission Impossible', year: 2023, prompteur: 'Jane Doe', badge: 'HD', cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80' },
      { id: 'a3', title: 'John Wick 4', year: 2023, prompteur: 'Alice Johnson', badge: '4K', cover: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80' },
      { id: 'a4', title: 'Hacksaw Ridge', year: 2016, prompteur: 'Bob Williams', badge: null, cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
      { id: 'a5', title: 'The Batman', year: 2022, prompteur: 'Charlie Brown', badge: 'EXCLUSIF', cover: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80' },
      { id: 'a6', title: 'Top Gun: Maverick', year: 2022 , prompteur: 'John Smith', badge: 'POPULAIRE', cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
      { id: 'a7', title: 'Mission Impossible', year: 2023, prompteur: 'Jane Doe', badge: 'HD', cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80' },
      { id: 'a8', title: 'John Wick 4', year: 2023, prompteur: 'Alice Johnson', badge: '4K', cover: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80' },
      { id: 'a9', title: 'Hacksaw Ridge', year: 2016, prompteur: 'Bob Williams', badge: null, cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
      { id: 'a10', title: 'The Batman', year: 2022, prompteur: 'Charlie Brown', badge: 'EXCLUSIF', cover: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80' },
    ],
  },
  {
    id: 'drama',
    label: 'Drame & Romance',
    tagline: 'Émouvant, intense et inattendu.',
    movies: [
      { id: 'd1', title: 'La La Land', year: 2016, prompteur: 'John Smith', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
      { id: 'd2', title: 'The Age of Adaline', year: 2015, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80' },
      { id: 'd3', title: 'Freeheld', year: 2015, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&q=80' },
      { id: 'd4', title: 'Oppenheimer', year: 2023, prompteur: 'Charlie Brown', badge: '4K', cover: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80' },
      { id: 'd5', title: 'Past Lives', year: 2023, prompteur: 'David Miller', badge: null, cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80' },
      { id: 'd6', title: 'La La Land', year: 2016, prompteur: 'John Smith', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
      { id: 'd7', title: 'The Age of Adaline', year: 2015, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80' },
      { id: 'd8', title: 'Freeheld', year: 2015, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&q=80' },
      { id: 'd9', title: 'Oppenheimer', year: 2023, prompteur: 'Charlie Brown', badge: '4K', cover: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80' },
      { id: 'd10', title: 'Past Lives', year: 2023, prompteur: 'David Miller', badge: null, cover: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80' },
    ],
  },
  {
    id: 'comedy',
    label: 'Comédie',
    tagline: 'Amusant, humoristique et décalé.',
    movies: [
      { id: 'c1', title: 'American Ultra', year: 2015 , prompteur: 'John Smith', badge: null, cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80' },
      { id: 'c2', title: 'We The Peeples', year: 2013, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80' },
      { id: 'c3', title: 'Happy Endings', year: 2005, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
      { id: 'c4', title: 'Brooklyn', year: 2015, prompteur: 'Charlie Brown', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=400&q=80' },
      { id: 'c5', title: 'Barbie', year: 2023, prompteur: 'David Miller', badge: 'POPULAIRE', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80' },
      { id: 'c6', title: 'American Ultra', year: 2015 , prompteur: 'John Smith', badge: null, cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80' },
      { id: 'c7', title: 'We The Peeples', year: 2013, prompteur: 'Jane Doe', badge: null, cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80' },
      { id: 'c8', title: 'Happy Endings', year: 2005, prompteur: 'Alice Johnson', badge: null, cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
      { id: 'c9', title: 'Brooklyn', year: 2015, prompteur: 'Charlie Brown', badge: 'PRIMÉ', cover: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=400&q=80' },
      { id: 'c10', title: 'Barbie', year: 2023, prompteur: 'David Miller', badge: 'POPULAIRE', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80' },
    ],
  },
]

export const NAV_TABS = ['FILMS']
// , 'SÉRIES', 'À LA MAISON', 'CORPORATE'
export const MOVIE_TABS = ['EN VEDETTE']
// , 'BIENTÔT', 'EN SALLE', 'À POSSÉDER', 'PRIMÉS'