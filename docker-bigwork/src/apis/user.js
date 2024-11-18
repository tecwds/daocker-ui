import request from "../utils/request";


// 用户登录
export const loginAPI = (data) => {
    return request({
        url: "/users/login",
        method: "post",
        data,
    });
};

// 新增用户
export const addUserAPI = (data) => {
    return request({
        url: "/users",
        method: "post",
        data,
    });
};

// 修改用户信息
export const updateUserAPI = (data) => {
    return request({
        url: `/users/${data.id}`,
        method: "put",
        data,
    });
};

// 删除用户
export const deleteUserAPI = (id) => {
    return request({
        url: `/users/${id}`,
        method: "delete",
    });
};