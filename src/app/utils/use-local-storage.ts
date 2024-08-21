export const useLocalStorage = () => {
  const getItem = <T>(key: string): T => {
    return JSON.parse(localStorage.getItem(key) || 'null');
  };

  const setItem = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    getItem,
    setItem,
  };
};
