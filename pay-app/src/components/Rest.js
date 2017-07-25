import React, { Component } from 'react';

import {CardPanel, Chip, Tag, Footer, Collection, CollectionItem, Badge, Preloader, Input, Modal, Icon, Button, Row, Col, Pagination } from 'react-materialize';
import { Button } from 'react-materialize';

export class Rest extends Component {
  render() {
    return (
        <Section>
        <Row>
      		<Button waves='light'>button</Button>
      		<Button waves='light'>button<Icon left>cloud</Icon></Button>
      		<Button waves='light'>button<Icon right>cloud</Icon></Button>
        </Row>
        <Row>
        		<Col s={12} m={5}>
        				<CardPanel className="teal lighten-4 black-text">
        						<span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
        				</CardPanel>
        		</Col>
        		<Col s={12} m={7}>
        				For a simpler card with less markup, try using a card panel which just has padding and a shadow effect
        		</Col>
        </Row>
        <Row>
        	<Col s={4}>
        		<Preloader size='big'/>
        	</Col>
        </Row>
        <Row>
          <Collection header="Alans details">
          	<CollectionItem href="#!">
          		Alan <Badge>1</Badge>
          	</CollectionItem>
          	<CollectionItem href="#!">
          		Alan <Badge newIcon>4</Badge>
          	</CollectionItem>
          	<CollectionItem href="#!">
          		Alan
          	</CollectionItem>
          	<CollectionItem href="#!">
          		Alan <Badge>14</Badge>
          	</CollectionItem>
          </Collection>
        </Row>
        <Row>
        	<Input s={6} label="Name" validate><Icon>account_circle</Icon></Input>
        	<Input s={6} label="Telephone" validate type='tel'><Icon>phone</Icon></Input>
      		<Input s={12} label="disabled" defaultValue="I am not editable" disabled />
      		<Input type="password" label="password" s={12} />
      		<Input type="email" label="Email" s={12} />
        </Row>
        <Row>
          <Col>
            <Modal
            	header='Modal Header'
            	trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
            	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            		incididunt ut labore et dolore magna aliqua.</p>
            </Modal>            
          </Col>
        </Row>
        <Row>
	<Col s={12}>
		<Chip>
			<img src='img/yuna.jpg' alt='Contact Person' />
			Jane Doe
		</Chip>
		<Tag>tag</Tag>
	</Col>
</Row>
        <Row>
          <Pagination items={10} activePage={2} maxButtons={8} />
        </Row>

        <Footer copyrights="&copy 2015 Copyright Text"
	moreLinks={
		<a className="grey-text text-lighten-4 right" href="#!">More Links</a>
	}
	links={
		<ul>
			<li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
			<li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
			<li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
			<li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
		</ul>
	}
	className='example'
>
		<h5 className="white-text">Footer Content</h5>
		<p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
</Footer>
        </Section>

)}
    
}