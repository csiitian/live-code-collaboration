import axios from "axios";
import RoomResponse from "../apis/response/RoomResponse";
import { validateRoom } from "./helpers.js";

const API_BASE_URL = "http://localhost:3000";

export const createRoom = async (roomId, password, isPrivate) => {
  if (!validateRoom(roomId, password, isPrivate)) {
    return new RoomResponse(null, "RoomId or Password can't be empty");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, {
      room: roomId,
      password: password,
      isPrivate: isPrivate,
    });
    return new RoomResponse(response.data, null);
  } catch (error) {
    console.error("Error creating room:", error);
    return new RoomResponse(null, error.response.data);
  }
};

export const joinRoom = async (roomId, password, isPrivate) => {
  if (!validateRoom(roomId, password, isPrivate)) {
    return new RoomResponse(null, "RoomId or Password can't be empty");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/join`, {
      room: roomId,
      password: password,
      isPrivate: isPrivate,
    });
    return new RoomResponse(response.data, null);
  } catch (error) {
    console.error("Error joining room:", error);
    return new RoomResponse(null, error.response.data);
  }
};

export const createCode = async (roomId, code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/code`, {
      room: roomId,
      code: code,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating code:", error);
    return null;
  }
};

export const fetchCode = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/code?roomId=${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching code:", error);
    return null;
  }
};
