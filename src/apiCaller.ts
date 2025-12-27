import axios from "axios";
import { ApiConfig } from "./types";

export async function callApi(config: ApiConfig): Promise<any> {
  const response = await axios({
    url: config.url,
    method: config.method,
    headers: config.headers,
    params: config.queryParams,
    data: config.body
  });

  return response.data;
}
