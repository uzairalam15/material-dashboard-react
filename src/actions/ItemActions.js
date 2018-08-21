import {
  GET_ITEMS_SUCCESS,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  SET_SELECTED_ITEM
} from "constants/ItemTypes";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem
} from "sources/ItemSource";

export const getItemsSuccess = data => ({
  type: GET_ITEMS_SUCCESS,
  data
});

export const addItemSuccess = data => ({
  type: ADD_ITEM_SUCCESS,
  data
});

export const deleteItemSuccess = id => ({
  type: DELETE_ITEM_SUCCESS,
  id
});

export const setSelectedItem = id => ({
  type: SET_SELECTED_ITEM,
  id
});

export const updateItemSuccess = data => ({
  type: UPDATE_ITEM_SUCCESS,
  data
});

export const getItemsAction = id => getItems(id);
export const createItemAction = data => createItem(data);
export const updateItemAction = (data, id) => updateItem(data, id);
export const deleteItemAction = id => deleteItem(id);
