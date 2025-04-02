import apiRoutes from "@/routes/apiRoutes";
import { storageGetItem } from "@/util/Storage"

export const getRequest = async (route: string, params?: {}) => {
  const token = storageGetItem('token');
  const queryString = params ? new URLSearchParams(params).toString() : '';

  const request = async () => 
    fetch(`${route}?${queryString}`, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': 'Token ' + token,
        },
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status + response.statusText);
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('GET error:', JSON.stringify(error));
      })
    
  return request();
}

export const postRequest = async (route: string, body: {}, params?: {}) => {
  const token = storageGetItem('token');
  const queryString = params ? new URLSearchParams(params).toString() : '';

  const request = async () => {
    fetch(`${route}?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'Token ' + token,
      },
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status + response.statusText);
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('POST error:', JSON.stringify(error));
      })
  }
}
