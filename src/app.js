const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();


// path for express configs
app.use(express.static(path.join(__dirname, "../public"))); // static directory path
const viewpath = path.join(__dirname, "../src/templates/views")  // view path
const partialpath = path.join(__dirname, "../src/templates/partials")  // partialpath path

app.set('view engine', 'hbs');  // handlebar setup
app.set('views', viewpath);

hbs.registerPartials(partialpath)

// routes

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "checkout the weather today"
    })  // to render hbs view
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "dynamic title for help",
        name: "how cn i help you?"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "dynamic title for about",
        name: "about express"
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide a address'
        })
    }

    const addr = req.query.address;
    if (addr) {
        geocode(addr, (error, { latitude, longitute, location } = {}) => {
            if (error) {
                console.log(error);
                return res.send({
                    error
                });
            }
            forecast(latitude, longitute, (error, forecast) => {
                if (error) {
                    console.log(error);
                    return res.send({
                        error
                    });
                }
                console.log(location)
                console.log(forecast)
                res.send({
                    address: {
                        location,
                        forecast
                    }
                });
            })
        })
    }
    else {
        console.log(chalk.inverse.red("provide an place"));
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: "dynamic title for about",
        name: "about express",
        error: "help page not found"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "dynamic title for about",
        name: "about express",
        error: "page not found"
    });
});
// to start the server
app.listen(3000, () => {
    console.log("server started on port 3000");
});

// will be running as long as we let it 