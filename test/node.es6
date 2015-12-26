'use strict'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)

import Node from '../lib/node'

describe('Node', function() {
    it('should be a class', function () {
        expect(Node).to.be.a('function')
    })

    it('should be correctly initialized', function () {
        let instance = new Node('part', 'full', 'data')

        expect(instance.path).to.be.equal('part')
        expect(instance.fullPath).to.be.equal('full')
        expect(instance.children).to.be.an('Array')
        expect(instance.data).to.be.equal('data')
    })

    it('children should be accessable and can be appended', function () {
        let parent = new Node('/parent', '/parent')
        let child = new Node('/child', '/parent/child')

        expect(parent.children.length).to.be.equal(0)
        parent.append(child)
        expect(parent.children.length).to.be.equal(1)
    })
})
