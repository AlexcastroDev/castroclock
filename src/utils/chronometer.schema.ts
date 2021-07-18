import { Timer } from '../types/Timer.type'

export const data = {
    _instance: {
        startInstance: null,
    },
    stopwatch: {
        startTime: null,
        stopTime: null,
    },
    stops: [],
    onChange: () => {}
}

export const schema: Timer = JSON.parse(JSON.stringify(data));
