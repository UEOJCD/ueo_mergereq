const canvas = document.querySelector("canvas#c1");
const canvas2 = document.querySelector("canvas#c2");
//const canvas3 = document.querySelector("canvas#c3");
//const canvas4 = document.querySelector("canvas#c4");

const originX = 100;
const originY = 100;

const sqrt3 = Math.sqrt(3);

const size = 30;

/*
 gestion de la sélection

 la selection est approximative : elle est juste sur le centre des hexagones, et elle est approchée sur la pointe haute et basse de l'hexagone

 l'hexagone est "approché" par un rectangle
 */
document.addEventListener('mousemove', move);

function move(e) {
    const x = e.pageX - originX;
    const y = e.pageY - originY;
    if (x < 0 || y < 0 || x > 20*sqrt3*size || y > 30*size) return;
    const ii = Math.floor((y - size/2)/(size*3));
    const jj = Math.floor((x - sqrt3*size*(ii%2))/(sqrt3*2*size));
    drawHTable(ctx,10, 10, colors, ii, jj, true);
}

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

const colors = ['red', 'yellow', 'cyan', 'limegreen'];
const colors2 = ['lightgray', 'lightgray', 'lightgray', 'lightgray'];

drawHTable(ctx,10, 10, colors, null, null,true);
drawHTable(ctx2,10, 10, colors2, null, null, false);


/*
 dessiner une table hexagonale entière
 */
function drawHTable(context, w, h, colors, ii, jj, withText) {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const c = colors[j%2 + 2*(i%2)];
            const x = originX + 2*size*sqrt3*j + (i%2)*sqrt3*size;
            const y = originY + i*3*size;
            const text = (withText ? `${j}:${i}` : "");
            if (i === ii && j === jj) drawHex(context, x, y, size, 'black', text);
            else drawHex(context, x, y, size, c, text);
        }
    }
}

/*
 dessiner un hexagone et afficher le numéro de case
 */
function drawHex(ctx, ox, oy, size, color, text) {
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.strokeWidth = 3;
    ctx.beginPath();
    ctx.moveTo(ox + sqrt3*size, oy);
    ctx.lineTo(ox + 2*sqrt3*size, oy+size);
    ctx.lineTo(ox + 2*sqrt3*size, oy+3*size);
    ctx.lineTo(ox + sqrt3*size, oy+4*size);
    ctx.lineTo(ox, oy+3*size);
    ctx.lineTo(ox, oy+size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = '24px serif';
    ctx.fillText(text, ox+size+6, oy+6+2*size);    
}