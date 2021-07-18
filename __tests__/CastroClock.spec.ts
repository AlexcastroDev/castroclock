import { CastroClock } from '../src/index'
import {
    initialCurrentTimeString,
    initialCurrentTime,
 } from './__mocks__/CastroClock.mocks'

 import {
    initialTimerProxy,
 } from './__mocks__/instance.mocks'

jest.setTimeout(10000);

describe('Chronometer Functions', () => {
    beforeEach(() => {
        CastroClock.reset()
    });
    it('Should mount initial status', () => {
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
        expect(CastroClock.currentTime).toEqual(initialCurrentTime);
        expect(CastroClock.timer).toEqual(initialTimerProxy);
    });
    it('Should start chronometer and wait 2 seconds and match results', async () => {
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
        CastroClock.start();
        await new Promise((r) => setTimeout(r, 2000));
        expect(CastroClock.currentTimeString).toBe('00:00:02');
    });
    it('Should start, pause, wait and match results', async () => {
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
        CastroClock.start();
        await new Promise((r) => setTimeout(r, 2000));
        expect(CastroClock.currentTimeString).toBe('00:00:02');
        CastroClock.pause();
        await new Promise((r) => setTimeout(r, 2000));
        expect(CastroClock.currentTimeString).toBe('00:00:02');
    });
    it('Should start, reset, and mount initial status', async () => {
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
        CastroClock.start();
        await new Promise((r) => setTimeout(r, 2000));
        CastroClock.reset();
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
    });
    it('Should start, call lap, reset count, and store first lap', async () => {
        CastroClock.start();
        await new Promise((r) => setTimeout(r, 2000));
        CastroClock.lap();
        expect(CastroClock.currentTimeString).toBe(initialCurrentTimeString);
        expect(CastroClock.timer.stops[0]).toEqual(expect.objectContaining({
            ends_at: expect.any(Number),
            start_at: expect.any(Number),
            period: expect.stringMatching('00:00:02'),
        }))
    });
})

describe('Chronometer Prevent Errors', () => {
    beforeEach(() => {
        CastroClock.reset()
    });
    it('Shouldn\'t call chronometer.start twice', async () => {
        CastroClock.start();
        const error = CastroClock.start;
        expect(error).toThrow(TypeError);
        expect(error).toThrow('You already have started chronometer');
    });
    it('Shouldn\'t call chronometer.pause without start', async () => {
        const error = CastroClock.pause
        expect(error).toThrow(TypeError);
        expect(error).toThrow('You must have to start chronometer before run it');
    });
    it('Shouldn\'t call chronometer.continue without start', async () => {
        const error = CastroClock.pause
        expect(error).toThrow(TypeError);
        expect(error).toThrow('You must have to start chronometer before run it');
    });
    it('Shouldn\'t call chronometer.lap without start', async () => {
        const error = CastroClock.lap
        expect(error).toThrow(TypeError);
        expect(error).toThrow('You must have to start chronometer before run it');
    });
    it('Shouldn\'t set onChange as string, number, object', async () => {
        expect(() => CastroClock.onChange('hi')).toThrow(TypeError);
        expect(() => CastroClock.onChange(123)).toThrow(TypeError);
        expect(() => CastroClock.onChange({})).toThrow(TypeError);
    });
})