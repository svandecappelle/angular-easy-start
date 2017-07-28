/** Type declaration for ambient System. */
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
    '@angular/platform-browser/animations':
      '/lib/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/platform-browser-dynamic':
      '/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

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
