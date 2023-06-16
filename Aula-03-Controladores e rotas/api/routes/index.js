const bodyPaser = require("body-parser");

module.exports = app => {
    app.use(bodyPaser.json())
    
    app.get('/', (req, res) => {
        res.send("Olá")
    })
}
