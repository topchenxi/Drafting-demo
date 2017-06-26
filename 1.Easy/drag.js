let elem = document.querySelectorAll('#demo')[0],
    startPosition = {},
    elemPosition = {};

elem.addEventListener('mousedown', start, false);

function start(event) {
    startPosition = {
        x: event.pageX,
        y: event.pageY
    }
    let pos = getPos(elem);
    elemPosition = Object.assign({}, pos);
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', end, false);
}

function move(event) {
    let currentPosition = {
        x: event.pageX,
        y: event.pageY
    };
    setPos(elem, {
        x: (elemPosition.x + (currentPosition.x - startPosition.x)).toFixed(),
        y: (elemPosition.y + (currentPosition.y - startPosition.y)).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', end);
}

function getStyle(elem, property) {
    // ie (currentStyle) , other browsers (getComputedStyle)
    return window.getComputedStyle ? window.getComputedStyle(elem, false)[property] : elem.currentStyle[property];
}

function getPos(elem) {
    let pos = { x: 0, y: 0 },
        transformValue = getStyle(elem, 'transform');
    if (transformValue !== 'none') {
        let array = transformValue.match(/-?\d+/g);
        pos.x = parseInt(array[4].trim());
        pos.y = parseInt(array[5].trim());
    }
    return pos;
}

function setPos(elem, pos) {
    elem.style['transform'] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
}