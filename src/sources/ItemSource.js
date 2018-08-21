import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getItemsSuccess,
  addItemSuccess,
  updateItemSuccess,
  deleteItemSuccess
} from "actions/ItemActions";
import { appUrls } from "constants/Urls";
import {
  singleItemNormalizer,
  normalizeItems
} from "utils/normalizers/itemNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getItems = id => {
  const urlObject = appUrls.ITEM.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(getItemsSuccess(normalizeItems(newData.result)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createItem = data => {
  const urlObject = appUrls.ITEM.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(addItemSuccess(singleItemNormalizer(newData.result[0])));
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateItem = (data, id) => {
  const urlObject = appUrls.ITEM.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateItemSuccess(singleItemNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteItem = id => {
  const urlObject = appUrls.ITEM.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteItemSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
