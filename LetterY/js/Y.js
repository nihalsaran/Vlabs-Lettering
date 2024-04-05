
var data = {
    canvas: null,
    ctx: null,
    clickedDot: null,
    dots: [{ x: 175, y: 300 }, // 1
        { x: 250, y: 100 }, // 2
        { x: 100, y: 100 }, // 3
        { x: 175, y: 200 }, // 4
       //  { x: 250, y: 200 }, // 5
       //  { x: 250, y: 300 } // 6
] 
};

var connectedDots = [];

function circleCollision(c1, c2) {
    var a = c1.r + c2.r,
        x = c1.x - c2.x,
        y = c1.y - c2.y;

    if (a > Math.sqrt((x * x) + (y * y))) return true;
    else return false;
}

function prepCanvas() {
    var res = window.devicePixelRatio || 1,
        scale = 1 / res;
    data.canvas = document.getElementById('dots');
    data.ctx = data.canvas.getContext('2d');

    data.canvas.width = window.innerWidth * res;
    data.canvas.height = window.innerHeight * res;
    data.canvas.style.width = window.innerWidth + 'px';
    data.canvas.style.height = window.innerHeight + 'px';

    data.ctx.scale(res, res);

    data.canvas.addEventListener('mousedown', function (e) {
        connectDots(e);
    });
}

function drawDots() {
    var i = 0;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i];
        data.ctx.beginPath();
        data.ctx.arc(d.x, d.y, 10, 0, 2 * Math.PI);
        data.ctx.fillStyle = '#777';
        data.ctx.fill();
        data.ctx.closePath();

        // Draw labels
        data.ctx.fillStyle = '#000';
        data.ctx.font = '12px Arial';
        data.ctx.textAlign = 'center';
        data.ctx.fillText('Point ' + (i + 1), d.x, d.y - 15);
    }
}

function drawLine(fromDot, toDot) {
    data.ctx.beginPath();
    data.ctx.moveTo(fromDot.x, fromDot.y);
    data.ctx.lineTo(toDot.x, toDot.y);
    data.ctx.lineWidth = 5;
    data.ctx.strokeStyle = '#777';
    data.ctx.stroke();
    data.ctx.closePath();
}

function connectDots(e) {
    var i = 0, col = null;
    for (; i < data.dots.length; i++) {
        var d = data.dots[i],
            c1 = { x: d.x, y: d.y, r: 10 },
            c2 = { x: e.pageX, y: e.pageY, r: 10 };
        if (circleCollision(c1, c2)) col = d;
    }
    if (col !== null) {
        if (data.clickedDot !== null) {
            connectedDots.push(data.clickedDot);
            drawLine(data.clickedDot, col);
            data.clickedDot = col;
        } else {
            data.clickedDot = col;
        }
    } else data.clickedDot = null;
}

prepCanvas();
drawDots();