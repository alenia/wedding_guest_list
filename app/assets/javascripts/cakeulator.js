(function ($) {
  var $scope, $tiers, $lis, transitions, collections, actions;

  $scope = $('body.cakeulator');
  $tiers = $scope.find('.tiers > div');
  $lis = $scope.find('ol li');

  transitions = {
    multiplyOne: function ($item, proportion, callback) {
      var origHeight = $item.height();
      $item.height(origHeight * proportion);
      if (callback) { callback(origHeight, $item); }
    },

    multiplyEach: function ($collection, proportion, callback) {
      var self = this;
      $collection.each(function (index, item) {
        self.multiplyOne($(item), proportion, callback);
      });
    },

    moveTop: function ($item, distance) {
      var origTop =  parseInt($item.css('top'));
      $item.css('top', (origTop + distance) + 'px');
    }
  };

  collections = {
    getTierBoundaries: function () {
      var tierBoundaries = [];
      $tiers.each(function (index, tier) {
        var b = boundaries($(tier));
        tierBoundaries.push(b.top);
        tierBoundaries.push(b.bottom);
      });

      return _(tierBoundaries).uniq();
    },

    getTierStraddlers: function () {
      var $tierStraddlers = $('');
      $lis.each(function (index, li) {
        var b = boundaries($(li));
        _(collections.getTierBoundaries()).each(function (boundaryLoc) {
          if ((b.bottom > boundaryLoc) && (boundaryLoc > b.top)) {
            var $li = $(li);
            $li.data('straddlerOffset',boundaryLoc - b.top)
            $tierStraddlers = $tierStraddlers.add($li);
          }
        });
      });
      return $tierStraddlers;
    },
  };

  var boundaries = function($item) {
    var self = {};
    self.top = $item.offset().top;
    self.bottom = self.top + $item.height();
    return self;
  };

  var markTierStraddlers = function () {
    $lis.css('background-color', 'rgba(0,0,255,.3)');
    collections.getTierStraddlers().css('background-color', 'rgba(255,0,0,.5)');
  };

  var moveTierStraddlers = function() {
    for (var i=0; i < 3; i++) {
      var $li = collections.getTierStraddlers().first();
      var prevLiMargin = parseInt($li.prev('li').css('margin-bottom'));
      var margin = $li.data('straddlerOffset') + prevLiMargin;
      $li.css('margin-top', margin + 'px')
    }
  };


  actions = {
    render: function() {
      $lis.css('margin-top', '0px');
      if (this.reflowStripes) {
        moveTierStraddlers();
      }
      markTierStraddlers();
    },

    scaleTiers: function (value) {
      var ratio, unitLength, proportion;
      ratio = $scope.find('input#first').val() === 4 ? 4 : 5;
      unitLength = $tiers.height() / ratio;
      proportion = value / unitLength;
      transitions.multiplyEach($tiers, proportion, function (origHeight, $tier) {
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
      this.render();
    },

    //essentially a toggle even if height is 4 or 5
    toggleTierHeight: function ($tier, value) {
      var ratio = value === "4" ? 4 / 5 : 5 / 4;
      transitions.multiplyOne($tier, ratio, function (origHeight) {
        transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
      });
      this.render();
    },

    toggleFibSpacing: function (isChecked) {
      this.isFibSpacing = isChecked;
      // TODO: actions should not be responsible for fetching form values
      this.scaleStripeMargin($scope.find('input#spacing').val());
      this.render();
    },

    toggleReflowStripes: function (isChecked) {
      this.reflowStripes = isChecked;
      this.render();
    },

    scaleStripes: function (value) {
      var proportion = value / $lis.height();
      transitions.multiplyEach($lis, proportion);
      this.render();
    },

    scaleStripeMargin: function (value) {
      if (this.isFibSpacing) {
        this._fibScaleStripeMargin(value);
      } else {
        this._linearScaleStripeMargin(value);
      }
      this.render();
    },

    //private

    _linearScaleStripeMargin: function (value) {
      $lis.css('margin-bottom', value + 'px');
    },

    _fibScaleStripeMargin: function (value) {
      var proportion = value / $lis.height();
      $lis.each(function (iterator, li) {
        var height = $(li).height();
        $(li).css('margin-bottom', (height * proportion) + 'px');
      });
    }
  };

  var createUrl = function (root) {
    var url, params;
    params = {};
    _(['spacing', 'stripes', 'tiers']).each(function (inputName) {
      params[inputName] = $scope.find('input#' + inputName).val();
    });

    _(['fib_spacing','reflow_stripes']).each(function (inputName) {
      params[inputName] = $scope.find('input#' + inputName).prop('checked');
    });

    _(['first', 'second', 'third']).each(function (tierName) {
      params[tierName + '_tier'] = $scope.find('input[name="' + tierName + '"]:checked').val();
    });

    url = root + '?';
    _(params).each(function (value, key) {
      url += key + '=' + value + '&';
    });
    return url;
  }

  $scope.find('a#generate_url').click(function (e) {
    $('pre.url').text(createUrl($(e.currentTarget).data('rooturl')));
  });

  $scope.find('input#fib_spacing').change(function (e) {
    actions.toggleFibSpacing(e.currentTarget.checked);
  });

  $scope.find('input#reflow_stripes').change(function (e) {
    actions.toggleReflowStripes(e.currentTarget.checked);
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

  _(['first', 'second', 'third']).each(function (tierName) {
    var $trigger = $scope.find('input[name="' + tierName + '"]');
    $trigger.change(function (e) {
      actions.toggleTierHeight($scope.find('.tiers .' + tierName), e.currentTarget.value);
    });
  });

  _(['spacing', 'stripes', 'tiers', 'fib_spacing', 'reflow_stripes']).each(function (inputName) {
    $scope.find('input#' + inputName).change();
  });

  _(['first', 'second', 'third']).each(function (tierName) {
    //TODO: make less hacky. this includes fixing the hacky toggleTierHeight method.
    $trigger = $scope.find('input[name="' + tierName + '"]:checked');
    if ($trigger.val() === '5') {
      $trigger.change();
    }
  });
  actions.render();
})($);



