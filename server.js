const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const port = process.env.port || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (message) => {
    return message.toUpperCase();
})


app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    // res.send({
    //     name: 'Bhanu',
    //     likes: [
    //         'Biking',
    //         'Painting'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Aloha!'
    })

})

app.get('/about', (req, res) => {
    // res.send('About Page')
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});