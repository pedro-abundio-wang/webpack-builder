import _ from 'lodash';
import './style.css';
import WebpackIcon from './webpack.png';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('red');
  const image = new Image();
  image.src = WebpackIcon;
  element.appendChild(image);
  return element;
}

document.body.appendChild(component());
