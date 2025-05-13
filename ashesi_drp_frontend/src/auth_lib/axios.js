import axios from "axios";

const AxiosInstance = axios.create({
	baseURL: "https://adrp-test-api-pq5km.ondigitalocean.app/adrp",
});

// Check if token is expired (6 hours)
const isTokenExpired = () => {
	const tokenTimestamp = localStorage.getItem("tokenTimestamp");
	if (!tokenTimestamp) return true;

	const now = new Date().getTime();
	const tokenTime = parseInt(tokenTimestamp);
	const sixHoursInMs = 6 * 60 * 60 * 1000;

	return now - tokenTime > sixHoursInMs;
};

// Clear auth data
const clearAuthData = () => {
	localStorage.removeItem("jwt");
	localStorage.removeItem("tokenTimestamp");
	localStorage.removeItem("email");
	localStorage.removeItem("user");
};

AxiosInstance.interceptors.request.use((config) => {
	// Don't check token expiration for login and get_otp endpoints
	if (config.url === "login" || config.url === "get_otp") {
		return config;
	}

	// Check token expiration before each request
	if (isTokenExpired()) {
		clearAuthData();
		window.location.href = "/auth";
		return Promise.reject("Session expired");
	}

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
			clearAuthData();
			window.location.href = "/auth";
		}
		return Promise.reject(error);
	}
);

export default AxiosInstance;

// that error was happeneing because logout needs to happen first, the jwt needs to be cleared else itll be attached
// take note of this for other pages such as the collections page, how would it work
