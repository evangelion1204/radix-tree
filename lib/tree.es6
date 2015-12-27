'use strict'

import Node from './node'

export default class Tree {
    constructor() {
        this.root = null
    }

    add(path, data) {
        if (this.isEmpty()) {
            return this.root = new Node(path, path, data)
        }
    }

    find(path) {
        if (this.isEmpty()) {
            return undefined
        }
    }

    isEmpty() {
        return this.root === null
    }
}