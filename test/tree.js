'use strict'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = chai.expect

chai.use(sinonChai)

import {Tree} from '../src/tree'

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

        expect(instance.find('/account').path).to.be.equal('/account')
        expect(instance.find('/account/users').path).to.be.equal('/account/users')
        expect(instance.find('/account/users/add').path).to.be.equal('/account/users/add')
    })

    it('should return the node on exact match of the path, even if added in inverse order', function () {
        let instance = new Tree()

        instance.add('/account/users/add')
        instance.add('/account/users')
        instance.add('/account')

        expect(instance.find('/account').path).to.be.equal('/account')
        expect(instance.find('/account/users').path).to.be.equal('/account/users')
        expect(instance.find('/account/users/add').path).to.be.equal('/account/users/add')
    })

    it('should return the parameters in paths', function () {
        let instance = new Tree()

        instance.add('/users')
        instance.add('/users/:userId')
        instance.add('/users/:userId/messages')
        instance.add('/users/:userId/messages/:messageId')

        expect(instance.find('/users')).to.deep.equal({path: '/users'})
        expect(instance.find('/users/testuser')).to.deep.equal({path: '/users/:userId', params: {userId: 'testuser'}})
        expect(instance.find('/users/testuser/messages')).to.deep.equal({path: '/users/:userId/messages', params: {userId: 'testuser'}})
        expect(instance.find('/users/testuser/messages/123')).to.deep.equal({path: '/users/:userId/messages/:messageId', params: {userId: 'testuser', messageId: '123'}})
    })

    it('should return the catchall param', function () {
        let instance = new Tree()

        instance.add('/users')
        instance.add('/users/*api')

        expect(instance.find('/users')).to.deep.equal({path: '/users'})
        expect(instance.find('/users/some/path')).to.deep.equal({path: '/users/*api', params: {api: 'some/path'}})
    })

    it('should be possible to mix both types', function () {
        let instance = new Tree()

        instance.add('/users/:userId')
        instance.add('/api/*api_path')

        expect(instance.find('/users/testuser')).to.deep.equal({path: '/users/:userId', params: {userId: 'testuser'}})
        expect(instance.find('/api/some/path')).to.deep.equal({path: '/api/*api_path', params: {api_path: 'some/path'}})
    })

    it('non existing paths should return undefined', function () {
        let instance = new Tree()

        instance.add('/users')
        instance.add('/mails')

        expect(instance.find('/users')).to.deep.equal({path: '/users'})
        expect(instance.find('/mails')).to.deep.equal({path: '/mails'})
        expect(instance.find('/another/path')).to.not.be.ok
    })

    it('an error should be thrown if the same static route is added twice', function () {
        let instance = new Tree()

        expect(function () {
            instance.add('/users', function () {})
            instance.add('/users', function () {})
        }).to.throw('Node already defined')
    })

    it('an error should be thrown if the same param route is added twice', function () {
        let instance = new Tree()

        expect(function () {
            instance.add('/users/:id', function () {})
            instance.add('/users/:id', function () {})
        }).to.throw('Node already defined')
    })

    it('an error should be thrown if the a static route is already defined and a param with the same path matching is introduced', function () {
        let instance = new Tree()

        expect(function () {
            instance.add('/users/myname', function () {})
            instance.add('/users/:id', function () {})
        }).to.throw('Param node can not be appended to an already existing path')
    })

    it('an error should be thrown if the a static route is already defined and a catch all param with the same path matching is introduced', function () {
        let instance = new Tree()

        expect(function () {
            instance.add('/users/myname', function () {})
            instance.add('/users/*id', function () {})
        }).to.throw('Param node can not be appended to an already existing path')
    })

    it('an error should be thrown if the a param route is already defined and a catch all param with the same path matching is introduced', function () {
        let instance = new Tree()

        expect(function () {
            instance.add('/users/:param', function () {})
            instance.add('/users/*catch', function () {})
        }).to.throw('Param node can not be appended to an already existing path')
    })
})
