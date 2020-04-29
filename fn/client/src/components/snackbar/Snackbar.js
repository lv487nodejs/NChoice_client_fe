import React from 'react'
import { Toast, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import './snackbar.css';
const Snackbar = ({ showSnackbar, snackbarText }) => {

    return (
        <Row>
            <Col xs={6}>
                <Toast show={showSnackbar}>
                    <Toast.Body>{snackbarText}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}
const mapStateToProps = ({ snackbarReducer: { showSnackbar,snackbarText } }) => ({
    showSnackbar,
    snackbarText,
})
export default connect(mapStateToProps)(Snackbar);