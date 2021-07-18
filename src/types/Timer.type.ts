export interface lap {
    start_at: Number | null,
    ends_at: Number | null,
    period: string | null,
}

export interface Timer {
    _instance: {
        startInstance: Number | null,
    },
    stopwatch: {
        startTime: Number | null,
        stopTime: Number | null,
    },
    stops: lap[],
    onChange: Function
}