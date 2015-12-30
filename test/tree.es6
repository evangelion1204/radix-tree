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

    it('should return undefined using find in an empty tree', function () {
        let instance = new Tree()

        expect(instance.find('/users')).to.be.not.defined
    })

    it('should be possible to add new plain entries', function () {
        let instance = new Tree()

        instance.add('/account')
        instance.add('/account/users')
        instance.add('/account/users/add')

        expect(instance.root.priority).to.be.equal(4)
    })

    it('should be possible to add new plain entries', function () {
        let instance = new Tree()

        instance.add('/account')
        instance.add('/account/users')
        instance.add('/account/users/add')
        instance.add('/account/users/change')
        instance.add('/account/users/delete')
        instance.add('/account/addresses')
        instance.add('/account/addresses/add')
        instance.add('/account/addresses/change')
        instance.add('/account/addresses/delete')

        expect(instance.root.priority).to.be.equal(10)
    })

    it('should be possible to add new plain entries', function () {
        let instance = new Tree()

        instance.add('/account')
        instance.add('/account/users')
        instance.add('/account/users/add')
        instance.add('/account/users/change')
        instance.add('/account/users/delete')
        instance.add('/catalog')
        instance.add('/catalog/articles')
        instance.add('/catalog/articles/add')
        instance.add('/catalog/articles/change')
        instance.add('/catalog/articles/delete')

        expect(instance.root.priority).to.be.equal(11)
    })

    it('should return the node on exact match of the path', function () {
        let instance = new Tree()

        instance.add('/account')
        instance.add('/account/users')
        instance.add('/account/users/add')

        expect(instance.find('/account').fullPath).to.be.equal('/account')
        expect(instance.find('/account/users').fullPath).to.be.equal('/account/users')
        expect(instance.find('/account/users/add').fullPath).to.be.equal('/account/users/add')

        expect(instance.find('/account').priority).to.be.equal(3)
        expect(instance.find('/account/users').priority).to.be.equal(2)
        expect(instance.find('/account/users/add').priority).to.be.equal(1)
    })

    it('should return the node on exact match of the path, even if added in inverse order', function () {
        let instance = new Tree()

        instance.add('/account/users/add')
        instance.add('/account/users')
        instance.add('/account')

        expect(instance.find('/account').fullPath).to.be.equal('/account')
        expect(instance.find('/account/users').fullPath).to.be.equal('/account/users')
        expect(instance.find('/account/users/add').fullPath).to.be.equal('/account/users/add')

        expect(instance.find('/account').priority).to.be.equal(3)
        expect(instance.find('/account/users').priority).to.be.equal(2)
        expect(instance.find('/account/users/add').priority).to.be.equal(1)
    })

    it('should return the node on exact match of the path, even if added in inverse order', function () {
        let instance = new Tree()


        instance.add('/users')
        instance.add('/users/:id')

        expect(instance.find('/users').fullPath).to.be.equal('/users')
        expect(instance.find('/users/testuser').fullPath).to.be.equal('/users')
    })

})
