import * as React from "react";
import { Container } from "react-bootstrap";
import { Hello } from "./Hello";
import { Menu } from "./Menu";
import "./PageContentBox.less";

export default class PageContentBox extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const hideTrailingMargin = this.props.hideTrailingMargin ? 'hide-trailing-margin' : '';
		const className = `page-content-box ${hideTrailingMargin}`;
		return (
			<Container>
				<Hello compiler={"Typescript"} framework={"React"} />
				<Menu />
				<div className={className}>
					{this.props.children}
				</div>
			</Container>
		);
	}
}

type Props = {
	readonly children: React.ReactNode
	readonly hideTrailingMargin?: boolean;
};