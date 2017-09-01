/** Add Transpiler for Typescript */
declare var System: any;
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    'vendor': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'main': 'main.js',

    // Angular specific mappings.
    '@angular/core': '/lib/@angular/core/bundles/core.umd.js',
    '@angular/animations': '/lib/@angular/animations/bundles/animations.umd.js',
    '@angular/common': '/lib/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '/lib/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': '/lib/@angular/http/bundles/http.umd.js',
    '@angular/forms': '/lib/@angular/forms/bundles/forms.umd.js',
    '@angular/router': '/lib/@angular/router/bundles/router.umd.js',
    '@angular/platform-browser': '/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/animations/browser': '/lib/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': '/lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/material': '/lib/@angular/material/bundles/material.umd.js',

    '@angular/cdk': '/lib/bundles/cdk.umd.js',
    '@angular/cdk/a11y': '/lib/@angular/cdk/bundles/cdk-a11y.umd.js',
    '@angular/cdk/bidi': '/lib/@angular/cdk/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': '/lib/@angular/cdk/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': '/lib/@angular/cdk/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': '/lib/@angular/cdk/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/observers': '/lib/@angular/cdk/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': '/lib/@angular/cdk/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': '/lib/@angular/cdk/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': '/lib/@angular/cdk/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': '/lib/@angular/cdk/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/scrolling': '/lib/@angular/cdk/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': '/lib/@angular/cdk/bundles/cdk-stepper.umd.js',
    '@angular/cdk/table': '/lib/@angular/cdk/bundles/cdk-table.umd.js',
    '@angular/cdk/testing': '/lib/@angular/cdk/bundles/cdk-testing.umd.js',

    // Rxjs mapping
    'rxjs': '/lib/rxjs',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});

/** Type declaration for ambient System.
 declare const System: any;
(function(global) {

  // map tells the System loader where to look for things
  var map = {
    'app':        'app', // 'dist',
    '@angular': 'lib/@angular',
    '@angular/animations': 'lib/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': 'lib/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    'rxjs':       'lib/rxjs',
    '@angular/cdk-platform': 'lib/@angular/cdk',
    '@angular/cdk/a11y': 'lib/@angular/cdk',
    '@angular/material': 'lib/@angular/material',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'animations':                 { main: 'platform-browser-animations.js',defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
    'material',
    'cdk'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);


/** Type declaration for ambient System.
declare const System: any;

// Apply the CLI SystemJS configuration.
System.config({
  paths: {
    '/lib/*': 'node_modules/*',
  },
  map: {
    'rxjs': '/lib/rxjs',
    'main': 'main.js',

    // Angular specific mappings.
    '@angular/core': '/lib/@angular/core/bundles/core.umd.js',
    '@angular/common': '/lib/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '/lib/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': '/lib/@angular/http/bundles/http.umd.js',
    '@angular/forms': '/lib/@angular/forms/bundles/forms.umd.js',
    '@angular/router': '/lib/@angular/router/bundles/router.umd.js',
    '@angular/animations': '/lib/@angular/animations/bundles/animations.umd.js',
    '@angular/animations/browser': '/lib/@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser': '/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/animations': '/lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser-dynamic': '/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/material': '/lib/@angular/material/bundles/material.umd.js',
    '@angular/cdk': '/lib/@angular/cdk/bundles/cdk.umd.js',
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
    // Set the default extension for the root package, because otherwise the demo-app can't
    // be built within the production mode. Due to missing file extensions.
    '.': {
      defaultExtension: 'js'
    }
  }
});
*/
