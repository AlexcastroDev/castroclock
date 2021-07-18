import { TimerObject } from '../types/TimerObject.type'
import { Timer, lap } from '../types/Timer.type'
import { padStart as _padStart } from './strings'

const normalizer = {
    diff: (stopTime: any, startTime: any): TimerObject => {
        let days = 0, hours = 0, minutes = 0, seconds = 0;

        if(startTime) {
            let milliseconds = Math.abs(startTime - stopTime) / 1000;
            days = Math.floor(milliseconds / 86400);
            milliseconds -= days * 86400;
            hours = Math.floor(milliseconds / 3600) % 24;
            milliseconds -= hours * 3600;
            minutes = Math.floor(milliseconds / 60) % 60;
            milliseconds -= minutes * 60;
            seconds = Math.floor(milliseconds)
        }

        return {
            hours,
            minutes,
            seconds,
        }
    },
    parseObjectToString: function(timer: TimerObject) {
        const { hours, minutes, seconds } = timer
        const padString = (value: Number): string => _padStart(2, value.toString(), '0')
        return `${padString(hours)}:${padString(minutes)}:${padString(seconds)}`
    },
    parsePeriodTime: function(timer: Timer, stopTime?: number) {
    const end = stopTime || Date.now()
    let objTimer = {
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    if(!timer.stops.length) {
        return normalizer.diff(end, timer._instance.startInstance)
    }
    
    const current: string = normalizer.parseObjectToString(normalizer.diff(end, timer.stopwatch.startTime))
    
    const transformSeconds = (current: string): number => {
        let result: number = 0, time = current.split(':');
        result += Number(time[2])
        result += Number(time[1]) * 60
        result += (Number(time[0]) * 60) * 60

        return result
    }

    let totalSeconds: number = transformSeconds(current);

    timer.stops.forEach((lap: lap) => {
        totalSeconds += transformSeconds(String(lap.period))
    })

    objTimer.hours = Math.floor(totalSeconds / 3600) % 24
    totalSeconds -= objTimer.hours * 3600
    
    objTimer.minutes = Math.floor(totalSeconds / 60) % 60
    totalSeconds -= objTimer.minutes * 60
    
    objTimer.seconds = Math.floor(totalSeconds)

    

    return {
        hours: objTimer.hours,
        minutes: objTimer.minutes,
        seconds: objTimer.seconds,
    }

    }
    
}

export default normalizer