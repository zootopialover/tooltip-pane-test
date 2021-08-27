import React from 'react';
import ToolTip from './components/Tooltip';
import Button from './components/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setupRefs();

    this.setupEvents();
  }
  setupRefs() {
    this.toolTip = React.createRef();
  }
  setupEvents() {
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }
  handleOnMouseOut(evt) {
    this.toolTip.current.hide();
  }
  handleOnMouseOver(evt) {
    this.toolTip.current.show(evt);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ToolTip ref={this.toolTip}>
            Hi, this is tooltip example
          </ToolTip>

          <Button id={'btn'} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>Hi, This is test<br /> What is question?</Button>
        </header>
      </div>
    );
  }
}

export default App;
