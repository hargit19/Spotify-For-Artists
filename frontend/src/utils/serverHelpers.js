import { backendURL } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route , body) => {
const response = await fetch(backendURL + route , {
    method : "POST",
    headers : {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
})

const formattedResponse = await response.json();
return formattedResponse;
}


export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    console.log(token);
    const response = await fetch(backendURL + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendURL + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};
    

    // const getToken = () => {
    //     const accessToken = document.cookie.replace(
    //         /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    //         "$1"
    //     );
    //     return accessToken;
    // };


    const getToken = () => {
        // Use a regular expression to match and extract the token from cookies
        const match = document.cookie.match(/(?:^|;\s*)token\s*=\s*([^;]*)/);
        return match ? match[1] : null; // Return the token or null if not found
    };
    
