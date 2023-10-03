const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./products.controller");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .delete()
  .all(methodNotAllowed);

router
  .route("/:product_id")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);


module.exports = router;
