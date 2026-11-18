import type { Network } from '../engine/network';
import type { NetInterface } from '../engine/device';
import { IpDevice } from '../engine/ipdevice';
interface Attachment {
    device: IpDevice;
    iface: NetInterface;
}
interface Segment {
    name: string;
    attachments: Attachment[];
    subnet: string | null;
}
export declare function computeSegments(net: Network): Segment[];
export declare function composeYaml(net: Network): string;
export {};
