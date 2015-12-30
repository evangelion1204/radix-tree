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
        let paramCount = this.countParams(path)

        console.log('Param Count', paramCount)

        node_loop:
        while (node) {
            path = path.substr(node.path.length)

            if (path.length === 0) {
                console.log('exact match, replacing')
                node.data = data

                return this
            }

            node.priority++

            if (node.children.length) {
                for (let nodeIndex = 0; nodeIndex < node.children.length; nodeIndex++) {
                    if ( node.children[nodeIndex].path[0] === path[0] ) {
                        let selectedNode = node.children[nodeIndex]

                        let pathCompareIndex
                        for (pathCompareIndex = 0; Math.min(selectedNode.path.length, path.length); pathCompareIndex++) {
                            if (path[pathCompareIndex] !== selectedNode.path[pathCompareIndex]) {
                                break
                            }
                        }

                        if (pathCompareIndex >= selectedNode.path.length) {
                            node = selectedNode
                            continue node_loop
                        } else if (pathCompareIndex >= path.length) {
                            let newChild = new Node(path, fullPath, data)

                            selectedNode.path = selectedNode.path.replace(path, '')

                            node.remove(selectedNode)
                            node.append(newChild)

                            newChild.priority = selectedNode.priority + 1
                            newChild.append(selectedNode)

                            return this
                        } else if (pathCompareIndex > 0) {
                            let newEdge = new Node(path.substr(0, pathCompareIndex), '', null)

                            path = path.substr(pathCompareIndex)
                            selectedNode.path = selectedNode.path.substr(pathCompareIndex)

                            node.remove(selectedNode)
                            node.append(newEdge)

                            newEdge.priority = selectedNode.priority + 1
                            newEdge.append(selectedNode)

                            node = newEdge
                        }
                    }
                }
            }

            console.log('No matching child found, appending')
            this.appendNode(node, path, fullPath, data)

            return this
        }


        return this
    }

    appendNode(node, path, fullPath, data) {
        //let countParams = this.countParams(path)
        let offset = 0

        let child = new Node()

        for (let index = 0; index < path.length; index++) {
            let character = path[index]

            if (character !== ':') {
                continue
            }

            if (character === ':') {
                child.path = path.substr(offset, index - offset)

                offset = index
                node.append(child)
                node = child

                child = new Node()
                child.type = Node.PARAM
            }
        }

        child.path = path.substr(offset)
        child.fullPath = fullPath
        child.data = data

        node.append(child)

        return this
    }

    countParams(path) {
        let matches = path.match(/:|\*/g)

        return matches ? matches.length : 0
    }

    find(path) {
        if (this.isEmpty()) {
            return undefined
        }

        let node = this.root
        let offset = node.path.length

        let pathLength = path.length

        node_loop:
        while (node) {
            if (pathLength === offset) {
                return node
            }

            if (!node.children.length) {
                break
            }

            for (let index = 0; index < node.children.length; index++) {
                let child = node.children[index]

                if (child.type === Node.DEFAULT) {
                    if ( path[offset] === child.path[0] ) {
                        node = child
                        offset += node.path.length

                        continue node_loop
                    }
                } else if (child.type === Node.PARAM) {
                    let paramEnd = path.indexOf('/', offset)

                    offset = paramEnd !== -1 ? paramEnd : pathLength
                    node = child

                    continue node_loop
                }
            }
        }

        return undefined
    }

    isEmpty() {
        return this.root === null
    }
}