export const context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  getTop () {
    return this.stack[this.stack.length - 1]
  }
}
