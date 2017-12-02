/* zneiat/notify-z */
$.extend({
    notify: {
        showEnabled: true,
        defaultTimeout: 4000,
        setShowEnabled: function (showEnabled) {
            if (typeof showEnabled !== 'boolean') return;
            this.showEnabled = showEnabled;
        },
        success: function (message) {
            this.show(message, 's');
        },
        error: function (message) {
            this.show(message, 'e');
        },
        info: function (message) {
            this.show(message, 'i');
        },
        warning: function (message) {
            this.show(message, 'w');
        },
        // level: s, e, i, w
        show: function (message, level, timeout) {
            console.log('[app.notify][' + level + '][' + new Date().toLocaleString() + '] ' + message);

            if (!this.showEnabled) return false;

            timeout = (typeof timeout === 'number') ? timeout : this.defaultTimeout;

            var layerElem = $('.notify-layer');
            if (layerElem.length === 0) layerElem = $('<div class="notify-layer" />').appendTo('body');

            var notifyElem = $('<div class="notify-item notify-anim-fade-in ' + (!!level ? 'type-' + level : '') + '"><p class="notify-content"></p></div>');
            notifyElem.find('.notify-content').html($('<div/>').text(message).html().replace('\n', '<br/>'));
            notifyElem.prependTo(layerElem);

            var notifyRemove = function () {
                notifyElem.addClass('notify-anim-fade-out');
                setTimeout(function () {
                    notifyElem.remove();
                }, 200);
            };

            var autoOut = true;
            notifyElem.click(function () {
                notifyRemove();
                autoOut = false;
            });

            if (timeout > 0) {
                setTimeout(function () {
                    if (!autoOut) return;
                    notifyRemove();
                }, timeout);
            }

            return true;
        }
    }
});