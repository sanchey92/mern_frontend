import {useState, useCallback, useRef, useEffect} from "react";

type useHttpClientType = {
  isLoading: boolean,
  error: any,
  sendRequest: Function,
  clearError: Function
}

export const useHttpClient = (): useHttpClientType => {
  const [isLoading, setISLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(async (url: string, method = 'GET', body = null, headers = {}) => {
    setISLoading(true)

    const httpAbortController = new AbortController();
    // @ts-ignore
    activeHttpRequests.current.push(httpAbortController)

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: httpAbortController.signal
      });

      const responseData = await response.json();

      activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortController)

      if (!response.ok) throw new Error(responseData.message)

      setISLoading(false)
      return responseData
    } catch (err) {
      setISLoading(false)
      setError(err.message)
      throw err
    }
  }, []);

  const clearError = () => setError(null)

  useEffect(() => {
    return () => {
      // @ts-ignore
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return {isLoading, error, sendRequest, clearError}
}