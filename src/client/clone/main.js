let btns = document.querySelectorAll('.btn'),
    display = document.querySelector('.display-actual'),
    calculator = document.querySelector('.cal-actual'),
    colors = document.querySelectorAll('.color-card'),
    silver = document.querySelector('.silver')

   
    colors.forEach((color,index)=>{

        color.addEventListener('click', e =>{
            // remove start push from sivler button
            silver.classList.remove('start-color')
            silver.classList.add('up')
            // color card push down 
            if(!e.target.classList.contains('down')){
                e.target.classList.add('down')
                e.target.classList.remove('up')

            }
            colors.forEach((c,i)=>{
                if(c!==color){
                c.classList.remove('down')
                c.classList.add('up')
                }
            })



            calculator.style.background = e.target.classList[0]
            if(/(black|green|blue)/.test(e.target.classList[0])){
               return btns.forEach(btn => {
                if(!btn.classList.contains('long')){
                    btn.style = `
                border: none;
                text-align: center;
                width: 50px;
                color:#fff;
                height: 50px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                box-shadow: 1.5px 1.5px 8px .5px #fff;
                font-family: 'Agdasima', sans-serif;
                transition: .25s ease;
                `
                }
                else{
                    btn.style=`
                    width: 33%;
                    margin-top: 1rem;
                    letter-spacing: 1.25px;
                    color:#fff;
                    box-shadow: 1.5px 1.5px 8px .5px #fff; `
                }
               })
            }
            else{
                btns.forEach(btn => {
                    if(!btn.classList.contains('long')){
                        btn.style = `
                        border: none;
                        text-align: center;
                        width: 50px;
                        color:#000;
                        height: 50px;
                        border-radius: 8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 24px;
                        box-shadow: 1.5px 1.5px 8px .5px #4b454574;
                        font-family: 'Agdasima', sans-serif;
                        transition: .25s ease;
                        `
                    }
                    else{
                        btn.style=`
                        width: 33%;
                        margin-top: 1rem;
                        color:#000;
                        letter-spacing: 1.25px;
                        box-shadow: 1.5px 1.5px 8px .5px #4b454574; `
                    }
               })
            }
        })
    })

    //board = document.querySelector('.//board');

//Looping throught the btns array to use the "click" event listener
btns.forEach(btn => {
    //Event listener to click buttons
    btn.addEventListener('click',(e)=>{
        if(display.value=='0')display.value=''
        var chr = e.target.textContent; 
        //Regex.test(string) - condition for programming chrs, deleting chrs & All Clear(AC)
        if(/\d|[0-9-+*./]/.test(chr)){
            display.value += chr;
            if(/(\+|\-|\/|\*)(\-)(\+|\-|\/|\*)/g.test(display.value)){
                display.value=display.value.replace('-','')
                }
        }
        if(/(\+|\/|\*)(\+|\/|\*)/g.test(display.value)){
            display.value = display.value.replace(/(\+|\/|\*)/,'')
        }
        if(/(\+|\-|\/|\*)?(\-)(\+|\-|\/|\*)/g.test(display.value)){
            display.value = display.value.replace('-','')
            }
        if(/DELETE/.test(chr))display.value = display.value.slice(0,-1);

        if(/AC/.test(chr)){
            display.value = '0';
            //board.textContent='0'
        }
        if(/NEG/.test(chr)){
            display.value = display.value.replace(/\d+$/,n=>(+n*-1).toString())
        }
        if(/=/.test(chr)){
            //Helper function to evaluate
            display.value = eval(display.value);
            //board.textContent = eval(display.value); 
        }
        if(/\./g.test(chr)){
    // display.value = '.....22+45+56..3/77-4.............3'
    //regex to ensure possible decimals are limited to no more than 1.
    display.value = display.value.replace(/([(0-9)*|\.{1}])(\+|\-|\/|\*)(\+|\-|\/|\*)([(0-9)*|\.{1}])/g,'$1\s$2\s$3')
    .replace(/([0-9]*)(\+|\-|\/|\*)([0-9]*)/g,'$1 $2 $3')                
         .split(" ")
         .map(num=>{
             if(/\d+/g.test(num)){
                 num = num.replace(/(\d+)(\.{1})(\d+)(\.{1})/g,'$1$2$3')
                 .replace(/(\.{1})(\d+)(\.{1})/g,'$1$2')
                 .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
             }
             else{
                 num
             }
             return num
         })
         .join('')
        }
        //regex to ensure possible decimals are limited to no more than 1.
        display.value = display.value.replace(/\.{2,}/g,'.')
        display.value = display.value.replace(/\.(\d+)\./g,'$1')
    })
    
})

//Event listener to detect keydown event listener
window.addEventListener('keydown',(e)=>{
    if(display.value=='0')display.value=''

    if(/[0-9-+*./]/.test(e.key)){
        display.value += e.key;
    }
    if(/(\+|\/|\*)(\+|\/|\*)/g.test(display.value)){
        display.value = display.value.replace(/(\+|\/|\*)/,'')
    }
    if(/(\+|\-|\/|\*)?(\-)(\+|\-|\/|\*)/g.test(display.value)){
        display.value = display.value.replace('-','')
        }
    if(e.key=='Enter'|| e.key=='='){
    //board.textContent= eval(display.value);
    display.value = eval(display.value);
    }
    if(e.key=='c') {
        display.value = '0';
        //board.textContent='0'
    }
    if(e.key=='Backspace') {display.value = display.value.slice(0,-1)}
    if(e.key=='n'){
        display.value = display.value.replace(/\d+$/,n=>(+n*-1).toString())
                                     .replace(/--/g,'-')
    }
    if(e.key=='.'){
        display.value = display.value.replace(/([(0-9)*|\.{1}])(\+|\-|\/|\*)(\+|\-|\/|\*)([(0-9)*|\.{1}])/g,'$1\s$2\s$3')
                                     .replace(/([0-9]*)(\+|\-|\/|\*)([0-9]*)/g,'$1 $2 $3')                
                                    .split(" ")
                                    .map(num=>{
                                        if(/\d+/g.test(num)){
                                            num = num.replace(/(\d+)(\.{1})(\d+)(\.{1})/g,'$1$2$3')
                                                        .replace(/(\.{1})(\d+)(\.{1})/g,'$1$2')
                                                        .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
                                                        .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
                                        }
                                        else{
                                            num
                                        }
                                        return num
                                    })
                                    .join('')
            }
})