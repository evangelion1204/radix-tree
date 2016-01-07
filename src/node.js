'use strict'

export class Node {
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
        this.sort()
    }

    remove(node) {
        let position = this.children.indexOf(node)

        if (position === -1) {
            return
        }

        this.children.splice(position, 1)
    }

    sort() {
        this.children.sort((a, b) => b.priority - a.priority)
    }
}

Node.DEFAULT = 0
Node.PARAM = 1
Node.CATCHALL = 2