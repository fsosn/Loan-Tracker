import {API_ENDPOINTS} from "../config/config.js";
import axios from 'axios';
import Cookies from 'js-cookie';

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
            console.log("Logging in")
            const token = response.data.token;
            console.log("Token:" +  response.data.token)
            Cookies.set('JWT_TOKEN', token, {expires: 3600});
            auth.isAuthenticated = true;
            callback();
        } catch (e) {
            console.error("Authentication failed: ", e);
        }
    },
    signOut: (callback) => {
        Cookies.remove('JWT_TOKEN');
        auth.isAuthenticated = false;
        callback();
    }
};

export {auth};
