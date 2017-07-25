import React, { Component } from 'react';

import {CardPanel, Chip, Tag, Footer, Collection, CollectionItem, Badge, Preloader, Input, Modal, Icon, Button, Row, Col, Pagination } from 'react-materialize';
import { Button } from 'react-materialize';

export class Pages extends Component {

  const {pages, page} = this.props;
  render() {
    return (
        <Row>
          <Pagination items={pages} activePage={page} maxButtons={8} />
        </Row>
)}}