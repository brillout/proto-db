const fs = require('fs-extra');
const path = require('path');
const assert = require('@brillout/assert');

const __proto = Symbol();

module.exports = {
  load,
  save,
  getUUID,
};

function load({databaseFile, defaultValue}={}) {
  assert.usage(path.isAbsolute(databaseFile), "`databaseFile` should be an absolute path.", {databaseFile});
  assert.usage(defaultValue && [Array, Object].includes(defaultValue.constructor), "`defaultValue` should be an object or array.", {defaultValue});
  assert.usage(!defaultValue[__proto], "`defaultValue` is already used as proto object/array; provide a new object/array.");

  let protoObj;
  try {
    protoObj = fs.readJsonSync(databaseFile);
  } catch(err) {
    assert.usage(!fs.pathExistsSync(databaseFile), "`"+databaseFile+"` should be a JSON file.");
    protoObj = defaultValue;
  }

  protoObj[__proto] = {databaseFile};

  return protoObj;
}

async function save(protoObj, {spaces=2}={}) {
  assert.usage(protoObj[__proto], "`save(protoObj)` - `protoObj` should be a proto object/array.");
  const {databaseFile} = protoObj[__proto];
  assert.internal(path.isAbsolute(databaseFile));
  await fs.writeJson(databaseFile, protoObj, {spaces});
}

function getUUID() {
  const id = Math.floor(Math.random()*Math.pow(10,16));
  return id;
}
