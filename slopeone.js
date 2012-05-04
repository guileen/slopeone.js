var SlopeOne = module.exports = function SlopeOne(){
  this.diffs = {}
  this.freqs = {}
}

SlopeOne.prototype.insert = function(user_data) {
  for(var name in user_data) {
    var ratings = user_data[name]

    for(var item1 in ratings) {
      var rating1 = ratings[item1]
      var freqs1 = this.freqs[item1] || (this.freqs[item1] =  {})
      var diffs1 = this.diffs[item1] || (this.diffs[item1] =  {})

      for(var item2 in ratings) {
        var rating2 = ratings[item2]
        freqs1[item2] || (freqs1[item2] =  0)
        diffs1[item2] || (diffs1[item2] =  0.0)
        freqs1[item2] += 1
        diffs1[item2] += (rating1 - rating2)
      }
    }
  }

  for(var item1 in this.diffs) {
    var ratings = this.diffs[item1]
    var freqs1 = this.freqs[item1]
    for(var item2 in ratings) {
      ratings[item2] = ratings[item2] / freqs1[item2]
    }
  }
}

SlopeOne.prototype.predict = function(user) {
  var preds = {}
    , freqs = {}
    ;

  for(var item in user) {
    var rating = user[item]
    for(var diff_item in this.diffs) {
      var diff_ratings = this.diffs[diff_item]
      if(this.freqs[diff_item] == null || diff_ratings[item] == null)
        continue;
      var freq = this.freqs[diff_item][item]
      preds[diff_item] || (preds[diff_item] =  0.0)
      freqs[diff_item] || (freqs[diff_item] =  0)
      preds[diff_item] += freq * (diff_ratings[item] + rating)
      freqs[diff_item] += freq
    }
  }

  var results = {}
  for(var item in preds) {
    // if(!(user.include?(item) && freqs[item] > 0))
    if(user[item] == undefined || freqs[item] < 0)
      results[item] = (preds[item] / freqs[item])
  }
  return results
}
