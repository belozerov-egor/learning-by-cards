export type ModalType = {
  open: NameModal
  settingsValue: {
    privatePack: boolean
    packName: string
    question: string
    answer: string
    img: File | null
    editImg: string | null | undefined
  }
}

export type NameModal =
  | 'addPack'
  | 'addCard'
  | 'editPack'
  | 'editCard'
  | 'deletePack'
  | 'deleteCard'
  | ''
