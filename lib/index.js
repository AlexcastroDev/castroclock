/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var data = {
    _instance: {
        startInstance: null,
    },
    stopwatch: {
        startTime: null,
        stopTime: null,
    },
    stops: [],
    onChange: function () { }
};
var schema = JSON.parse(JSON.stringify(data));

function reactiveTimer(schema) {
    var handler = new Proxy(schema, {
        get: function (target, property, receiver) {
            return Reflect.get(target, property, receiver);
        },
        set: function (target, property, value) {
            target.onChange && target.onChange();
            return Reflect.set(target, property, value);
        },
    });
    return new Proxy(schema, handler);
}
var Timer = reactiveTimer(schema);

var padStart = function (width, string, padding) {
    return (width <= string.length) ? string : padStart(width, "" + padding + string, padding);
};

var normalizer = {
    diff: function (stopTime, startTime) {
        var days = 0, hours = 0, minutes = 0, seconds = 0;
        if (startTime) {
            var milliseconds = Math.abs(startTime - stopTime) / 1000;
            days = Math.floor(milliseconds / 86400);
            milliseconds -= days * 86400;
            hours = Math.floor(milliseconds / 3600) % 24;
            milliseconds -= hours * 3600;
            minutes = Math.floor(milliseconds / 60) % 60;
            milliseconds -= minutes * 60;
            seconds = Math.floor(milliseconds);
        }
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    },
    parseObjectToString: function (timer) {
        var hours = timer.hours, minutes = timer.minutes, seconds = timer.seconds;
        var padString = function (value) { return padStart(2, value.toString(), '0'); };
        return padString(hours) + ":" + padString(minutes) + ":" + padString(seconds);
    },
    parsePeriodTime: function (timer, stopTime) {
        var end = stopTime || Date.now();
        var objTimer = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        if (!timer.stops.length) {
            return normalizer.diff(end, timer._instance.startInstance);
        }
        var current = normalizer.parseObjectToString(normalizer.diff(end, timer.stopwatch.startTime));
        var transformSeconds = function (current) {
            var result = 0, time = current.split(':');
            result += Number(time[2]);
            result += Number(time[1]) * 60;
            result += (Number(time[0]) * 60) * 60;
            return result;
        };
        var totalSeconds = transformSeconds(current);
        timer.stops.forEach(function (lap) {
            totalSeconds += transformSeconds(String(lap.period));
        });
        objTimer.hours = Math.floor(totalSeconds / 3600) % 24;
        totalSeconds -= objTimer.hours * 3600;
        objTimer.minutes = Math.floor(totalSeconds / 60) % 60;
        totalSeconds -= objTimer.minutes * 60;
        objTimer.seconds = Math.floor(totalSeconds);
        return {
            hours: objTimer.hours,
            minutes: objTimer.minutes,
            seconds: objTimer.seconds,
        };
    }
};

var E_ALREADY_STARTED = 'You already have started chronometer';
var E_MUST_START_BEFORE_TASK = 'You must have to start chronometer before run it';
var E_NOT_DEFINED = 'Function handler not defined';
var E_MUST_BE_FUNCTION = 'this parameter must be a function';

var ErrorHandler = /** @class */ (function () {
    function ErrorHandler(functionName, timer, change) {
        this.timer = timer;
        this.name = functionName;
        this.change = change;
        switch (this.name) {
            case 'start':
                this.handleStart();
                break;
            case 'pause':
                this.handlePause();
                break;
            case 'continue':
                this.handleContinue();
                break;
            case 'lap':
                this.handleLap();
                break;
            case 'onchange':
                this.handleOnChange();
                break;
            default:
                this.notDefined();
        }
    }
    ErrorHandler.prototype.handleStart = function () {
        if (this.timer._instance.startInstance && !this.timer.stopwatch.stopTime) {
            throw new TypeError(E_ALREADY_STARTED);
        }
    };
    ErrorHandler.prototype.handlePause = function () {
        if (!this.timer._instance.startInstance) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    };
    ErrorHandler.prototype.handleContinue = function () {
        if (!this.timer.stopwatch.startTime || !this.timer.stopwatch.stopTime) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    };
    ErrorHandler.prototype.handleLap = function () {
        if (!this.timer.stopwatch.startTime) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    };
    ErrorHandler.prototype.handleOnChange = function () {
        if (typeof this.change !== 'function') {
            throw new TypeError(E_MUST_BE_FUNCTION);
        }
    };
    ErrorHandler.prototype.notDefined = function () {
        throw new TypeError(E_NOT_DEFINED);
    };
    return ErrorHandler;
}());

var CastroClock = {
    start: function () {
        new ErrorHandler('start', Timer);
        var start = Date.now();
        Timer._instance.startInstance = start;
        Timer.stopwatch.startTime = start;
        return Timer;
    },
    pause: function () {
        new ErrorHandler('pause', Timer);
        var end = Date.now();
        Timer.stopwatch.stopTime = end;
        return Timer;
    },
    continue: function () {
        new ErrorHandler('continue', Timer);
        var resumeTime = new Date();
        resumeTime.setHours(resumeTime.getHours() - Number(CastroClock.currentTime.hours));
        resumeTime.setMinutes(resumeTime.getMinutes() - Number(CastroClock.currentTime.minutes));
        resumeTime.setSeconds(resumeTime.getSeconds() - Number(CastroClock.currentTime.seconds));
        resumeTime.setMilliseconds(0);
        Timer.stopwatch.startTime = resumeTime.getTime();
        Timer.stopwatch.stopTime = null;
    },
    lap: function () {
        new ErrorHandler('lap', Timer);
        var resumeTime = Date.now();
        Timer.stops.push({
            start_at: Timer.stopwatch.startTime,
            ends_at: resumeTime,
            period: CastroClock.currentTimeString,
        });
        Timer.stopwatch.startTime = resumeTime;
        Timer.stopwatch.stopTime = null;
        return Timer.stops;
    },
    reset: function () {
        Timer.stopwatch = __assign({}, data.stopwatch);
        Timer._instance = __assign({}, data._instance);
        Timer.stops = [];
        return Timer;
    },
    onChange: function (onChange) {
        if (onChange === void 0) { onChange = function () { }; }
        new ErrorHandler('onchange', Timer, onChange);
        Timer.onChange = onChange;
    },
    get currentTime() {
        var endDate = Timer.stopwatch.stopTime || Date.now();
        return normalizer.diff(endDate, Timer.stopwatch.startTime);
    },
    get currentTimeString() {
        return normalizer.parseObjectToString(CastroClock.currentTime);
    },
    get periodTime() {
        return normalizer.parsePeriodTime(Timer);
    },
    get periodTimeString() {
        return normalizer.parseObjectToString(CastroClock.periodTime);
    },
    timer: Timer,
};

export default CastroClock;
