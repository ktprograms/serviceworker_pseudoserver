p5.prototype.registerMethod('init', function () {
    const p5This = this;
    (function (addEventListener, send) {
        XMLHttpRequest.prototype.addEventListener = function (event, listener) {
            function theListener() {
                listener.apply(this, arguments);
                if (this.__p5_incrementedPreload) {
                    p5This._decrementPreload();
                }
            }
            addEventListener.apply(this, [event, theListener]);
        };

        XMLHttpRequest.prototype.send = function () {
            send.apply(this, arguments);
            p5This._incrementPreload();
            this.__p5_incrementedPreload = true;
        };
    })(XMLHttpRequest.prototype.addEventListener, XMLHttpRequest.prototype.send);
});
