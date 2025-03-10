export function addDelay(handler: () => void) {
  setTimeout(() => {
    handler();
  }, 2000);
}
