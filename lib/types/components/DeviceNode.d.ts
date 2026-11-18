import type { NodeProps } from '@xyflow/react';
import type { DevNode } from '../store';
import type { DeviceKind } from '../engine/device';
export declare const NODE_W = 96;
export declare const NODE_H = 78;
export declare function DeviceIcon({ kind, size }: {
    kind: DeviceKind;
    size?: number;
}): import("react").JSX.Element;
declare function DeviceNodeInner({ data, selected }: NodeProps<DevNode>): import("react").JSX.Element;
export declare const DeviceNode: import("react").MemoExoticComponent<typeof DeviceNodeInner>;
export {};
