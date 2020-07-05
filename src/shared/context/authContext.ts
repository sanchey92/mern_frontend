import {createContext} from 'react'

const AuthContext = createContext({
  userId: null,
  isLoggedIn: false,
  login: (uId: string) => {},
  logout: () => {}
})

export {
  AuthContext
}