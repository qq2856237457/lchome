export function debounce(fun, delay)  {
  let timer;
  return function (args) {
    const that = this;
    clearInterval(timer);
    timer = setTimeout(function () {
      fun.call(that, args)
    }, delay)
  };
};

export function throttle(func, wait) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}