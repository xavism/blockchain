onmessage = function(e) {
  console.log(e)
  console.log('Worker: Message received from main script');
  let i = 0
  while (i < 1000000) {
    ++i
  }
  postMessage(i);
}