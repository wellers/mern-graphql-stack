import React from "react";
import { Container } from "react-bootstrap";
import Hello from "./Hello";
import Menu from "./Menu";
import "./PageContentBox.less";

interface Props {
	children: React.ReactNode;
	hideTrailingMargin?: boolean;
}

const PageContentBox: React.FC<Props> = ({
	children,
	hideTrailingMargin = false,
}) => {
	const className = `page-content-box ${hideTrailingMargin ? 'hide-trailing-margin' : ''}`;

	return (
		<Container>
			<Hello compiler={"Typescript"} framework={"React"} />
			<Menu />
			<div className={className}>
				{children}
			</div>
		</Container>
	);
};

export default PageContentBox;