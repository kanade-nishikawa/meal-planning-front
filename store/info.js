export const state = () => ({
  gender: null,
  age: null,
  activeLevel: null
})

export const mutations = {
  setters (state, val) {
    state.gender = val.gender;
    state.age = val.age;
    state.activeLevel = val.activeLevel;
  },
  getters (state) {
    console.log(state)
    return state;
  }
}
