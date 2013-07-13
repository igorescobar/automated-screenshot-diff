var assert = require('assert'),
    nock = require('nock'),
    sinon = require('sinon'),
    Screenshots = require('../../lib/screenshots.js');

describe('#compare()', function(){
	before(function(){
		Screenshots.test = true;
	});

	beforeEach(function(){
		this.screenshots = new Screenshots();
	});
	it('should exists', function(){
		assert.equal(typeof this.screenshots.compare, "function");
	});

	it('should return invalid currentRelease', function(){
		var data = this.screenshots.compare({});
		assert.equal(data, "invalid parameter [currentRelease]");
	});

	it('should return invalid previousRelease', function(){
		var data = this.screenshots.compare({currentRelease: 'v1'});
		assert.equal(data, "invalid parameter [previousRelease]");
	});

	it('should return invalid source', function(){
		var data = this.screenshots.compare({currentRelease: 'v1', previousRelease: 'v2'});
		assert.equal(data, "invalid parameter [source]");
	});

	it('should execute diff', function(){
		var data = this.screenshots.compare({currentRelease: 'v2', previousRelease: 'v1', source: 'test/images/'});
	});
})