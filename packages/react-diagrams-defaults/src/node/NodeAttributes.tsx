import { DefaultNodeModel } from './DefaultNodeModel';
import * as React from 'react';
import styled from '@emotion/styled';

namespace S {
	export const Attributes = styled.div`
		display: flex;
		padding: 0.2rem;
		flex-direction: column;
		white-space: nowrap;
		justify-items: center;
	`;
}

export interface NodeAttributesProps {
	node: DefaultNodeModel;
}

export const NodeAttributes = (props: NodeAttributesProps) => {
	const { node } = props;

	const attributes = node.getOptions().attributes;

	return (
		<S.Attributes>
			{attributes.length !== 0 &&
				attributes.map(attr => Object.keys(attr).map(key => <div key={key}>{`${key}: ${attr[key]}`}</div>))}
		</S.Attributes>
	);
};
