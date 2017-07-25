import React, { Component } from 'react';
import {Badge, Dropdown, Navbar, NavItem, Icon } from 'react-materialize';

const logos ={
  fcmb : "http://www.fcmb.com/images/fcmb.png",
  interswitch : "https://www.interswitchgroup.com/images/default-source/default-album/interswitchngnew.png?sfvrsn=0",
  wema : "https://images.dailytrust.com.ng/cms/gall_content/2017/1/2017_1$large_WEMA_bank.jpg",
  sterling : "http://www.bobsguide.com/images/news/58945.jpg"
} 

const source = logos.wema;

const Logo = (<img id="logo-header" src={source} alt="Logo" width="111" height="60" data-pin-nopin="true" />); 

export class Nav extends Component {
  onSearch() {
    alert("search");
  }
  onModule() {
    const {onSave} = this.props;
    console.log("NAV: Save");
    onSave();
  }
  onRefresh(){
    alert("refresh");
  }
  render() {
    // const {onSave} = this.props;
    return (
        <Navbar brand={Logo} right>
        	<NavItem href='#' onClick={this.onSearch}><Icon>search</Icon></NavItem>
        	<NavItem href='#' onClick={() => this.onModule()}><Icon>view_module</Icon></NavItem>
        	<NavItem href='#' onClick={this.onRefresh}><Icon>refresh</Icon><Badge newIcon>4</Badge></NavItem>
        	
        	<Dropdown
          	trigger={
            	<NavItem href='#'><Icon>more_vert</Icon></NavItem>
          	}>
          	<NavItem>
          		one
          		<Badge>1</Badge>
          	</NavItem>
          
          	<NavItem>
          		two
          		<Badge newIcon>1</Badge>
          	</NavItem>
          
          	<NavItem>
          		three
          	</NavItem>
          </Dropdown>
        </Navbar>
    );
  }
}
