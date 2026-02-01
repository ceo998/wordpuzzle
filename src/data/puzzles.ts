import { Puzzle } from '@/types';

// Sample puzzles - in production, this would come from a database
export const puzzles: Puzzle[] = [
  // Television Shows
  {
    id: '1',
    title: 'Stranger Things',
    slug: 'stranger-things',
    categoryId: '1',
    categoryName: 'Television Shows',
    categorySlug: 'television-shows',
    words: ['ELEVEN', 'HOPPER', 'DUSTIN', 'MIKE', 'LUCAS', 'WILL', 'NANCY', 'STEVE', 'DEMOGORGON', 'HAWKINS', 'UPSIDE', 'EGGO', 'BARB', 'JOYCE', 'JONATHAN'],
    difficulty: 'medium',
    gridSize: 15,
    description: 'Find characters and terms from the hit Netflix series Stranger Things',
    createdAt: '2024-01-15',
    plays: 15420,
  },
  {
    id: '2',
    title: 'Breaking Bad',
    slug: 'breaking-bad',
    categoryId: '1',
    categoryName: 'Television Shows',
    categorySlug: 'television-shows',
    words: ['WALTER', 'JESSE', 'HEISENBERG', 'SKYLER', 'HANK', 'MARIE', 'GUS', 'SAUL', 'MIKE', 'FLYNN', 'METH', 'CHEMISTRY', 'ALBUQUERQUE'],
    difficulty: 'hard',
    gridSize: 18,
    description: 'Characters and themes from Breaking Bad',
    createdAt: '2024-01-10',
    plays: 12350,
  },
  {
    id: '3',
    title: 'Friends Characters',
    slug: 'friends-characters',
    categoryId: '2',
    categoryName: 'Sitcoms',
    categorySlug: 'sitcoms',
    words: ['RACHEL', 'MONICA', 'PHOEBE', 'ROSS', 'CHANDLER', 'JOEY', 'GUNTHER', 'JANICE', 'CENTRAL', 'PERK', 'SMELLY', 'CAT', 'PIVOT'],
    difficulty: 'easy',
    gridSize: 12,
    description: 'Find all the friends from the iconic sitcom',
    createdAt: '2024-01-20',
    plays: 25680,
  },
  {
    id: '4',
    title: 'The Office',
    slug: 'the-office',
    categoryId: '2',
    categoryName: 'Sitcoms',
    categorySlug: 'sitcoms',
    words: ['MICHAEL', 'DWIGHT', 'JIM', 'PAM', 'ANGELA', 'KEVIN', 'OSCAR', 'STANLEY', 'PHYLLIS', 'CREED', 'TOBY', 'DUNDER', 'MIFFLIN', 'SCRANTON'],
    difficulty: 'medium',
    gridSize: 14,
    description: 'Characters from The Office US',
    createdAt: '2024-01-18',
    plays: 18920,
  },
  // Movies
  {
    id: '5',
    title: 'Harry Potter Spells',
    slug: 'harry-potter-spells',
    categoryId: '5',
    categoryName: 'Movies',
    categorySlug: 'movies',
    words: ['EXPELLIARMUS', 'LUMOS', 'ACCIO', 'EXPECTO', 'PATRONUM', 'AVADA', 'KEDAVRA', 'WINGARDIUM', 'LEVIOSA', 'STUPEFY', 'PROTEGO', 'ALOHOMORA'],
    difficulty: 'hard',
    gridSize: 18,
    description: 'Famous spells from the wizarding world',
    createdAt: '2024-01-12',
    plays: 22150,
  },
  {
    id: '6',
    title: 'Marvel Superheroes',
    slug: 'marvel-superheroes',
    categoryId: '5',
    categoryName: 'Movies',
    categorySlug: 'movies',
    words: ['IRONMAN', 'THOR', 'HULK', 'CAPTAIN', 'AMERICA', 'SPIDERMAN', 'WIDOW', 'HAWKEYE', 'PANTHER', 'STRANGE', 'WANDA', 'VISION', 'ANTMAN', 'WASP'],
    difficulty: 'medium',
    gridSize: 15,
    description: 'Find your favorite Marvel heroes',
    createdAt: '2024-01-14',
    plays: 28340,
  },
  // Animals
  {
    id: '7',
    title: 'Ocean Animals',
    slug: 'ocean-animals',
    categoryId: '6',
    categoryName: 'Animals',
    categorySlug: 'animals',
    words: ['DOLPHIN', 'WHALE', 'SHARK', 'OCTOPUS', 'JELLYFISH', 'SEAHORSE', 'TURTLE', 'CRAB', 'LOBSTER', 'STARFISH', 'CORAL', 'ORCA', 'SEAL', 'WALRUS'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'Creatures of the deep blue sea',
    createdAt: '2024-01-16',
    plays: 19870,
  },
  {
    id: '8',
    title: 'Safari Animals',
    slug: 'safari-animals',
    categoryId: '6',
    categoryName: 'Animals',
    categorySlug: 'animals',
    words: ['LION', 'ELEPHANT', 'GIRAFFE', 'ZEBRA', 'HIPPO', 'RHINO', 'CHEETAH', 'LEOPARD', 'BUFFALO', 'ANTELOPE', 'HYENA', 'GAZELLE', 'WILDEBEEST'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'African wildlife word search',
    createdAt: '2024-01-17',
    plays: 16540,
  },
  // Kids
  {
    id: '9',
    title: 'Colors',
    slug: 'colors',
    categoryId: '8',
    categoryName: 'Kids Puzzles',
    categorySlug: 'kids-puzzles',
    words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'BROWN', 'BLACK', 'WHITE', 'GRAY', 'GOLD'],
    difficulty: 'easy',
    gridSize: 10,
    description: 'Learn your colors with this fun puzzle',
    createdAt: '2024-01-19',
    plays: 32100,
  },
  {
    id: '10',
    title: 'Shapes',
    slug: 'shapes',
    categoryId: '8',
    categoryName: 'Kids Puzzles',
    categorySlug: 'kids-puzzles',
    words: ['CIRCLE', 'SQUARE', 'TRIANGLE', 'RECTANGLE', 'OVAL', 'DIAMOND', 'STAR', 'HEART', 'HEXAGON', 'PENTAGON'],
    difficulty: 'easy',
    gridSize: 12,
    description: 'Find all the geometric shapes',
    createdAt: '2024-01-21',
    plays: 27890,
  },
  // Disney
  {
    id: '11',
    title: 'Disney Princesses',
    slug: 'disney-princesses',
    categoryId: '9',
    categoryName: 'Disney',
    categorySlug: 'disney',
    words: ['CINDERELLA', 'ARIEL', 'BELLE', 'JASMINE', 'MULAN', 'POCAHONTAS', 'RAPUNZEL', 'MOANA', 'ELSA', 'ANNA', 'TIANA', 'AURORA', 'SNOW'],
    difficulty: 'medium',
    gridSize: 14,
    description: 'Find all the Disney princesses',
    createdAt: '2024-01-13',
    plays: 35670,
  },
  // Food & Drink
  {
    id: '12',
    title: 'Pizza Toppings',
    slug: 'pizza-toppings',
    categoryId: '10',
    categoryName: 'Food & Drink',
    categorySlug: 'food-and-drink',
    words: ['PEPPERONI', 'MUSHROOM', 'SAUSAGE', 'BACON', 'ONION', 'OLIVE', 'PEPPER', 'CHEESE', 'TOMATO', 'BASIL', 'HAM', 'PINEAPPLE', 'ANCHOVY'],
    difficulty: 'easy',
    gridSize: 13,
    description: 'Delicious pizza toppings word search',
    createdAt: '2024-01-22',
    plays: 14320,
  },
  // Science
  {
    id: '13',
    title: 'Planets',
    slug: 'planets',
    categoryId: '11',
    categoryName: 'Science',
    categorySlug: 'science',
    words: ['MERCURY', 'VENUS', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO', 'SUN', 'MOON', 'ASTEROID', 'COMET', 'GALAXY'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'Our solar system word search',
    createdAt: '2024-01-11',
    plays: 21450,
  },
  {
    id: '14',
    title: 'Chemistry Elements',
    slug: 'chemistry-elements',
    categoryId: '11',
    categoryName: 'Science',
    categorySlug: 'science',
    words: ['HYDROGEN', 'OXYGEN', 'CARBON', 'NITROGEN', 'HELIUM', 'NEON', 'GOLD', 'SILVER', 'IRON', 'COPPER', 'SODIUM', 'CALCIUM', 'ZINC'],
    difficulty: 'medium',
    gridSize: 15,
    description: 'Elements from the periodic table',
    createdAt: '2024-01-09',
    plays: 11230,
  },
  // Sports
  {
    id: '15',
    title: 'Soccer Terms',
    slug: 'soccer-terms',
    categoryId: '13',
    categoryName: 'Sports',
    categorySlug: 'sports',
    words: ['GOAL', 'PENALTY', 'CORNER', 'OFFSIDE', 'STRIKER', 'KEEPER', 'DEFENDER', 'MIDFIELD', 'DRIBBLE', 'HEADER', 'TACKLE', 'FOUL', 'REFEREE'],
    difficulty: 'medium',
    gridSize: 13,
    description: 'Football/soccer terminology',
    createdAt: '2024-01-23',
    plays: 13560,
  },
  // Countries
  {
    id: '16',
    title: 'European Countries',
    slug: 'european-countries',
    categoryId: '15',
    categoryName: 'Countries',
    categorySlug: 'countries',
    words: ['FRANCE', 'GERMANY', 'SPAIN', 'ITALY', 'PORTUGAL', 'POLAND', 'GREECE', 'SWEDEN', 'NORWAY', 'FINLAND', 'DENMARK', 'AUSTRIA', 'BELGIUM'],
    difficulty: 'medium',
    gridSize: 14,
    description: 'Countries of Europe',
    createdAt: '2024-01-08',
    plays: 17890,
  },
  // Music
  {
    id: '17',
    title: 'Musical Instruments',
    slug: 'musical-instruments',
    categoryId: '12',
    categoryName: 'Music',
    categorySlug: 'music',
    words: ['PIANO', 'GUITAR', 'VIOLIN', 'DRUMS', 'FLUTE', 'TRUMPET', 'SAXOPHONE', 'CELLO', 'HARP', 'CLARINET', 'TROMBONE', 'BASS', 'UKULELE'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'Find the musical instruments',
    createdAt: '2024-01-07',
    plays: 19340,
  },
  // Seasonal
  {
    id: '18',
    title: 'Christmas',
    slug: 'christmas',
    categoryId: '24',
    categoryName: 'Seasonal',
    categorySlug: 'seasonal',
    words: ['SANTA', 'REINDEER', 'SNOWMAN', 'PRESENTS', 'TREE', 'LIGHTS', 'CANDY', 'CANE', 'CAROLER', 'ELF', 'SLEIGH', 'WREATH', 'STOCKING', 'HOLLY'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'Holiday cheer word search',
    createdAt: '2024-01-01',
    plays: 42350,
  },
  {
    id: '19',
    title: 'Halloween',
    slug: 'halloween',
    categoryId: '24',
    categoryName: 'Seasonal',
    categorySlug: 'seasonal',
    words: ['WITCH', 'GHOST', 'PUMPKIN', 'VAMPIRE', 'ZOMBIE', 'SKELETON', 'SPIDER', 'BAT', 'CANDY', 'COSTUME', 'HAUNTED', 'SCARY', 'MUMMY', 'WEREWOLF'],
    difficulty: 'easy',
    gridSize: 14,
    description: 'Spooky Halloween word search',
    createdAt: '2024-01-02',
    plays: 38920,
  },
  // Books
  {
    id: '20',
    title: 'Lord of the Rings',
    slug: 'lord-of-the-rings',
    categoryId: '18',
    categoryName: 'Books',
    categorySlug: 'books',
    words: ['FRODO', 'GANDALF', 'ARAGORN', 'LEGOLAS', 'GIMLI', 'SAM', 'MERRY', 'PIPPIN', 'SAURON', 'GOLLUM', 'MORDOR', 'HOBBIT', 'SHIRE', 'RING'],
    difficulty: 'medium',
    gridSize: 14,
    description: 'Middle-earth characters and places',
    createdAt: '2024-01-06',
    plays: 24670,
  },
];

export function getPuzzlesByCategory(categorySlug: string): Puzzle[] {
  return puzzles.filter((puzzle) => puzzle.categorySlug === categorySlug);
}

export function getPuzzleBySlug(slug: string): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.slug === slug);
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.id === id);
}

export function getFeaturedPuzzles(limit: number = 6): Puzzle[] {
  return [...puzzles]
    .sort((a, b) => (b.plays || 0) - (a.plays || 0))
    .slice(0, limit);
}

export function getRecentPuzzles(limit: number = 6): Puzzle[] {
  return [...puzzles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function searchPuzzles(query: string): Puzzle[] {
  const lowerQuery = query.toLowerCase();
  return puzzles.filter(
    (puzzle) =>
      puzzle.title.toLowerCase().includes(lowerQuery) ||
      puzzle.categoryName.toLowerCase().includes(lowerQuery) ||
      puzzle.words.some((word) => word.toLowerCase().includes(lowerQuery))
  );
}
