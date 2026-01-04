export interface CardSet {
  id: string
  name: string
  description: string
  cardCount: number
  imagePath: string
  isDefault: boolean
}

export const cardSets: CardSet[] = [
  {
    id: 'og',
    name: 'Original',
    description: 'The original 280 cards from Codenames Pictures',
    cardCount: 280,
    imagePath: 'og',
    isDefault: true,
  },
  // Future expansion sets will be added here:
  // {
  //   id: 'ai-vol1',
  //   name: 'AI Cards: Vol 1',
  //   description: '365 AI-generated cards',
  //   cardCount: 365,
  //   imagePath: 'ai-vol1',
  //   isDefault: false,
  // },
]

export function getCardSetById(id: string): CardSet | undefined {
  return cardSets.find((set) => set.id === id)
}

export function getDefaultCardSets(): CardSet[] {
  return cardSets.filter((set) => set.isDefault)
}

export function getDefaultCardSetIds(): string[] {
  return getDefaultCardSets().map((set) => set.id)
}
