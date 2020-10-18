import React from 'react';
import Button from './Button.js';

export default function Dialog({
  dialogOpen,
  setDialogOpen,
  handleConfirm,
  buttonConfirmLabel,
  children
}) {
  return (
    <div className={`dialog ${open ?? 'dialog--open'}`}>
      <p></p>
      {dialogOpen.toString()}
      {children}
      <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>{buttonConfirmLabel}</Button>
    </div>
  );
}
