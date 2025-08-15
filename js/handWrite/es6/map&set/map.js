const m = new Map()
m.set('a', 1)
.set('b', 2)
.set('c', 3)
.set('d', 4)
console.log(m);
console.log('------------------');

m.keys().forEach(element => {
    console.log(element);
});
console.log('------------------');
// a b c d
m.values().forEach(element => {
    console.log(element);
});
// 1 2 3 4
console.log('------------------');

m.entries().forEach(element => {
    console.log(element);
});
//[ 'a', 1 ][ 'b', 2 ][ 'c', 3 ][ 'd', 4 ]
console.log('------------------');
m.forEach((element)=>{
    console.log(element);
})
// 1 2 3 4