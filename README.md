# radix-tree [![Build Status](https://travis-ci.org/evangelion1204/radix-tree.svg?branch=master)](https://travis-ci.org/evangelion1204/radix-tree) [![Coverage Status](https://coveralls.io/repos/evangelion1204/radix-tree/badge.svg?branch=master&service=github)](https://coveralls.io/github/evangelion1204/radix-tree?branch=master)

Designed for usage in a router. Supports static paths with and without parameters/catchalls

## Install

```shell
npm install radix-tree
```

## Usage

```js
const Tree = require('radix-tree').Tree

const instance = new Tree()

instance.add('/my_path', 'data')

console.log(instance.find('/my_path').data) // will output "data"
```

The second parameter in `Tree.add()` can be anything, a string, a function or an object. The stored path, data and contained parameters will be returned via `Tree.find()`.

### Static routes

A static route can be any type of endpoint of a service, valid examples are:
- `/any_cool_file.html`
- `/api/endpoint`
- `/users/testuser/avatar.jpg`

Static routes are the easiest to and fastest to lookup.

### Routes including parameters

Parameters are dynamic parts of a url and terminated either by the end of the passed path or a `/`. A usage might be for a simple REST-API.
- `/api/users/:userId`
- `/cms/:pageName`

`Tree.find()` will contain now the `params` key with all found parameters and their corresponding values. 

### Routes including catchalls

Catchalls are a special type of parameters,  they will match everything and only be terminated by the end of the passed path. Usage could be in a router to catch deep paths like a CDN or a full API, without caring for the structure.
- `/api/user/*api`
- `/images/*path`

`Tree.find()` will contain now the `params` key with all found parameters and their corresponding values.