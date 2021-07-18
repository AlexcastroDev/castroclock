import { Timer } from "../../src/types/Timer.type";
import _normalizer from "../../src/utils/normalizer"

import {
    dateMockStart,
    dateMockEnd,
    diffMockObject,
    diffMockString,
    runningTimerProxy,
    runningTimerProxyWithStop,
    runningTimerProxyWithStops,
    periodMockString,
    periodMockObject
 } from '../__mocks__/instance.mocks'

describe('Normalize dates', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    });
    it('Should returns a object with hours, minutes and seconds', () => {
        const diff = _normalizer.diff(dateMockEnd, dateMockStart)
        expect(diff).toEqual(diffMockObject);
    });
});

describe('Normalize period', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    });
    it('Should parse object to string', () => {
        const diff = _normalizer.diff(dateMockEnd, dateMockStart)
        const parse = _normalizer.parseObjectToString(diff)
        expect(parse).toEqual(diffMockString);
    });
    it('Should returns when there is no stops', () => {
        const parse = _normalizer.parsePeriodTime(runningTimerProxy as Timer, dateMockEnd.getTime())
        expect(parse).toEqual(diffMockObject)
        expect(parse).toEqual((expect.objectContaining({
            hours: expect.any(Number),
            minutes: expect.any(Number),
            seconds: expect.any(Number),
        })))
    });
    it('Should returns when there is one stop', () => {
        const periodObject = _normalizer.parsePeriodTime(runningTimerProxyWithStop as Timer, dateMockEnd.getTime())
        const periodString = _normalizer.parseObjectToString(periodObject)

        expect(periodString).toEqual(periodMockString)
        expect(periodObject).toEqual(periodMockObject)
    });
    it('Should returns when there is some stops', () => {
        const periodObject = _normalizer.parsePeriodTime(runningTimerProxyWithStops as Timer, dateMockEnd.getTime())
        const periodString = _normalizer.parseObjectToString(periodObject)

        expect(periodString).toEqual(periodMockString)
        expect(periodObject).toEqual(periodMockObject)
    });
});