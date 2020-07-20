import {createContext} from 'react'

const AuthContext = createContext({
  userId: null,
  isLoggedIn: false,
  token: null,
  login: (uId: string, token: string, expiration?: any) => {},
  logout: () => {}
})

export {
  AuthContext
}