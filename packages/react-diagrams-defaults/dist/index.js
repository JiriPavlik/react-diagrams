!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["projectstorm/react-diagrams-defaults"]=t():e["projectstorm/react-diagrams-defaults"]=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=15)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@emotion/styled")},function(e,t){e.exports=require("@projectstorm/react-diagrams-core")},function(e,t){e.exports=require("@projectstorm/react-canvas-core")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(2);t.DefaultLabelModel=class extends o.LabelModel{constructor(e={}){super(Object.assign({},e,{offsetY:null==e.offsetY?-23:e.offsetY,type:"default"}))}setLabel(e){this.options.label=e}deserialize(e){super.deserialize(e),this.options.label=e.data.label}serialize(){return Object.assign({},super.serialize(),{label:this.options.label})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(2),r=n(4),s=n(18);t.DefaultLinkModel=class extends o.LinkModel{constructor(e={}){super(Object.assign({extId:"",type:"default",width:e.width||3,color:e.color||"gray",selectedColor:e.selectedColor||"rgb(0,192,255)",curvyness:50,dgType:"",attributes:[]},e))}calculateControlOffset(e){return e.getOptions().alignment===o.PortModelAlignment.RIGHT?[this.options.curvyness,0]:e.getOptions().alignment===o.PortModelAlignment.LEFT?[-this.options.curvyness,0]:e.getOptions().alignment===o.PortModelAlignment.TOP?[0,-this.options.curvyness]:[0,this.options.curvyness]}getSVGPath(){if(2==this.points.length){const e=new s.BezierCurve;return e.setSource(this.getFirstPoint().getPosition()),e.setTarget(this.getLastPoint().getPosition()),e.setSourceControl(this.getFirstPoint().getPosition().clone()),e.setTargetControl(this.getLastPoint().getPosition().clone()),this.sourcePort&&e.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort())),this.targetPort&&e.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort())),e.getSVGCurve()}}serialize(){return Object.assign({},super.serialize(),{width:this.options.width,color:this.options.color,curvyness:this.options.curvyness,selectedColor:this.options.selectedColor})}deserialize(e){super.deserialize(e),this.options.color=e.data.color,this.options.width=e.data.width,this.options.curvyness=e.data.curvyness,this.options.selectedColor=e.data.selectedColor}addLabel(e){if(e instanceof o.LabelModel)return super.addLabel(e);let t=new r.DefaultLabelModel;return t.setLabel(e),super.addLabel(t)}setWidth(e){this.options.width=e,this.fireEvent({width:e},"widthChanged")}setColor(e){this.options.color=e,this.fireEvent({color:e},"colorChanged")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(2),r=n(5);class s extends o.PortModel{constructor(e,t,n){t&&(e={in:!!e,name:t,label:n}),e=e,super(Object.assign({label:e.label||e.name,alignment:e.in?o.PortModelAlignment.LEFT:o.PortModelAlignment.RIGHT,type:"default"},e))}deserialize(e){super.deserialize(e),this.options.in=e.data.in,this.options.label=e.data.label}serialize(){return Object.assign({},super.serialize(),{in:this.options.in,label:this.options.label})}link(e,t){let n=this.createLinkModel(t);return n.setSourcePort(this),n.setTargetPort(e),n}canLinkToPort(e){return!(e instanceof s)||this.options.in!==e.getOptions().in}createLinkModel(e){let t=super.createLinkModel();return!t&&e?e.generateModel({}):t||new r.DefaultLinkModel}}t.DefaultPortModel=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(1);var s;!function(e){e.Label=r.default.div`
		background: rgba(0, 0, 0, 0.8);
		border-radius: 5px;
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		font-family: sans-serif;
		user-select: none;
	`}(s||(s={}));t.DefaultLabelWidget=class extends o.Component{render(){return o.createElement(s.Label,null,this.props.model.getOptions().label)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(2),s=n(9),i=n(10);t.DefaultLinkWidget=class extends o.Component{constructor(e){super(e),this.refPaths=[],this.state={selected:!1}}componentDidUpdate(){this.props.link.setRenderedPaths(this.refPaths.map(e=>e.current))}componentDidMount(){this.props.link.setRenderedPaths(this.refPaths.map(e=>e.current))}componentWillUnmount(){this.props.link.setRenderedPaths([])}addPointToLink(e,t){if(!e.shiftKey&&!this.props.link.isLocked()&&this.props.link.getPoints().length-1<=this.props.diagramEngine.getMaxNumberPointsPerLink()){const n=new r.PointModel({link:this.props.link,position:this.props.diagramEngine.getRelativeMousePoint(e)});this.props.link.addPoint(n,t),e.persist(),e.stopPropagation(),this.forceUpdate(()=>{this.props.diagramEngine.getActionEventBus().fireAction({event:e,model:n})})}}generatePoint(e){return o.createElement(s.DefaultLinkPointWidget,{key:e.getID(),point:e,colorSelected:this.props.link.getOptions().selectedColor,color:this.props.link.getOptions().color})}generateLink(e,t,n){const r=o.createRef();return this.refPaths.push(r),o.createElement(i.DefaultLinkSegmentWidget,{key:`link-${n}`,path:e,selected:this.state.selected,diagramEngine:this.props.diagramEngine,factory:this.props.diagramEngine.getFactoryForLink(this.props.link),link:this.props.link,forwardRef:r,onSelection:e=>{this.setState({selected:e})},extras:t})}render(){var e=this.props.link.getPoints(),t=[];if(this.refPaths=[],2===e.length)t.push(this.generateLink(this.props.link.getSVGPath(),{onMouseDown:e=>{this.addPointToLink(e,1)}},"0")),null==this.props.link.getTargetPort()&&t.push(this.generatePoint(e[1]));else{for(let n=0;n<e.length-1;n++)t.push(this.generateLink(r.LinkWidget.generateLinePath(e[n],e[n+1]),{"data-linkid":this.props.link.getID(),"data-point":n,onMouseDown:e=>{this.addPointToLink(e,n+1)}},n));for(let n=1;n<e.length-1;n++)t.push(this.generatePoint(e[n]));null==this.props.link.getTargetPort()&&t.push(this.generatePoint(e[e.length-1]))}return o.createElement("g",{"data-default-link-test":this.props.link.getOptions().testName},t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(1);var s;!function(e){e.PointTop=r.default.circle`
		pointer-events: all;
	`}(s||(s={}));t.DefaultLinkPointWidget=class extends o.Component{constructor(e){super(e),this.state={selected:!1}}render(){const{point:e}=this.props;return o.createElement("g",null,o.createElement("circle",{cx:e.getPosition().x,cy:e.getPosition().y,r:5,fill:this.state.selected||this.props.point.isSelected()?this.props.colorSelected:this.props.color}),o.createElement(s.PointTop,{className:"point",onMouseLeave:()=>{this.setState({selected:!1})},onMouseEnter:()=>{this.setState({selected:!0})},"data-id":e.getID(),"data-linkid":e.getLink().getID(),cx:e.getPosition().x,cy:e.getPosition().y,r:15,opacity:0}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);t.DefaultLinkSegmentWidget=class extends o.Component{render(){const e=o.cloneElement(this.props.factory.generateLinkSegment(this.props.link,this.props.selected||this.props.link.isSelected(),this.props.path),{ref:this.props.forwardRef}),t=o.cloneElement(e,Object.assign({strokeLinecap:"round",onMouseLeave:()=>{this.props.onSelection(!1)},onMouseEnter:()=>{this.props.onSelection(!0)}},this.props.extras,{ref:null,"data-linkid":this.props.link.getID(),strokeOpacity:this.props.selected?.1:0,strokeWidth:20,fill:"none",onContextMenu:()=>{this.props.link.isLocked()||(event.preventDefault(),this.props.link.remove())}}));return o.createElement("g",null,e,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(12),r=n(2),s=n(6);t.DefaultNodeModel=class extends r.NodeModel{constructor(e={},t){"string"==typeof e&&(e={name:e,color:t}),super(Object.assign({id:"",type:"default",name:"Untitled",color:"rgb(0,192,255)",attributes:[]},e)),this.portsOut=[],this.portsIn=[]}doClone(e,t){t.portsIn=[],t.portsOut=[],super.doClone(e,t)}removePort(e){super.removePort(e),e.getOptions().in?this.portsIn.splice(this.portsIn.indexOf(e)):this.portsOut.splice(this.portsOut.indexOf(e))}addPort(e){return super.addPort(e),e.getOptions().in?-1===this.portsIn.indexOf(e)&&this.portsIn.push(e):-1===this.portsOut.indexOf(e)&&this.portsOut.push(e),e}addInPort(e,t=!0){const n=new s.DefaultPortModel({in:!0,name:e,label:e,alignment:r.PortModelAlignment.LEFT});return t||this.portsIn.splice(0,0,n),this.addPort(n)}addOutPort(e,t=!0){const n=new s.DefaultPortModel({in:!1,name:e,label:e,alignment:r.PortModelAlignment.RIGHT});return t||this.portsOut.splice(0,0,n),this.addPort(n)}deserialize(e){super.deserialize(e),this.options.name=e.data.name,this.options.color=e.data.color,this.portsIn=o.map(e.data.portsInOrder,e=>this.getPortFromID(e)),this.portsOut=o.map(e.data.portsOutOrder,e=>this.getPortFromID(e))}serialize(){return Object.assign({},super.serialize(),{name:this.options.name,color:this.options.color,portsInOrder:o.map(this.portsIn,e=>e.getID()),portsOutOrder:o.map(this.portsOut,e=>e.getID())})}getInPorts(){return this.portsIn}getOutPorts(){return this.portsOut}}},function(e,t){e.exports=require("lodash")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(12),s=n(14),i=n(1),l=n(21);var a;!function(e){e.Node=i.default.div`
		background-color: ${e=>e.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${e=>e.selected?"rgb(0,192,255)":"black"};
	`,e.Title=i.default.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`,e.TitleName=i.default.div`
		flex-grow: 1;
		padding: 5px 5px;
	`,e.Ports=i.default.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`,e.PopoverParent=i.default.div`
		background: gray;
		color: white;
		padding: 0.3rem;
		margin: 0.2rem 0.1rem;
	`,e.PortsContainer=i.default.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`}(a||(a={}));t.DefaultNodeWidget=class extends o.Component{constructor(){super(...arguments),this.generatePort=e=>o.createElement(s.DefaultPortLabel,{engine:this.props.engine,port:e,key:e.getID()})}render(){const{node:e}=this.props;return o.createElement(a.Node,{key:e.getOptions().id,"data-default-node-name":e.getOptions().name,selected:this.props.node.isSelected(),background:this.props.node.getOptions().color},o.createElement(a.Title,null,o.createElement(a.TitleName,null,e.getOptions().name)),o.createElement(l.NodeAttributes,{node:e,parent:o.createElement(a.PopoverParent,null,"Edit")}),o.createElement(a.Ports,null,o.createElement(a.PortsContainer,null,r.map(e.getInPorts(),this.generatePort)),o.createElement(a.PortsContainer,null,r.map(e.getOutPorts(),this.generatePort))))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(2),s=n(1);var i;!function(e){e.PortLabel=s.default.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`,e.Label=s.default.div`
		padding: 0 5px;
		flex-grow: 1;
	`,e.Port=s.default.div`
		width: 15px;
		height: 15px;
		background: rgba(white, 0.1);

		&:hover {
			background: rgb(192, 255, 0);
		}
	`}(i||(i={}));t.DefaultPortLabel=class extends o.Component{render(){const e=o.createElement(r.PortWidget,{engine:this.props.engine,port:this.props.port},o.createElement(i.Port,null)),t=o.createElement(i.Label,null,this.props.port.getOptions().label);return o.createElement(i.PortLabel,null,this.props.port.getOptions().in?e:t,this.props.port.getOptions().in?t:e)}}},function(e,t,n){"use strict";function o(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),o(n(16)),o(n(4)),o(n(7)),o(n(17)),o(n(5)),o(n(8)),o(n(10)),o(n(9)),o(n(20)),o(n(11)),o(n(13)),o(n(24)),o(n(14)),o(n(6))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(4),s=n(7),i=n(3);t.DefaultLabelFactory=class extends i.AbstractReactFactory{constructor(){super("default")}generateReactWidget(e){return o.createElement(s.DefaultLabelWidget,{model:e.model})}generateModel(e){return new r.DefaultLabelModel}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(5),s=n(8),i=n(1),l=n(19),a=n(3);var d;!function(e){e.Keyframes=l.keyframes`
		from {
			stroke-dashoffset: 24;
		}
		to {
			stroke-dashoffset: 0;
		}
	`;const t=l.css`
		stroke-dasharray: 10, 2;
		animation: ${e.Keyframes} 1s linear infinite;
	`;e.Path=i.default.path`
		${e=>e.selected&&t};
		fill: none;
		pointer-events: all;
	`}(d||(d={}));t.DefaultLinkFactory=class extends a.AbstractReactFactory{constructor(e="default"){super(e)}generateReactWidget(e){return o.createElement(s.DefaultLinkWidget,{link:e.model,diagramEngine:this.engine})}generateModel(e){return new r.DefaultLinkModel}generateLinkSegment(e,t,n){return o.createElement(d.Path,{selected:t,stroke:t?e.getOptions().selectedColor:e.getOptions().color,strokeWidth:e.getOptions().width,d:n})}}},function(e,t){e.exports=require("@projectstorm/geometry")},function(e,t){e.exports=require("@emotion/core")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(11),s=n(13),i=n(3);t.DefaultNodeFactory=class extends i.AbstractReactFactory{constructor(){super("default")}generateReactWidget(e){return o.createElement(s.DefaultNodeWidget,{engine:this.engine,node:e.model})}generateModel(e){return new r.DefaultNodeModel}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(1),s=n(0),i=n(22),l=n(23);var a;!function(e){e.Attributes=r.default.div`
		display: flex;
		padding: 0.5rem 1rem;
		flex-direction: column;
		white-space: nowrap;
		justify-items: center;
	`,e.PopoverParent=r.default.div``}(a||(a={})),t.NodeAttributes=e=>{const{node:t,parent:n}=e,[r,d]=s.useState(t.getOptions().attributes),[c,u]=s.useState(!1);return o.createElement(o.Fragment,null,o.createElement(a.Attributes,null,0!==r.length&&r.map(e=>Object.keys(e).map(t=>o.createElement("div",{key:t},`${t}: ${e[t]}`)))),o.createElement(i,{isOpen:c,preferPlace:"column",onOuterAction:()=>u(!1),place:"below",tipSize:.01,enterExitTransitionDurationMs:0,style:{zIndex:1},target:{parent:n},body:o.createElement(l.NodeEditDialog,{node:t,onClose:u})},o.createElement(a.PopoverParent,{onClick:()=>u(!c)},n)))},t.default=t.NodeAttributes},function(e,t){e.exports=require("react-popover")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),r=n(1);var s;!function(e){e.ContentMenu=r.default.div`
		padding: 0.5rem;
		border-radius: 3px;
		border: 1px solid black;
		background: white;
		color: black;
	`,e.Attributes=r.default.div`
		display: flex;
		padding: 0.2rem;
		flex-direction: column;
		white-space: nowrap;
		justify-items: center;
	`,e.TitleName=r.default.div`
		flex-grow: 1;
		padding: 5px 5px;
		font-weight: bold;
	`,e.Buttons=r.default.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	`,e.Hr=r.default.hr`
		margin: 0.1rem;
	`}(s||(s={})),t.NodeEditDialog=e=>{const{node:t,onClose:n}=e,r=t.getOptions().attributes;return o.createElement(s.ContentMenu,null,o.createElement(s.TitleName,null,t.getOptions().name),o.createElement(s.Hr,null),o.createElement(s.Attributes,null,0!==r.length&&r.map(e=>Object.keys(e).map(t=>o.createElement("div",{key:t},`${t}: ${e[t]}`)))),o.createElement(s.Buttons,null,o.createElement("button",{onClick:()=>{n(!1)}},"Cancel"),o.createElement("button",{onClick:()=>{n(!1)}},"Apply")))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(6),r=n(3);t.DefaultPortFactory=class extends r.AbstractModelFactory{constructor(){super("default")}generateModel(){return new o.DefaultPortModel({name:"unknown"})}}}])});