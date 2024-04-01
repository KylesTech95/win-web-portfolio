import threeMod from './three.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three';
let c = 0;
let d = 0;
// let resizeFn = false;
const exit = document.querySelector('#exit-container')
const middleLine = document.querySelector('.midline')
middleLine.style = `top: ${screen.height/2}px`
const body = document. querySelector('body')
const canvas = document.querySelector('.three-canvas')
const space = document.querySelectorAll('.space')
const daddys = document.querySelectorAll('.daddy')
const nav = document.querySelector('#nav-container1')
const allLang = document.querySelectorAll('.languages-list-item')
const nav_container = document.querySelector('#nav-list-container')
const items = document.querySelectorAll('.nav-list-item')
const counterElem = document.querySelector('.side')
const contents = document.querySelectorAll('.content-mod')
const calculator = document.querySelector('.calc')
const calcActual = document.querySelector('.calc-actual')
const current_date = new Date().toDateString();
const current_local = new Date().toLocaleTimeString();
const timeElem = document.querySelector('.clock')
const indicator = document.querySelector('.indicator-scroll-down');
indicator.style.left = document.body.width/2

const notes = document.querySelector('.notes-html')
const n_icon = document.querySelector('.notes-icon')

console.log(notes)
let languages = [...allLang]
for(let i = 0; i < languages.length; i++){
    if(i%2==0){
        languages[i].style = `transform:translate(0,50px)`
    }
    else{
        languages[i].style = `transform:translate(0,-50px)`
    }
}
// console.log(current_date)
// console.log(current_local)

// setup time in navigation
const modTime = (time) => {
let arr = time.split` `;
arr[0] = arr[0].slice(0,-3)
return arr.join` `
}
timeElem.textContent=modTime(current_local)
if(body.clientWidth <= 890){
    //refresh calculator-icon classes by disgarding desktop classes for appearance
    calculator.classList.add('hidden')
}


counterElem.style='opacity:0'
let bg
const mobileBtn = document.querySelector('.btn-toggle')
let control = false;
mobileBtn.onclick = () => {
    if(control==false){
        control = true;
        let one = mobileBtn.children[0]
        let two = mobileBtn.children[1]
        one.classList.add('appear-toggle')
        two.classList.add('retreat-toggle')
        two.classList.remove('appear-toggle')
        one.classList.remove('retreat-toggle')
    }
    else{
        control = false;
        let one = mobileBtn.children[0]
        let two = mobileBtn.children[1]
        one.classList.remove('appear-toggle')
        two.classList.remove('retreat-toggle')
        two.classList.add('appear-toggle')
        one.classList.add('retreat-toggle')
    }
}
   
// hr mouseover
let currentDisplay = {
    canvas:false,
    not_canvas:true
}

const bgDrive = () => {
    if(document.body.clientWidth <= 890){
        calculator.style=`
        position:absolute;
        top:500px;
        left:25px;
        transform:scale(2);
        display:block;
        `
    }
    setTimeout(()=>{
        if(canvas.classList.contains('hidden')){
        canvas.classList.remove('hidden')
        canvas.classList.add('appear')
        }
    },250)

threeMod(THREE,body,canvas,OrbitControls)
}
bgDrive();
const allElements = document.querySelectorAll('*')
const footer = document.querySelector('footer')
let w = ((Math.floor(document.body.clientWidth/2))) 

