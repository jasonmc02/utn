# utn

#### how to setup

1) clone repo
```
git clone git@github.com:jasonmc02/utn.git
```

2) cd into it
```
cd utn
```

3) install dependencies
```
npm install && bower install
```

4) add a platform. for android you probably need extra steps, like setup jre, gennymotion, android adv, etc...
```
ionic platform add ios
```

5) add plugins
```
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
```

6) build for your platform
```
ionic build ios
```

7) emulate for your platform
```
ionic emulate ios
```

***


you can also run on the browser with this command, but some features may not work
```
ionic serve
```