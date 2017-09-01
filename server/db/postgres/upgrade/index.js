const fs = require('fs');
const path = require('path');
const dateFormat = require('dateformat');
const async = require('async');
const semver = require('semver');
const semverSort = require('semver-sort');

const models = require(path.resolve(__dirname, '../../../app/models'));
const version = require(path.resolve(__dirname, '../../../app/utils/version'));

class Upgrader {

  getFiles(version) {
    return fs.readdirSync(path.resolve(__dirname, version))
      .filter(function(file) {
        return file.indexOf(".sql") !== -1;
      })
  }

  getAllVersions () {
    return fs.readdirSync(__dirname, version)
      .filter(function(file) {
        return file.indexOf(".js") === -1;
      })
  }

  upgrade(opts){
    return new Promise((resolve, reject) => {
      var versionStart = opts.from;
      var versionAim = opts.to;
      console.log(`upgrade from version ${opts.from} to ${opts.to}`);
      var versions = this.getAllVersions();

      console.debug('all versions', versions);
      semverSort.asc(versions);

      async.eachLimit(versions, 1, (upgradingVersion, next) => {
        if (semver.eq(upgradingVersion, versionAim) || (semver.gt(upgradingVersion, versionStart) && semver.lt(upgradingVersion, versionAim))){
          console.log(`upgrading to version ${upgradingVersion}`);
          var sqlFiles = this.getFiles(upgradingVersion);
          console.debug(`all files for ${upgradingVersion}`, sqlFiles);

          async.eachLimit(sqlFiles, 1, (file, next) => {
            var sqlFileContent = fs.readFileSync(path.resolve(__dirname, `${upgradingVersion}/${file}`), 'utf8');
            console.log("Executing: ", sqlFileContent);
            models.sequelize.query(sqlFileContent, {
              raw: true
            }).then( () => {
              console.log("** query success ** ");
              next();
            }).catch ( (error) => {
              console.error("Error on executing ", sqlFileContent);
              console.error(error);
              next(`error upgrading to version ${upgradingVersion}`);
            });
          }, (error) => {
            if (error) {
              console.error(error);
              reject(error);
            } else {
              console.log(`upgraded to version ${upgradingVersion}`);
              next();
            }
          })
        }
      }, () => {
        console.log('all upgrades done');
        resolve('ok');
      })

    });
/*
    return new Promise((resolve, reject) => {
      var sqlFiles = this.getFiles();

      }, () => {

        console.log(`schema successfully installed ${version.current()}`);

        this.inserts().then(() => {
          resolve(true);
        }).catch(() => {
          reject();
        });

      });
    });*/
  }

  inserts () {
    return new Promise((resolve, reject) => {
      async.series({
        startInstall: function (next){
          models.Pricing.update({ property: 'installed_at', value: dateFormat()}).then(() => {
            next(null, 'ok');
          });
        }
      }, () => {
        models.Pricing.update({ property: 'version', value: version.current()}).then( () => {
          console.log('database successfully upgraded');
          resolve(true);
        });
      })
    })




  }
}

module.exports = new Upgrader();
