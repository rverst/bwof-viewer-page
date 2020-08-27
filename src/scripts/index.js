import '../styles/index.scss';
import Slideshow from "./slideshow";

document.baseUrl = '../';
if (process.env.NODE_ENV === 'development') {
  require('../index.html');
  //document.baseUrl = 'mock';
  document.baseUrl = 'http://localhost:8000/';
  //document.baseUrl = 'https://bwof.rverst.dev/';
}

console.log('Benni\'s Wall of Fame');
const slideshow = new Slideshow();
