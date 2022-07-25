export async function fakeDelay(timeout: number = 1500) {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, timeout));
}
