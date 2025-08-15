let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// 返回键
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// 返回值

// red
// green
// blue
// 返回遍历器
for (let item of set.entries()) {
  console.log(item);
}

// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// 利用set 求并集
let set1 = new Set([1,2,4,5])
let set2 = new Set([2,5,8,9])
let u = new Set([...set1,...set2])
let n = new Set([...set1].filter(value => set2.has(value)))
console.log('set1 和 set2 的并集为：',u );
console.log('set1 和 set2 的交集为：',n );

let a = ['foo', 1]
const set3 = new Set([
  a,
  ['bar', 2]
]);
console.log('------------------');

console.log(set3.has(a));

set3.forEach((item)=>{
  console.log(item);
})

// weakSet
// 成员只能是对象和symbol值  为弱引用 当对象不被引用 则会被回收
// 因此 weakSet不能被遍历（随时可能被回收 所以不能被遍历）
