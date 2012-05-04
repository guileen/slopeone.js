var SlopeOne = require('../slopeone');

describe('slopeone', function(){
    var user_data = {
      "rob" : {
        "24" : 9.5,
        "Lost" : 8.2,
        "House" : 6.8
      },

      "bob" : {
        "24" : 3.7,
        "Big Bang Theory" : 2.1,
        "House" : 8.3
      },

      "tod" : {
        "24" : 9.5,
        "Lost" : 3.4,
        "House" : 5.5,
        "Big Bang Theory" : 9.3
      },

      "dod" : {
        "24" : 7.2,
        "Lost" : 5.1,
        "House" : 8.4,
        "The Event" : 7.8
      }
    };

    var slope_one = new SlopeOne();
    slope_one.insert(user_data)

    function input_test(input, expect) {
      var output = slope_one.predict(input);
      console.log('test');
      console.log(input)
      console.log(output)
      Object.keys(expect).length.should.equal(Object.keys(output).length);
      var keys = Object.keys(expect);
      for(var i in keys) {
        var key = keys[i];
        Math.round(100 * output[key]).should.equal(Math.round(expect[key] * 100));
      }
    }

    it('should test_predict', function(){
        var input = {"House" : 3, "Big Bang Theory" : 7.5}
        var output = {"24":4.95, "Lost":1.65, "The Event":2.4}
        input_test(input, output)
    })

    it('should test_irrelevent_input', function(){
        var input = {"East}ers" : 7.25}
        var output = {}
        input_test(input, output)
    })

    it('should test_insufficient_data', function(){
        var slope_one = new SlopeOne()
        // < here there nay be data insertion >
        var input = {"East}ers" : 7.25}
        var output = {}
        input_test(input, output)
    })

});
