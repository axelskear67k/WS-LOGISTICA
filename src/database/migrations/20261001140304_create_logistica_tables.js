/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  //Crear tabal categorias
  await knex.schema.createTable('categorias',(table) => {
    table.increments('id').primary();
    table.string('categoria', 100).notNullable();

  });

  //Crear la tabla activos
  await knex.schema.createTable('activos',(table) => {
    table.increments('id').primary();
    table.integer('idcategoria').unsigned().notNullable();
    table.string('descripcion', 150).notNullable();
    table.string('fotografia', 255).nullable(); //puede quedar null
    table.string('estado', 50).defaultTo('Disponible');
    table.decimal('precio', 8,2).notNullable();
    table.timestamp('fecharegistro').defaultTo(knex.fn.now()); //Guardamos la fecha actual

    //Restriccion foránea
    table.foreign('idcategoria')
    .references('id')
    .inTable('categorias')
    .onDelete('RESTRICT');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  //Eliminar las tablas
  await knex.schema.dropTableIfExists('activos');
  await knex.schema.dropTableIfExists('categorias');
};
