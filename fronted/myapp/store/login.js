const state = {
  data_array:[],
  time_date:[],
  graph:[],
  add_ot:[]
}

const mutations = {
  set_state1: (state, data) => {
    state.data_array.push(data)
  },
  set_time_date1: (state, data) => {
    state.time_date.push(data)
  },
  set_logout1: (state) => {
    state.data_array = []
  },
  set_graph1: (state, data) => {
    state.graph.push(data)
  },
  set_ot1: (state, data) => {
    state.add_ot.push(data)
  }
}

const actions = {
  set_state2: ({commit}, data) => {
    commit('set_state1', data)
  },
  set_time_date2: ({commit}, data) => {
    commit('set_time_date1', data)
  },
  set_logout2: ({commit}) => {
    commit('set_logout1')
  },
  set_graph2: ({commit}, data) => {
    commit('set_graph1', data)
  },
  set_ot2: ({commit}, data) => {
    commit('set_ot1', data)
  }
}

export default {
  state, mutations, actions, namespaced:true
}
