const knex = require("../db/connection");

//lists all products in stock
function list() {
  return knex("productsTable").select("*").where({ inStock: true });
}

function read(product_id) {
  return knex("productsTable").select("*").where({ product_id }).first();
}

//enters new product into database and returns
function createNewProduct(product) {
  return knex("productsTable")
    .insert(product)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(product) {
  return knex("productsTable")
    .select("*")
    .where({ product_id: product.product_id })
    .update(product, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  read,
  list,
  createNewProduct,
  update,
};
