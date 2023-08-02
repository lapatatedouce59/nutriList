const express = require('express')
const app = express()
const cors = require('cors')

const api = require('./server.json')
let tokenWhiteList=[]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(function (req, res, next) {
    console.log(`Requête ${req.method} reçue sur ${req.originalUrl}`)
    console.log(req.body)
    next()
})

app.get("/test", cors(), (req, res)=>{
    let headers = req.headers
    let params = req.query
    if(req.body){
        let {name} = req.body
        if(name){
            res.status(200).send('CA MARCHE, '+name+' Votre lieu: '+params.lieu)
            console.log('uuid: '+headers.uuid)
        } else {
            res.status(400).send('Name has\'nt been defined.')
        }
    } else {
        res.status(400).send('You did\'nt put a body.')
    }
})

let whitelist = ['383637400099880964']
app.post("/login", cors(), (req, res)=>{
    if(req.body){
        let token = req.body.token
        console.log(token)
        if(token){
            fetch('https://discord.com/api/users/@me', {
                headers:{Authorization:'Bearer '+token}
            }).then(rep => {
                if(rep.status===401){
                    res.status(401).send(`Le token ${token} n'est pas valide.`)
                } else {
                    rep.json().then(usr => {
                        if(whitelist.includes(usr.id)){
                            tokenWhiteList.push(token)
                            res.status(200).send(`L'utilisateur est autorisé avec succès.`)
                        } else {
                            res.status(401).send(`L'utilisateur n'est pas autorisé à accéder à la page.`)
                        }
                    })
                }
            })
        } else {
            res.status(400).send('No token has been send')
        }
    } else {
        res.status(400).send('You did\'nt put a body.')
    }
})

app.get("/cart", cors(), (req, res)=>{
    if(req.body){
        let {name} = req.body
        if(name){
            res.status(200).send('CA MARCHE, '+name+' Votre lieu: '+params.lieu)
            console.log('uuid: '+headers.uuid)
        } else {
            res.status(400).send('Name has\'nt been defined.')
        }
    } else {
        res.status(400).send('You did\'nt put a body.')
    }
})

let port = 4000
app.listen(port, ()=>{
    console.log(`Serveur lancé sur http://localhost:${port}`)
})