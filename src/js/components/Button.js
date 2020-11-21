import * as React from 'react';
import { referrerIsSameDomain } from '../utils/helpers';
import { useHistory } from 'react-router-dom';

export default function Button({ actionType, className, ...props }) {
  const history = useHistory();
  const defaultOnclick =
    actionType === 'cancel'
      ? () => {
          referrerIsSameDomain() ? history.goBack() : history.push('/');
        }
      : () => {
          console.warn('No Button Click Handler present.');
        };

  const defaultProps = {
    className: className ? `btn ${className}` : 'btn',
    type: 'button',
    children: `Unlabelled Button`,
    onClick: defaultOnclick
  };

  return <button {...defaultProps} {...props}></button>;
}
