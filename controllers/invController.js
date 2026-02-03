const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

const itemCont = {}

/* ***************************
 *  Build details page by item view
 * ************************** */
itemCont.buildByItemId = async function (req, res, next) {
  const item_id = req.params.itemId
  const data = await invModel.getCarByItemId(item_id)
  const carGrid = await utilities.buildItemDetailsGrid(data)
  let nav = await utilities.getNav()
  const carMake = data[0].inv_make
  const carModel = data[0].inv_model
  res.render("./inventory/item", {
    title: carMake + " " + carModel,
    nav,
    carGrid,
  })
}

const management = {}

management.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null
  })
}

const classificationName = {}

classificationName.buildClassificationName = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add classification",
    nav,
    errors: null
  })
}

classificationName.regClassificationName = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regClassName = await invModel.registerClassName(classification_name)

  if (regClassName) {
    req.flash(
      "notice",
      `Nice! Your Classification name ${classification_name} was registered.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "Add classification",
      nav, 
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the name registration failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add classification",
      nav,
      errors: null
    })
  }
}

const inventoryItem = {}

inventoryItem.buildInventoryItem = async function (req, res, next) {
  let nav = await utilities.getNav()
  let select = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add inventory",
    nav,
    select,
    errors: null
  })
}

inventoryItem.regInventoryItem = async function (req, res) {
  let nav = await utilities.getNav()
  let select = await utilities.buildClassificationList()

  const { 
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id } = req.body

  const regVehicle = await invModel.registerVehicleData(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  if (regVehicle) {
    req.flash(
      "notice",
      `Perfect! Your vehicle ${inv_make} ${inv_model} was registered.`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Add inventory",
      nav, 
      select,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the vehicle registration failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add inventory",
      nav,
      select,
      errors: null
    })
  }
}

module.exports = { invCont, itemCont, management, classificationName, inventoryItem }