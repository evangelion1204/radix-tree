'use strict'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)

import {Node} from '../src/node'

describe('Node', function() {
    it('should be a class', function () {
        expect(Node).to.be.a('function')
    })

    it('should be correctly initialized', function () {
        let instance = new Node('part', 'full', 'data')

        expect(instance.path).to.be.equal('part')
        expect(instance.fullPath).to.be.equal('full')
        expect(instance.children).to.be.an('array')
        expect(instance.data).to.be.equal('data')
        expect(instance.priority).to.be.equal(1)
    })

    it('children should be accessable and can be appended', function () {
        let parent = new Node('/parent', '/parent')
        let child = new Node('/child', '/parent/child')

        expect(parent.children.length).to.be.equal(0)
        parent.append(child)
        expect(parent.children.length).to.be.equal(1)
    })

    it('appending should order children based by their priority', function () {
        let parent = new Node('/parent', '/parent')
        let child1 = new Node('/child1', '/parent/child1')
        let child2 = new Node('/child2', '/parent/child2')

        child1.priority = 1
        child2.priority = 2

        parent.append(child1)
        parent.append(child2)

        expect(parent.children).to.deep.equal([child2, child1])
    })

    it('sort should order children based by their priority', function () {
        let parent = new Node('/parent', '/parent')
        let child1 = new Node('/child1', '/parent/child1')
        let child2 = new Node('/child2', '/parent/child2')

        child1.priority = 1
        child2.priority = 1

        parent.append(child1)
        parent.append(child2)

        expect(parent.children).to.deep.equal([child1, child2])

        child2.priority = 2

        parent.sort()

        expect(parent.children).to.deep.equal([child2, child1])
    })



})
