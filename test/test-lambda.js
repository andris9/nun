var TestSuite = require('./async_testing').TestSuite;

exports["Test Lambda"] = new TestSuite()
    .addTests({
        "Simple": function(assert, finished) {
            var context = require('./fixtures/lambda-simple');
        }
        
    });