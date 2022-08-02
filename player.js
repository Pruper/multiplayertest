class Player {
    constructor(x, y, health, name, color) {
        this.name = name;
        this.health = health;
        this.x = x;
        this.y = y;
        this.rot = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.uuid = uuidv4();
        this.color = color;
    }

    update(json) {
        this.name = json.name;
        this.health = json.health;
        this.x = json.x;
        this.y = json.y;
        this.rot = json.rot;
        this.xSpeed = json.xSpeed;
        this.ySpeed = json.ySpeed;
        this.uuid = json.uuid;
        this.color = json.color;
    }

    draw() {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = this.color;
        ctx.fillText(this.name, this.x - (ctx.measureText(this.name).width / 2), this.y - 47);

        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("❤ " + this.health, this.x - (ctx.measureText("❤ " + this.health).width / 2), this.y - 32);

        ctx.save();
        let radian = this.rot * Math.PI / 180;
        ctx.translate(this.x, this.y);
        ctx.rotate(radian);

        ctx.fillStyle = this.color;
        ctx.fillRect(PLAYER_SIZE / -2, PLAYER_SIZE / -2, PLAYER_SIZE, PLAYER_SIZE);
        ctx.fillRect(PLAYER_SIZE / -2, PLAYER_SIZE / -2 + (PLAYER_SIZE / 3), PLAYER_SIZE * 1.5, PLAYER_SIZE / 3);

        ctx.restore();
    }
}