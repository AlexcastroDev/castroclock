import Timer from './utils/proxy'
import { data as initialSchema } from './utils/chronometer.schema'
import _normalizer from './utils/normalizer'
import { CastroClockType } from './types/CastroClock.type'
import ErrorHandler from './exceptions'

const CastroClock: CastroClockType = {
    start: () => {
        new ErrorHandler('start', Timer);
        const start = Date.now()
        Timer._instance.startInstance = start;
        Timer.stopwatch.startTime = start;
        return Timer
    },
    pause: () => {
        new ErrorHandler('pause', Timer);
        const end = Date.now()
        Timer.stopwatch.stopTime = end;
        return Timer
    },
    continue: () => {
        new ErrorHandler('continue', Timer);
        const resumeTime = new Date()
        resumeTime.setHours(resumeTime.getHours() - Number(CastroClock.currentTime.hours))
        resumeTime.setMinutes(resumeTime.getMinutes() - Number(CastroClock.currentTime.minutes))
        resumeTime.setSeconds(resumeTime.getSeconds() - Number(CastroClock.currentTime.seconds))
        resumeTime.setMilliseconds(0)
        Timer.stopwatch.startTime = resumeTime.getTime();
        Timer.stopwatch.stopTime = null;
    },
    lap: () => {
        new ErrorHandler('lap', Timer);
        const resumeTime = Date.now()
        Timer.stops.push({
            start_at: Timer.stopwatch.startTime,
            ends_at: resumeTime,
            period: CastroClock.currentTimeString,
        })
        Timer.stopwatch.startTime = resumeTime
        Timer.stopwatch.stopTime = null
        return Timer.stops
    },
    reset: () => {
        Timer.stopwatch = { ...initialSchema.stopwatch }
        Timer._instance = { ...initialSchema._instance }
        Timer.stops = [];
        return Timer
    },
    onChange: (onChange = () => {}) : void => {
        new ErrorHandler('onchange', Timer, onChange);
        Timer.onChange = onChange;
    },
    get currentTime() {
        const endDate = Timer.stopwatch.stopTime || Date.now()
        return _normalizer.diff(endDate, Timer.stopwatch.startTime)
    },
    get currentTimeString() {
        return _normalizer.parseObjectToString(CastroClock.currentTime)
    },
    get periodTime() {
        return _normalizer.parsePeriodTime(Timer)
    },
    get periodTimeString() {
        return _normalizer.parseObjectToString(CastroClock.periodTime)
    },
    timer: Timer,
}

export default CastroClock