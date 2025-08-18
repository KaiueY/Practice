const obj = {
  name: "Alice",
  age: 30,
  say:()=>console.log("Hello, my name is " + this.name),

};
const p1 = new Proxy(obj,{
    get(target, prop, receiver) {
        console.log('i am get');
        
        console.log(target, prop, receiver);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        console.log('i am set');
        console.log(target, prop, value, receiver);
        Reflect.set(target, prop, value, receiver);
    }
})
p1.name = "Bob"
console.log('p1', p1.name);


