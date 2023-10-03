const service = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// const hasProperties = require("../errors/hasProperties");

//middleware
const validProperties = [
  "product_name",
  "product_description",
  "img_url",
  "product_type",
  "strain_type",
  "thc",
  "cbd",
  "price",
  "stock",
  "inStock",
];

function validateBodyHasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  } else {
    next();
  }
}

function hasProperties(req, res, next) {
  const data = req.body.data;
  try {
    validProperties.forEach((property) => {
      if (!(property in data)) {
        const error = new Error(`A '${property}' property is required.`);
        error.status = 400;
        throw error;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

//ensure req.body does not have invalid data
function validateProductHasOnlyCorrectProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !validProperties.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  } else {
    next();
  }
}

async function validateProductExists(req, res, next) {
  const product = await service.read(req.params.product_id);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({
    status: 404,
    message: `product_id ${req.params.product_id} cannot be found.`,
  });
}

//CRUD

async function list(req, res) {
  res.json({ data: await service.list() });
}

async function read(req, res, next) {
  res.json({data: res.locals.product});
}

async function createNewProduct(req, res) {
  res.status(201).json({ data: await service.createNewProduct(req.body.data) });
}

async function update(req, res) {
  const updatedProduct = {
    ...req.body.data,
    product_id: res.locals.product.product_id,
  };
  res.json({ data: await service.update(updatedProduct) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [
    asyncErrorBoundary(validateProductExists),
    read
  ],
  create: [
    validateBodyHasData,
    hasProperties,
    validateProductHasOnlyCorrectProperties,
    asyncErrorBoundary(createNewProduct),
  ],
  update: [
    validateBodyHasData,
    asyncErrorBoundary(validateProductExists),
    hasProperties,
    validateProductHasOnlyCorrectProperties,
    asyncErrorBoundary(update),
  ],
};
