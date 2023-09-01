import axios from "axios";

export const createRoom = (roomId, password) => {
  return axios
    .post("http://localhost:3000/create/", {
      "room": roomId,
      "password": password,
      "isPriavte": true
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return null;
    });
}

export const joinRoom = (roomId, password) => {
  return axios
    .post("http://localhost:3000/join/", {
      "room": roomId,
      "password": password,
      "isPriavte": true
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

export const createCode = (roomId, code) => {
  return axios
    .post("http://localhost:3000/code/", {
      "room": roomId,
      "code": code
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

export const fetchCode = (roomId) => {
  return axios
    .get(`http://localhost:3000/code?roomId=${roomId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}
