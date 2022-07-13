import { createStore } from 'vuex'

export default createStore({
  state: {
    user_id: '' || localStorage.getItem('user_id'),
    nick_name: '' || localStorage.getItem('nick_name'),
    avatar: '' || localStorage.getItem('avatar'),
    token: '' || localStorage.getItem('token')
  },
  getters: {
    nickName: (state) => state.nick_name,
    userId: (state) => state.user_id,
    token: (state) => state.token,
    avatar: (state) => state.avatar
  },
  mutations: {
    saveUser: (state, user) => {
      state.nick_name = user.nickName
      localStorage.setItem('nick_name', user.nickName)
      state.user_id = user.userId
      localStorage.setItem('user_id', user.userId)
      state.avatar = user.avatar
      localStorage.setItem('avatar', user.avatar)
    },
    saveToken: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
  },
  modules: {
  }
})
