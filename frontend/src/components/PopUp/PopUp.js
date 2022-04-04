import React from "react";
// import "./PopUp.css";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

const Popup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="confirm-btn"
          onClick={() => {
            props.setUser();
            props.setTrigger(false);
          }}
        >
          Confirm
        </button>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};
export default Popup;
