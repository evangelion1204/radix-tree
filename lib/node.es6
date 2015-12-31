'use strict'

const _ = require('lodash')

export default class Node {
    constructor(path, fullPath, data) {
        this.path = path
        this.fullPath = fullPath
        this.data = data
        this.priority = 1
        this.type = Node.DEFAULT
        this.children = []
    }

    append(node) {
        this.children.push(node)
    }

    remove(node) {
        let position = this.children.indexOf(node)

        if (position === -1) {
            return
        }

        this.children.splice(position, 1)
    }
}

Node.DEFAULT = 0
Node.PARAM = 1