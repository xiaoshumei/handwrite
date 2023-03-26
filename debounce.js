/**
 * 防抖动
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} immediate 
 * @returns 
 */
function debounce(fn, delay, immediate) {
    let timer = null;
    return (...args) => {
        const _this = this;
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, delay);
    }
}

// const test = () => {
//     console.log(1)
// }
const test = debounce((name) => {
    console.log(name);
}, 2000);
test(1);
test(2);
test(3);
test(4);
test(5);