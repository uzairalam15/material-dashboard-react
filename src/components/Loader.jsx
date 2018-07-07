import React from "react";
import PropTypes from "prop-types";

export default function Loader(props) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" style={props.styles || {}}>
        <div className="dot1" />
        <div className="dot2" />
      </div>
    </div>
  );
}

Loader.propTypes = {
  styles: PropTypes.object
};
