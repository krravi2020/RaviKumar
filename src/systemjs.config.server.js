/**
 * System configuration for deployment without installing node_modules
 * Loads umd packages from the web instead
 * Adjust as necessary for your application needs.
 */
 (function (global) {
  System.config({
    paths: {
      'npm:': 'https://unpkg.com/' // path serves as alias,
    },
    // map tells the System loader where to look for things
    map: {
      app: 'app', // location of transpiled app files
      // angular minimized umd bundles
      '@angular/core': 'npm:@angular/core@2.4.0/bundles/core.umd.min.js',
      '@angular/common': 'npm:@angular/common@2.4.10/bundles/common.umd.min.js',
      '@angular/compiler': 'npm:@angular/compiler@2.4.10/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@2.4.10/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.4.10/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'npm:@angular/http@2.4.10/bundles/http.umd.min.js',
      '@angular/router': 'npm:@angular/router@3.4.10/bundles/router.umd.min.js',
      '@angular/router/upgrade': 'npm:@angular@2.4.10/router/bundles/router-upgrade.umd.min.js',
      '@angular/forms': 'npm:@angular/forms@2.4.10/bundles/forms.umd.min.js',
      '@angular/upgrade': 'npm:@angular/upgrade@2.4.10/bundles/upgrade.umd.min.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade@2.4.10/bundles/upgrade-static.umd.min.js',
      // other libraries
      'rxjs':                      'npm:rxjs@5.0.1',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ng2-auto-complete': 'npm:ng2-auto-complete',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: { 
        defaultExtension: 'js'
      },
      'ng2-auto-complete': {
        defaultExtension: 'js'
      }
    }
  });
})(this);
