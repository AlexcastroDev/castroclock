import { TimerObject } from '../types/TimerObject.type';
import { Timer } from '../types/Timer.type';
declare const normalizer: {
    diff: (stopTime: any, startTime: any) => TimerObject;
    parseObjectToString: (timer: TimerObject) => string;
    parsePeriodTime: (timer: Timer, stopTime?: number | undefined) => TimerObject;
};
export default normalizer;
