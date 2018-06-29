export const setToken = ({commit},payload) => {
  commit('SETTOKEN',payload)
}
export const saveUserInfo = ({commit},payload) => {
  commit('SAVEUSERINFO',payload)
}
export const logOut = ({commit}) => {
  commit('LOGOUT')
}