const disableElements = () => {
  
    counterElem.style='opacity:1'
    allElements.forEach(el =>{
        let tag = el.tagName
        return /(div|nav|section|footer)/i.test(tag) ? el.style='visibility:hidden' : el.style='visibility:visbile'
    })
}
const enableElements = () => {
let calcClass = "position:absolute;top:0;left:0;z-index:999;"
let calcClassSm = `z-index:999;
                position:fixed;
                width:100%; 
                transform:translate(250px,250px);
`
c=0;

    allElements.forEach(el => {
        if(el== timeElem&&body.clientWidth<=890){
            el.style=`
            position:absolute;
            top:320px;
            right:0px;
            border:none;
             `
        }
        
        else if(el==calcActual){
            if(body.clientWidth>890){
                el.style=calcClass;
            }
            else{
                el.style=calcClassSm;
            }
        }
        else if(el.classList.contains('languages-list-item')){
            for(let i = 0; i < allLang.length; i++){
                if(i%2==0){
                    allLang[i].style = `transform:translate(0,50px)`
                }
                else{
                    allLang[i].style = `transform:translate(0,-50px)`
                }
            }
        }
        else if(el==calculator&&body.clientWidth<=890){
            calculator.style=`
            position:absolute;
            top:500px;
            left:25px;
            transform:scale(2);
            display:block;
        `}
        else if(el.classList.contains('.divider')){
            el.style=`margin-top:1rem;`
        }
        else if(el.classList.contains('kyle')){
            el.style=`
            color:ghostwhite;
            font-size:22px;
            `
        }
        else{
            el.style = `visibility:visible;`
        }
        counterElem.style='opacity:0'
        middleLine.style = `top: ${screen.height/2}px`
    })
}
const bringElementsBack=()=>{
    currentDisplay.canvas = false;
    currentDisplay.not_canvas = true;
    enableElements()
}
let timer;
let interval;
let start = 0;
let side_counter = 5;
let track = []
let dropTimer;
let hoverCount = 4;

// helper function that can detect the same mouse position in a given time
const fiveInARow = (arr,coord) => arr.slice(-5).every(obj => obj.x===coord.x&&obj.y===coord.y)
window.addEventListener('mousemove',e=>{
        clearInterval(interval)
        let page = {x:e.pageX,y:e.pageY}
        side_counter=5
        counterElem.textContent = side_counter

    if(currentDisplay.canvas==true){
            track.push(page);
            let last = track[track.length-1]
            // start the interval
            interval = setInterval(()=>{
                side_counter--
                counterElem.textContent = side_counter
                track.push([page.x,page.y])
                start+=1
                // console.log(start)
                // console.log(track)

                if(fiveInARow(track,{x:last[0],y:last[1]})){
                    start = 0;
                    side_counter=3
                    counterElem.textContent = side_counter
                    bringElementsBack()
                    clearInterval(interval)
                    track=[]
                    // floatingMess.classList.remove('hidden')
                    // floatingMess.classList.add('appear')
                    

                }
            },500)
        }

})
// mouseover hover
space.forEach(header =>{
    let para = header.children[0]

    header.addEventListener('mouseover',e=>{
        // console.log('time-started')
        e.target.classList.remove('reg-space')
        e.target.classList.add('open-space')
         timer = setInterval(()=>{
            hoverCount-- //countdown on hover
            para.textContent = hoverCount
            // console.log(hoverCount)
            if(hoverCount<1){
                clearInterval(timer)
                disableElements()
                hoverCount=4
                currentDisplay.canvas = true;
                currentDisplay.not_canvas = false;
            }
        },500)
    })
    header.addEventListener('mouseleave',e=>{
        e.target.classList.add('reg-space')
        e.target.classList.remove('open-space')
        // console.log('time-ended')
        hoverCount=4;
        para.textContent = ''
       clearInterval(timer)

    })
})
// mobile view
if(body.clientWidth <= 890){
    if(currentDisplay.not_canvas==true){// && resizeFn !== true
        const dropNav = () => {
            nav.classList.remove('base')
            nav.classList.add('regular')
            calculator.classList.add('appear')
            calculator.classList.remove('hidden')
            nav_container.classList.remove('hideItems')
            nav_container.classList.add('showItems')
            
            items.forEach((item,i)=>{
                    item.classList.remove('hideItems')
                    item.classList.add('showItems')
                    item.children[0].classList.add('showItems')
                    item.children[0].classList.remove('hideItems')
            })
    
        }
        const hideNav = () => {
            clearTimeout(dropTimer)
            nav.classList.add('base')
            nav.classList.remove('regular')
            calculator.classList.remove('appear')
            calculator.classList.add('hidden')
            nav_container.classList.add('hideItems')
            nav_container.classList.remove('showItems')
            timeElem.classList.add('calc-hidden')
            timeElem.classList.remove('calc-appear')
            items.forEach((item,i)=>{
            item.classList.remove('showItems')
            item.classList.add('hideItems')
            item.children[0].classList.remove('showItems')
            item.children[0].classList.add('hideItems')
        })
      }
        window.addEventListener('scroll',e=>{
            let tY = window.scrollY;
            if(tY>=document.body.getBoundingClientRect().x){
                dropNav()
                indicator.classList.add('hidden')
                indicator.classList.remove('appear')
                calculator.classList.remove('hidden')
                calculator.classList.add('appear')
                timeElem.classList.remove('calc-hidden')
                timeElem.classList.add('calc-appear')
            }
            if(tY<=document.body.getBoundingClientRect().x){
                hideNav()
                indicator.classList.add('appear')
                indicator.classList.remove('hidden')
                calculator.classList.add('hidden')
                calculator.classList.remove('appear')
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
                timeElem.classList.add('calc-hidden')
                timeElem.classList.remove('calc-appear')
                c=0;
            }
            
            return [...contents].forEach((element,i) => {
                // forEach content, do something...
                if(middleLine.getBoundingClientRect().y > element.parentElement.getBoundingClientRect().y && middleLine.getBoundingClientRect().y < element.parentElement.getBoundingClientRect().y+element.parentElement.getBoundingClientRect().height){
                    element.classList.add('content-show')
                    element.classList.remove('content-hide')
                    setTimeout(()=>{
                   // element.style = `height:500px;width:80%;`
                        
                    },500)
    
                    
                    
                }
                else{
                    element.classList.remove('content-show')
                    element.classList.add('content-hide')
                
    
                }
                
            })
        })
        nav.addEventListener('click',e=>{
            nav_container.classList.remove('hideItems')
            nav_container.classList.add('showItems')
            e.currentTarget.classList.add('regular')
            e.currentTarget.classList.remove('base')
            calculator.classList.add('appear')
            calculator.classList.remove('hidden')
            timeElem.classList.remove('calc-hidden')
            timeElem.classList.add('calc-appear')
            items.forEach((item,i)=>{
                item.classList.add('showItems')
                item.classList.remove('hideItems')
                item.children[0].classList.add('showItems')
                item.children[0].classList.remove('hideItems')
            })
        })
        daddys.forEach(dad=>{
            dad.addEventListener('click',e=>{
                c = 0;
                d = 0
                nav.classList.remove('regular')
                nav.classList.add('base')
                timeElem.classList.add('calc-hidden')
                timeElem.classList.remove('calc-appear')
                calculator.classList.remove('appear')
                calculator.classList.add('hidden')
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
                items.forEach((item,i)=>{
                    item.classList.remove('showItems')
                    item.classList.add('hideItems')
                    item.children[0].classList.remove('showItems')
                    item.children[0].classList.add('hideItems')
                })
            })
        })
    }
}

