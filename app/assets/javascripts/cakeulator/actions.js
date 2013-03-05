window.cakeulator = window.cakeulator || {};
cakeulator.Actions = {
  initialize: function (options) {
    options = options ||  {};
    this.render = options.render;
  },

  scaleTiers: function (value) {
    var ratio, unitLength, proportion;
    ratio = cakeulator.$scope.find('input#first').val() === 4 ? 4 : 5;
    unitLength = cakeulator.$tiers.height() / ratio;
    proportion = value / unitLength;
    cakeulator.Transitions.multiplyEach(cakeulator.$tiers, proportion, function (origHeight, $tier) {
      cakeulator.Transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });
    this.render();
  },

  //essentially a toggle even if height is 4 or 5
  toggleTierHeight: function ($tier, value) {
    var ratio = value === "4" ? 4 / 5 : 5 / 4;
    cakeulator.Transitions.multiplyOne($tier, ratio, function (origHeight) {
      cakeulator.Transitions.moveTop($tier.find('.cakebottom'), $tier.height() - origHeight);
    });
    this.render();
  },

  toggleFibSpacing: function (isChecked) {
    this.isFibSpacing = isChecked;
    // TODO: actions should not be responsible for fetching form values
    this.scaleStripeMargin(cakeulator.$scope.find('input#spacing').val());
    this.render();
  },

  toggleReflowStripes: function (isChecked) {
    this.reflowStripes = isChecked;
    this.render();
  },

  scaleStripes: function (value) {
    var proportion = value / cakeulator.$lis.height();
    cakeulator.Transitions.multiplyEach(cakeulator.$lis, proportion);
    this.render();
  },

  scaleStripeMargin: function (value) {
    if (this.isFibSpacing) {
      var proportion = value / cakeulator.$lis.height();
      cakeulator.$lis.each(function (iterator, li) {
        var height = $(li).height();
        $(li).css('margin-bottom', (height * proportion) + 'px');
      });
    } else {
      cakeulator.$lis.css('margin-bottom', value + 'px');
    }
    this.render();
  }
};
