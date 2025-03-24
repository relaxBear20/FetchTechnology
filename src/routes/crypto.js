const express = require("express")
const router = express.Router()
const { getCryptoPriceHistory, getCryptoMarketPrice,getCryptoListBySymbol } = require('../controllers/cryptoController');

router.get('/list/:symbol', getCryptoListBySymbol) 
router.get('/market/:symbol',  getCryptoMarketPrice) 
router.get('/history/:symbol', getCryptoPriceHistory) 
// //middleware
// const users = [{name: 'real'}, {name: "bad"}]
// router.param("id", (req,res, next, id ) => {
//     console.log(id)
// //save bien user 
//     req.user = users[id]
//     //have to run next
//     next();
// })


module.exports = router