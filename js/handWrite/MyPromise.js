const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 兼容性微任务调度器
 * @param {Function} fn 微任务回调
 */
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

/**
 * 判断对象是否为 Promise-like
 * @param {*} val 
 * @returns {boolean}
 */
function isPromiseLike(val) {
	return typeof val?.then === 'function'
}
class MyPromise {
	#state = PENDING
	#value
	#handlers = []

	/**
	 * 构造函数，接收执行器函数
	 * @param {Function} exercutor 
	 */
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

	/**
	 * 内部方法，设置状态和值
	 * @param {string} state 
	 * @param {*} value 
	 */
	#setState(state, value) {
		if (this.#state !== PENDING) return
		this.#state = state
		this.#value = value
		this.#runTask()
	}

	/**
	 * 内部方法，执行所有回调
	 */
	#runTask() {
		runMicrotask(() => {
			if (this.#state !== PENDING) {
				this.#handlers.forEach(handler => handler())
				this.#handlers = []
			}
		})

	}

	/**
	 * 返回一个已解决的 Promise
	 * @param {*} val 
	 * @returns {Promise}
	 */
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

	/**
	 * 返回一个已拒绝的 Promise
	 * @param {*} reason 
	 * @returns {Promise}
	 */
	static reject(reason) {
		return new Promise((_, reject) => {
			reject(reason)
		})
	}

	/**
	 * 尝试执行一个函数并返回 Promise
	 * @param {Function} func 
	 * @param  {...any} args 
	 * @returns {Promise}
	 */
	static try(func, ...args) {
		return new Promise((resolve) => {
			resolve(func(...args))
		})
	}

	/**
	 * 等待所有 Promise 完成，全部成功才 resolve
	 * @param {Array<Promise>} promises 
	 * @returns {Promise}
	 */
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

	/**
	 * 等待所有 Promise 都 settle（无论成功或失败）
	 * @param {Array<Promise>} promises 
	 * @returns {Promise}
	 */
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

	/**
	 * 任意一个 Promise 成功就 resolve，否则全部失败才 reject
	 * @param {Array<Promise>} promises 
	 * @returns {Promise}
	 */
	static any(promises) {
		promises = [...promises]
		let settled = false
		if (promises.length === 0) {
			return Promise.reject(new AggregateError([], ''))
		}
		const onRejected = []
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

	/**
	 * 谁先 settle（成功或失败）就返回谁的结果
	 * @param {Array<Promise>} promises 
	 * @returns {Promise}
	 */
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

	/**
	 * 注册成功/失败回调，返回新的 MyPromise
	 * @param {Function} onFulfilled 
	 * @param {Function} onRejected 
	 * @returns {MyPromise}
	 */
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

	/**
	 * 注册失败回调，返回新的 MyPromise
	 * @param {Function} onRejected 
	 * @returns {MyPromise}
	 */
	catch(onRejected) {
		return this.then(null, onRejected)
	}

	/**
	 * 注册 finally 回调，无论成功或失败都会执行
	 * @param {Function} onFinally 
	 * @returns {MyPromise}
	 */
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

// 测试用例
MyPromise.reject(221).then(null, err => {
	console.log(err, 'err');
})
