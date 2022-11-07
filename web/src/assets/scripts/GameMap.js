// export default 的情况不需要花括号, 其他都需要
import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    // ctx 为画布, parent 为画布父元素(动态修改画布长宽)
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        // 相对距离单位
        this.L = 0;

        this.rows = 13;
        this.cols = 13;

        // 保存墙
        this.walls = [];
        // 内部墙的数量
        this.inner_walls_count = 20;

    }

    // 判断两蛇初始点是否联通
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) {
            return true;
        }

        g[sx][sy] = true;

        // 上右下左 四个方向
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
                return true;
            }
        }
        return false;
    }

    // 创建墙, 创建之后需要判断两条蛇的初始位置是否能联通
    create_walls() {
        const g = [];
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }
        // 四周的墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) {
                    continue;
                }
                // 蛇的出生点, 不能障碍物刷新到蛇脸上, 不然直接就死了
                if ((r == this.rows - 2 && c == 1) || (r == 1 && c == this.cols - 2)) {
                    continue;
                }
                g[r][c] = g[c][r] = true;
                break;
            }
        }

        // 生成墙
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
        
        const copy_g = JSON.parse(JSON.stringify(g));
        // 判断连通性
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) {
            return false;
        }

        return true;
    }

    start() {
        for (let i = 0; i < 100000; i++) {
            if (this.create_walls()) {
                break;
            }
        }
    }

    update_size() {
        // parseInt 是为了消除白缝隙
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {
        const color_even = '#AAD751';
        const color_odd = '#A2D149';

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}