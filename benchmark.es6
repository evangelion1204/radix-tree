'use strict'

const Benchmark = require('benchmark')
import Tree from './lib/tree'

let instance = new Tree()


let routes = [
    '/account',
    '/account/users',
    '/account/users/add',
    '/account/users/change',
    '/account/users/delete',
    '/account/addresses',
    '/account/addresses/add',
    '/account/addresses/change',
    '/account/addresses/delete',
    '/catalog',
    '/catalog/articles',
    '/catalog/articles/add',
    '/catalog/articles/change',
    '/catalog/articles/delete',
    '/messages',
    //'/messages/:messageId',
    '/cart',
    '/cart/add',
    '/cart/change',
    '/cart/delete',
]

for (let route of routes) {
    instance.add(route)
}

console.log(`Benchmarking ${routes.length} routes`)

let benchmark = new Benchmark('find', {
    //minTime: ,
    minSamples: 300,
    fn: function () {
        for (var i = 0; i < routes.length; i++) {
            instance.find(routes[i])
        }
    }
})

benchmark.run()

console.log(benchmark.toString())