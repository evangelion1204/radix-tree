'use strict'

const Benchmark = require('benchmark')
import Tree from './lib/tree'

let instance = new Tree()

instance.add('/account')
instance.add('/account/users')
instance.add('/account/users/add')
instance.add('/account/users/change')
instance.add('/account/users/delete')
instance.add('/account/addresses')
instance.add('/account/addresses/add')
instance.add('/account/addresses/change')
instance.add('/account/addresses/delete')
instance.add('/catalog')
instance.add('/catalog/articles')
instance.add('/catalog/articles/add')
instance.add('/catalog/articles/change')
instance.add('/catalog/articles/delete')
instance.add('/cart')
instance.add('/cart/add')
instance.add('/cart/change')
instance.add('/cart/delete')

let benchmark = new Benchmark('find', {
    //minTime: ,
    minSamples: 300,
    fn: function () {
        instance.find('/account/addresses/add')
    }
})

benchmark.run()

console.log(benchmark.toString())