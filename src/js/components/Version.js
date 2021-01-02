import * as React from 'react';
import commit from './../../../commit.json';
import { app } from './../../data/data';

export default function Version() {
  return (
    <div style={{ fontSize: '.8rem', opacity: 0.5 }}>
      Version: {app.version} (Build: {commit.commit})
    </div>
  );
}
