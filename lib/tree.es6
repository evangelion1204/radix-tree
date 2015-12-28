'use strict'

import Node from './node'

export default class Tree {
    constructor() {
        this.root = null
    }

    add(path, data) {
        console.log(`Adding ${path}`)
        if (this.isEmpty()) {
            this.root = new Node('', '', null)
        }

        const fullPath = path
        let node = this.root

        node_loop:
        while (node) {
            let patterns = Object.keys(node.children)
            path = path.replace(node.path, '')

            if (path.length === 0) {
                console.log('exact match, replacing')
                node.data = data

                return this
            }

            node.priority++

            if (patterns.length) {
                for ( let pattern of patterns ) {
                    console.log('inverse check', pattern, path)
                    if ( pattern.startsWith(path) ) {
                        let newGrandChild = node.children[pattern]
                        let newChild = new Node(path, fullPath, data)

                        delete node.children[pattern]

                        newGrandChild.path = newGrandChild.path.replace(path, '')

                        node.append(newChild)
                        newChild.priority = newGrandChild.priority + 1
                        newChild.append(newGrandChild)

                        return this
                    }
                }

                for ( let pattern of patterns ) {
                    console.log('normal check', path, pattern)
                    if ( path.startsWith(pattern) ) {
                        node = node.children[pattern]
                        continue node_loop
                    }
                }
            }

            console.log('No matching child found, appending')
            node.append(new Node(path, fullPath, data))

            return this
        }


        return this
    }

    find(path) {
        let node = this.root

        while (node) {
            let patterns = Object.keys(node.children)
            path = path.replace(node.path, '')

            if (path.length === 0) {
                return node
            }

            if (patterns.length) {
                for (let pattern of patterns) {
                    if (path.startsWith(pattern)) {
                        node = node.children[pattern]
                        break
                    }
                }
            }
        }

        return undefined
    }

    isEmpty() {
        return this.root === null
    }
}