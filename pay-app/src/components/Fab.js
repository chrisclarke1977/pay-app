import React, { Component } from 'react';
import { Button } from 'react-materialize';

export class Fab extends Component {
  onClear(){
    const {onClear} = this.props;
    console.log("FAB: Clear");
    onClear();
  }
  onPayment(){
    const {onPayment} = this.props;
    console.log("FAB: Payment");
    onPayment();
  }
  onInput(){
    const {onInput} = this.props;
    console.log("FAB: Input");
    onInput();
  }
  onReceived(){
    const {onReceived} = this.props;
    console.log("FAB: Received");
    onReceived();
  }

  onTap(val){
    switch(val){
      case "payment": 
        return this.onPayment();
      case "input":
        return this.onInput();
      case "received":
        return this.onReceived();
      case "delete":
        return this.onClear();
      default: 
        return null;
    }
  }
  render() {
    const {showFilters} = this.props;
    return (
  <Button floating fab='horizontal' icon='mode_edit' className='purple' large style={{bottom: '45px', right: '24px'}}>
	<Button onClick={() => this.onTap("payment")} floating icon='payment' className={showFilters.payments? 'red' : 'grey'} />
	<Button onClick={() => this.onTap("input")} floating icon='input' className={showFilters.request?'yellow darken-1': 'grey'} />
	<Button onClick={() => this.onTap("received")} floating icon='redeem' className={showFilters.received?'green darken-1': 'grey'} />
	<Button onClick={() => this.onTap("delete")} floating icon='delete' className='blue'/>
  </Button>
    );
  }
}
