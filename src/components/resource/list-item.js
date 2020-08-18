import React from "react";
import DeleteResourceModal from "./modal/delete-resource";

export default function listItem(...args) {
  const { item } = args[0];

  return (
    <React.Fragment>
      <li
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 py-1 resources-item"
        key={item.resource_id}
      >
        {item.value}
        <i
          className="fas fa-trash-alt text-danger"
          data-toggle="modal"
          data-target={`#deleteResourceModal${item.resource_id}`}
        ></i>
      </li>

      <DeleteResourceModal {...args[0]} />
    </React.Fragment>
  );
}
