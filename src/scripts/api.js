import {ViewElement} from "./models";
import {randomText, randomTitle} from "./generator";
import {url} from "./utils";

export default class Api {
    constructor() {
    }

    load = () => {
        if (document.baseUrl === 'mock') {
            return new Promise((resolve) => {
                let delay = Math.floor(Math.random() * 800) + 50;
                setTimeout(() => {
                    const elements = new Array(100);
                    for (let i = 0; i < elements.length; i++) {

                        const src = 1 === 0 ? 'https://via.placeholder.com/1200x1920'
                            : 'https://picsum.photos/1920/1080?random=' + i;

                        elements[i] = new ViewElement(randomTitle(),
                            randomText(), src);
                    }
                    resolve(elements);
                }, delay);
            });
        } else {
          return new Promise((resolve, reject) => {

            fetch(url('api/list'))
              .then(response => response.json())
              .then(data => {
                const elements = [];
                data.forEach(d => {
                  elements.push(new ViewElement(d.type, d.title, d.text, d.url));
                });
                resolve(elements);
              })
              .catch(err => reject(err));
          });
        }
    }
}
