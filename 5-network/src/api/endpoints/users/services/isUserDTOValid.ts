function areUserHobbiesValid(hobbies?: any[]): boolean {
  if (!hobbies) {
    return true;
  }

  return (
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => !!hobby && typeof hobby === "string")
  );
}

export const isUserDTOValid = (userData: any) => {
  return (
    !!userData &&
    !!userData?.name &&
    !!userData.email &&
    areUserHobbiesValid(userData?.hobbies)
  );
};
