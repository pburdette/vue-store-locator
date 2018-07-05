# vue-store-locator

![store-locator-demo](https://user-images.githubusercontent.com/20526900/42333494-df0910b8-8048-11e8-898f-2ba9a4d08d03.gif)

## Description

This repo is an example of how to build a store locator in Vue. It utilizes [vue-google-maps](https://github.com/xkjyeah/vue-google-maps) and the [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference/3/). Before building this I searched for a good example and was unsuccessful in finding one. So I decided to build one and share the code for others in the same situation as I was.

## Features

* Display locations on a map
* Display store information in sidebar
* Search for locations inside a user supplied radius
  * Store list and map share same data, so the store list will update when the markers on the map update
* Get directions from current location
* Display distance from location in miles and sort 


## Running
The API key is hidden for obvious reasons. You will need to create ```config/dev.env.js``` and put your own API key in.
```
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: ''
})

```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
