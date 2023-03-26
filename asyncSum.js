function asyncAdd(a, b, cb) {
    setTimeout(() => {
        cb(null, a + b);
    }, 1000);
}
function calc(a, b) {
    return new Promise((resolve, reject) => {
        asyncAdd(a, b, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

async function parallelSum(...args) {
    if (args.length === 1) {
        return args[0];
    }
    const tasks = [];
    for (let i = 0; i < args.length; i += 2) {
        tasks.push(calc(args[i], args[i + 1] || 0));
    }
    return await Promise.all(tasks).then((res) => {
        return parallelSum(...res);
    });
}
async function serialSum(...args) {
    return await args.reduce(async (sum, num) => {
        return calc(await sum, num);
    }, Promise.resolve(0));
}

async function total() {
    console.time('a');
    const res1 = await serialSum(1, 2, 3, 4, 5, 6);
    console.timeEnd('a');
    console.log(res1);
    console.time('b');
    const res2 = await parallelSum(1, 2, 3, 4, 5, 6);
    console.timeEnd('b');
    console.log(res2);
}
(async () => {
    await total();
})();