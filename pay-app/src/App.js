import React, { Component } from 'react';
import {Nav} from './components/Nav';
import {Fab} from './components/Fab';
import {PayTable} from './components/PayTable';
import {Balance} from './components/Balance';
import {Footer} from './components/Footer';
import {somePayments, nPayment} from './helpers/'; 
import firebase from 'firebase';
import { connect } from 'react-firebase';
import {TransferButtons} from './components/TransferButtons';
import {Preloader} from 'react-materialize';

const clearF = {
    request: true,
    payments: true,
    received: true
};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6krVkZ8AF2mkKU_KIBoEQYs1tFbyQwPA",
  authDomain: "payments-app-a1829.firebaseapp.com",
  databaseURL: "https://payments-app-a1829.firebaseio.com",
  projectId: "payments-app-a1829",
  storageBucket: "",
  messagingSenderId: "416123867624"
};
firebase.initializeApp(config);

/* DATA Schema structure */
// payments: @array - all payments
// balance: @number - current customer balance
// filterPayments: @array - all filtered payments
// page: @number - index of pagination
// pageOfPayments: @array - active page of filtered payments
// showfilters: @object - boolean named filters that are active

const DATA = {
  balance: 0,                                     // Store Value
  payments: [],                                   // Store value 
  filterPayments: [],                             // Derived 
  page: 0,                                        // Derived
  pageOfPayments: [],                             // Derived 
  showFilters: {                                  // Derived
    request: true,
    payments: true,
    received: true
  }
};

DATA.balance = Math.floor(Math.random()*1000000);   // Use random values
DATA.payments = somePayments();                     // Use random values

DATA.pageOfPayments = DATA.payments.slice(0,6);
DATA.filterPayments = DATA.payments;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
    
    this.onChangePage = this.onChangePage.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }
  componentWillMount(){
    const {load} = this.props;
    load(val => { 
      const pageOfPayments = [];
      this.setState({loading: false, pageOfPayments: pageOfPayments, ...val}, this.onFilter); 
    });
  }
  componentDidMount(){

  }
  // Setup all application actions
  onChangePage(pageOfPayments) {
    // update state with new page of items
    this.setState({ pageOfPayments: pageOfPayments });
  }
  onFilter(){
    // Filter all payments and show active filters
    const {showFilters, payments} = this.state;
    let filters = [];
    
    if(showFilters["received"]) filters.push("received");
    if(showFilters["payments"]) filters.push("payment");
    if(showFilters["request"]) filters.push("request");
    
    const newFilter = payments.filter(el => {return filters.includes(el.type)});
    console.log("APP: Filter", filters, showFilters, newFilter);
    this.setState({filterPayments: newFilter, page: 0}, this.onChangePage(newFilter.slice(0,6)));
  }
  onClear(){
    console.log("APP: Clear");
    this.setState({ payments: [], pageOfPayments: [], page: 0, showFilters: DATA.showFilters}, this.onFilter());
  }
  clearFilters(){
    console.log("APP: Clear filters");
    this.setState({showFilters: clearF}, this.onFilter());
  }
  onRequest(){
    // Filter to show/hide requests
    const {showFilters} = this.state;
    let newFilters = showFilters;
    newFilters["request"] = !showFilters.request;
    console.log("APP: Request", showFilters, newFilters);
    this.setState({showFilters: newFilters}, this.onFilter());
  }
  onPayment(){
    // Filter to show/hide payments
    const {showFilters} = this.state;
    let newFilters = showFilters;
    newFilters["payments"] = !showFilters.payments;
    console.log("APP: Payment", showFilters, newFilters);
    this.setState({showFilters: newFilters}, this.onFilter());
  }
  onReceived(){
    // Filter to show/hide received payments
    const {showFilters} = this.state;
    let newFilters = showFilters;
    newFilters["received"] = !showFilters.received;
    console.log("APP: Recieved", showFilters, newFilters);
    this.setState({showFilters: newFilters}, this.onFilter());
  }
  onSave(){
    const {setValue} = this.props;
    console.log("APP: Save");
    setValue(this.state);
  }
  updateBalance(bal){
    console.log("APP: update Balance");
    this.setState({balance: bal});
  }
  makePayment() {
    console.log("APP: make Payment");
    const {payments, balance} = this.state;
    let nPay = nPayment("payment");
    payments.unshift(nPay);
    this.setState({payments: payments, balance: balance - nPay.amount}, this.onFilter());
  }
  makeRequest() {
    console.log("APP: make Request");
    const {payments} = this.state;
    payments.unshift(nPayment("request"));
    this.setState({payments: payments}, this.onFilter());
  }
  makeReceived() {
    console.log("APP: make Received");
    const {payments, balance} = this.state;
    let nPay = nPayment("received");
    payments.unshift(nPay);
    this.setState({payments: payments, balance: balance + nPay.amount}, this.onFilter());
  }
  render() {
    // Show application
    const {balance, page, pageOfPayments, filterPayments, showFilters, loading} = this.state;
    
    return (
        <div className="App">
      {loading? <div><Preloader flashing /></div> :
      <div>
          <Fab 
            showFilters={showFilters} 
            onClear={() => this.onClear()} 
            onPayment={() => this.onPayment()} 
            onInput={() => this.onRequest()} 
            onReceived={() => this.onReceived()} 
          />
          <Nav onSave={() => this.onSave()} />
          <Balance balance={balance}/>
          <TransferButtons 
            updateBalance={bal => this.updateBalance(bal)} 
            makePayment={() => this.makePayment()}
            makeRequest={() => this.makeRequest()}
            makeReceived={() => this.makeReceived()}
          />
          <PayTable 
            clearFilters={this.clearFilters} 
            showFilters={showFilters} 
            payments={filterPayments} 
            pageOfPayments={pageOfPayments} 
            page={page} 
            onChangePage={this.onChangePage} 
            />
          <Footer />
      </div>
      }
        </div>
    );
  }
}

export default connect((props, ref) => ({
  load: (cb) => ref('data').once('value').then(snapshot => { return cb(snapshot.val()); }),
  value: 'data',
  setValue: value => { console.log(value); ref('data').set(value); }
}))(App);