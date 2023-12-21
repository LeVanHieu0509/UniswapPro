import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

class PortalScanBarcode extends React.Component {
  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    if (this.script) {
      document.body.removeChild(this.script);
    }
    this.defaultNode = null;
    this.script = null;
  }

  render() {
    if (!canUseDOM) {
      return null;
    }
    if ((!this.props.node && !this.defaultNode) || (!this.props.node && !this.script)) {
      this.defaultNode = document.createElement("div");
      this.script = document.createElement("script");

      this.script.async = true;
      this.script.src = `/js/index.js`;
      this.script.type = "text/babel";

      if (this.props.className) {
        this.defaultNode.classList.add(this.props.className);
      }
      document.body.appendChild(this.defaultNode);
      document.body.appendChild(this.script);
    }

    return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode || this.script);
  }
}

PortalScanBarcode.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any,
};

export default PortalScanBarcode;
