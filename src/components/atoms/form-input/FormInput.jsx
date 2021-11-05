import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.scss'

FormInput.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func,
  errors: PropTypes.object,
  type: PropTypes.string,
};

FormInput.defaultProps = {
  label: '',
  register: null,
  errors: null,
  type: 'text',
};

function FormInput(props) {
  const { label, name, register, errors, type } = props;

  return (
    <div className="form-input">
      <label>{label}</label>
      <input type={type} {...register(name)} />
      {errors[name] && <p>{errors[name]?.message}</p>}
    </div>
  );
}

export default FormInput;