/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const demo_products = require("./demo_products.json");
exports.seed = function(knex) {
  return knex.raw('TRUNCATE TABLE "productsTable" RESTART IDENTITY CASCADE').then(() => knex("productsTable").insert(demo_products));;
};
