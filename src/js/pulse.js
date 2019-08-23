$.fn.pulse = function(options) {
    var options = $.extend({
        times: 3,
        duration: 1000
    }, options);

    var period = function(callback) {
        $(this).animate({opacity: 0}, options.duration, function() {
            $(this).animate({opacity: 1}, options.duration, callback);
        });
    };
    return this.each(function() {
        var i = +options.times, self = this,
            repeat = function() { --i && period.call(self, repeat) };
        period.call(this, repeat);
    });
};