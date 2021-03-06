import axios from 'axios';
import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_LOADING,
  PATIENT_CARESETTING_ERROR,
} from './actionTypes';
import networkError from './networkError';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

const fetchPatientCareSettingActionCreator = patientCareSetting => ({
  type: PATIENT_CARESETTING_SUCCESS,
  patientCareSetting,
});

const fetchPatientCareSettingError = error => ({
  type: PATIENT_CARESETTING_ERROR,
  error,
});

const fetchPatientCareSettingLoading = status => ({
  type: PATIENT_CARESETTING_LOADING,
  status,
});

const fetchPatientCareSetting = () => (dispatch) => {
  dispatch(fetchPatientCareSettingLoading(true));
  return axios.get(`${apiBaseUrl}/caresetting`)
    .then((response) => {
      dispatch(fetchPatientCareSettingActionCreator(response.data.results));
      dispatch(fetchPatientCareSettingLoading(false));
    })
    .catch((error) => {
      if (!error.response) {
        dispatch(networkError('Network error occurred'));
      } else {
        dispatch(fetchPatientCareSettingError(error.response));
        dispatch(fetchPatientCareSettingLoading(false));
      }
    });
};
export default fetchPatientCareSetting;
