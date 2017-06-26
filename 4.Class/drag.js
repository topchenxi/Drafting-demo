class Drag {
    constructor(selector) {
        this.elem = typeof selector == 'Object' ? selector : document.querySelector(selector);
        this.startPosition = {};
        this.elemPosition = {};
        this.init();
    }
    getStyle(property) {
        return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(this.elem, false)[property] : this.elem.currentStyle[property];
    }
    getPos() {
        let pos = { x: 0, y: 0 },
            transformValue = this.getStyle('transform');
        if (transformValue !== 'none') {
            let array = transformValue.match(/-?\d+/g);
            pos.x = parseInt(array[4].trim());
            pos.y = parseInt(array[5].trim());
        }
        return pos;
    }
    setPos(pos) {
        this.elem.style['transform'] = 'translate(' + pos.x + 'px, ' + pos.y + 'px)';
    }


    init() {
        this.elem.addEventListener('mousedown', start, false);

        var self = this;

        function start(event) {
            self.startPosition = {
                x: event.pageX,
                y: event.pageY
            }
            let pos = self.getPos();
            self.elemPosition = Object.assign({}, pos);
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', end, false);
        }

        function move(event) {
            let currentPosition = {
                x: event.pageX,
                y: event.pageY
            };
            self.setPos({
                x: (self.elemPosition.x + (currentPosition.x - self.startPosition.x)).toFixed(),
                y: (self.elemPosition.y + (currentPosition.y - self.startPosition.y)).toFixed()
            })
        }

        function end(event) {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', end);
        }
    }
}

new Drag('#demo1');

new Drag('#demo2');