import AxiosClient from './axios.client';

const path = `/v1/pokemon/`;

const CatchApi = {
  findPokemon: async (rate: number) => {
    const url = path + 'find-pokemon';
    return await AxiosClient.post(url, {
      rate: rate,
    });
  },
};

export default CatchApi;
