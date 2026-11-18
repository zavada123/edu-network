export interface ScheduledEvent {
    t: number;
    seq: number;
    fn: () => void;
}
export declare class Scheduler {
    now: number;
    private seq;
    private queue;
    schedule(delay: number, fn: () => void): ScheduledEvent;
    cancel(ev: ScheduledEvent): void;
    advanceTo(t: number): void;
    get pending(): number;
}
