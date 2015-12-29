'use strict'

const _ = require('lodash')

export default class Node {
    constructor(path, fullPath, data) {
        this.path = path
        this.fullPath = fullPath
        this.children = []
        //this.indices = ''
        this.data = data
        this.priority = 1
    }

    append(node) {
        this.children.push(node)
        //this.indices += node.path[0]
    }

    remove(node) {
        let position = this.children.indexOf(node)

        if (position === -1) {
            return
        }

        this.children.splice(position, 1)
        //this.indices = this.indices.slice(position, 1)
        //console.log(this)
    }
}