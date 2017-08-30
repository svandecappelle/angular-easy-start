/** Add Transpiler for Typescript */
/*System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    'vendor': {
      defaultExtension: 'js'
    }
  }
});*/

System.config({
  map: {
    'app': 'app',

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
    '@angular/cdk': '/lib/@angular/cdk/bundles/cdk.umd.js',

    // Rxjs mapping
    'rxjs': '/lib/rxjs',
  },
  packages: {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
