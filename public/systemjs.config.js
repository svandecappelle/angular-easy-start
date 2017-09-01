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

    '@angular/cdk': '/lib/bundles/cdk.umd.js',
    '@angular/cdk/a11y': '/lib/@angular/material/bundles/cdk-a11y.umd.js',
    '@angular/cdk/bidi': '/lib/@angular/material/bundles/cdk-bidi.umd.js',
    '@angular/cdk/coercion': '/lib/@angular/material/bundles/cdk-coercion.umd.js',
    '@angular/cdk/collections': '/lib/@angular/material/bundles/cdk-collections.umd.js',
    '@angular/cdk/keycodes': '/lib/@angular/material/bundles/cdk-keycodes.umd.js',
    '@angular/cdk/observers': '/lib/@angular/material/bundles/cdk-observers.umd.js',
    '@angular/cdk/overlay': '/lib/@angular/material/bundles/cdk-overlay.umd.js',
    '@angular/cdk/platform': '/lib/@angular/material/bundles/cdk-platform.umd.js',
    '@angular/cdk/portal': '/lib/@angular/material/bundles/cdk-portal.umd.js',
    '@angular/cdk/rxjs': '/lib/@angular/material/bundles/cdk-rxjs.umd.js',
    '@angular/cdk/scrolling': '/lib/@angular/material/bundles/cdk-scrolling.umd.js',
    '@angular/cdk/stepper': '/lib/@angular/material/bundles/cdk-stepper.umd.js',
    '@angular/cdk/table': '/lib/@angular/material/bundles/cdk-table.umd.js',
    '@angular/cdk/testing': '/lib/@angular/material/bundles/cdk-testing.umd.js',

    // Rxjs mapping
    'rxjs': '/lib/rxjs',
  },
  packages: {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
  }
});
