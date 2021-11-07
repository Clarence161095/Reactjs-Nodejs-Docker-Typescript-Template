import { WarningOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import './FormInput.scss';

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  input: PropTypes.object,
};

FormInput.defaultProps = {
  input: {},
};

function FormInput(props: any) {
  const { name, control, input } = props;
  const { defaultValue, type } = input;

  return (
    <div className="form-input">

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) =>
        (<>

          {
            type === 'password' && <Input.Password
              className={fieldState.error && '--error'}
              {...input}
              {...field}
            />
          }

          {
            type !== 'password' && <Input
              className={fieldState.error && '--error'}
              {...input}
              {...field}
            />
          }

          {
            fieldState.error &&
            <div className="form-input-error">
              <WarningOutlined className='form-input-error-icon' />
              <p>{fieldState.error?.message}</p>
            </div>
          }
        </>)
        }
      />

    </div>
  );
}

export default FormInput;