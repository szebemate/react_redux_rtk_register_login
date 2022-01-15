import { createSlice } from '@reduxjs/toolkit'
import { api, User } from './auth'
import type { RootState } from '../../app/store'

type AuthState = {
  user: User | null
  accesToken: string | null
  isAuthenticated: boolean
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accesToken: null, isAuthenticated: false } as AuthState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accesToken = null
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload: { user, accessToken } }) => {
        state.user = user
        state.accesToken = accessToken
        state.isAuthenticated = true
      },
    )
  },
})

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
