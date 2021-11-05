import AxiosClient from "./AxiosClient";

// #TODO
const SampleApi = {
  getAll: (params) => {
    const url = '/products';
    return AxiosClient.get(url, { params });
  },
}

export default SampleApi;