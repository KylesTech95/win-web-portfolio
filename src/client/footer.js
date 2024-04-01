const contactContainer = document.querySelector('#contact-container')
const footer = document.querySelector('footer')
let cws = document.querySelector('#codewars-container');
let ghs = document.querySelector('#github-container');
let position = {left:undefined,top:undefined};
const floatingMess = document.getElementById('floating-message')
// contactContainer.style=`left:${footer.clientWidth/2}px`

footer.addEventListener('click',e=>{
    contactContainer.style.zIndex=999;
    floatingMess.classList.remove('appear')
    floatingMess.classList.add('hidden')

    let codewarsLeft = cws.getBoundingClientRect().x
    let githubRight = ghs.getBoundingClientRect().x+ghs.getBoundingClientRect().width
    // we are only using X
    position= {left:e.pageX,top:e.pageY};
    // console.log(position);
    if(position.left < codewarsLeft && position.left > githubRight){
        contactContainer.classList.add('appear')
        contactContainer.classList.remove('hidden')
        let newClass = `left:${position.left-100}px;z-index:999;`
        contactContainer.style = newClass;
        // contactContainer.classList.add('temp-border')
        // setTimeout(()=>{
        //     contactContainer.classList.remove('temp-border')
        // }, 1000)
    }
})
contactContainer.addEventListener('click',e=>{
    let codewarsLeft = cws.getBoundingClientRect().x
    let githubRight = ghs.getBoundingClientRect().x+ghs.getBoundingClientRect().width
    // we are only using X
    position= {left:e.pageX,top:e.pageY};
    // console.log(position);
    if(position.left < codewarsLeft && position.left > githubRight){
        let newClass = `left:${position.left-100}px;z-index:999;`
        contactContainer.style = newClass;
    }
})



// footer
const placeFooter = (elem) => {
    let w = ((Math.floor(document.body.clientWidth/2)) - (floatingMess.clientWidth/2))
    floatingMess.style = `left:${w}px;top:${(elem.clientHeight/2)}px`
    setTimeout(()=>{
        floatingMess.classList.remove('hidden')
        floatingMess.classList.add('appear')

    },1000)
}
placeFooter(footer)