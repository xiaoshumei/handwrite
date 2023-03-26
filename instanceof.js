function _instanceof(instance, target) {
    if ((typeof instance !== 'object' && typeof instance !== 'function') || instance === null) { // instanceof不能判断基本数据类型，直接返回false
        return false;
    }
    let next = instance.__proto__;
    while (next) {
        if (next === target.prototype) {
            return true;
        }
        next = next.__proto__;
    }
    return false;
}
console.log(_instanceof(() => { }, Function));