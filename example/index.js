const db = require('./db');

run();

async function run() {
  await db.createTodo({text: 'Buy Milk'});

  const todos = db.getAllTodos();
  console.log(todos);
}
