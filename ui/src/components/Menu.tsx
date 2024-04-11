import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouterUrls } from "../AppRouter";
import "./Menu.less";

function Menu() {
	return (
		<Row className={"menu"}>
			<Col sm>
				<Link to={RouterUrls.HomeUrl}>Home</Link>
			</Col>
			<Col sm>
				<Link to={RouterUrls.ContactsUrl}>Contacts</Link>
			</Col>
		</Row>
	);
}

export default Menu;