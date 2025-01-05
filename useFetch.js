import { useEffect, useState } from "react"

const localCache = {};

export const useFetch = (url, useCache = true) => {
  
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null
    });
  }

  const getFetch = async () => {
    setLoadingState();
    // Verificamos si existe en el cache
    if (localCache[url] && useCache) {
      console.log("CACHE");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null
      });
      return;
    }

    const resp = await fetch(url);
    // Sleep
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText
        }
      });
      return;
    }

    const data = await resp.json();
    setState({
      data,
      isLoading: false,
      hasError: false,
      error: null
    });
    // TODO: manejo del caché
    localCache[url] = data;
  }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError
  }
}
