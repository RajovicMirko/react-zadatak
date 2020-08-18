import React, { Component } from "react";
import { connect } from "react-redux";
import NewResourceModal from "./modal/new-resource";

class NewResource extends Component {
  render() {
    const { translate } = this.props;

    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#newResourceModal"
        >
          {translate("text.new-resource")}
        </button>
        <NewResourceModal {...this.props} />
      </React.Fragment>
    );
  }
}

export default connect((state) => state)(NewResource);
