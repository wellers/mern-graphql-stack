import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouterUrls } from "../AppRouter";
import "./Menu.less";

export const Menu = () => (
	<Row className={"menu"}>
		<Col sm>
			<Link to={RouterUrls.HomeUrl}>Home</Link>
		</Col>
		<Col sm>
			<Link to={RouterUrls.ContactsUrl}>Contacts</Link>
		</Col>
	</Row>)