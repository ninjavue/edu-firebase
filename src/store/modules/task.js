

const task = {
    state: {
        tasks: [],
        task: {}
    },
    getters: {
        tasks(state) {
            return state.tasks
        },
        task(state) {
            return state.task
        }
    },
    mutations: {
        tasks(state, payload) {
            state.tasks = payload
        },
        task(state, payload) {
            state.task = payload
        },
        addTask(state, payload) {
            return state.tasks.push(payload)
        },
        deleteTask(state, payload) {
            let index = state.tasks.findIndex(task => task.id == payload.id)
            state.tasks.splice(index, 1)
        },
        saveTask(state, payload) {
            state.tasks = state.tasks.map(task => {
                if (task.id == payload.id) {
                    return payload
                }
                return task
            })
        }
    },
    actions: {
        getTasks(context) {
            try {
                context.dispatch('getData', 'tasks').then(res => {
                    context.commit('tasks', res)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getByIdTask(context, payload) {
            try {
                return context.dispatch('getDataById', {
                    url: 'tasks',
                    id: payload
                })
            } catch (error) {
                console.log(error)
            }
        },
        postTask(context, payload) {
            try {
                context.dispatch('postData', {
                    url: 'tasks',
                    data: payload
                }).then(res => {
                    context.commit('addTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        editTask(context, payload) {
            try {
                context.dispatch('updateData', {
                    url: 'tasks',
                    data: payload
                }).then(res => {
                    context.commit('saveTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        deleteTask(context, payload) {
            try {
                context.dispatch('deleteData', {
                    url: 'tasks',
                    id: payload
                }).then(res => {
                    context.commit('deleteTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
    }
}


export default task