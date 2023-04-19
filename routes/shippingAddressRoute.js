const SAR = require("../controllers/ShippingAddressController")

module.exports = (app) => {
    app.post('/addresses',
        [require("../middlewares/authenticate"),
        require("../middlewares/zipcodeValidator"),
        require("../middlewares/contactNumberValidator")],
        SAR.addAddress)
}