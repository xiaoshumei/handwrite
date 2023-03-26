function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);
    const res = constructor.apply(obj, args);
    return typeof res === 'object' ? res : obj;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
    return {};
    // 如果构造函数内部，return 一个引用类型的对象，则整个构造函数失效，而是返回这个引用类型的对象，而不是返回this
    // 在实例中就没法获取Person原型上的getName方法
}
Person.prototype.say = function () {
    console.log(this.age);
};
let p1 = myNew(Person, "poety", 18);
console.log(p1.name);
console.log(p1);
p1.say();