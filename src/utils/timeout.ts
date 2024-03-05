export function timeout(time = 0) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
