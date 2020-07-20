import {useCallback, useEffect, useState} from "react";

let logoutTimer: any;

export const useAuth = () => {

  const [token, setToken] = useState<any>();
  const [userId, setUserId] = useState<any>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<any>();

  const login = useCallback((uId: string, token: string, expirationDate) => {
    setToken(token);
    setUserId(uId);

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({userId: uId, token: token, expiration: tokenExpirationDate.toISOString()}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    // @ts-ignore
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration))
    }
  }, [login])

  return {token, login, logout, userId}

}