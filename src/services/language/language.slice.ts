import { createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  value: string | null
}

const initialState: initialStateType = {
  value: localStorage.getItem('i18nextLng'),
}

export const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {},
})
