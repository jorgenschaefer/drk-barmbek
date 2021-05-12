import { useState } from "react";

type StateTuple<T> = [T, (value: T) => void];

const useLocalStorage = <T>(name: string, initial: T): StateTuple<T> => {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const value = window.localStorage.getItem(name)
      if (value !== null) {
        return JSON.parse(value) as T;
      }
    }
    return initial;
  });

  const setPersistedValue = (value: T) => {
    if (window && window.localStorage) {
      window.localStorage.setItem(name, JSON.stringify(value));
    }
    setValue(value);
  }

  return [value, setPersistedValue];
}

export default useLocalStorage;
