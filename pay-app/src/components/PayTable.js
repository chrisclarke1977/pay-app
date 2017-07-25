import React from 'react';
import { Table, Icon, Row, Col, Badge, Chip } from 'react-materialize';
import Pagination from './Pagination';
import {formatCcy} from '../helpers/';

const IconTypes = {
    "payment": (<Icon small>payment</Icon>),
    "received": (<Icon small>redeem</Icon>),
    "request": (<Icon small>input</Icon>)
};

const TinyIcon = {
    "payment": (<Icon tiny>payment</Icon>),
    "received": (<Icon tiny>redeem</Icon>),
    "request": (<Icon tiny>input</Icon>)
}

const BadgeTypes = (props) => {
  const {type} = props;
  switch(type){
    case "payment": return (<Badge className="large red white-text">{TinyIcon[type]}</Badge>);
    case "received": return (<Badge className="large green white-text">{TinyIcon[type]}</Badge>);
    case "request": return (<Badge className="large yellow darken-1 white-text">{TinyIcon[type]}</Badge>);
  
    default: return (<Badge className="large blue white-text">{TinyIcon[type]}</Badge>);
  }
}

const TableRow = ({type, name, date, amount}) => (
  <tr>
    <td>{IconTypes[type]}</td>
    <td><Chip>{name}</Chip></td>
    <td>{date}</td>
    <td><BadgeTypes type={type} />{formatCcy(amount)}</td>
  </tr>);

export const PayTable = props => {
  const {payments, page, onChangePage, pageOfPayments, showFilters, clearFilters} = props;
  const filterIcon = !showFilters.payments || !showFilters.request || !showFilters.received? (<p onClick={clearFilters}><Icon tiny>details</Icon></p>) : null ;
    return (
    <Row>
    {pageOfPayments.length !== 0?
      <Col s={12}>
        <Table bordered hoverable striped>
        	<thead>
        		<tr>
        			<th data-field="type">Type</th>
        			<th data-field="id">Name</th>
        			<th data-field="date">Date</th>
        			<th data-field="amount">Amount{filterIcon}</th>
        		</tr>
        	</thead>
          <tbody>
              { pageOfPayments.map(payment => <TableRow key={payment.id} {...payment}/>) }
          </tbody>
        </Table>
        <Pagination items={payments} page={page} onChangePage={onChangePage} /> 
      </Col> : 
      <Col s={12}>
        <h3>No Payments To Show{filterIcon}</h3>
      </Col>
      }</Row>
      );
}