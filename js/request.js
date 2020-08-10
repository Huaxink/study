
/**
 * 基于 axios 的请求队列封装
*/

import axios from 'axios';
const queue = [];
const cancelToken = axios.CancelToken;

// 拼接url和方法，相同的url和方法可以视为相同的请求

const requestKey = config => {
    return `${config.url}_${config.method}`
}

// 中断重复请求
const remveQueue = config => {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
        const task = queue[i];
        if (task.requestKey = requestKey(config)) {
            task.cancel()
            queue.splice(i, 1)
            break
        }
    }
}

// 添加请求拦截
axios.interceptors.request.use(config => {
    remveQueue(config)
    config.cancelToken = new cancelToken((c => {
        queue.push({ requestKey: requestKey(config), cancel: c })
    }))
    return config
})

// 反馈拦截
axios.interceptors.response.use(response => {
    remveQueue(response.config)
    return response.data
})