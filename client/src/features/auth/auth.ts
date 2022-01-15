import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store'

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR='moderator'
}

export interface User {
  id: string
  username: string
  email: string
  roles: ROLE
}

export interface UserResponse {
  user: User
  accessToken: string

}
export interface RegisterResponse {
  message: string
}

export interface LoginRequest {
  username: string
  password: string
}
export interface RegisterRequest {
    username: string
    password: string
    email:string
  }
  


//example from https://redux-toolkit.js.org/rtk-query/usage/examples#authentication
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accesToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'http://localhost:8080/api/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (credentials) => ({
          url: 'http://localhost:8080/api/auth/signup',
          method: 'POST',
          body: credentials,
        }),
      }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useProtectedMutation } = api
