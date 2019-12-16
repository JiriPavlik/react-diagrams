import { DefaultNodeModel } from './DefaultNodeModel';
import * as React from 'react';
import styled from '@emotion/styled';

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

	export const Buttons = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	`;

	export const Hr = styled.hr`
		margin: 0.1rem;
	`;
}

export interface NodeContextMenuProps {
	node: DefaultNodeModel;
	onClose: (open: boolean) => void;
}

export const NodeEditDialog = (props: NodeContextMenuProps) => {
	const { node, onClose } = props;

	const attributes = node.getOptions().attributes;

	const handleCancelClick = () => {
		onClose(false);
	};

	const handleApplyClick = () => {
		onClose(false);
	};

	return (
		<S.ContentMenu>
			<S.TitleName>{node.getOptions().name}</S.TitleName>
			<S.Hr />
			<S.Attributes>
				{attributes.length !== 0 &&
					attributes.map(attr => Object.keys(attr).map(key => <div key={key}>{`${key}: ${attr[key]}`}</div>))}
			</S.Attributes>
			<S.Buttons>
				<button onClick={handleCancelClick}>Cancel</button>
				<button onClick={handleApplyClick}>Apply</button>
			</S.Buttons>
		</S.ContentMenu>
	);
};
