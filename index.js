const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let keys = {};
addEventListener("keydown",e=>{keys[e.key]=true;});
addEventListener("keyup",e=>{keys[e.key]=false;});

let pacman = {
    x: 0,
    y: 0,
    w: 20,
    h: 20,
    dir: 1,
    speed: 2,
}
let queued = "";

function wait(secs) {
    return new Promise(resolve => setTimeout(resolve,secs));
}

function drawImage(context, img, x, y, width, height, angle) {
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(angle);
    context.translate(- x - width / 2, - y - height / 2);
    context.drawImage(img, x, y, width, height);
    context.restore();
}

function pacmanBehavior() {
    if(keys["ArrowUp"] && pacman.dir !== 0){
        if(pacman.x === Math.floor(pacman.x / pacman.w)*pacman.w) {
            pacman.dir = 0;
        } else {
            queued = "up";
        }
    }
    if(keys["ArrowRight"] && pacman.dir !== 1){
        if(pacman.y === Math.floor(pacman.y / pacman.h)*pacman.h) {
            pacman.dir = 1;
        } else {
            queued = "right";
        }
    }
    if(keys["ArrowDown"] && pacman.dir !== 2){
        if(pacman.x === Math.floor(pacman.x / pacman.w)*pacman.w) {
            pacman.dir = 2;
        } else {
            queued = "down";
        }
    }
    if(keys["ArrowLeft"] && pacman.dir !== 3){
        if(pacman.y === Math.floor(pacman.y / pacman.h)*pacman.h) {
            pacman.dir = 3;
        } else {
            queued = "left";
        }
    }
    switch (pacman.dir) {
        case 0:
            pacman.y-=pacman.speed;
            if(pacman.y < 0)pacman.y = (canvas.height - pacman.h);
            if(pacman.y === Math.floor(pacman.y / pacman.h)*pacman.h) {
                switch (queued) {
                    case "up":
                        pacman.dir = 0;
                        break;
                    case "right":
                        pacman.dir = 1;
                        break;
                    case "down":
                        pacman.dir = 2;
                        break;
                    case "left":
                        pacman.dir = 3;
                        break;
                    default:
                        break;
                }
                queued = "";
            }
            break;
        case 1:
            pacman.x+=pacman.speed;
            if(pacman.x > (canvas.width - pacman.w))pacman.x = 0;
            if(pacman.x === Math.floor(pacman.x / pacman.w)*pacman.w) {
                switch (queued) {
                    case "up":
                        pacman.dir = 0;
                        break;
                    case "right":
                        pacman.dir = 1;
                        break;
                    case "down":
                        pacman.dir = 2;
                        break;
                    case "left":
                        pacman.dir = 3;
                        break;
                    default:
                        break;
                }
                queued = "";
            }
            break;
        case 2:
            pacman.y+=pacman.speed;
            if(pacman.y > (canvas.height - pacman.h))pacman.y = 0;
            if(pacman.y === Math.floor(pacman.y / pacman.h)*pacman.h) {
                switch (queued) {
                    case "up":
                        pacman.dir = 0;
                        break;
                    case "right":
                        pacman.dir = 1;
                        break;
                    case "down":
                        pacman.dir = 2;
                        break;
                    case "left":
                        pacman.dir = 3;
                        break;
                    default:
                        break;
                }
                queued = "";
            }
            break;    
        case 3:
            pacman.x-=pacman.speed;
            if(pacman.x < 0)pacman.x = canvas.height - pacman.h;
            if(pacman.x === Math.floor(pacman.x / pacman.h)*pacman.h) {
                switch (queued) {
                    case "up":
                        pacman.dir = 0;
                        break;
                    case "right":
                        pacman.dir = 1;
                        break;
                    case "down":
                        pacman.dir = 2;
                        break;
                    case "left":
                        pacman.dir = 3;
                        break;
                    default:
                        break;
                }
                queued = "";
            }
            break;
    }
}

function render() {
    pacmanBehavior();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < Math.round(canvas.width / pacman.w);i++) {
        for(let j = 0; j < Math.round(canvas.height / pacman.h);j++) {
            ctx.strokeRect(i*pacman.w,j*pacman.h,pacman.w,pacman.h)
        }
    }
    drawImage(ctx,document.getElementById("pacman"),pacman.x,pacman.y,pacman.w,pacman.h,((pacman.dir - 1) * 90)*(Math.PI/180));
}

async function update() {
    render();
    draw();
    await wait(10);
    requestAnimationFrame(update);
}
update();