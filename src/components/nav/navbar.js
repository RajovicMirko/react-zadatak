import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../logout/index";
import FieldText from "../field-text";
import { Field, FieldsManager } from "../../data/services/fields";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        searchValue: new Field("searchValue", ""),
      },
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      fields: FieldsManager.updateField(this.state.fields, name, value),
    });

    if (value.length >= 3 || value.length === 0) this.handleSearch();
  };

  handleSearch = () => {
    this.props.searchResource({
      searchValue: this.state.fields.searchValue.value,
      data: Object.assign([], this.props.resources.data),
      user: this.props.user.data,
    });
  };

  render() {
    const { brand, history } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">{brand}</span>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="link-wrapper navbar-nav mr-auto">
            <Logout {...this.props} />
          </div>
          <form className="form-inline my-2 my-lg-0 d-flex align-items-center">
            <div>
              <FieldText
                onChange={this.handleInputChange}
                {...this.state.fields.searchValue}
                placeholder={"Search resources"}
                addClass={"form-control"}
              />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default connect((state) => state)(Navbar);
