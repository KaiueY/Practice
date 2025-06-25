/**
 * 原型链
 * - Prototype 原型｜原型对象
 * 1. Prototype时函数的一个属性
 * 2. 他是一个对象
 * 3. 当创建函数时默认添加Prototype属性
 * 
 * __proto__ 
 * 1.对象的属性
 * 2.指向构造函数的prototype
 * 3.obj.__ptoto__ =  foo.prototype
 * foo.prototype.__proto__ = Object.__proto__
 * Object.__proto__
 */

function foo (name){
	this.name = name	
	
}
console.dir(foo)

const obj = new foo('kailin')
console.dir(obj);
