import Api from "./api";
import {elementChildId, elementId} from "./utils";

export default class Slideshow {
    constructor() {
        this.api = new Api();
        this.showIndex = -1;
        this.timeout = 30 * 1000;

        document.addEventListener('keypress', (e) => {
            if (e.code === 'KeyN') {
                this.fwd();
            } else if (e.code === 'KeyQ') {
                this.stop();
            } else if (e.code === 'KeyS') {
                this.start(true);
            } else if (e.code === 'Period') {
                if (this.timeout < 120000) {
                    this.timeout += 1000;
                    this.stop();
                    this.start(false);
                }
            } else if (e.code === 'Comma') {
                if (this.timeout > 0){
                    this.timeout -= 1000;
                    this.stop();
                    this.start(false);
                }
            } else {
                //console.info(e.code);
            }
        });

        document.addEventListener('click', () => {
            this.fwd();
        });

        this.elements = this.api.load().then(elements => {
            this.elements = elements;
            this.loadIndex = 0;
            //console.log(`loaded ${elements.length} items`);
            this.preloadElements(this.elements.length < 10 ? this.elements.length : 10);
            window.setTimeout(() => this.start(true), 250);
        }).catch(reason => {
            console.warn("loading failed", reason);
        });

    }

    api;
    elements;
    showIndex;
    loadIndex;
    timer;
    timeout;

    start(direct) {
        //console.log(`start slideshow (${direct}, ${this.timeout})`);
        this.timer = window.setInterval(() => this.next(), this.timeout);
        if (direct) {
            this.next();
        }
    }

    stop() {
        //console.log('stop slideshow');
        if (this.timer !== undefined) {
            window.clearInterval(this.timer);
            this.timer = undefined;
        }
    }

    fwd() {
        let wasStarted = false;
        if (this.timer !== undefined) {
            wasStarted = true;
            this.stop();
        }
        this.next();
        if (wasStarted) {
            this.start(false);
        }
    }

    next() {

        let ce = document.getElementById(elementId(this.showIndex));
        this.showIndex++;
        if (this.showIndex >= this.elements.length) {
            this.showIndex = 0;
        }

        let ne = document.getElementById(elementId(this.showIndex));
        let im = document.getElementById(elementChildId(this.showIndex, 'img'));
        let tx = document.getElementById(elementChildId(this.showIndex, 'innerWrap'));

        if (ce !== null) {
            ce.classList.add('slide-out');
        }

        ne.classList.remove('prep');
        if (tx !== null) {
          if (this.elements[this.showIndex].text.length > 0) {
            tx.classList.add('gradient');
          }
          tx.classList.remove('invisible');
        }
        if (im !== null) {
          im.classList.add('ken-burns');
        }
        this.preloadElements(1);
    }

    preloadElements(n) {
        let m = this.loadIndex + n;
        for (let i = this.loadIndex; i < m; i++) {
            if (this.loadIndex >= this.elements.length) {
                this.loadIndex = 0;
            }

            console.log("preload", this.elements[this.loadIndex]);
            if (this.elements[this.loadIndex].type === 1) {
              this.elements[this.loadIndex].createImageDom(this.loadIndex);
            } else {
              this.elements[this.loadIndex].createInstaDom(this.loadIndex);
            }
            this.loadIndex++;
        }
    }
}
