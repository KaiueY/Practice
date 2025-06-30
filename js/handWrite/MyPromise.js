const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'


function runMicrotask(fn) {
	if (typeof queueMicrotask === 'function') {
		queueMicrotask(fn)
	} else if (typeof process === 'object' && typeof process.nextTick === 'function') {
		process.nextTick(fn)
	} else if (typeof MutationObserver === 'function') {
		const text = document.createTextNode('')
		const observer = new MutationObserver(fn)
		observer.observe(text, { characterData: true })
		text.data = '1'
	} else {
		setTimeout(fn)
	}
}

function isPromiseLike(val) {
	return typeof val?.then === 'function'
}
class MyPromise {
	#state = PENDING
	#value
	#handlers = []

	constructor(exercutor) {
		const resolve = (val) => {
			this.#setState(FULFILLED, val)
		}
		const reject = (reason) => {
			this.#setState(REJECTED, reason)
		}
		try {
			exercutor(resolve, reject)
		} catch (err) {
			reject(err)
		}
	}
	#setState(state, value) {
		if (this.#state !== PENDING) return
		this.#state = state
		this.#value = value
		this.#runTask()
	}

	#runTask() {
		runMicrotask(() => {
			if (this.#state !== PENDING) {
				this.#handlers.forEach(handler => handler())
				this.#handlers = []
			}
		})

	}

	static resolve(val) {
		if (val instanceof Promise) {
			return val
		}
		return new Promise((resolve, reject) => {
			if (isPromiseLike(val)) {
				val.then(resolve, reject)
			} else {
				resolve(val)
			}
		})
	}

	static reject(reason) {
		return new Promise((_, reject) => {
			reject(reason)
		})
	}

	static try(func, ...args) {
		return new Promise((resolve) => {
			resolve(func(...args))
		})
	}

	static all(promises) {
		promises = [...promises]
		const result = []
		let count = 0

		return new Promise((resolve, reject) => {
			if (promises.length === 0) resolve(result)
			promises.forEach((promise, index) => {
				Promise.resolve(promise).then(res => {
					result[index] = res
					count++
					if (count >= promises.length) {
						resolve(result)
					}
				}, reject)
			})
		})
	}

	static allSettled(promises) {
		if (promises.length === 0) resolve(result)
		promises = [...promises]
		const result = []
		let count = 0
		return new Promise((resolve, _) => {
			promises.forEach((promise, index) => {
				Promise.resolve(promise).then(
					value => {
						result[index] = {
							status: FULFILLED,
							value
						}
					},
					reason => {
						result[index] = {
							status: REJECTED,
							value: reason
						}
					}
				).finally(() => {
					count++
					if (count === promises.length) {
						resolve(result)
					}
				})
			});
		})
	}

	static any(promises) {
		promises = [...promises]
		let settled = false
		if (promises.length === 0) {
			return Promise.reject(new AggregateError([], ''))
		}
		const onRejected = []
		let result
		let count = 0
		return new Promise((resolve, reject) => {
			promises.forEach((promise) => {
				Promise.resolve(promise).then(
					(value) => {
						if (!settled) {
							settled = true
							resolve(value)
						}
					},
					reason => {
						onRejected.push(reason)
						if (++count == promises.length && !settled) {
							settled = true
							reject(new AggregateError(onRejected, 'All were rejected'))
						}
					}
				)
			});
		})
	}

	static race(promises) {
		promises = [...promises];
		if (promises.length === 0) {
			return new Promise(() => {});
		}

		let settled = false;
		return new Promise((resolve, reject) => {
			for (const promise of promises) {
				Promise.resolve(promise).then(
					value => {
						if (!settled) {
							settled = true;
							resolve(value);
						}
					},
					reason => {
						if (!settled) {
							settled = true;
							reject(reason);
						}
					}
				)
			}
		})
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			this.#handlers.push(() => {
				try {
					const cb = this.#state === FULFILLED ? onFulfilled : onRejected
					const res = typeof cb === 'function' ? cb(this.#value) : this.#value
					if (isPromiseLike(res)) {
						res.then(resolve, reject)
						return
					}
					resolve(res)
				}
				catch (err) {
					reject(err)
				}

			}
			)
			this.#runTask()
		})
	}

	catch(onRejected) {
		return this.then(null, onRejected)
	}

	finally(onFinally) {
		return this.then(
			res => {
				onFinally()
				return res
			},
			err => {
				onFinally()
				throw err
			}
		)
	}
}

MyPromise.reject(221).then(null, err => {
	console.log(err, 'err');

})