import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getResource,
  addResource,
  deleteResource,
  searchResource,
} from "../../data/actions/resource";

//COMPONENTS
import PublicLayout from "../../components/layout";
import LoaderSmall from "../../components/loader-small";
import List from "../../components/resource/list";
import NewResource from "../../components/resource/new-resource";
import Navbar from "../../components/nav/navbar";

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getResourceForUser: (user) => dispatch(getResource(user)),
    addNewResource: (payload) => dispatch(addResource(payload)),
    deleteResource: (payload) => dispatch(deleteResource(payload)),
    searchResource: (payload) => dispatch(searchResource(payload)),
  };
}

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const user = this.props.user.data;
    this.props.getResourceForUser(user);
  }

  render() {
    const { translate, history, dispatch, resources } = this.props;
    return (
      <PublicLayout {...this.props}>
        <Navbar {...this.props} brand={translate("text.dashboard")}></Navbar>

        <div className="container text-center">
          {Array.isArray(resources.data) && <List {...this.props}></List>}

          {resources.isLoading && (
            <div className="loading-custom">
              <section>
                <LoaderSmall />
                <div>{translate("text.loading-resources")}</div>
              </section>
            </div>
          )}

          {!resources.isLoading && <NewResource {...this.props}></NewResource>}
        </div>
      </PublicLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
