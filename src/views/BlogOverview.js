import React, {Component} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import { DefaultLayout } from "../layouts/";
import PageTitle from "./../components/common/PageTitle";
import Notifications, {notify} from 'react-notify-toast';

class BlogOverview extends Component{
  render(){
   
    return(
      <DefaultLayout>
        <Notifications/>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>
    
        {/* Small Stats Blocks */}
    
      </Container>
      </DefaultLayout>
    );
  }
}

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};


export default BlogOverview;
