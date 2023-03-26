// 控制并发执行的请求数


function pLimit(limit) {
    const queue = [];
    let count = 0;


    const next = () => {
        count--;

        if (queue.length > 0) {
            queue.shift()();
        }
    };

    const run = async (fn, resolve, args) => {
        count++;

        const result = (async () => fn(...args))();

        resolve(result);

        try {
            await result;
        } catch { }

        next();
    };

    const enqueue = (asyncTask, args, resolve) => {
        queue.push(run.bind(undefined, asyncTask, resolve, args));
        console.log(111);

        (async () => {
            // This function needs to wait until the next microtask before comparing
            // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
            // when the run function is dequeued and called. The comparison in the if-statement
            // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.

            await Promise.resolve();
            if (count < limit && queue.length > 0) {
                queue.shift()();
            }
        })();
    }


    const generator = (asyncTask, ...args) => new Promise((resolve) => {
        enqueue(asyncTask, args, resolve);
    });

    return generator;
}

const limit = pLimit(2);

const input = [];
for (let i = 0; i < 10; i++) {
    input.push(limit(() => new Promise((resolve) => {
        setTimeout(() => {
            resolve(i);
        }, 1000);
    })));
}

// Only one promise is run at once
(async () => {
    const result = await Promise.all(input);
    console.log(result);
})();