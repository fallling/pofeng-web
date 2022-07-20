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
export const getArticles = (params?: any) => {
  return axios({
    method: 'get',
    url: 'article',
    params: {
      userId: params
    }
  })
}
export const getArticle = (params?: any) => {
  return axios({
    method: 'get',
    url: 'article/' + `${params}`
  })
}

export const getBaseList = (params?: any) => {
  return axios({
    method: 'get',
    url: 'knowBase',
    params: {
      userId: params
    }
  })
}

export const getBase = (params?: any) => {
  return axios({
    method: 'get',
    url: 'knowBase/' + `${params}`
  })
}
export const createBase = (params?: any) => {
  return axios({
    method: 'post',
    url: 'knowBase',
    data: params,
    headers: {
      'Content-Type': 'application/json'
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
    url: 'calendar',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const putSchedule = (params?: any) => {
  return axios({
    method: 'put',
    url: 'calendar',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getTasks = (params?: any) => {
  return axios({
    method: 'get',
    url: 'todoList',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const updateTask = (params?: any) => {
  return axios({
    method: 'put',
    url: 'todoList',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const completeTask = (params?: any) => {
  return axios({
    method: 'put',
    url: 'todoList',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getTeams = (params?: any) => {
  return axios({
    method: 'get',
    url: 'team',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const getTeam = (params?: any) => {
  return axios({
    method: 'get',
    url: 'team/' + `${params}`
  })
}

export const getFetchUser = (params?: any) => {
  return axios({
    method: 'get',
    url: 'user/fuzzyQuery',
    params: {
      arg: params
    }
  })
}

export const createTeam = (params?: any) => {
  return axios({
    method: 'post',
    url: 'team',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getMembers = (params?: any) => {
  return axios({
    method: 'get',
    url: 'members',
    params: {
      teamId: params
    }
  })
}

export const deleteTeam = (params?: any) => {
  return axios({
    method: 'delete',
    url: 'team',
    params: {
      idList: params
    }
  })
}

export const getUser = (params?: any) => {
  return axios({
    method: 'get',
    url: 'user/' + `${params}`
  })
}

export const saveArticle = (params?: any) => {
  return axios({
    method: 'put',
    url: 'article',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const postTask = (params?: any) => {
  return axios({
    method: 'post',
    url: 'todoList',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const postArticle = (params?: any) => {
  return axios({
    method: 'post',
    url: 'article',
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
