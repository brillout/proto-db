const fs = require('fs');
const path = require('path');
const assert = require('@brillout/assert');

module.exports = {
  load,
  getUUID,
};

function load(databaseFile, defaultValue) {
  assert.usage(path.isAbsolute(databaseFile), "`databaseFile` should be an absolute path.", {databaseFile});

  let protoObj;
  try {
    protoObj = JSON.parse(fs.readFileSync(databaseFile, 'utf8'));
  } catch(err) {
    assert.usage(!fs.existsSync(databaseFile), "`"+databaseFile+"` should be a JSON file.");
    assert.usage(defaultValue!==undefined, "You should provide a `defaultValue` when there is no `"+databaseFile+"` file.");
    protoObj = defaultValue;
  }

  Object.defineProperty(protoObj, '_save', {
    value: async () => { fs.writeFileSync(databaseFile, JSON.stringify(protoObj)) },
    enumarable: false, writable: false, configurable: false,
  });

  return protoObj;
}

function getUUID() {
  const id = Math.floor(Math.random()*Math.pow(10,12));
  return id;
}
