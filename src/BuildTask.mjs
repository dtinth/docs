/**
 * A build task is a function that can be triggered.
 */
export class BuildTask {
  constructor(fn) {
    this.fn = fn
    this.version = 0
    this.waiting = false
  }
  trigger() {
    this.version++
    if (this.waiting) {
      return
    }
    this.waiting = true
    setTimeout(async () => {
      this.waiting = false
      const version = this.version
      try {
        await this.fn()
      } finally {
        if (this.version !== version) {
          this.trigger()
        }
      }
    }, 500)
  }
}
