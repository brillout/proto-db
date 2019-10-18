# Proto DB

<p align='center'>
<a href="#what-is-proto-db">What is Proto DB</a>
&nbsp; | &nbsp;
<a href="#why-proto-db">Why Proto DB</a>
&nbsp; | &nbsp;
<a href="#usage">Usage</a>
&nbsp; | &nbsp;
<a href="#how-does-it-work">How does it work</a>
</p>

### What is Proto DB

Proto is a small Node.js tool to save a JavaScript object to disk.

### Why Proto DB

At the early prototyping phase of several projects,
we were too lazy to set up a proper database and
instead we used JavaScript objects and saved them by reading & writing JSON to the filesystem.

We expected that our approach wouldn't survive long
and that we soon would need to replace our lazy hack with a real database.
But, and to our biggest surprise, we got quite far until we had to use a real database.

This little tool is also about being a cheering message that using JavaScript objects, JSON, and the filesystem can be a great alternative to a database while prototyping.

### Usage

Idiomatic usage example:

~~~js
// ~/proto-example/db/index.js

const proto = require('@brillout/proto-db'); // npm install @brillout/proto-db

const db = proto.load(__dirname+'/data.json');
db.todos = db.todos || [];

saveNewTodo();

async function saveNewTodo() {
  const newTodo = {
    id: proto.getUUID(),
    text: 'Buy Milk',
  };
  db.todos.push(newTodo);

  await proto.save(db);
}
~~~

The new todo item is saved in `data.json`:

~~~ shell
$ cat ~/proto-example/db/data.json
{"todos":[{"id":199451513185,"text":"Buy Milk"}]}
~~~

**API**

- `const db = proto.load(databaseFile)` where `databaseFile` is the disk path where `db` is saved, `db` is a plain JavaScript object, and `proto.load` is synchronous.
- `await proto.save(db)` where `db` is the JavaScript object saved to disk. It will be saved to `databaseFile` you provided when you ran `const db = proto.load(databaseFile)`.
- `proto.getUUID()` returns a universally unique ID.

That's it.

### How does it work

It's only ~40 LOCs,
so you can simply read the source code at [/index.js](/index.js).
