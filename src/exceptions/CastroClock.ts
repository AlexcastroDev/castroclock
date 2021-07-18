import { 
    E_ALREADY_STARTED,
    E_MUST_START_BEFORE_TASK,
    E_NOT_DEFINED,
    E_MUST_BE_FUNCTION,
} from './constants'
import { Timer } from '../types/Timer.type'

class ErrorHandler {
    name: string;
    timer: Timer;
    change?: () => void;

    constructor(functionName: string, timer: Timer, change?: () => void) {
        this.timer = timer;
        this.name = functionName;
        this.change = change;

        switch (this.name) {
            case 'start':
                this.handleStart()
            break;
            case 'pause':
                this.handlePause()
            break;
            case 'continue':
                this.handleContinue()
            break;
            case 'lap':
                this.handleLap()
            break;
            case 'onchange':
                this.handleOnChange()
            break;
            default:
                this.notDefined()
        }
    }

    handleStart() {
        if(this.timer._instance.startInstance && !this.timer.stopwatch.stopTime) {
            throw new TypeError(E_ALREADY_STARTED);
        }
    }

    handlePause() {
        if(!this.timer._instance.startInstance) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    }

    handleContinue() {
        if(!this.timer.stopwatch.startTime || !this.timer.stopwatch.stopTime) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    }

    handleLap() {
        if(!this.timer.stopwatch.startTime) {
            throw new TypeError(E_MUST_START_BEFORE_TASK);
        }
    }

    handleOnChange() {
        if (typeof this.change !== 'function') {
            throw new TypeError(E_MUST_BE_FUNCTION)
        }
    }

    notDefined() {
        throw new TypeError(E_NOT_DEFINED);
    }

}



export default ErrorHandler;