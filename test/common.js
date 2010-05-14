var assert =  require('assert');
var fs = require("fs");
var path = require("path");
var Buffer = require('buffer').Buffer;

var nun = exports.nun = require("../");

file = exports.file = function(name) {
	return path.normalize(__dirname + "/fixtures/" + name + ".html");
};

assertFile = exports.assertFile = function(actual, name) {
	file = path.normalize(__dirname + "/expects/" + name + ".html");
	fs.readFile(file, 'binary', function(err, contents) {
		if (err) {
			throw err;
		} else {
			var buf = new Buffer(contents.length);
			buf.write(contents, 'binary', 0);
			var expected = buf.toString("utf8");
			assert.equal(actual, expected);
		}
	});
};

exports.test = function(name, context, options) {
	var fixture = require("./fixtures/" + name);
	var context = context || fixture.context;
	var options = options || fixture.options;
	nun.render(file(name), context, options, function(err, output){
		if (err) throw err;
		
		var buffer = '';
		output.addListener('data', function(data){ buffer += data; })
		.addListener('end', function(){ 
			assertFile(buffer, name); 
		});
	});
};
