const fs = require('fs');
const path = require('path');
const models = require(path.resolve(__dirname, '../../../app/models'));
const async = require('async');

class Installer {

  getFiles() {
    return fs.readdirSync(__dirname)
      .filter(function(file) {
        return file.indexOf(".sql") !== -1;
      })
  }

  install(){
    return new Promise((resolve, reject) => {
      var sqlFiles = this.getFiles();
      async.eachLimit(sqlFiles, 1, (file, next) => {
        var sqlFileContent = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
        // console.log("Executing: ", sqlFileContent);
        models.sequelize.query(sqlFileContent,
          {
            raw: true
          }
        ).then( () => {
          console.log("** query success ** ");
          next();
        }).catch ( (error) => {
          console.error("--------------> error on executing", sqlFileContent);
          console.error(error);
          next();
        });
      }, () => {
        var version = require(path.resolve(__dirname, '../../../../package')).version;
        console.log(`schema successfully installed ${version}`);

        models.Pricing.create({ property: 'version', value: version}).then( () => {
          console.log('database successfully installed');
          resolve(true);
        });
      });
    });
  }
}

module.exports = new Installer();
