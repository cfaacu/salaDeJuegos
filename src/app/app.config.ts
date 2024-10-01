import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-2a39c","appId":"1:733122896022:web:52aca9a6ffcbc8751b22b7","storageBucket":"saladejuegos-2a39c.appspot.com","apiKey":"AIzaSyA3HIXqwVEPT3LZfePaID4dAb5J4T9vM4g","authDomain":"saladejuegos-2a39c.firebaseapp.com","messagingSenderId":"733122896022"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};
