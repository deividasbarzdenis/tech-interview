import HTTP from "./";

export const fetchUsers = (pageNumber, pageSize) => HTTP.get(`/users?page=${pageNumber}&size=${pageSize}`);
export const findByNameIsLike = (name, pageNumber, pageSize) => HTTP.get(
    `/users/search/findByNameIsLike?name=${name}&page=${pageNumber}&size=${pageSize}`);
export const getUserById = (id) => HTTP.get(`/users/${id}`);

export const saveUser = (user) => HTTP.post("/users", user);
export const updateUser = (id) => HTTP.put(`/users/${id}`);
export const patchUser = (id) => HTTP.put(`/users/${id}`);
export const deleteUser = (id) => HTTP.delete(`/users/${id}`);
