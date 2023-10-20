const express = require("express");
const router = express.Router();

const {

    payment,
    rechargeAccountBalance,
    getCurrentBalanceByUserId
    
    
} = require("../controllers/paymentController")


router.post("/", payment);

router.put("/updateAccountBalance", rechargeAccountBalance);

router.get("/getCurrentAccountBalance", getCurrentBalanceByUserId)




module.exports = router;