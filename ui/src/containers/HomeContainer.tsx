import React from "react";
import { connect } from "react-redux";
import PageContentBox from "../components/PageContentBox";

interface Props {}

const HomeContainer: React.FC<Props> = () => {
  return (
    <PageContentBox hideTrailingMargin={true}>
      This is a Web application.
    </PageContentBox>
  );
};

export default connect()(HomeContainer);