import React from "react";
import { connect } from "react-redux";
import PageContentBox from "../components/PageContentBox";

function HomeContainer() {
  return (
    <PageContentBox hideTrailingMargin={true}>
      This is a Web application.
    </PageContentBox>
  );
};

export default connect()(HomeContainer);