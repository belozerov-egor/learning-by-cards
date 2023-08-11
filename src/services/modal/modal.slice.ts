import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NameModal } from './types.ts'

const initialState = {
  showModal: {
    addPack: false,
    addCard: false,
    editPack: false,
    editCard: false,
    deletePack: false,
    deleteCard: false,
  },
  settingsValue: {
    packName: '',
    question: '',
    answer: '',
  },
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<NameModal>) => {
      state.showModal[action.payload] = true
    },
    setCloseModal: (state, action: PayloadAction<NameModal>) => {
      state.showModal[action.payload] = false
    },
    setPackName: (state, action: PayloadAction<string>) => {
      state.settingsValue.packName = action.payload
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.settingsValue.question = action.payload
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.settingsValue.answer = action.payload
    },
  },
})
