import { Timer } from '../types/Timer.type';
declare class ErrorHandler {
    name: string;
    timer: Timer;
    change?: () => void;
    constructor(functionName: string, timer: Timer, change?: () => void);
    handleStart(): void;
    handlePause(): void;
    handleContinue(): void;
    handleLap(): void;
    handleOnChange(): void;
    notDefined(): void;
}
export default ErrorHandler;
