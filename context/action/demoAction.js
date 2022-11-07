import { getData } from "../../utils/data"
import { globalActionType } from "../reducer/globalReducer"

export const showModal = (action) => {
  return {
    type: globalActionType.SHOW_MODAL,
    action: action
  }
}

export const hideModal = (action) => {
  return {
    type: globalActionType.HIDE_MODAL,
    action: action
  }
}

export const closeModal = (event,action) => {
  return {
    type: globalActionType.CLOSE_MODAL,
    event,
    action
  }
}

export const handleSearch = (payload) => {
  return {
    type: globalActionType.HANDLE_SEARCH,
    payload,
  }
}

export const handleSlice = (payload) => {
  return {
    type: globalActionType.HANDLE_SLICE,
    payload,
  }
}

export const handleFilterPeriod = (payload) => {
  return {
    type: globalActionType.HANDLE_FILTER_PERIOD,
    payload,
  }
}

export const changePaginationIndex = (payload) => {
  return {
    type: globalActionType.CHANGE_PAGINATION_INDEX,
    payload,
  }
}

export const changeSaldoAwal = (payload) => {
  return {
    type: globalActionType.CHANGE_SALDO_AWAL,
    payload,
  }
}

export const createRecord = (payload) => {
  return {
    type: globalActionType.CREATE_RECORD,
    payload,
  }
}

export const getRecords = (records) => {
  return {
    type: globalActionType.GET_RECORDS,
    payload: records
  }
}

export const updateRecords = (record) => {
  return {
    type: globalActionType.UPDATE_RECORD,
    payload: record
  }
}

export const deleteRecord = (id) => {
  return {
    type: globalActionType.DELETE_RECORD,
    id,
  }
}