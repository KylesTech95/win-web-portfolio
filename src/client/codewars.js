//https://www.codewars.com/api/v1/users/{user}
const kyu = document.querySelector('.rank')
const username = document.querySelector('.username')
const xml = new XMLHttpRequest();
const method = 'GET'
const url = `https://www.codewars.com/api/v1/users/AntTech23`
const codewars_url = 'https://www.codewars.com/users/637b3ee111b50f0a69bb15d7'
const codeImg = document.getElementById('codewars-image')
const listContainer = document.getElementById('languages-list-container')
let img = document.getElementById('codewars-image')


let img_size = {
    height: img.clientHeight,
    width: img.clientWidth
}
// console.log(img_size)
const appendLi = (arr) =>{
return arr.forEach(lang => {
    let child = document.createElement('li')
    child.textContent=lang
    listContainer.appendChild(child)
})
}
xml.open(method,url,true)
xml.onload = d => {
    let data = JSON.parse(d.target.response)
    let languages = Object.keys(data.ranks.languages)
    kyu.textContent = "Rank: "+data.ranks.overall.name
    username.textContent = data.username;
    appendLi(languages)
}
xml.send()

// onclick code image
// change window.location.href or use open() fn on window
codeImg.onclick = () => {
// window.location.href = codewars_url;
window.open(codewars_url, '_blank');

}



