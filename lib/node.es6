'use strict'

export default class Node {
    constructor(path, fullPath, data) {
        this.priority = 1
        this.path = path
        this.fullPath = fullPath
        this.children = []
        this.data = data
    }

    append(node) {
        this.children.push(node)
    }
}