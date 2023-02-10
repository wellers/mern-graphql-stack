import * as React from "react";
import { connect } from "react-redux";
import PageContentBox from "../components/PageContentBox";

interface Props {}

class HomeContainer extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {		
		return (
			<PageContentBox hideTrailingMargin={true}>
				This is a Web application.
			</PageContentBox>
		);
	}	
}

export default connect()(HomeContainer);