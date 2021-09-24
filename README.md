# Simple Score Recorder for Memorable Space 
## Save results of a research game in VR

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
