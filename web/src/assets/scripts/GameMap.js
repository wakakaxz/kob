// export default 的情况不需要花括号, 其他都需要
import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    // ctx 为画布, parent 为画布父元素(动态修改画布长宽)
    constructor(ctx, parent, store) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        // 相对距离单位
        this.L = 0;

        // 正方形可能出现平局的情况, 两条蛇同一时间会到达一个格子
        this.rows = 13;
        this.cols = 14;

        // 保存墙
        this.walls = [];
        // 内部墙的数量
        this.inner_walls_count = 20;

        // 两条蛇头起始坐标
        this.snakes = [
            new Snake({ id: 0, color: '#4876EC', r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: '#F94848', r: 1, c: this.cols - 2 }, this)
        ];
    }

    // 创建墙
    create_walls() {
        const g = this.store.state.pk.gamemap;

        // 生成墙
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
    }

    add_listening_events() {
        // 聚焦
        this.ctx.canvas.focus();
        const [snake0, snake1] = this.snakes;

        // 监听前端操作
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') { snake0.set_direction(0); }
            else if (e.key === 'd') { snake0.set_direction(1); }
            else if (e.key === 's') { snake0.set_direction(2); }
            else if (e.key === 'a') { snake0.set_direction(3); }
            else if (e.key === 'ArrowUp') { snake1.set_direction(0); }
            else if (e.key === 'ArrowRight') { snake1.set_direction(1); }
            else if (e.key === 'ArrowDown') { snake1.set_direction(2); }
            else if (e.key === 'ArrowLeft') { snake1.set_direction(3); }
        });
    }

    start() {
        this.create_walls();
        this.add_listening_events();
    }

    update_size() {
        // parseInt 是为了消除白缝隙
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    // 判断两条蛇是否准备就绪
    check_ready() {
        for (const snake of this.snakes) {
            if (snake.status !== "idle") {
                return false;
            }
            if (snake.direction === -1) {
                return false;
            }
        }
        return true;
    }

    // 让两条蛇进入下一个回合
    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    // 检测某个格子是否合法
    check_vaild(cell) {
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c) {
                return false;
            }
        }
        // 判断撞蛇
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) { 
                k--;
            }
            for (let i = 0; i < k; i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) {
                    return false;
                }
            }
        }
        return true;
    }

    update() {
        this.update_size(); 
        if(this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    render() {
        const color_even = '#AAD751';
        const color_odd = '#A2D149';

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 === 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}