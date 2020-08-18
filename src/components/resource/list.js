import React, { Component } from "react";
import { connect } from "react-redux";

import ListItem from "./list-item";
import NoResult from "../../components/no-results";
import Pagination from "../../components/pagination";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        limit: 5,
        paginationPage: 1,
        paginationButtonLimit: 1,
        offset: 0,
        indexOfFirstResource: 0,
        indexOfLastResource: 0,
        currentResources: [],
      },
    };
  }

  componentDidMount() {
    const { resources } = this.props;

    // pagination data
    this.setState((prevState) => {
      const pagination = Object.assign(prevState.pagination);
      pagination.indexOfLastPost = pagination.paginationPage * pagination.limit;
      pagination.indexOfFirstPost =
        pagination.indexOfLastPost - pagination.limit;
      pagination.currentResources = resources.filteredData.slice(
        pagination.indexOfFirstPost,
        pagination.indexOfLastPost
      );
      return { pagination };
    });
  }

  updateOffset = (offset, pageNumber) => {
    const { resources } = this.props;
    this.setState((prevState) => {
      const pagination = Object.assign(prevState.pagination);
      pagination.offset = offset;
      pagination.paginationPage = pageNumber;
      pagination.indexOfLastPost = pagination.paginationPage * pagination.limit;
      pagination.indexOfFirstPost =
        pagination.indexOfLastPost - pagination.limit;
      pagination.currentResources = resources.filteredData.slice(
        pagination.indexOfFirstPost,
        pagination.indexOfLastPost
      );
      return { pagination };
    });
  };

  componentDidUpdate(prevProp) {
    if (
      this.props.resources.filteredData.length !==
      prevProp.resources.filteredData.length
    ) {
      this.updateOffset(0, 1);
    }
  }

  render() {
    const { translate, resources } = this.props;
    const { currentResources } = this.state.pagination;

    const resourceList = currentResources.map((item, i) => {
      return (
        <ListItem item={item} {...this.props} key={item.resource_id}></ListItem>
      );
    });

    return (
      <React.Fragment>
        <h2>{translate("text.resource")}</h2>
        {resources.filteredData && !resources.filteredData.length && (
          <NoResult text={translate("text.no-resources")}></NoResult>
        )}

        <ul className="list-group resources-list mb-3">{resourceList}</ul>

        {!!resources.filteredData.length && (
          <Pagination
            {...this.state.pagination}
            count={resources.filteredData.length}
            updateOffset={this.updateOffset}
            addClass={"justify-content-end align-items-center"}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect((state) => state)(List);
