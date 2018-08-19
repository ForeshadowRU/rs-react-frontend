export const ADD_COMPANY = "ADD_COMPANY";
export const REMOVE_COMPANY = "REMOVE_COMPANY";
export const USER_AUTH = "ADD_COMPANY";
export const USER_LOGOUT = "USER_LOGOUT";
export const ADD_VACANCY = "ADD_VACANCY";
export const DELETE_VACANCY = "DELETE VACANCY";
export const FETCH_COMPANY_START = "FETCH_COMPANY_START";
export const DELETE_COMPANY = "DELETE COMPANY";
export const FETCH_COMPANY_SUCCESS = "FETCH_COMPANY_SUCCESS";
export const FETCH_VACANCIES_SUCCESS = "FETCH_VACANCIES_SUCCESS";
export const FETCH_VACANCIES = "FETCH_VACANCIES_START";

export function addCompany(company) {
    return {
        type: ADD_COMPANY,
        payload: company,
    };
}

export function removeCompany(id) {
    return {
        type: REMOVE_COMPANY,
        payload: id
    }
}

export function fetchCompanyStart(companyId) {
    return {
        type: FETCH_COMPANY_START,
        payload: companyId
    }
}

export function fetchCompanySuccess(company) {
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: company
    }
}

export function deleteCompany(companyId) {
    return {
        type: DELETE_COMPANY,
        payload: companyId
    }
}

export function login(user) {
    return {
        type: USER_AUTH,
        payload: user,
    }
}

export function fetchVacancies() {
    return {
        type: FETCH_VACANCIES
    }
}

export function fetchVacanciesSuccessfull(data) {
    return {
        type: FETCH_VACANCIES_SUCCESS,
        payload: data
    }

}

export function logout() {
    return {
        type: USER_LOGOUT,
    }
}