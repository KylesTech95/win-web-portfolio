const xml = new XMLHttpRequest();
const method = 'GET'
const url = `/git`
const username = document.querySelector('.username-gh')
const repoCount = document.querySelector('.repos')
const gitImg = document.querySelector('#github-image')
const gitUrl = `https://github.com/kylestech95/?=repositories`
const workContainer =document.querySelector('.work-list-container')
const approvedRepos = ['basic-form','database-playground-fork','mancala-game','eight-ball-react-js']
const workTitle =document.getElementById('work-title')

const fetchFn = (api) => {
    fetch(api)
    .then(res => res.json())
    .then(res=> {
        let time = [...res].map((t) => {
            return new Date(t.updated_at).getTime()
        })
        res = [...res].sort((a,b)=>{
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
        fRender(res)
    })
    .catch(err => console.log(err))
}
xml.open(method,url,true)
xml.onload = d => {
    let data = JSON.parse(d.target.responseText)
    render(data)
}
xml.send()


const render = (data) => {
    const {login,public_repos,repos_url} = data;
    let allRepos = repos_url+'?page=1&per_page=100'; // change the limit of results from 30 to 100 perpage.
    // console.log(data)
    // plug in data
    username.textContent = login;
    repoCount.textContent = public_repos;
    fetchFn(allRepos);
    // fetchFn2('git_media.json')

}

const fRender = (data) => {
    const goFetch = (n,item) => fetch('git_media.json')
            .then(res => res.json())
            .then(res=> {
                let obj = res[0]
                // console.log(typeof obj)
                let keys = Object.keys(obj)
                // console.log(keys)
                // console.log(n)
                if(keys.includes(n)&&item.classList.contains(n)){
                   item.setAttribute('style', `background-image:url(${obj[n]})`)
                   item.setAttribute('class', `work-list-item`)

                }

            })
                .catch(err => console.log(err))
        for(let i = 0; i < data.length; i++){
            // create list-item & set class
            let newItem = document.createElement('li')
            newItem.setAttribute('class','work-list-item')

            // extract the repo name from "full_name" property.
            let name = data[i].full_name.slice(12);
            if(approvedRepos.includes(name)){
                newItem.classList.add(name);
                workContainer.appendChild(newItem);
                // console.log(data[i])
                goFetch(name,newItem)
            }
        }
        const items = document.querySelectorAll('.work-list-item')
    // hover on work-container
    items.forEach((item,index) => {
        item.addEventListener('mouseenter', e => {
            // workContainer.textContent = keys[index]
            let filename = e.target.style.backgroundImage.slice(15,-6).replace(/-/g,' ')

            workTitle.textContent = filename;    
            
         })
        //  item.addEventListener('mouseleave', e => {
        //     workTitle.textContent = '';
        //     e.target.classList.remove('yes-work')
        //     e.target.classList.remove('no-work')

            
        //  })
    })

}



// onclick code image
// change window.location.href or use open() fn on window
gitImg.onclick = () => {

    // window.location.href = codewars_url;
    window.open(gitUrl, '_blank');
    
    }