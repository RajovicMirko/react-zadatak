import React, { Component } from "react";
import Button from "../../button/index";

export default class DeleteResource extends Component {
  render() {
    const { item, deleteResource, translate, user } = this.props;
    const params = {
      id: item.resource_id,
      user: user.data,
    };

    return (
      <div
        className="modal"
        role="dialog"
        id={`deleteResourceModal${item.resource_id}`}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                {translate("text.delete-resource-title")}
              </h5>
            </div>
            <div className="modal-body">
              <p>{translate("text.delete-resource-body")}</p>
              <p>{item.value}</p>
            </div>
            <div className="modal-footer">
              <Button
                className="btn btn-primary btn-block"
                onClick={() => deleteResource(params)}
                dataDismiss={"modal"}
                text={translate("app.yes")}
              />

              <Button
                className="btn btn-secondary btn-block"
                dataDismiss={"modal"}
                text={translate("app.close")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
