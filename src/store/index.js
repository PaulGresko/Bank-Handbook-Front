import Vuex from 'vuex'
import $api from "@/http/indexHTTP";



const store = new Vuex.Store({
    state: {
        handbooksType: null,
        ed807: [],
        ed807Count: 0,
        handbooks: [],
        handbooksCount: 0,
        participantsInfo: [],
        participantsInfoCount: 0,
    },
    getters: {
        ed807(state) {
            return state.ed807;
        },
        handbooks(state) {
            return state.handbooks;
        },
        handbooksCount(state) {
            return state.handbooksCount;
        },
        handbookType(state) {
            return state.handbooksType;
        },
        ed807Count(state) {
            return state.ed807Count;
        },
        participantsInfo(state){
            return state.participantsInfo;
        },
        participantsInfoCount(state){
            return state.participantsInfoCount;
        }

    },
    mutations: {
        SET_ED807: (state, ed807) => {
            state.ed807 = ed807;
        },
        SET_ED807_COUNT: (state, count) => {
            state.ed807Count = count;
        },
        SET_HANDBOOKS: (state, handbook) => {
            state.handbooks = handbook;
        },
        ADD_HANDBOOK: (state, handbook) => {
            state.handbooks.push(handbook);
        },
        SET_HANDBOOKS_COUNT(state, handbookCount) {
            state.handbooksCount = handbookCount;
        },
        SET_HANDBOOKS_TYPE(state, type) {
            state.handbooksType = type;
        },
        SET_PARTICIPANTS_INFO(state, partInfo){
          state.participantsInfo = partInfo;
        },
        SET_PARTICIPANTS_INFO_COUNT(state, count){
            state.participantsInfoCount = count;
        },
        NOTHING() {

        },

    },
    actions: {
        GET_ED807_FROM_API({commit}, params) {
            return $api.get('/ed807', {params})
                .then((response) => {
                    commit('SET_ED807', response.data)
                })
        },
        GET_COUNT_ED807({commit}, params) {
            return $api.get('/ed807/count', {params,})
                .then((response) => {
                    commit('SET_ED807_COUNT', response.data)
                })
        },


        async UPLOAD_NEW_ED807({commit}, {file, title}) {
            const formData = new FormData();
            formData.append('file', file);
            if (title) {
                formData.append('title', title);
            }

            return await $api.post('ed807/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
                commit('NOTHING')
            )
        },
        async ACTUALIZE({commit},{title}) {
            const formData = new FormData();

            if (title) {
                formData.append('title', title);
            }
             await $api.post('ed807/actualize', formData).then(
                 commit('NOTHING')
             );
        },
        async UPDATE_ED807({commit}, data){
            const params={
                title: data.title,
                edAuthor: data.edAuthor,
                edReceiver: data.edReceiver,
                creationReason: data.creationReason,
                infoTypeCode: data.infoTypeCode,
                directoryVersion: data.directoryVersion
            }
            return await $api.put('ed807/' + data.id, params).then(
                commit('NOTHING')
            )
        },
        DELETE_ED807({commit}, id) {
            return $api.delete('ed807/' + id).then(
                commit('NOTHING')
            )
        },
        RECOVER_ED807({commit}, id) {
            return $api.patch('ed807/' + id).then(
                commit('NOTHING')
            )
        },


        GET_ALL_PART_INFO({commit}, data){
            const params={
                page: data.page,
                bic: data.bic ===''? null : data.bic,
                name: data.name,
                ptType: data.ptType ===''? null : data.ptType
            }
            return $api.get('/participantInfo/'+ data.ed807, {params}).then((response)=>{
                commit('SET_PARTICIPANTS_INFO', response.data)
            })
        },

        GET_COUNT_OF_PART_INFO({commit}, data) {
            const params = {
                bic: data.bic ===''? null : data.bic,
                name: data.name,
                ptType: data.ptType ===''? null : data.ptType
            }
            return $api.get('/participantInfo/' + data.ed807 + '/count', {params}).then((response) => {
                commit('SET_PARTICIPANTS_INFO_COUNT', response.data)
            })
        },




        GET_ALL_HANDBOOKS({commit}, {type, page, deleted, code, title, date}) {
            const params = {
                page: page,
                deleted: deleted,
                code: code,
                title: title,
                date: date
            }
            return $api.get('handbook/' + type, {params}).then((response) => {
                commit('SET_HANDBOOKS', response.data);
            })
        },
        GET_COUNT_OF_HANDBOOKS({commit}, {type, page, deleted, code, title, date}) {
            const params = {
                page: page,
                deleted: deleted,
                code: code,
                title: title,
                date: date
            }
            return $api.get('handbook/' + type + '/count', {params}).then((response) => {
                commit('SET_HANDBOOKS_COUNT', response.data)
            })
        },
        async ADD_HANDBOOK({commit}, data) {
            return await $api.post("handbook/save", data).then(
                commit('NOTHING')
            )
        },

       async UPDATE_HANDBOOK({commit}, data) {
            const params = {
                code: data.code,
                title: data.title,
                validFrom: data.validFrom,
                validUntil: data.validUntil
            }
             return await $api.put('handbook/' + data.id, params).then(
                commit('NOTHING')
            )
        },
        DELETE_HANDBOOK({commit}, id) {
            return $api.delete('handbook/' + id).then(
                commit('NOTHING')
            )
        },
        RECOVER_HANDBOOK({commit}, id) {
            return $api.patch('handbook/' + id).then(
                commit('NOTHING')
            )
        },


        async GET_ACCOUNTS({commit}, bic) {
            commit('NOTHING');
            const response = await $api.get('/account/' + bic);
            return response.data;
        },
        async GET_SWBICS({commit}, bic){
            commit('NOTHING');
            const response = await $api.get('/swbics/' + bic);
            console.log(response);
            return response.data;
        },
        async GET_RSTR({commit}, bic){
            commit('NOTHING');
            const response = await $api.get('/rstr/' + bic);
            return response.data;
        }
    },
    modules: {}
})
export default store;