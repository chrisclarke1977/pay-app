import React from 'react';
import { Card } from 'react-materialize';
import {formatCcy} from '../helpers/';

export const Balance = props => {
  const {balance} = props;

  return (
    <Card>
        <h3 className="balance">BALANCE: {formatCcy(balance)}</h3>
    </Card>
  );
}
