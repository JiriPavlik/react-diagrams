import { DefaultNodeModel } from './DefaultNodeModel';
import * as React from 'react';
import styled from '@emotion/styled';
import { NodeAttributes } from './NodeAttributes';

namespace S {
	export const ContentMenu = styled.div`
		padding: 0.5rem;
		border-radius: 3px;
		border: 1px solid black;
		background: white;
		color: black;
	`;

	export const Attributes = styled.div`
		display: flex;
		padding: 0.2rem;
		flex-direction: column;
		white-space: nowrap;
		justify-items: center;
	`;

	export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
		font-weight: bold;
	`;
}

export interface NodeContextMenuProps {
	node: DefaultNodeModel;
}

export const NodeContextMenu = (props: NodeContextMenuProps) => {
	const { node } = props;

	return (
		<S.ContentMenu>
			<S.TitleName>{node.getOptions().name}</S.TitleName>
			<hr />
			<NodeAttributes node={node}></NodeAttributes>
		</S.ContentMenu>
	);
};
