/// <reference types="react" />
import { DefaultNodeModel } from './DefaultNodeModel';
export interface NodeContextMenuProps {
    node: DefaultNodeModel;
    onClose: (open: boolean) => void;
}
export declare const NodeEditDialog: (props: NodeContextMenuProps) => JSX.Element;
