const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    // 只执行一次
    start() {

    }

    // 除了第一帧之外, 每一帧执行一次
    update() {

    }

    // 删除之前执行
    on_destory() {

    }

    // 删除
    destory() {
        this.on_destory();
        for (let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i];
            if (obj == this) {
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }

}

// 上一次执行的时刻
let last_timestamp;

/**
 * 在下一帧浏览器刷新渲染之前执行一遍, 递归调用自己
 */
const step = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)