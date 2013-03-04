(function ($) {
  var $scope = $('body.cakeulator');
  var $tiers = $scope.find('.tiers > div');
  var $lis = $scope.find('ol li');

  var multiplyOne = function ($item, proportion, callback) {
    var origHeight = $item.height();
    $item.height(origHeight * proportion);
    if (callback) { callback($item, origHeight); }
  };

  var multiplyEach = function ($collection,proportion,callback){
    $collection.each(function (iterator, item){
      multiplyOne($(item), proportion, callback);
    })
  };

  var moveTop = function ($item, distance) {
    var origTop = parseInt($item.css('top'));
    $item.css('top',(origTop + distance) + 'px');
  };

  var tierHeightSwitch = function (tierName) {
    $scope.find('input#' + tierName).change(function (e) {
      var ratio = $scope.find('input#' + tierName).val() === "4" ? 4/5 : 5/4;
      var $tier = $scope.find('.tiers .' + tierName);
      var origHeight = $tier.height();
      multiplyOne($tier, ratio);
      moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });

  };

  tierHeightSwitch('first');
  tierHeightSwitch('second');
  tierHeightSwitch('third');

  $scope.find('input#spacing').change(function (e) {
    $lis.css('margin-bottom',e.target.value + 'px')
  });

  $scope.find('input#unit').change(function (e) {
    var unitLength = $lis.height();
    var proportion = e.target.valueAsNumber / unitLength;
    multiplyEach($lis,proportion);
  });

  $scope.find('input#tiers').change(function (e) {
    ratio = $scope.find('input#first').val() == 4 ? 4 : 5;
    var unitLength = $tiers.height() / ratio;
    var proportion = e.target.valueAsNumber / unitLength;
    multiplyEach($tiers,proportion, function ($tier, origHeight) {
      moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });
  });
})($);
