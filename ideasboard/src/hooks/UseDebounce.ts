const useDebounce = (func: any, delay = 500) => {
  let timer: number | undefined;

  return (...args: any) => {
    function debouncedFunc() {
      timer = undefined;
      func(...args);
    }

    clearTimeout(timer);
    timer = setTimeout(debouncedFunc, delay);
  };
};

export { useDebounce };
