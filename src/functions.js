import axios from "axios";
import {BACKEND_URL} from "./constants";
import {FETCH_VACANCIES_SUCCESS} from "./actionCreators";
import React from "react";

export const asyncFetchVacancies = () => dispatch => {

    axios.get(BACKEND_URL.concat("/vacancies/"))
        .then(
            (response) => {
                console.log("STATUS:", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: FETCH_VACANCIES_SUCCESS,
                        payload: response.data,
                    });
                }
            }
        );

};

export const getLoadingAnimation = (source, description) => {
    return (
        <div className="container mx-auto" style={{justifyContent: "center", textAlign: "center", marginTop: "75px"}}>
            <img src={source} alt={description} className={"col-2"}/><br/>
            <span><h4>{description}</h4></span>

        </div>
    )

};
