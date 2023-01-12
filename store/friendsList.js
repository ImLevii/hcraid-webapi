export const state = () => ({
    loaded: false,
    friends: {},
    blocked: []
});

export const getters = {
    isLoaded: (state) => {
        return state.loaded;
    },
    getFriends: function(state) {
        return function() {
            let array = [];
            for (let i in state.friends) {
                let friend = state.friends[i];
                array.push(friend);
            }
            return array;
        }
    },
    getFriend: function(state) {
        return function(friend) {
            return state.friends[friend];
        }
    },
    hasRelationship: function(state) {
        return (friend) => {
            return state.friends.hasOwnProperty(friend);
        };
    },
    isFriend: function(state) {
        return function(friend) {
            return state.friends.hasOwnProperty(friend) && state.friends[friend]['type'] === 'FRIENDS';
        }
    },
    getFriendType: function(state) {
        return (friend) => {
            if (state.friends[friend]['type'] === 'PENDING') {
                if (state.friends[friend]['player1'] === friend) {
                    return 'INCOMING'
                } else {
                    return 'OUTGOING'
                }
            } else {
                return state.friends[friend]['type'];
            }
        };
    },
    isBlocked: function(state) {
        return function(player) {
            return state.blocked.indexOf(player) !== -1
        }
    },
    isFriendOnline: function() {
        return (friend) => friend.hasOwnProperty('presence') && friend['presence'] !== null && friend['presence']['state'] === 'ONLINE' && (new Date().getTime() - friend['presence']['heartbeat']) <= 10000;
    },
};

export const mutations = {
    setLoaded(state, loaded) {
        state.loaded = loaded;
    },
    setFriends(state, friends) {
        state.friends = friends;
    },
    addFriend(state, {vm, friend}) {
        state.friends[friend['uuid']] = friend;
        console.log(vm.$set);
        // vm.$set(state.friends, friend['uuid'], friend);
    },
    removeFriend(state, {vm, friend}) {
        console.log(vm.$delete);
        delete state.friends[friend];
        // vm.$delete(state.friends, friend['uuid']);
    }
};

export const actions = {
    async fetchFriends({commit}) {
        return await this.$axios.get('/user/friends').then(response => {
            let data;
            if (response.status === 200) {
                data = response.data;
            } else {
                data = [];
            }

            let mapped_data = {};
            data.forEach(friend => {
                mapped_data[friend['uuid']] = friend;
            });

            commit('setFriends', mapped_data);
            commit('setLoaded', true);
        }).catch(error => {
            console.log(error);
            if (error.response) {
                console.log(error.response);
            }
        });
    },
    async createFriendship({commit}, friend) {
        return await this.$axios.post('/user/friends/add?friend=' + friend).then(response => {
            if (response.status === 201) {
                commit('addFriend', { vm: this, friend: friend });
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    async destroyFriendship({commit}, friend) {
        return await this.$axios.post('/user/friends/destroy?friend=' + friend).then(response => {
            if (response.status === 200) {
                commit('removeFriend', { vm: this, friend: friend });
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    async sendFriendRequest(state, player) {

    },
    async acceptFriendRequest(state, player) {

    },
    async denyFriendRequest(state, player) {

    },
    async block(state, player) {

    },
    async unblock(state, player) {

    }
};
