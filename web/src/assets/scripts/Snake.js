import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject {
    constructor(info, gamemap) {
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        // 存放蛇的身体, cell[0] 存放蛇头
        this.cells = [new Cell(info.r, info.c)];
        // 记录下一步的目的地
        this.next_cell = null;

        // 蛇的速度, 每秒走 5 个格子
        this.speed = 5;

        // 记录下一步的方向 -1 表示无指令, 0,1,2,3 表示上右下左
        this.direction = -1;

        // 记录蛇的状态, idle 表示静止, move 表示正在移动, die 表示死亡
        this.status = "idle"; 
        
        // dr 为行上右下左移动的偏移量, dc 为列上右下左移动的偏移量
        this.dr = [-1, 0, 1, 0];
        this.dc = [0, 1, 0, -1];

        // 记录当前回合数
        this.step = 0;

        // 定义误差, 两个点的坐标相差 0.01, 视为重合
        this.eps = 1e-2;

        // 记录蛇初始运动方向, 渲染蛇眼
        this.eye_direction = 0;
        if (this.id === 1) { this.eye_direction = 2; }

        // 蛇眼睛 不同方向的 x 和 y 的偏移量 
        this.eye_dx = [ 
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
        ];
        this.eye_dy = [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [-1, 1],
        ];
    }

    start () {

    }

    // 定义一个接口, 可以从多种方式接受参数
    set_direction(d) {
        this.direction = d;
    }

    // 检测当前回合, 蛇的长度是否增加
    check_tail_increasing() {
        if (this.step <= 5) { return true; } // 五个回合内一直增加长度
        if (this.step % 3 === 1) { return true; } // 每三个回合增加一个长度
        return false;
    }

    // 将蛇的状态变为走下一步
    next_step() {
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.eye_direction = d; // 记录方向渲染蛇眼
        this.direction = -1; // 清空方向
        this.status = "move"; // 状态变为移动 move 
        this.step++;    // 回合数

        const k = this.cells.length;
        for (let i = k; i > 0; i--) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i-1]));
        }

        if (!this.gamemap.check_vaild(this.next_cell)) {
            this.status = "die";
        }
    }

    update_move() {
        // 转换为毫秒
        // this.cells[0].x += this.speed * this.timedelta / 1000;
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.eps) {
            this.cells[0] = this.next_cell; // 添加一个新蛇头
            this.next_cell = null;
            this.status = "idle"; // 走完停下
            if (!this.check_tail_increasing()) { // 蛇不变长
                this.cells.pop();
            }
        } else {
            const move_distance = this.speed * this.timedelta / 1000; // 每一帧中间走的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if (!this.check_tail_increasing()) {
                const k = this.cells.length;
                const tail = this.cells[k-1], tail_target = this.cells[k-2];
                const tail_dx = tail_target.x - tail.x;
                const tail_dy = tail_target.y - tail.y;
                tail.x += move_distance * tail_dx / distance;
                tail.y += move_distance * tail_dy / distance;
            }
        }
    }

    update () {
        if (this.status === 'move') {
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;

        // 假如蛇已经死了, 变色
        if (this.status === 'die') {
            ctx.fillStyle = 'white';
        }

        // 渲染蛇, 蛇身画圆弧
        for (const cell of this.cells) {
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }

        // 优化蛇的渲染
        for (let i = 1; i < this.cells.length; i ++ ) {
            const a = this.cells[i - 1], b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue;
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y) * L, L * 0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.4) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }

        // 蛇眼设置为黑色
        ctx.fillStyle = 'black';
        for (let i = 0; i < 2; i++) {
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.2) * L ;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.2) * L ;
            ctx.beginPath();
            ctx.arc(eye_x, eye_y, 0.05 * L, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}