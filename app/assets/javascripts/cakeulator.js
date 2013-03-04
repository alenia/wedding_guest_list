(function ($) {
  var $scope, $tiers, $lis;
  $scope = $('body.cakeulator');
  $tiers = $scope.find('.tiers > div');
  $lis = $scope.find('ol li');

  var transitions = {
    multiplyOne: function ($item, proportion, callback) {
      var origHeight = $item.height();
      $item.height(origHeight * proportion);
      if (callback) { callback(origHeight, $item); }
    },

    multiplyEach: function ($collection,proportion,callback){
      var self = this;
      $collection.each(function (iterator, item){
        self.multiplyOne($(item), proportion, callback);
      })
    },

    moveTop: function ($item, distance) {
      var origTop =  parseInt($item.css('top'));
      $item.css('top',(origTop + distance) + 'px');
    },
  }

  var actions = {
    setFibSpacing: function() {
      $lis.each(function (iterator, li){
        var height = $(li).height();
        $(li).css('margin-bottom',height + 'px')
      });
    },

    scaleTiers: function(value) {
      ratio = $scope.find('input#first').val() == 4 ? 4 : 5;
      var unitLength = $tiers.height() / ratio;
      var proportion = value / unitLength;
      transitions.multiplyEach($tiers,proportion, function (origHeight, $tier) {
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
    },

    //essentially a toggle even if height is 4 or 5
    toggleTierHeight: function($tier, value) {
      var ratio = value === "4" ? 4/5 : 5/4;
      transitions.multiplyOne($tier, ratio, function (origHeight){
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
    },

    scaleStripes: function(value) {
      var unitLength = $lis.height();
      var proportion = value / unitLength;
      transitions.multiplyEach($lis,proportion);
    }
  };

  var bindTierHeightToggle = function (tierName) {
    var $trigger = $scope.find('input#' + tierName);
    $trigger.change(function (e) {
      actions.toggleTierHeight($scope.find('.tiers .' + tierName), $trigger.val());
    });

  };

  bindTierHeightToggle('first');
  bindTierHeightToggle('second');
  bindTierHeightToggle('third');

  $scope.find('button#fib_spacing').click(function (e) {
    actions.setFibSpacing();
    e.preventDefault();
  });

  $scope.find('input#spacing').change(function (e) {
    $lis.css('margin-bottom',e.target.value + 'px')
  });

  $scope.find('input#unit').change(function (e) {
    actions.scaleStripes(e.currentTarget.valueAsNumber);
  });

  $scope.find('input#tiers').change(function (e) {
    actions.scaleTiers(e.target.valueAsNumber);
  });
})($);
