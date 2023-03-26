// function throttle(fn = () => { }, delay = 1000) {
//     let last;
//     return (...args) => {
//         const _this = this;
//         const now = Date.now();
//         if (!last || now - last > delay) {
//             fn.apply(_this, args);
//             last = now;
//         }
//     }
// }

function throttle(fn = () => { }, delay = 1000) {
    let timer;
    return (...args) => {
        if (timer) { return; }
        const _this = this;
        timer = setTimeout(() => {
            fn.apply(_this, args);
            timer = null;
        }, delay);
    }
}
const test = throttle((a, b) => {
    console.log(a, b);
}, 1000);

setInterval(() => {
    const now = Date.now();
    test(now, now);
}, 100);