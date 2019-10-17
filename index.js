const fs = require('fs-extra');
const path = require('path');
const assert = require('@brillout/assert');

const __proto = Symbol();

module.exports = {
  load,
  save,
  getUUID,
};

function load(databaseFile) {
  assert.usage(path.isAbsolute(databaseFile), "`databaseFile` should be an absolute path.", {databaseFile});

  let protoObj;
  try {
    protoObj = fs.readJsonSync(databaseFile);
  } catch(err) {
    assert.usage(!fs.pathExistsSync(databaseFile), "`"+databaseFile+"` should be a JSON file.");
    protoObj = {};
  }

  assert.usage(protoObj && protoObj.constructor===Object, "The JSON value of `"+databaseFile+"` should be an object.");

  protoObj[__proto] = {databaseFile};

  return protoObj;
}

async function save(protoObj) {
  assert.usage(protoObj[__proto], "`save(protoObj)` - `protoObj` should be a proto object.");
  const {databaseFile} = protoObj[__proto];
  assert.internal(path.isAbsolute(databaseFile));
  await fs.writeJson(databaseFile, protoObj);
}

function getUUID() {
  const id = Math.floor(Math.random()*Math.pow(10,12));
  return id;
}
