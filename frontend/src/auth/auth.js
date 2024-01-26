import {API_ENDPOINTS} from "../config/config.js";
import axios from 'axios';

const auth = {
    isAuthenticated: false,

    signIn: async (email, password, callback) => {
        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.AUTHENTICATE,
                {
                    email,
                    password
                }
            );
            if (response.data.success === false) {
                alert(response.data.message);
                window.location.reload()
                return
            }

            const token = response.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            auth.isAuthenticated = true;
            callback();
        } catch (e) {
            alert("Authentication failed");
            console.error("Authentication failed: ", e);
            window.location.reload()
        }
    },
    signOut: (callback) => {
        let token = null;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        auth.isAuthenticated = false;
        window.location.reload()
        callback();
    }
};

export {auth};
