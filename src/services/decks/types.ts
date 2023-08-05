import { Pagination } from "../types"

export type DecksResponse = {
    maxCardsCount: number
    pagination: Pagination
    items: Deck[]
  }
  
  export type Author = {
    id: string
    name: string
  }
  export type Deck = {
    id: string
    userId: string
    name: string
    isPrivate: boolean
    shots: number
    cover?: string | null
    rating: number
    isDeleted?: boolean
    isBlocked?: boolean
    created: string
    updated: string
    cardsCount: number
    author: Author
  }