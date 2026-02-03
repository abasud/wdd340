const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

validate.inventoryRules = () => {
    return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty().withMessage("A name is required")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Remember that only letters and numbers are allowed. No spaces or special characters.")
    ]
}

validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
      errors = validationResult(req)
      if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
          errors,
          title: "Add classification",
          nav,
          classification_name,
        })
        return
      }
      next()
}

module.exports = validate