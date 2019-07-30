import { AbstractMouseAction } from '../../core-actions/AbstractMouseAction';
import { DiagramModel } from '../../models/DiagramModel';
import * as _ from 'lodash';
import { DiagramEngine } from '../../DiagramEngine';
import { MouseEvent } from 'react';

export class SelectingAction extends AbstractMouseAction {
	mouseX2: number;
	mouseY2: number;

	constructor(mouseX: number, mouseY: number, engine: DiagramEngine) {
		super(mouseX, mouseY, engine);
		this.mouseX2 = mouseX;
		this.mouseY2 = mouseY;
	}

	getBoxDimensions() {
		return {
			left: this.mouseX2 > this.mouseX ? this.mouseX : this.mouseX2,
			top: this.mouseY2 > this.mouseY ? this.mouseY : this.mouseY2,
			width: Math.abs(this.mouseX2 - this.mouseX),
			height: Math.abs(this.mouseY2 - this.mouseY),
			right: this.mouseX2 < this.mouseX ? this.mouseX : this.mouseX2,
			bottom: this.mouseY2 < this.mouseY ? this.mouseY : this.mouseY2
		};
	}

	containsElement(x: number, y: number, diagramModel: DiagramModel): boolean {
		var z = diagramModel.getZoomLevel() / 100.0;
		let dimensions = this.getBoxDimensions();

		return (
			x * z + diagramModel.getOffsetX() > dimensions.left &&
			x * z + diagramModel.getOffsetX() < dimensions.right &&
			y * z + diagramModel.getOffsetY() > dimensions.top &&
			y * z + diagramModel.getOffsetY() < dimensions.bottom
		);
	}

	fireMouseMove(event: MouseEvent) {
		var relative = this.engine.getRelativePoint(event.clientX, event.clientY);

		_.forEach(this.model.getNodes(), node => {
			// TODO use geometry instead
			if (this.containsElement(node.getX(), node.getY(), this.model)) {
				node.setSelected(true);
			}
		});

		_.forEach(this.model.getLinks(), link => {
			var allSelected = true;
			_.forEach(link.getPoints(), point => {
				if (this.containsElement(point.getX(), point.getY(), this.model)) {
					point.setSelected(true);
				} else {
					allSelected = false;
				}
			});

			if (allSelected) {
				link.setSelected(true);
			}
		});

		this.mouseX2 = relative.x;
		this.mouseY2 = relative.y;
	}

	fireMouseUp(event) {}

	fireMouseDown(event) {}
}