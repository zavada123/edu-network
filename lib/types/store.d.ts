import type { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react';
import { type WireTransfer } from './engine/network.js';
import type { DeviceKind } from './engine/device.js';
import { type SaveFile } from './engine/serialize.js';
import type { LabDef } from './labs/types.js';
export interface DevNodeData extends Record<string, unknown> {
    kind: DeviceKind;
    label: string;
    ips: string[];
    fw?: boolean;
}
export interface DropFlash {
    id: number;
    deviceId: string;
    start: number;
    until: number;
}
export type DevNode = Node<DevNodeData>;
/** kids: grades 5–9, no terminal, simple device form. full: the original netsim with terminals. */
export type Mode = 'kids' | 'full';
/** Set when a host page embeds one exercise: no autosave, no shared links, changes go to `onChange`. */
export interface EmbedHooks {
    onChange?: (network: SaveFile) => void;
    onCheck?: (ok: boolean) => void;
}
interface NetsimState {
    nodes: DevNode[];
    edges: Edge[];
    packets: WireTransfer[];
    dropFlashes: DropFlash[];
    clock: number;
    uiPulse: number;
    selected: string | null;
    terminals: string[];
    activeTerminal: string | null;
    paused: boolean;
    speed: number;
    notice: string | null;
    mode: Mode;
    /** Bumped whenever a whole new network is loaded, so the canvas can re-fit. */
    loadSeq: number;
    /** The last «Перевірити зв'язок» run from the device form. */
    connTest: {
        fromId: string;
        to: string;
        state: 'running' | 'ok' | 'fail';
        detail: string;
    } | null;
    lab: LabDef | null;
    labStep: number;
    labResults: Record<string, {
        pass: boolean;
        detail: string;
    }>;
    labChecking: boolean;
    quizAnswers: Record<string, number>;
    addDeviceAt(kind: DeviceKind, pos: {
        x: number;
        y: number;
    }): void;
    onNodesChange(changes: NodeChange<DevNode>[]): void;
    onEdgesChange(changes: EdgeChange[]): void;
    onConnect(c: Connection): void;
    select(id: string | null): void;
    deleteDevice(id: string): void;
    renameDevice(id: string, name: string): void;
    setIfaceIp(deviceId: string, ifaceName: string, value: string): string | null;
    toggleIface(deviceId: string, ifaceName: string): void;
    setServices(deviceId: string, proto: 'tcp' | 'udp', text: string): string | null;
    copyDeviceConfig(deviceId: string): void;
    setNameserver(deviceId: string, text: string): string | null;
    toggleDhcpServer(deviceId: string): void;
    setDhcpField(deviceId: string, field: 'rangeStart' | 'rangeEnd' | 'router' | 'dns', text: string): string | null;
    toggleDnsServer(deviceId: string): void;
    setDnsRecords(deviceId: string, text: string): string | null;
    toggleHttpServer(deviceId: string): void;
    setHttpPort(deviceId: string, text: string): string | null;
    setHttpBody(deviceId: string, text: string): void;
    toggleRip(deviceId: string): void;
    setPortVlan(deviceId: string, port: string, text: string): string | null;
    setSsid(deviceId: string, text: string): string | null;
    openTerminal(id: string): void;
    closeTerminal(id: string): void;
    setActiveTerminal(id: string): void;
    refresh(): void;
    tick(dtMs: number): void;
    setPaused(p: boolean): void;
    setSpeed(s: number): void;
    setNotice(msg: string | null): void;
    newTopology(): void;
    loadDemo(): void;
    exportJson(): void;
    exportConfigs(): void;
    exportContainerlab(): void;
    exportCompose(): void;
    exportSvg(): void;
    exportPng(): void;
    exportReport(): void;
    importJson(text: string): string | null;
    shareUrl(): void;
    boot(mode?: Mode): void;
    /** Opens one exercise for a host page. `start` is the network to reset to with «Почати спочатку». */
    embedLab(file: SaveFile, start: SaveFile, hooks: EmbedHooks): void;
    resetLab(): void;
    embedded: boolean;
    selfCheck: boolean;
    onNext: (() => void) | null;
    setEmbedOptions(o: {
        selfCheck: boolean;
        onNext: (() => void) | null;
        hooks: EmbedHooks | null;
    }): void;
    setGateway(deviceId: string, text: string): string | null;
    testConnection(fromId: string, toName: string): void;
    loadKidsLab(index: number): void;
    loadBundledLab(index: number): void;
    loadExample(index: number): void;
    setLabStep(step: number): void;
    answerQuiz(qid: string, choice: number): void;
    checkStep(): void;
    exportAttempt(): void;
    closeLab(): void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NetsimState>>;
export {};
