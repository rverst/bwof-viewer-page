import {elementChildId, elementId, url} from "./utils";

export class ViewElement {
  constructor(type, title, text, source) {
    this.type = type;
    this.title = title;
    this.text = text;
    this.source = source;
  }

  type;
  title;
  text;
  source;

  createImageDom = (id) => {

    const title = document.createElement('h1');
    title.id = elementChildId(id, 'title');
    title.className = 'title';
    title.innerText = this.title;

    const text = document.createElement('p');
    text.id = elementChildId(id, 'text');
    text.className = 'text';
    text.innerText = this.text;

    const textWrap = document.createElement('div');
    textWrap.id = elementChildId(id, 'innerWrap');
    textWrap.className = 'textWrap invisible';

    textWrap.appendChild(title);
    textWrap.appendChild(text);

    const image = document.createElement('img');
    image.id = elementChildId(id, 'img');

    if (document.baseUrl === 'mock') {
      image.src = this.source;
    } else {
      image.src = url(this.source);
    }

    const imgWrap = document.createElement('div');
    imgWrap.id = elementId(id, 'imgWrap');
    imgWrap.className = 'image-wrap';
    imgWrap.appendChild(image);

    const container = document.createElement('div');
    container.id = elementId(id);
    container.className = 'element prep';
    container.addEventListener('transitionend', () => {

      document.getElementsByClassName('slide-out').forEach((item) => {
        window.setTimeout(() => item.remove(), 1500);
      });

    });
    container.appendChild(imgWrap);
    container.appendChild(textWrap);

    document.body.appendChild(container);
  }

  createInstaDom = (id) => {

    const postWrap = document.createElement('div');
    postWrap.id = elementChildId(id, 'innerWrap');
    postWrap.className = 'instaWrap invisible';
    postWrap.innerHTML = this.text;

    const container = document.createElement('div');
    container.id = elementId(id);
    container.className = 'element prep';
    container.addEventListener('transitionend', () => {

      document.getElementsByClassName('slide-out').forEach((item) => {
        window.setTimeout(() => item.remove(), 1500);
      });

    });
    container.appendChild(postWrap);

    document.body.appendChild(container);
    instgrm.Embeds.process();
  }
}
