import axios from "axios";
import {BACKEND_URL, FETCH_VACANCIES_SUCCESS} from "./constants";
import React from "react";
import {fetchUsersSuccess} from "./actionCreators";

export const asyncFetchVacancies = () => dispatch => {

    axios.get(BACKEND_URL.concat("/vacancies/"))
        .then(
            (response) => {
                console.log("STATUS:", response.status);
                dispatch({
                    type: FETCH_VACANCIES_SUCCESS,
                    payload: response.data,
                });

            }
        );

};

export const asyncFetchUsers = () => dispatch => {
    axios.get(BACKEND_URL.concat("/users/"))
        .then(
            (response) => {
                dispatch(
                    fetchUsersSuccess(response.data)
                );
            }
        ).catch(error => console.log(error));
};

export const getLoadingAnimation = (source, description) => {
    return (
        <div className="container mx-auto" style={{justifyContent: "center", textAlign: "center", marginTop: "75px"}}>
            <img src={source} alt={description} className={"col-2"}/><br/>
            <span><h4>{description}</h4></span>

        </div>
    )

};

export const validateUserRegistrationEntity = (userRegistrationEntity) => {


};