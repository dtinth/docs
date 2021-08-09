/**
 * A build task is a function that can be triggered.
 */
export class BuildTask {
  constructor(fn) {
    this.fn = fn
    this.version = 0
    this.waiting = false
    this.resolve = null
    this.promise = Promise.resolve(0)
  }
  trigger() {
    this.version++
    if (this.waiting) {
      return
    }
    this.waiting = true
    if (!this.resolve) {
      const promise = new Promise((resolve) => {
        this.resolve = resolve
      })
      this.promise = promise
    }
    setTimeout(async () => {
      this.waiting = false
      const version = this.version
      try {
        await this.fn()
      } finally {
        if (this.version === version) {
          this.resolve(version)
          this.resolve = null
        } else {
          this.trigger()
        }
      }
    }, 100)
  }
}
