// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const { invCont, itemCont, management, classificationName, inventoryItem } = require("../controllers/invController")
const regValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invCont.buildByClassificationId))
router.get("/detail/:itemId", utilities.handleErrors(itemCont.buildByItemId))

router.get("/management", utilities.handleErrors(management.buildManagement))

router.get("/newClassification", utilities.handleErrors(classificationName.buildClassificationName))
router.post(
    "/add-classification",
    regValidate.inventoryRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(classificationName.regClassificationName)
)

router.get("/newInventory", utilities.handleErrors(inventoryItem.buildInventoryItem))
router.post(
  "/add-inventory",
  regValidate.addInventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleErrors(inventoryItem.regInventoryItem)
)

router.get("/getInventory/:classification_id", utilities.handleErrors(invCont.getInventoryJSON))

module.exports = router;