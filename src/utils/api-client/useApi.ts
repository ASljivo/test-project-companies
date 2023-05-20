import { useCallback, useEffect, useState } from "react";
import { Response, ResponseError } from "./ApiClient";

export type Params = any;
export type Body = any;

export type ApiCallType<T = any, Params = any, Body = any> = (
  params?: Params,
  body?: Body
) => Promise<Response<T>>;

type ReturnType<T, Params = null, Body = null> = {
  data: T;
  error?: string;
  isLoading: boolean;
  fetch: ApiCallType<T, Params, Body>;
  setData: (data: T) => void;
  setLoading: (isLoading: boolean) => void;
};

type State<T> = {
  isLoading: boolean;
  error?: string;
  response?: Response<T>;
};

const useApi = <T extends unknown>(
  api: ApiCallType<T, Params, Body>,
  params?: Params,
  body?: Body,
  skipOnLoad = true
): ReturnType<T, Params, Body> => {
  const [state, setState] = useState<State<T>>({
    isLoading: !skipOnLoad,
    error: undefined,
    response: undefined,
  });

  const fetch = useCallback(
    (params?: Params, body?: Body): Promise<any> => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: undefined,
      }));
      return api(params, body)
        .then((response: Response<T>) => {
          response.data = response.data || ({} as T);
          setState({ isLoading: false, error: undefined, response });
          return new Promise<Response<T>>((resolve) => resolve(response));
        })
        .catch((error: ResponseError) => {
          const errorMessage = error ? error?.data?.message : error || "";
          setState({
            isLoading: false,
            error: errorMessage,
            response: undefined,
          });
          return new Promise<T>((resolve) =>
            resolve({ error: errorMessage } as T)
          );
        });
    },
    [api]
  );

  const setLoading = (isLoading: boolean): void =>
    setState((prevState) => ({ ...prevState, isLoading }));

  const setData = (data: T): void =>
    setState((prevState) => ({
      ...prevState,
      response: { ...prevState.response, data } as Response<T>,
    }));

  useEffect(() => {
    if (!skipOnLoad) {
      fetch(params, body);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { response, error, isLoading } = state;
  const data = response?.data || undefined;
  return {
    data: data as T,
    error,
    isLoading,
    fetch,
    setLoading,
    setData,
  };
};

export default useApi;
