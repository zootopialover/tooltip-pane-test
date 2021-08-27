import React from 'react';
import './Tooltip.css';

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, x: 0, y: 0, type: "none" };
    this.tooltipRef = React.createRef();
    this.timeout = null;
  }
  render() {
    let { state } = this;
    let visibility = state.visible === true ? "on" : "off";

    let style = {
      left: ((state.x + window.scrollX) + 'px'),
      top: ((state.y + window.scrollY) + 'px')
    };

    let classNames = {};

    if (state.type !== null && state.type !== "none") {
      classNames[state.type] = true;
    }

    classNames[visibility] = true;

    return (
      <div id="tooltip" ref={this.tooltipRef} className={Object.keys(classNames).join(" ")} style={style}>
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">
          <div className="tooltip-close"></div>
          {this.props.children}
        </div>
      </div>
    );
  }
  show(evt) {
    let { pastShow } = this;
    let el = evt.currentTarget;
    if (el !== null) {
      let rect = el.getBoundingClientRect();
      this.setState({ visible: true }, pastShow.bind(this, rect))
      this.timeout && clearTimeout(this.timeout);

      if (this.props.autoHide && this.props.autoHide > 0) {
        this.timeout = setTimeout(() => {
          this.hide();
        }, this.props.autoHide)
      }
    }
  }
  hide() {
    this.setState({ visible: false })
  }

  pastShow(hoverRect) {
    // position the tooltip after showing it
    let ttNode = this.tooltipRef.current;

    if (ttNode != null) {
      let x = 0, y = 0;

      const docWidth = document.documentElement.clientWidth,
        docHeight = document.documentElement.clientHeight;

      let rx = hoverRect.x + hoverRect.width, // most right x
        lx = hoverRect.x, // most left x
        ty = hoverRect.y, // most top y
        by = hoverRect.y + hoverRect.height; // most bottom y

      // tool tip rectange
      let ttRect = ttNode.getBoundingClientRect();

      let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
      let bLeft = (lx - ttRect.width) >= 0;

      let bAbove = (ty - ttRect.height) >= 0;
      let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight);

      let newState = {};

      // the tooltip doesn't fit to the right
      if (bRight) {
        x = rx;

        y = ty + (hoverRect.height - ttRect.height) / 2;

        if (y < 0) {
          y = ty;
        }

        newState.type = "right";
      }
      else if (bLeft) {
        x = lx - ttRect.width;

        y = ty + (hoverRect.height - ttRect.height) / 2;

        if (y < 0) {
          y = ty;
        }

        newState.type = "left";
      }
      if (bAbove) {
        y = ty - ttRect.height;

        x = lx + (hoverRect.width - ttRect.width) / 2;

        if (x < 0) {
          x = lx;
        }

        newState.type = "top";
      }
      if (bBellow) {
        y = by;

        x = lx + (hoverRect.width - ttRect.width) / 2;

        if (x < 0) {
          x = lx;
        }

        newState.type = "bottom";
      }

      newState = { ...newState, x: x, y: y };

      this.setState(newState);
    }
  }
}