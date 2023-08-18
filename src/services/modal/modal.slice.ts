import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModalType, NameModal } from './types.ts'

const initialState: ModalType = {
  open: '',
  settingsValue: {
    privatePack: false,
    packName: '',
    question: '',
    answer: '',
    img: null,
    editImg: '',
  },
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<NameModal>) => {
      state.open = action.payload
    },
    setCloseModal: (state, _) => {
      state.open = ''
    },
    setPrivatePack: (state, action: PayloadAction<boolean>) => {
      state.settingsValue.privatePack = action.payload
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
    setImg: (state, action: PayloadAction<File>) => {
      state.settingsValue.img = action.payload
    },
    setEditImg: (state, action: PayloadAction<string | null | undefined>) => {
      state.settingsValue.editImg = action.payload
    },
    setClearState: (state, _) => {
      state.settingsValue.packName = ''
      state.settingsValue.question = ''
      state.settingsValue.answer = ''
      state.settingsValue.img = null
      state.settingsValue.privatePack = false
    },
  },
})

export const modalActions = modalSlice.actions
