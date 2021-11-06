import AxiosClient from "./AxiosClient";

// #TODO
const SampleApi = {
  getAll: (params: string) => {
    const url = '/products';
    return AxiosClient.get(url, { params });
  },
}

export default SampleApi;