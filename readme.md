<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).






-->
# ProtoDB

<p align='center'>
<a href="#what-is-protodb">What is ProtoDB</a>
&nbsp; | &nbsp;
<a href="#why-protodb">Why ProtoDB</a>
&nbsp; | &nbsp;
<a href="#usage">Usage</a>
&nbsp; | &nbsp;
<a href="#api">API</a>
</p>

### What is ProtoDB

Proto is a small Node.js tool to persist a JavaScript object to disk.

### Why ProtoDB

At the early prototyping phase of several projects,
we were too lazy to set up a proper database and
instead we used a JavaScript object and persisted it by reading & writing JSON to disk.

We expected that our approach wouldn't survive long
and that we would soon need to replace our lazy hack with a real database.
But, and to our biggest surprise, we got quite far until we had to use a real database.

Proto is only ~40 lines of code ([/index.js](/index.js)),
so you can easily modify it and write your own implementation.

We actually encourage you to write your own implementation;
ProtoDB is a cheering message that the technique of using JSON and the filesystem can be a great alternative to a database for prototypes and small to medium-sized apps.
You may not use Proto but you may want to consider this technique.


### Usage

Idiomatic usage example:

~~~js
// /example/db/index.js

const proto = require('@brillout/proto-db'); // npm install @brillout/proto-db

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
~~~
~~~js
// /example/index.js

const db = require('./db');

run();

async function run() {
  await db.createTodo({text: 'Buy Milk'});

  const todos = db.getAllTodos();
  console.log(todos);
}
~~~

Which prints:
~~~shell
$ node example/
[ { id: 430557952207, text: 'Buy Milk' } ]
~~~

The new todo item is saved as JSON in `data.json`:
~~~shell
$ cat example/db/data.json
{"todos":[{"id":199451513185,"text":"Buy Milk"}]}
~~~

### API

- `const data = proto.load(databaseFile, defaultValue)` loads and returns the JavaScript object saved at `databaseFile`. If there is no file at `databaseFile` then `defaultValue` is used. The `proto.load` function is synchronous.
- `await data._proto.save()` saves `data` to the disk at the path `databaseFile` you provided when running `const data = proto.load(databaseFile)`.
- `proto.getUUID()` generates and returns a universally unique ID.

<!---






    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).












    WARNING, READ THIS.
    This is a computed file. Do not edit.
    Instead, edit `/readme.template.md` and run `npm run docs` (or `yarn docs`).






-->
