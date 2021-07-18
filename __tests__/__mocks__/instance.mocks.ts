
export const dateMockStart = new Date('01-01-2021 00:00:00')
export const dateMockEnd = new Date('01-01-2021 01:00:00')

export const diffMockObject = {
    hours: 1,
    minutes: 0,
    seconds: 0
}


export const periodMockObject = {
    hours: 2,
    minutes: 30,
    seconds: 10
}

export const periodMockString = '02:30:10'

export const diffMockString = '01:00:00'

export const initialTimerProxy = {
    _instance: {
        startInstance: null,
    },
    stops: [],
    stopwatch:  {
        startTime: null,
        stopTime: null,
    }
}

export const runningTimerProxy = {
    _instance: {
        startInstance: 1609459200000,
    },
    stops: [],
    stopwatch:  {
        startTime: 1609459200000,
        stopTime: null,
    },
    onChange: () => {}
}

export const runningTimerProxyWithStop = {
    _instance: {
        startInstance: 1609459200000,
    },
    stops: [
        {
            start_at: 0,
            ends_at: 0,
            period: '01:30:10'
        }
    ],
    stopwatch:  {
        startTime: 1609459200000,
        stopTime: null,
    },
    onChange: () => {}
}

export const runningTimerProxyWithStops = {
    _instance: {
        startInstance: 1609459200000,
    },
    stops: [
        {
            start_at: 0,
            ends_at: 0,
            period: '00:20:00'
        },
        {
            start_at: 0,
            ends_at: 0,
            period: '01:00:10'
        },
        {
            start_at: 0,
            ends_at: 0,
            period: '00:10:00'
        }
    ],
    stopwatch:  {
        startTime: 1609459200000,
        stopTime: null,
    },
    onChange: () => {}
}