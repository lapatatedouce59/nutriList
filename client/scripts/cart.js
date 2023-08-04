let btnAdd = document.getElementById('btnAdd')
let articleName = document.getElementById('articleName')
let articleNote = document.getElementById('articleNote')

let notLoggedText = document.getElementById('notLoggedText')

let cookies = {}

for(const el of document.cookie.split("; ")){
    cookies[el.split("=")[0]] = el.split("=")[1]
}
console.log(cookies)

btnAdd.addEventListener('click',()=>{
    fetch('http://127.0.0.1:4000/cart', {
        method:'post',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({token: cookies.discord_token, article: { title: (articleName.value || '[aucun titre]'), note: (articleNote.value || '[aucunes notes]') } })
        }).then(res => {
            if(res.status===401){
                alert('Votre jeton de connexion n\'est pas connu de nos serveur, ou votre accès est refusé. Nous vous redirigeons sur la page de connexion.')
                document.location.href='./login.html'
            } else if(res.status===201) {
                alert('Article ajouté')
            }
    })
})

fetch('http://127.0.0.1:4000/cart', {
    method:'put',
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify({token: cookies.discord_token})
    }).then(res => {
    if(res.status===401){
        alert('Votre jeton de connexion n\'est pas connu de nos serveur, ou votre accès est refusé. Nous vous redirigeons sur la page de connexion.')
        document.location.href='./login.html'
    } else if(res.status===200) {
        notLoggedText.innerHTML='';
        res.json().then(jsonres => {
            console.log(jsonres)
            let resApi = jsonres.api
            let cartTable = document.getElementById('cartTable')
            cartTable.innerHTML='';
            for (let article of resApi.cart){
                let articleRow = cartTable.insertRow(article.id-1)
                let tdTitle = articleRow.insertCell(0)
                let tdNote = articleRow.insertCell(1)
                let tdBtn = articleRow.insertCell(2)
    
                tdTitle.innerText=article.title
                tdNote.innerText=article.note
    
                let deleteBtn = document.createElement('button')
                tdBtn.appendChild(deleteBtn)
                tdBtn.classList.add('cartColums')
                deleteBtn.classList.add('cartDeleteBtn')
                deleteBtn.id=('btnDelete'+article.id)
                deleteBtn.addEventListener('click',()=>{
                    console.log('tah la suppression de '+article.title)
                })
            }
        })
    }
})