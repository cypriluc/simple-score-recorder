# Simple Score Recorder for Memorable Space 
**Save results of a research game in VR**

![screen - frontend](https://user-images.githubusercontent.com/64001284/134646240-8b463819-64e5-4f58-b34c-90b075f63e71.png)
*Home page - Input form for results*


![screen-results](https://user-images.githubusercontent.com/64001284/134646342-1f31dd09-3dab-4cfe-9019-d81dfe1c11bc.png)
*Results page - Table with sorted results*



## Project setup
```
npm install
```

```
npm install -g json-server
```

### Start JSON server to get fake REST API
```
json-server --watch db.json
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### Preview build content locally

* Start JSON server (see above)

* Install Node.js static file server

```
npm install -g serve
```

* Start static server

```
serve -s dist
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
