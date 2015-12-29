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

                        console.log(path, selectedNode.path, pathCompareIndex)
                        //console.log(pathCompareIndex, path.length, selectedNode.path.length)

                        if (pathCompareIndex >= selectedNode.path.length) {
                            node = selectedNode
                            continue node_loop
                        } else if (pathCompareIndex >= path.length) {
                            console.log('ends with')
                        } else if (pathCompareIndex > 0) {
                            console.log('part match')
                            //let newGrandChild = selectedNode
                            let newEdge = new Node(path.substr(0, pathCompareIndex), '', null)

                            path = path.substr(pathCompareIndex)
                            selectedNode.path = selectedNode.path.substr(pathCompareIndex)

                            //console.log('path', newEdge/, selectedNode.path)

                            node.remove(selectedNode)
                            node.append(newEdge)

                            newEdge.priority = selectedNode.priority + 1
                            newEdge.append(selectedNode)

                            node = newEdgeW
                        }
                    }
                }
            }

            console.log('leaving', path)
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
            path = path.substr(node.path.length)

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