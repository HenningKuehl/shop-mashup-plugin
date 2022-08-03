import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

chayns.ready.then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      // @ts-ignore
      chayns.ui.initAll();
      chayns.hideWaitCursor();
    })
    .catch(err => console.error(err));
}).catch(() => {
  console.error('Chayns is not ready');
});
