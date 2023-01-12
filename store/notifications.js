export const state = () => ({
    loaded: false,
    notifications: {}
});

export const getters = {
    isLoaded: (state) => {
        return state.loaded;
    },
    getNotifications: (state) => {
        return state.notifications;
    },
    hasNotifications: (state) => {
        return state.notifications.length > 0;
    }
};

export const mutations = {
    setLoaded(state, loaded) {
        state.loaded = loaded;
    },
    setNotifications(state, notifications) {
        state.notifications = notifications;
    },
    readNotification(state, id) {
        if (state.notifications.hasOwnProperty(id)) {
            state.notifications[id]['read'] = true;
        }
    }
};

export const actions = {
    async fetchNotifications({commit}) {
        return await this.$axios.get('/user/notifications')
            .then(response => {
                if (response.status === 200) {
                    let notifications = {};

                    for (let i in response.data) {
                        let notification = response.data[i];
                        notifications[notification['id']] = notification;
                    }

                    commit('setNotifications', response.data);
                    commit('setLoaded', true);
                }
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    },
    async readNotification({commit}) {
        commit('readNotification', );
    },
    async readAllNotifications({commit}, nIds) {
        return await this.$axios.post('/user/notifications/read', {'n_ids': nIds})
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
            })
    }
};
