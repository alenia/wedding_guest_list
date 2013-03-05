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
      $collection.each(function (index, item){
        self.multiplyOne($(item), proportion, callback);
      })
    },

    moveTop: function ($item, distance) {
      var origTop =  parseInt($item.css('top'));
      $item.css('top',(origTop + distance) + 'px');
    },
  };

  var markTierStraddlers = function () {
    $lis.css('background-color','rgba(0,0,255,.3)')

    var tierBoundaries = [];
    $tiers.each(function (index, tier) {
      var tierTop = $(tier).offset().top;
      tierBoundaries.push(tierTop);
      tierBoundaries.push(tierTop + $(tier).height());
    });

    tierBoundaries = _(tierBoundaries).uniq();

    $lis.each(function (index, li) {
      var top, bottom;
      top = $(li).offset().top;
      bottom = top + $(li).height();
      _(tierBoundaries).each( function (num) {
        if ((bottom > num) && (num > top)) {
          $(li).css('background-color','rgba(255,0,0,.5)')
        }
      })
    });
  };

  var actions = {
    scaleTiers: function(value) {
      ratio = $scope.find('input#first').val() == 4 ? 4 : 5;
      var unitLength = $tiers.height() / ratio;
      var proportion = value / unitLength;
      transitions.multiplyEach($tiers,proportion, function (origHeight, $tier) {
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
      markTierStraddlers();
    },

    //essentially a toggle even if height is 4 or 5
    toggleTierHeight: function($tier, value) {
      var ratio = value === "4" ? 4/5 : 5/4;
      transitions.multiplyOne($tier, ratio, function (origHeight){
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
      markTierStraddlers();
    },

    toggleFibSpacing: function(isChecked) {
      this.isFibSpacing = isChecked;
      // TODO: actions should not be responsible for fetching form values
      this.scaleStripeMargin($scope.find('input#spacing').val());
      markTierStraddlers();
    },

    scaleStripes: function(value) {
      var unitLength = $lis.height();
      var proportion = value / unitLength;
      transitions.multiplyEach($lis,proportion);
      markTierStraddlers();
    },

    scaleStripeMargin: function(value) {
      if (this.isFibSpacing) {
        this._fibScaleStripeMargin(value);
      } else {
        this._linearScaleStripeMargin(value);
      }
      markTierStraddlers();
    },

    //private

    _linearScaleStripeMargin: function(value) {
      $lis.css('margin-bottom', value + 'px')
    },

    _fibScaleStripeMargin: function(value) {
      var proportion = value / $lis.height();
      $lis.each(function (iterator, li){
        var height = $(li).height();
        $(li).css('margin-bottom', (height * proportion) + 'px')
      });
    }
  };

  $scope.find('input#fib_spacing').change(function (e) {
    actions.toggleFibSpacing(e.currentTarget.checked);
  });

  $scope.find('input#spacing').change(function (e) {
    actions.scaleStripeMargin(e.currentTarget.value);
  });

  $scope.find('input#stripes').change(function (e) {
    actions.scaleStripes(e.currentTarget.valueAsNumber);
  });

  $scope.find('input#tiers').change(function (e) {
    actions.scaleTiers(e.target.valueAsNumber);
  });

  _(['first','second','third']).each(function (tierName) {
    var $trigger = $scope.find('input[name="' + tierName + '"]');
    $trigger.change(function (e) {
      actions.toggleTierHeight($scope.find('.tiers .' + tierName), e.currentTarget.value);
    });
  });

  _(['spacing','stripes','tiers','fib_spacing']).each(function (inputName){
    $scope.find('input#' + inputName).change();
  });

  _(['first','second','third']).each(function (tierName) {
    //TODO: make less hacky. this includes fixing the hacky toggleTierHeight method.
    $trigger = $scope.find('input[name="' + tierName + '"]:checked');
    if ($trigger.val() === '5') {
      $trigger.change();
    }
  });
  markTierStraddlers();
})($);



