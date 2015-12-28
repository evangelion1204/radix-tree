'use strict'

const _ = require('lodash')

export default class Node {
    constructor(path, fullPath, data) {
        this.path = path
        this.fullPath = fullPath
        this.children = {}
        this.data = data
        this.priority = 1
    }

    append(node) {
        this.children[node.path] = node
    }

    //incrementPriority() {
    //    this.priority++
    //}
}