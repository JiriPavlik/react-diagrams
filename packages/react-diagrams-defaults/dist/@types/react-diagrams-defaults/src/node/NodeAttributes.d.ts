import * as React from 'react';
import { DefaultNodeModel } from './DefaultNodeModel';
export interface NodeAttributesProps {
    node: DefaultNodeModel;
    parent: React.ReactNode;
}
export declare const NodeAttributes: (props: NodeAttributesProps) => JSX.Element;
export default NodeAttributes;
