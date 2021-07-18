import { TimerObject } from './TimerObject.type'
import { Timer } from './Timer.type'

export interface CastroClockType {
    start: Function,
    pause: Function,
    continue: Function,
    lap: Function,
    reset: Function,
    onChange: Function,
    currentTime: TimerObject,
    currentTimeString: string,
    periodTime: TimerObject,
    periodTimeString: string,
    timer: Timer,
}