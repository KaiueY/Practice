function promiseAll(promises){
	return new Promise((resolve,reject)=>{
		const result = []
		let count = 0
		promises.forEach((fn,index) => {
			Promise.resolve(fn).then(res=>{
				result[index] = res
				count++
				if(count === promises.length){
					resolve(result)
				}
			}).catch(err=>{
				reject(err)
			})
		});
	})

}