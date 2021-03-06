import React, {Component} from 'react';
import './dispose.css';

import Field from '../field/Field.js';
import Navy from '../navy/Navy.js';
import IntoBattleButton from './IntoBattleButton';
import Preloader from './Preloader';

import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import { DragDropContext } from 'react-dnd';


class Dispose extends Component {
  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      waiting: false,
      ready: false,
      side: null,
      width: null,
      x: null,
      y: null,
    };
    
    this.navyIsReady = this.navyIsReady.bind(this);
    this.waitingHandler = this.waitingHandler.bind(this);
  }
  
  componentDidMount() {
    let side = Math.floor(this.node.offsetWidth*0.03);
    side = side % 2 ? side + 1 : side;
    this.setState({
      x: this.node.getBoundingClientRect().left + this.node.offsetWidth*0.02 + side + 2,
      y: this.node.getBoundingClientRect().top + this.node.offsetWidth*0.02 + side + 2,
      width: this.node.offsetWidth,
      side
    });
  }
  
  navyIsReady() {
    this.setState({
      ready: true
    });
  }
  
  waitingHandler() {
    this.props.normalizeMatrixHandler();
    this.setState({
      waiting: true
    });
  }
  
  render() {
    let navy = null, field = null, intoBattleButton = null;
    const { side, x, y, width, ready, waiting } = this.state;
    const { matrix, changeMatrixHandler } = this.props;
    
    if (side) {
      navy = <Navy side={side} navyIsReady={this.navyIsReady}/>;
      field = <Field matrix={matrix} width={width}
                     x={x} y={y} side={side}
                     changeMatrixHandler={changeMatrixHandler}
                     waiting={waiting}/>;
      
      intoBattleButton = !waiting ?
        <IntoBattleButton side={side}
                         ready={ready}
                         waitingHandler={this.waitingHandler}
        /> :
        <Preloader side={side}/>;
    }
    
    const description = waiting ?
      'Enemy search' :
      'Drag to the field and click on ship to rotate';
    
    return (
      <div className={'dispose'} ref={(node)=>{this.node = node}}>
        {field} {navy} {intoBattleButton}
        <span className={'description-' + (waiting ? 'search' : 'dispose')}>
          {description}
        </span>
      </div>
    )
  }
}

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({enableMouseEvents: true}), // Note that you can call your backends with options
      preview: false,
      transition: TouchTransition
    }
  ]
};

export default DragDropContext(MultiBackend(HTML5toTouch))(Dispose);