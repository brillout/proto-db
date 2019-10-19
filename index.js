const fs = require('fs-extra');
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
    protoObj = fs.readJsonSync(databaseFile);
  } catch(err) {
    assert.usage(!fs.pathExistsSync(databaseFile), "`"+databaseFile+"` should be a JSON file.");
    protoObj = defaultValue;
  }

  protoObj._save = async () => {
    await fs.writeJson(databaseFile, protoObj);
  };

  return protoObj;
}

function getUUID() {
  const id = Math.floor(Math.random()*Math.pow(10,12));
  return id;
}
