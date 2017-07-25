import React from 'react';
import { Row, Col, Button } from 'react-materialize';

export class TransferButtons extends React.Component {
    updateBalance() {
      const {updateBalance} = this.props;
      updateBalance(123456);
      console.log("TransferButtons: update balance");
    }
    makePayment() {
        const {makePayment} = this.props;
        makePayment();
        console.log("TransferButtons: make Payment");
    }
    makeRequest() {
        const {makeRequest} = this.props;
        makeRequest();
        console.log("TransferButtons: make Request");
    }
    makeReceived() {
        const {makeReceived} = this.props;
        makeReceived();
        console.log("TransferButtons: make Received");
    }
    render() {
        return (<Row>
            <Col>
                <Button className="" icon='account_balance_wallet' waves='light' onClick={() => this.updateBalance()}>Update Balance</Button>
                <Button className="red" icon='payment' waves='light' onClick={() => this.makePayment()}>Payment</Button>
                <Button className="yellow" icon='input' waves='light' onClick={() => this.makeRequest()}>Request </Button>
                <Button className="green" icon='redeem' waves='light' onClick={() => this.makeReceived()}>Received</Button>
            </Col>
            </Row>
            );
    }
}