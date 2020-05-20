import * as React from 'react';
import { connect } from 'react-redux';
import { popupShownFn } from '../../actions/Popup-actions';
import './info-popup.css';
import { Alert } from "react-bootstrap";


const popupElem = (text, isSuccess) => {
  return (
      <div className={"info-popup"}>
        <Alert variant={`${isSuccess ? `success` : 'danger'}`}>
          <span>{`${text}`}</span>
        </Alert>
      </div>
  );
}

const InfoPopup = (props) => {

  setTimeout(props.popupShownFn, 5000);

  return !props.popupShown && props.userStatus === 'failed' ? (
    popupElem(`${props.popupText} Error`, false)
  ) : !props.popupShown && props.userStatus === 'received' ? (
    popupElem(`${props.popupText} Success`, true)
  ) : null;
}

const mapDispatchToProps = { popupShownFn };

const mapStateToProps = ({authReducer: { userStatus, popupShown, popupText }}) => ({
  userStatus,
  popupShown,
  popupText
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPopup);