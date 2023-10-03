/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("productsTable", (table) => {
    table.increments("product_id").primary();
    table.string("product_name");
    table.string("product_description", [2000]);
    table.string("img_url");
    table.string("product_type");
    table.string("strain_type");
    table.decimal("thc", 3, 2);
    table.decimal("cbd", 3, 2);
    table.decimal("price", 10, 2);
    table.integer("stock");
    table.boolean("inStock");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("productsTable");
};
