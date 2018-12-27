import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/TextField';
import { color } from '../../styles/base';
import { fontSize } from '../../styles/typography';

const styles = () => ({

  inputTextProps: {
    color: color.veryDarkGrey,
    fontSize: fontSize.medium,

  },

  labelTextProps: {
    color: color.brownishGrey,
    fontSize: fontSize.medium,
  },

  cssLabel: {
    '&$cssFocused': {
      color: color.brownishGrey,
    },
  },
  cssFocused: {},

  underline: {
    '&:after': {
      borderBottom: `2px solid ${color.tealish}`,
    },
  },
});

const InputText = props => (
  <div
    className={props.className}>
    <TextField
      type={props.type}
      label={props.label}
      value={props.value ? props.value : ''}
      disabled={props.disabled}
      error={props.error}
      fullWidth
      defaultValue={props.defaultValue}
      helperText={props.error ? props.errorText : props.helperText}
      onChange={event => props.onChange(props.propName, event.target.value)}
      InputProps={{
        className: props.classes.inputTextProps,
        readOnly: props.readOnly,
        classes: {
          underline: props.classes.underline,
        },
      }}

      InputLabelProps={{
        className: props.classes.labelTextProps,
        FormLabelClasses: {
          root: props.classes.cssLabel,
          focused: props.classes.cssFocused,
        }
      }}
    />
  </div>
);

InputText.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputText);
