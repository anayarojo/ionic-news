
## Ionic News
Aplicación de noticias hecha con ionic 4

![Ionic 4 ─ News ─ Preview 1](https://raw.githubusercontent.com/anayarojo/ionic-news/master/wiki/img/Ionic%204%20%E2%94%80%20New%20%E2%94%80%20Preview%201.PNG)

![Ionic 4 ─ News ─ Preview 2](https://raw.githubusercontent.com/anayarojo/ionic-news/master/wiki/img/Ionic%204%20%E2%94%80%20New%20%E2%94%80%20Preview%202.PNG)

![Ionic 4 ─ News ─ Preview 3](https://raw.githubusercontent.com/anayarojo/ionic-news/master/wiki/img/Ionic%204%20%E2%94%80%20New%20%E2%94%80%20Preview%203.PNG)

### Commands

```
ionic start news tabs
ionic g service services/news --skipTests=true
ionic g module components
ionic g component components/news --spec=false
ionic g component components/new --spec=false

ionic cordova plugin add cordova-plugin-inappbrowser
npm install @ionic-native/in-app-browser

ionic cordova plugin add cordova-plugin-x-socialsharing
npm install @ionic-native/social-sharing

ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic g service local-storage
```

### In App Browser

#### Commands
```shell
ionic cordova plugin add cordova-plugin-inappbrowser
npm install @ionic-native/in-app-browser
```

#### Example
```typescript
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

constructor(private iab: InAppBrowser) { }

...

const browser = this.iab.create('https://ionicframework.com/');

browser.executeScript(...);

browser.insertCSS(...);
browser.on('loadstop').subscribe(event => {
   browser.insertCSS({ code: "body{color: red;" });
});

browser.close();
```

#### Documentation: 

https://ionicframework.com/docs/native/in-app-browser

### Social Sharing

#### Commands
```shell
ionic cordova plugin add cordova-plugin-x-socialsharing
npm install @ionic-native/social-sharing
```

#### Example
```typescript
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

constructor(private socialSharing: SocialSharing) { }

...

// Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});

// Share via email
this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});
```

### Documentation:

https://ionicframework.com/docs/native/social-sharing
