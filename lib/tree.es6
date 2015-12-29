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

                        //if ( selectedNode.path.startsWith(path) ) {
                        //    let newGrandChild = selectedNode
                        //    let newChild = new Node(path, fullPath, data)
                        //
                        //    newGrandChild.path = newGrandChild.path.replace(path, '')
                        //
                        //    node.remove(newGrandChild)
                        //    node.append(newChild)
                        //    newChild.priority = newGrandChild.priority + 1
                        //    newChild.append(newGrandChild)
                        //
                        //    return this
                        //}

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
            node.append(new Node(path, fullPath, data))

            return this
        }


        return this
    }

    find(path) {
        let node = this.root
        let offset = 0

        while (node) {
            offset += node.path.length

            if ((path.length - offset) === 0) {
                return node
            }

            for (let child of node.children) {
                if (path[offset] === child.path[0]) {
                    node = child
                    break
                }

            }
        }

        return undefined
    }

    isEmpty() {
        return this.root === null
    }
}