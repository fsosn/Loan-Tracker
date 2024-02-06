import axios from 'axios';
import {API_ENDPOINTS} from "../config/config.js";

const handleErrors = (response) => {
    if (response.status !== 200) {
        throw Error(response.statusText);
    }
    return response;
};

const api = {
    fetchBorrowedLoans: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.GET_ALL +
                API_ENDPOINTS.BORROWED,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error fetching borrowed loans:', error);
            throw error;
        }
    },

    fetchLentLoans: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.GET_ALL +
                API_ENDPOINTS.LENT, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error fetching loans:', error);
            throw error;
        }
    },

    fetchLoanSummary: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.GET +
                API_ENDPOINTS.SUMMARY, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error fetching loans:', error);
            throw error;
        }
    },

    fetchRequests: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.GET_ALL +
                API_ENDPOINTS.REQUESTS, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error fetching loans:', error);
            throw error;
        }
    },

    handleConfirm: async (loanId) => {
        try {
            const response = await axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.API}${API_ENDPOINTS.LOANS}/confirm?loanId=${loanId}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            handleErrors(response)

            return true;
        } catch (error) {
            console.error('Error confirming loan:', error);
            return false;
        }
    },

    fetchFailedLoginAttempts: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.FAILED_LOGIN, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            handleErrors(response);

            return response.data.map((attempt) => ({
                ...attempt,
                timestamp: new Date(attempt.timestamp).toLocaleString(),
            }));
        } catch (error) {
            console.error('Error fetching failed login attempts:', error);
            throw error;
        }
    },

    changePassword: async (changePasswordRequest) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.CHANGE_PASSWORD,
                changePasswordRequest,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    createLoan: async (loanRequestDto) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.CREATE,
                loanRequestDto,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            handleErrors(response);

            return response;
        } catch (error) {
            console.error('Error creating loan:', error);
            throw error;
        }
    },

    deleteLoan: async (loanId) => {
        try {
            const response = await axios.delete(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.LOANS +
                API_ENDPOINTS.DELETE,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        loanId: loanId
                    }
                }
            );

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error deleting loan:', error);
            throw error;
        }
    },

    fetchAllUsers: async () => {
        try {
            const response = await axios.get(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.USERS +
                API_ENDPOINTS.GET_ALL
            );

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    registerUser: async (userData) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.REGISTER,
                userData,
            );

            handleErrors(response);

            return response;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },

    resetPassword: async (changePasswordRequest) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.RESET_PASSWORD,
                changePasswordRequest,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            handleErrors(response);

        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    sendForgotPasswordRequest: async (email) => {
        try {
            const encodedEmail = encodeURIComponent(email);
            const url = API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.FORGOT_PASSWORD +
                `?userEmail=${encodedEmail}`;

            const response = await axios.post(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            handleErrors(response);

            return response.data;
        } catch (error) {
            console.error('Error sending forgot password request:', error);
            throw error;
        }
    },
};

export default api;
