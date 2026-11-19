import type { Network } from '../engine/network.js';
export interface NodePos {
    id: string;
    x: number;
    y: number;
}
export declare function topologySvg(net: Network, positions: NodePos[], title?: string): string;
export declare function svgToPngBlob(svg: string, scale?: number): Promise<Blob>;
