const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const PORT = 3000
const hostname = 'localhost'

const { SerialPort } = require('serialport')
const readline = require("readline")

const arduino = new SerialPort({ path: 'COM8', baudRate: 9600 })
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')



function ligarled(){
    arduino.write('L')
}
function desligarled(){
    arduino.write('D')
}
app.post('/liga_led', (req,res)=>{
    let msg = 'Led Aceso'
    console.log('Rota liga funcionando')
    ligarled()
    res.render('interface', {msg})
})

app.post('/desliga_led', (req,res)=>{
    let msg2 = 'Led Apagado'
    console.log('Rota desligando')
    desligarled()
    res.render('interface', {msg2})
})

app.get('/', (req,res) =>{
    res.render('interface')
})


app.listen(PORT, hostname, ()=>{
    console.log(`Servidor tri afudê ${hostname} ${PORT}`)
})