export interface Set {
    id: string
    name: string
    contents?: { id: string; content: string }[]
}

export interface TimerRule {
    id: string
    type: 'perMin'
    value: number
    disabled: boolean
}

export interface Timer {
    id: string
    name: string
    sets: string[]
    rules: TimerRule[]
    disabled: boolean
}
