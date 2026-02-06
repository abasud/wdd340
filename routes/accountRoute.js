const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accounts = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.get("/login", utilities.handleErrors(accounts.buildLogin))
router.get("/registration", utilities.handleErrors(accounts.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData, 
    utilities.handleErrors(accounts.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accounts.accountLogin)
)

router.get("/accountManagement", utilities.checkLogin, utilities.handleErrors(accounts.buildAccountManagement))

module.exports = router;