if(body.clientWidth > 890){
    if(currentDisplay.not_canvas==true){
        const dropNav = () => {
            nav.classList.remove('base')
            nav.classList.add('regular')
            calculator.classList.add('hi-calc')
            calculator.classList.remove('bye-calc')
            n_icon.classList.add('hi-calc')
            n_icon.classList.remove('bye-calc')
            nav_container.classList.remove('hideItems')
            nav_container.classList.add('showItems')
            
            
            items.forEach((item,i)=>{
                    item.classList.remove('hideItems')
                    item.classList.add('showItems')
                    item.children[0].classList.add('showItems')
                    item.children[0].classList.remove('hideItems')
            })
    
        }
        const hideNav = () => {
            clearTimeout(dropTimer)
            nav.classList.add('base')
            nav.classList.remove('regular')
            calculator.classList.remove('hi-calc')
            calculator.classList.add('bye-calc')
            n_icon.classList.remove('hi-calc')
            n_icon.classList.add('bye-calc')
            nav_container.classList.add('hideItems')
            nav_container.classList.remove('showItems')
            timeElem.classList.add('calc-hidden')
            timeElem.classList.remove('calc-appear')
            items.forEach((item,i)=>{
            item.classList.remove('showItems')
            item.classList.add('hideItems')
            item.children[0].classList.remove('showItems')
            item.children[0].classList.add('hideItems')
        })
      }
        window.addEventListener('scroll',e=>{

            let tY = window.scrollY;
            if(tY>=document.body.getBoundingClientRect().x){
                indicator.classList.add('hidden')
                indicator.classList.remove('appear')

                dropNav()
                timeElem.classList.remove('calc-hidden')
                timeElem.classList.add('calc-appear')
            }
            if(tY<=document.body.getBoundingClientRect().x){
                indicator.classList.remove('hidden')
                indicator.classList.add('appear')
                hideNav()
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
                notes.classList.add('calc-hidden')
                notes.classList.remove('calc-appear')
                timeElem.classList.add('calc-hidden')
                timeElem.classList.remove('calc-appear')
                c=0;
                d=0;
            }
            
            return [...contents].forEach((element,i) => {
                // forEach content, do something...
                if(middleLine.getBoundingClientRect().y > element.parentElement.getBoundingClientRect().y && middleLine.getBoundingClientRect().y < element.parentElement.getBoundingClientRect().y+element.parentElement.getBoundingClientRect().height){
                    element.classList.add('content-show')
                    element.classList.remove('content-hide')
                    setTimeout(()=>{
                    element.style = `height:500px;width:80%;`
                        
                    },500)
    
                    
                    
                }
                else{
                    element.classList.remove('content-show')
                    element.classList.add('content-hide')
                
    
                }
                
            })
        })
        nav.addEventListener('click',e=>{
            nav_container.classList.remove('hideItems')
            nav_container.classList.add('showItems')
            e.currentTarget.classList.add('regular')
            e.currentTarget.classList.remove('base')
            calculator.classList.add('hi-calc')
            calculator.classList.remove('bye-calc')
            n_icon.classList.add('hi-calc')
            n_icon.classList.remove('bye-calc')
            timeElem.classList.remove('calc-hidden')
            timeElem.classList.add('calc-appear')
            items.forEach((item,i)=>{
                item.classList.add('showItems')
                item.classList.remove('hideItems')
                item.children[0].classList.add('showItems')
                item.children[0].classList.remove('hideItems')
            })
        })
        daddys.forEach(dad=>{
            dad.addEventListener('click',e=>{
                c = 0;
                d = 0;
                nav.classList.remove('regular')
                nav.classList.add('base')
                timeElem.classList.add('calc-hidden')
                timeElem.classList.remove('calc-appear')
                calculator.classList.remove('hi-calc')
                calculator.classList.add('bye-calc')
                n_icon.classList.remove('hi-calc')
                n_icon.classList.add('bye-calc')
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
                notes.classList.add('calc-hidden')
                notes.classList.remove('calc-appear')
                items.forEach((item,i)=>{
                    item.classList.remove('showItems')
                    item.classList.add('hideItems')
                    item.children[0].classList.remove('showItems')
                    item.children[0].classList.add('hideItems')
                })
            })
        })
    }
}


