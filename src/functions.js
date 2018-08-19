import axios from "axios";
import {BACKEND_URL} from "./constants";
import {FETCH_VACANCIES} from "./actionCreators";

export const asyncFetchVacancies = () => dispatch => {

    axios.get(BACKEND_URL.concat("/vacancies/"))
        .then(
            (response) => {
                console.log("STATUS:", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: FETCH_VACANCIES,
                        payload: response.data,
                    });
                }
            }
        );

};