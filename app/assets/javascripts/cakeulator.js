(function($) {
  var $scope = $('body.cakeulator');
  var $tiers = $scope.find('.tiers.straight > div');
  var $lis = $scope.find('ol li');

  var multiplyOne = function($item, proportion) {
    var origHeight = $item.height();
    $item.height(origHeight * proportion);
  };

  var multiplyCollection = function($collection,proportion){
    $collection.each(function(iterator, item){
      multiplyOne($(item), proportion)
    })
  };

  var tierHeightSwitch = function(tierName) {
    $scope.find('input#' + tierName).change(function(e) {
      var ratio = $scope.find('input#' + tierName).val() == "4" ? 4/5 : 5/4;
      multiplyOne($scope.find('.tiers.straight .' + tierName), ratio);
    });
  };

  //Too late at night for for loops
  tierHeightSwitch('first');
  tierHeightSwitch('second');
  tierHeightSwitch('third');

  $scope.find('input#spacing').change(function(e) {
    $lis.css('margin-bottom',e.target.value + 'px')
  });

  $scope.find('input#unit').change(function(e) {
    var unitLength = $lis.height();
    var proportion = e.target.valueAsNumber / unitLength;
    multiplyCollection($lis,proportion);
  });

  $scope.find('input#tiers').change(function(e) {
    ratio = $scope.find('input#first').val() == 4 ? 4 : 5;
    var unitLength = $tiers.height() / ratio;
    var proportion = e.target.valueAsNumber / unitLength;
    multiplyCollection($tiers,proportion);
  });
})($);
