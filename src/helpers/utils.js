export const generateId = () => Math.random().toString(36).substr(2, 9)
export const debounce = (fn, time) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    console.log(timeoutId)
    timeoutId = setTimeout(() => {
      timeoutId = null
      console.log('saving')
      //fn(...args)
    }, time)
  }
}