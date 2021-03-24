export const state = () => ({
  gender: null,
  age: null,
  activeLevel: null
});

export const mutations = {
  setter (state, val) {
    state.gender = val.gender;
    state.age = val.age;
    state.activeLevel = val.activeLevel;
  }
};

export const getters = {
  state (state) {
    return state;
  }
};
