# Proto DB

<p align='center'>
<a href="#what-is-proto-db">What is Proto DB</a>
&nbsp; | &nbsp;
<a href="#why-proto-db">Why Proto DB</a>
&nbsp; | &nbsp;
<a href="#usage">Usage</a>
&nbsp; | &nbsp;
<a href="#api">API</a>
</p>

### What is Proto DB

Proto is a small Node.js tool to persist a JavaScript object to disk.

### Why Proto DB

At the early prototyping phase of several projects,
we were too lazy to set up a proper database and
instead we used a JavaScript object and persisted it by reading & writing JSON to the disk.

We expected that our approach wouldn't survive long
and that we would soon need to replace our lazy hack with a real database.
But, and to our biggest surprise, we got quite far until we had to use a real database.

Proto DB is only ~40 lines of code ([/index.js](/index.js)),
so you can easily modify it and write your own implementation.

We actually encourage you to write your own implementation;
Proto DB is a cheering message that the technique of using JSON and the filesystem can be a great alternative to a database while prototyping and you may not use Proto DB but you may want to consider this technique.


### Usage

Idiomatic usage example:

~~~js
!INLINE /example/db/index.js
~~~
~~~js
!INLINE /example/index.js
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

- `const db = proto.load(databaseFile, defaultValue)` loads and returns the JavaScript object saved at `databaseFile`. If there is no file at `databaseFile` then `defaultValue` is returned. The `proto.load` function is synchronous.
- `await proto.save(db)` saves `db` to disk at the path `databaseFile` you provided when running `const db = proto.load(databaseFile)`.
- `proto.getUUID()` returns a universally unique ID.

That's it.
