import React, { Component } from "react";
import { Field, FieldsManager } from "../../../data/services/fields";

import FieldText from "../../field-text";
import Button from "../../button";

export default class NewResource extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
    this.state = {
      fields: {
        newResource: new Field("newResource", "", ["empty"]),
      },
    };
  }

  handleInputChange = (name, value) => {
    this.setState({
      fields: FieldsManager.updateField(this.state.fields, name, value),
    });
  };

  submitForm = (event) => {
    if (event.key === "Enter") {
      event && event.preventDefault();
      return false;
      // return this.submit(event);
    }
  };

  submit = (event) => {
    event && event.preventDefault();

    this.setState(
      { fields: FieldsManager.validateFields(this.state.fields) },
      () => {
        if (!this.state.fields.newResource.errorMessage) {
          this.props.addNewResource({
            value: this.state.fields.newResource.value,
            user: this.props.user.data,
          });
        }
      }
    );
    return false;
  };
  render() {
    const { translate } = this.props;

    return (
      <div
        className="modal"
        id="newResourceModal"
        role="dialog"
        ref={this.modalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onKeyPress={this.submitForm}>
              <div className="modal-header bg-primary text-white">
                <h3>{translate("text.new-resource")}</h3>
              </div>

              <div className="modal-body">
                <div className="block-margin-bottom-10">
                  <FieldText
                    onChange={this.handleInputChange}
                    {...this.state.fields.newResource}
                    placeholder={"Value"}
                    addClass={"form-control"}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <Button
                  className="btn btn-primary btn-block"
                  onClick={this.submit}
                  dataDismiss={"modal"}
                  text={translate("text.new-resource")}
                />

                <Button
                  className="btn btn-secondary btn-block"
                  dataDismiss={"modal"}
                  text={translate("text.close-new-resource")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
