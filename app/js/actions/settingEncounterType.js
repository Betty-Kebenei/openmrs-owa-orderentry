import axios from 'axios';
import {
  SETTING_ENCOUNTER_TYPE_SUCCESS,
  SETTING_ENCOUNTER_TYPE_FAILURE,
  SETTING_ENCOUNTER_TYPE_LOADING,
} from './actionTypes';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export const settingEncounterTypeSuccess = configuration => ({
  type: SETTING_ENCOUNTER_TYPE_SUCCESS,
  configuration,
});

export const settingEncounterTypeFailure = error => ({
  type: SETTING_ENCOUNTER_TYPE_FAILURE,
  error,
});

export const settingEncounterTypeLoading = status => ({
  type: SETTING_ENCOUNTER_TYPE_LOADING,
  status,
});

export const getSettingEncounterType = () => (dispatch) => {
  dispatch(settingEncounterTypeLoading(true));
  return axios.get(`${apiBaseUrl}/systemsetting?v=custom:(value)&q=order.encounterType`, { headers: { accept: 'application/json' } })
    .then((response) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      dispatch(settingEncounterTypeLoading(false));
      return response;
    })
    .then(response => dispatch(settingEncounterTypeSuccess(response.data.results[0].value)))
    .catch((error) => {
      dispatch(settingEncounterTypeLoading(false));
      dispatch(settingEncounterTypeFailure(error));
    });
};