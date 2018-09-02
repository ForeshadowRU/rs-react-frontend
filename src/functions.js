import axios from "axios";
import {ADD_VACANCY, BACKEND_URL, FETCH_VACANCIES_ERROR, USER_AUTH_SUCCESSFUL} from "./constants";
import React from "react";
import {
    fetchCompaniesError,
    fetchCompaniesSuccess,
    fetchCompanySuccess,
    fetchUsersSuccess,
    fetchVacanciesSuccess
} from "./actionCreators";

export const asyncFetchVacancies = () => dispatch => {

    axios.get(BACKEND_URL.concat("/vacancies/"))
        .then(
            (response) => {
                console.log("STATUS:", response.status);
                dispatch(fetchVacanciesSuccess(response.data));

            }
        ).catch(error => {
        console.log(error.data);
        dispatch({type: FETCH_VACANCIES_ERROR});
    });

};
export const asyncPost = (json) => dispatch => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    axios.post(BACKEND_URL.concat("/public/login"), json, config)
        .then(
            (response) => {
                console.log(response);
                dispatch({
                    type: USER_AUTH_SUCCESSFUL,
                    payload: response.data,
                });

            }
        ).catch(error => console.log(error));

};
export const currencySignToString = (sign) => {
    switch (sign) {
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        case "€":
            return "EUR";
        default:
            return sign;
    }

};

export const asyncPostVacancy = (json, config) => dispatch => {
    let cfg = config || {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    axios.post(BACKEND_URL.concat("/vacancies/"), json, cfg)
        .then(
            (response) => {
                dispatch({
                    type: ADD_VACANCY,
                    payload: response,
                })

            }
        ).catch(error => console.log(error));
};

export const asyncFetchCompany = (id) => dispatch => {

    axios.get(BACKEND_URL.concat("/companies/".concat(id)))
        .then(
            (response) => {
                dispatch(fetchCompanySuccess(response.data));
            }
        ).catch(error => {
        console.log(error);
        dispatch(fetchCompaniesError())
    });

};

export const asyncFetchCompanies = () => dispatch => {

    axios.get(BACKEND_URL.concat("/companies/"))
        .then(
            (response) => {
                dispatch(fetchCompaniesSuccess(response.data));
            }
        ).catch(error => {
        console.log(error);
        dispatch(fetchCompaniesError());
    })


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