import * as React from 'react';
import Button from './Button.js';

export default function Dialog({
  dialogOpen,
  setDialogOpen,
  handleConfirm,
  buttonConfirmLabel,
  children
}) {
  return (
    <div className={`dialog ${dialogOpen ? 'dialog--open' : ''}`}>
      {children}
      <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
      <Button className="btn--delete" onClick={handleConfirm}>
        {buttonConfirmLabel}
      </Button>
    </div>
  );
}
