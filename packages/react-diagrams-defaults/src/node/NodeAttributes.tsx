import * as React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as ReactPopover from 'react-popover';
import { DefaultNodeModel } from './DefaultNodeModel';
import { NodeEditDialog } from './NodeEditDialog';

namespace S {
	export const Attributes = styled.div`
		display: flex;
		padding: 0.5rem 1rem;
		flex-direction: column;
		white-space: nowrap;
		justify-items: center;
	`;

	export const PopoverParent = styled.div``;
}

export interface NodeAttributesProps {
	node: DefaultNodeModel;
	parent: React.ReactNode;
}

export const NodeAttributes = (props: NodeAttributesProps) => {
	const { node, parent } = props;
	const [attributes, setAttributes] = useState(node.getOptions().attributes);
	const [open, setOpen] = useState(false);

	return (
		<React.Fragment>
			<S.Attributes>
				{attributes.length !== 0 &&
					attributes.map(attr => Object.keys(attr).map(key => <div key={key}>{`${key}: ${attr[key]}`}</div>))}
			</S.Attributes>
			<ReactPopover
				isOpen={open}
				preferPlace={'column'}
				onOuterAction={() => {}}
				place={'below'}
				tipSize={0.01}
				enterExitTransitionDurationMs={0}
				style={{ zIndex: 1 }}
				target={{ parent }}
				body={<NodeEditDialog node={node} onClose={setOpen} />}>
				<S.PopoverParent onClick={() => setOpen(!open)}>{parent}</S.PopoverParent>
			</ReactPopover>
		</React.Fragment>
	);
};
