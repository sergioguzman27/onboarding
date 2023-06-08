import axios from "axios";

// const HOST = 'http://127.0.0.1:5000/api/'
const HOST = 'https://20pkzn9ebg.execute-api.us-east-1.amazonaws.com/dev/api/'

class Api {
    async Get(uri, params = null) {
        const urlParameters =
            params != null
                ? "?" +
                Object.keys(params)
                    .map(
                        (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
                    )
                    .join("&")
                : "";
        const endpoint = `${HOST}${uri}${params === null ? "" : urlParameters}`;
        const request = await axios.get(endpoint)
        console.log('request ', request)
        return request;
    }

    async Post(uri, formData) {
        const request = await axios.post(`${HOST}${uri}`, formData);
        return request;
    }

    async Put(uri, formData) {
        const request = await axios.put(`${HOST}${uri}`, formData);
        return request;
    }

    async Delete(uri) {
        const request = await axios.delete(`${HOST}${uri}`);
        return request;
    }
}

export default new Api();
