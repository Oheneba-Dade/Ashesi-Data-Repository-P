import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "https://adrp-test-api-pq5km.ondigitalocean.app/adrp/"
});


AxiosInstance.interceptors.request.use((config) => {
    // add access token to all request headers
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// token expiration
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("JWT expired. Logging out...");
            // localStorage.removeItem("jwt"); // remove token
            // window.location.href = "/auth"; // redirect to login page
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;

// that error was happeneing because logout needs to happen first, the jwt needs to be cleared else itll be attached
// take note of this for other pages such as the collections page, how would it work

