// npm packages
import React from 'react';
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

const TextField = ({name, placeHolder, showError, text, onFieldChange, errorText}) => (
  <FormGroup controlId={name} validationState={showError && errorText !== '' ? 'error' : null}>
    <FormControl
      name={name}
      type="text"
      placeholder={placeHolder}
      value={text}
      onChange={onFieldChange}
    />
    {showError && errorText !== '' ? <HelpBlock>{errorText}</HelpBlock> : ''}
    {showError && errorText !== '' ? <FormControl.Feedback /> : ''}
  </FormGroup>
);

TextField.propTypes = {
  name: React.PropTypes.string.isRequired,
  placeHolder: React.PropTypes.string.isRequired,
  showError: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired,
  onFieldChange: React.PropTypes.func.isRequired,
  errorText: React.PropTypes.string.isRequired,
};

export default TextField;
