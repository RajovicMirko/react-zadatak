import axios from "axios";
import Env from "../../util/env";
import { processError, processResponse } from "./api-util";

import { NotificationManager } from "react-notifications";

const createNotify = (type, message, title, time = 1500) => {
  switch (type) {
    case "success":
      NotificationManager.success(message, title, time);
      break;

    case "error":
      NotificationManager.error(message, title, time);
      break;

    default:
      break;
  }
};

export default class Api {
  static getResource(user) {
    return axios
      .get(Env.getApiUrl("api/resource"), {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static addResource(params) {
    return axios
      .post(
        Env.getApiUrl("api/resource"),
        { value: params.value },
        {
          headers: {
            Authorization: "Bearer " + params.user.access_token,
          },
        }
      )
      .then((response) => {
        createNotify("success", "Successfully added resource", "Add resource");
        return processResponse(response);
      })
      .catch((error) => {
        createNotify("error", "Source not added", "Add resource");
        return processError(error);
      });
  }

  static deleteResource(params) {
    return axios
      .delete(Env.getApiUrl(`api/resource?id=${params.id}`), {
        headers: {
          Authorization: "Bearer " + params.user.access_token,
        },
      })
      .then((response) => {
        createNotify(
          "success",
          `Successfully deleted resource`,
          "Delete resource"
        );
        return processResponse(response);
      })
      .catch((error) => {
        createNotify("error", "Resource not deleted", "Delete resource");
        return processError(error);
      });
  }

  static login(username, password) {
    return axios
      .post(
        Env.getApiUrl("token"),
        "grant_type=password&username=" +
          encodeURIComponent(username) +
          "&password=" +
          encodeURIComponent(password),
        {
          headers: {
            Authorization: "Basic " + Env.getPublicToken(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        return {
          status: 0,
          data: response.data,
        };
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static refresh(token) {
    return axios
      .post(
        Env.getApiUrl("refresh"),
        "grant_type=refresh_token&refresh_token=" + token,
        {
          headers: {
            Authorization: "Basic " + Env.getPublicToken(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        return {
          status: 0,
          data: response.data,
        };
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static register(params) {
    return axios
      .post(Env.getApiUrl("api_pub/register"), params, {})
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static userInfo(user) {
    return axios
      .get(Env.getApiUrl("api/user"), {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static resetPassword(username) {
    return axios
      .post(Env.getApiUrl("api_pub/reset-password"), {
        username: username,
      })
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static resetPasswordConfirm(username, token, password) {
    return axios
      .post(Env.getApiUrl("api_pub/reset-password-confirm"), {
        username: username,
        token: token,
        password: password,
      })
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }
}