// show calculator
function toggleCalculator(){
calculator.addEventListener('click',e=>{
    c+=1
    if(calcActual.classList.contains('calc-hidden') && c%2!==0){
        calcActual.classList.add('calc-appear')
        calcActual.classList.remove('calc-hidden')
    }
    if(calcActual.classList.contains('calc-appear')&& c%2==0){
        calcActual.classList.remove('calc-appear')
        calcActual.classList.add('calc-hidden')
    }
})
}
toggleCalculator()

// show calculator on keydown
window.addEventListener('keydown',e=>{
    if(/([0-9]|[\/\-+\*\.=])/g.test(e.key) && c%2==0 && !nav.classList.contains('base')){
        calcActual.classList.add('calc-appear')
        calcActual.classList.remove('calc-hidden')
        c++;
    }
    if(/x/i.test(e.key) && c%2!==0 && !nav.classList.contains('base')){
        calcActual.classList.remove('calc-appear')
        calcActual.classList.add('calc-hidden')
        c=0
    }
})
// exiting calculator with 'X'
exit.addEventListener('click',e=>{
    c=0;
    console.log(e.target)
    if(document.body.clientWidth > 890){
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
        
            }
            else{
                calcActual.classList.add('calc-hidden')
                calcActual.classList.remove('calc-appear')
            }
})

// show notes
function toggleNotes(){
    n_icon.addEventListener('click',e=>{
        d+=1
        if(notes.classList.contains('calc-hidden') && d%2!==0){
            notes.classList.add('calc-appear')
            notes.classList.remove('calc-hidden')
        }
        if(notes.classList.contains('calc-appear')&& d%2==0){
            notes.classList.remove('calc-appear')
            notes.classList.add('calc-hidden')
        }
    })
    }
toggleNotes()

if(document.body.clientWidth <= 890){
    calcActual.style = `
    z-index:997;
    position:fixed;
    width:100%;
    bottom:0;
    right:0;
    transform:translate(${(body.clientWidth/2)-125}px,300px);
    `
}

 