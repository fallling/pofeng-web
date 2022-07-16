import axios from './index'

export const login = (params?: any) => {
  return axios({
    method: 'post',
    url: 'login',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const getArticle = (params?: any) => {
  return axios({
    method: 'get',
    url: 'article',
    params: {
      userId: params
    }
  })
}
export const getBase = (params?: any) => {
  return axios({
    method: 'get',
    url: 'knowBase',
    params: {
      userId: params
    }
  })
}

export const getSchedules = (params?: any) => {
  return axios({
    method: 'get',
    url: 'calendar',
    params: {
      userId: params
    }
  })
}

export const postSchedule = (params?: any) => {
  return axios({
    method: 'post',
    url: 'http://localhost:8082/calendar',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const putSchedule = (params?: any) => {
  return axios({
    method: 'put',
    url: 'http://localhost:8082/calendar',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
