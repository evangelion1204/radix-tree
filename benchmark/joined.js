'use strict'

const Benchmark = require('benchmark')
import Tree from '../src/tree'

let singleStaticRoutes = [
    {
        route: '/a_very_new_product_with_a_long_name.html',
        find: '/a_very_new_product_with_a_long_name.html',
    }
]

let staticRoutes = [
    {
        route: '/account',
        find: '/account',
    },
    {
        route: '/account/users',
        find: '/account/users',
    },
    {
        route: '/account/users/add',
        find: '/account/users/add',
    },
    {
        route: '/account/users/change',
        find: '/account/users/change',
    },
    {
        route: '/account/users/delete',
        find: '/account/users/delete',
    },
    {
        route: '/account/addresses',
        find: '/account/addresses',
    },
    {
        route: '/account/addresses/add',
        find: '/account/addresses/add',
    },
    {
        route: '/account/addresses/change',
        find: '/account/addresses/change',
    },
    {
        route: '/account/addresses/delete',
        find: '/account/addresses/delete',
    },
    {
        route: '/catalog',
        find: '/catalog',
    },
    {
        route: '/catalog/articles',
        find: '/catalog/articles',
    },
    {
        route: '/catalog/articles/add',
        find: '/catalog/articles/add',
    },
    {
        route: '/catalog/articles/change',
        find: '/catalog/articles/change',
    },
    {
        route: '/catalog/articles/delete',
        find: '/catalog/articles/delete',
    },
    {
        route: '/messages',
        find:'/messages',
    },
    {
        route: '/cart',
        find: '/cart',
    },
    {
        route: '/cart/add',
        find: '/cart/add',
    },
    {
        route: '/cart/change',
        find: '/cart/change',
    },
    {
        route: '/cart/delete',
        find: '/cart/delete',
    },
]

let paramRoutes = [
    {
        route: '/messages/:id',
        find: '/messages/123456789',
    },
    {
        route: '/messages/:id/recipients/:user',
        find: '/messages/123456789/recipients/testuser',
    },
    {
        route: '/api/*api_path',
        find: '/api/sub/path/',
    },
]

function benchmark(routes) {
    var instance = new Tree()

    for (var routeDefinition of routes) {
        instance.add(routeDefinition.route)
    }

    return function () {
        for ( var i = 0; i < routes.length; i++ ) {
            instance.find(routes[i].find)
        }
    }
}

let suite = new Benchmark.Suite()
suite
    .add({
        name: `find with single static route`,
        minSamples: 300,
        fn: benchmark(singleStaticRoutes)
    })
    .add({
        name:`find with ${staticRoutes.length} static routes`,
        minSamples: 300,
        fn: benchmark(staticRoutes)
    })
    .add({
        name:`find with ${paramRoutes.length} param routes of different levels`,
        minSamples: 300,
        fn: benchmark(paramRoutes)
    })

suite.run()

console.log(suite.join('\n'))
