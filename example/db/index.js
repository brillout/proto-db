const proto = require('../..'); // npm install @brillout/proto-db

const data = proto.load(__dirname+'/data.json', {todos: []});

module.exports = {createTodo, getAllTodos};

async function createTodo({text}) {
  const id = proto.getUUID();
  const newTodo = {id, text};

  data.todos.push(newTodo);

  await data._save();
}

function getAllTodos() {
  return data.todos;
}
