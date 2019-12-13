import * as React from 'react';
import * as _ from 'lodash';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultNodeModel } from './DefaultNodeModel';
import { DefaultPortLabel } from '../port/DefaultPortLabelWidget';
import styled from '@emotion/styled';
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu';
import { NodeContextMenu } from './NodeContextMenu';
import { NodeAttributes } from './NodeAttributes';

namespace S {
	export const Node = styled.div<{ background: string; selected: boolean }>`
		background-color: ${p => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${p => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;

	export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

	export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

	export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

	export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
}

export interface DefaultNodeProps {
	node: DefaultNodeModel;
	engine: DiagramEngine;
}

/**
 * Default node that models the DefaultNodeModel. It creates two columns
 * for both all the input ports on the left, and the output ports on the right.
 */
export class DefaultNodeWidget extends React.Component<DefaultNodeProps> {
	generatePort = port => {
		return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
	};

	render() {
		const { node } = this.props;

		return (
			<S.Node
				key={node.getOptions().id}
				// onContextMenu={e => this.handleContextMenu(e)}
				data-default-node-name={node.getOptions().name}
				selected={this.props.node.isSelected()}
				background={this.props.node.getOptions().color}>
				<S.Title>
					<S.TitleName>{node.getOptions().name}</S.TitleName>
				</S.Title>
				<ContextMenuTrigger id={node.getOptions().id}>
					<NodeAttributes node={node} />
				</ContextMenuTrigger>
				<ContextMenu id={node.getOptions().id}>
					<NodeContextMenu node={node}></NodeContextMenu>
				</ContextMenu>
				<S.Ports>
					<S.PortsContainer>{_.map(node.getInPorts(), this.generatePort)}</S.PortsContainer>
					<S.PortsContainer>{_.map(node.getOutPorts(), this.generatePort)}</S.PortsContainer>
				</S.Ports>
			</S.Node>
		);
	}
}
