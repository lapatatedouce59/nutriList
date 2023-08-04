const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

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

let articleIncrement = api.cart.length

app.post("/cart", cors(), (req, res)=>{
    let token = req.body.token
    if(token){
        if(tokenWhiteList.includes(token)){
            if(req.body.article){
                let sentObj = req.body.article
                let articleTitle = sentObj.title
                let articleNote = sentObj.note
                if(articleTitle === '[aucun titre]'){
                    res.status(400).set('Retry-After','Providing a not empty title.').send('Empty article title.')
                } else {
                    articleIncrement++;
                    api.cart.push( {title: articleTitle, note: articleNote, id: articleIncrement} )
                    fs.writeFileSync('./server/server.json', JSON.stringify(api, null, 2));
                    res.status(201).send( {api:api, response:`The article ${articleTitle} has been created sucessfully with id ${articleIncrement}. There is now ${api.cart.length} articles in the cart.`} )
                }
            } else {
                res.status(400).set('Retry-After','Providing a article Object (title,note).').send('No article object.')
            }
        } else {
            res.status(401).set('Retry-After','Sending a valid token (whitelisted)').send('Unauthorised token.')
        }
    } else {
        res.status(400).set('Retry-After','Sending the token via body attribute "token"').send('Missing token.')
    }
})

app.put("/cart", cors(), (req, res)=>{
    let token = req.body.token
    if(token){
        if(tokenWhiteList.includes(token)){
            res.status(200).send({api:api, response:`Sent API.`})
        } else {
            res.status(401).set('Retry-After','Sending a valid token (whitelisted)').send('Unauthorised token.')
        }
    } else {
        res.status(400).set('Retry-After','Sending the token via body attribute "token"').send('Missing token.')
    }
})

let port = 4000
app.listen(port, ()=>{
    console.log(`Serveur lancé sur http://localhost:${port}`)
})