// import _, { get } from 'lodash'
// import './style.css'
// import './css/index.scss'
// import Icon from './icon.png'
// import printMe from './print.js';
import {cube} from './math.js'
// import axios from 'axios'

// function component() {
//   const element = document.createElement('div')
//   const btn = document.createElement('button');
//   element.innerHTML = _.join(['Hello', 'webpack5'], ' ')
//   element.classList.add('hello')

//   const myIcon = new Image()
//   myIcon.src = Icon
//   element.appendChild(myIcon)
//   btn.innerHTML = 'Click me and check the console!';
//   btn.onclick = printMe;

//   element.appendChild(btn);

//   return element
// }

// document.body.appendChild(component())

// import() 动态导入
// async function getComponent() {
//   const element = document.createElement('div')
//   const { default: _} = await import('lodash')
//   element.innerHTML = _.join(['hello', 'webpack5'], ' ')
//   // element.onclick = printMe.bind(null, 'hello webpack5')
//   return element
// }

// getComponent().then((component) => {
//   document.body.appendChild(component)
// })

function component() {
  const element = document.createElement('div')
  const button = document.createElement('button')
  button.innerHTML = 'click me'
  button.onclick = e => import('./print').then(module => {
    const print = module.default
    print()
  })
  element.innerHTML = [
    'hello webpack',
    '5 cubed is equal to' + cube(5)
  ].join('\n\n')
  element.appendChild(button)
  return element
}

document.body.appendChild(component())

// axios 跨域请求
axios.get('api/xyx/info').then(res=> {
  console.log(res)
})