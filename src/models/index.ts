export interface Set {
    id: string
    name: string
    contents?: { id: string; content: string }[]
}

export interface TimerRule {}

export interface Timer {
    id: string
    name: string
    sets: string[]
    rules: TimerRule[]
}
