export const validateRoom = (roomId, password, isPrivate) => {
  if (!roomId) {
    return false;
  }

  if (isPrivate && !password) {
    return false;
  }

  return true;
};
