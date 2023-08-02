let cookies = {}

let logText = document.getElementById('logText')

for(const el of document.cookie.split("; ")){
    cookies[el.split("=")[0]] = el.split("=")[1]
}
console.log(cookies)

if(cookies.discord_token){
    logText.innerText='Actuellement connecté en tant que '+localStorage.getItem('username')
    let btnCon = document.getElementById('btnCon')

    btnCon.addEventListener('click',()=>{
        fetch('http://127.0.0.1:4000/login', {
            method:'post',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: cookies.discord_token})
            }).then(res => {
                if(res.status===401){
                    alert('Votre jeton de connexion est invalide ou vous n\'êtes pas autorisé à accéder à cette page.')
                    document.location.href='https://discord.com/api/oauth2/authorize?client_id=729759463149535313&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Fclient%2FdiscordCon.html&response_type=token&scope=identify'
                } else if(res.status===200) {
                    document.location.href='./index.html'
                } else if(res.status===400) {
                    alert('Aucun token n\'a été renseigné.')
                    //document.location.href='https://discord.com/api/oauth2/authorize?client_id=729759463149535313&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Fclient%2FdiscordCon.html&response_type=token&scope=identify'
                }
            })
    })
} else {
    alert('Votre connexion à Discord a expiré. Nous allons vous rediriger sur la page de connexion.')
    document.location.href='https://discord.com/api/oauth2/authorize?client_id=729759463149535313&redirect_uri=http%3A%2F%2F127.0.0.1%3A5500%2Fclient%2FdiscordCon.html&response_type=token&scope=identify'
}