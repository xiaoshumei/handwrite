
class Scheduler {
    constructor(limit) {
        this.limit = limit;
        this.queue = [];
        this.runList = [];
        this.count = 0;
    }

    taskStart() {
        while (this.count < this.limit && this.queue.length) {
            this.queue.shift()();
            this.count++;
        }
    }
    addTask(timeout, returnValue) {
        this.queue.push(() => {
            setTimeout(() => {
                console.log(returnValue);
                this.count--;
                this.taskStart();
            }, timeout);
        });

    }
}

const scheduler = new Scheduler(3);
scheduler.addTask(1000, "1");
scheduler.addTask(500, "2");
scheduler.addTask(300, "3");
scheduler.addTask(400, "4");
scheduler.taskStart();