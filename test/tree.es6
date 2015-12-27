'use strict'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)

import Tree from '../lib/tree'

describe('Tree', function() {
    it('should be a class', function () {
        expect(Tree).to.be.a('function')
    })

    it('should be correctly initialized and empty', function () {
        let instance = new Tree()

        expect(instance.isEmpty()).to.be.true
    })

    it('should be possible to add new plain entries', function () {
        let instance = new Tree()

        instance.add('/users')

        expect(instance.isEmpty()).not.to.be.true
    })

    it('should return undefined using find in an empty tree', function () {
        let instance = new Tree()

        expect(instance.find('/users')).not.to.be.not.defined
    })

})
