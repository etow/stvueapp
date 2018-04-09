import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        list:{},
        listArray:[],
        loading: true,
        buttonActive: false,
        currentOrder: -1,
        currentItem: {},
        itemToRemove: {},
        imageUploaded: false,
        mainAction: ''
    },
    mutations: {
        isLoading (state,loading) {
            state.loading = loading
        },
        imageUploaded (state, payload) {
            state.imageUploaded = payload
        },
        decrementOrder (state) {
            state.currentOrder = state.currentOrder - 1;
        },
        addItemToListArray (state) {
            state.listArray.unshift(state.currentItem)
        },
        setCurrentItem (state, item) {
            state.currentItem = item
        },
        setItemToRemove (state, item) {
            state.itemToRemove = item
        },
        enableItemToBeRemoved (state) {
            state.itemToRemove.remove = true
        },
        setList (state, ref) {
            state.list = JSON.parse(ref); 
            this.commit('setListArray')
        },
        setListArray (state) {
            state.listArray = []
            for(let item in state.list){
                state.listArray.push(state.list[item]);
            };
            state.listArray.sort(function (a, b) {
                return a.order - b.order;
            });
        },
        setButtonActive (state, payload) {
            state.buttonActive = payload
        },
        setMainAction(state, action){
            /* this mutation controls the main button states
            and reset some properties */

            state.mainAction = action

            if(action=="new"){
                state.buttonActive = true
                state.imageUploaded = false
                state.currentItem = {}
            }

            if(action== "edit"){
                state.buttonActive = true
                state.imageUploaded = true
            }

            if(action== "remove"){
                state.buttonActive = true
            }

            /* when it returns to the main view*/
            if(action==""){
                state.buttonActive = false
                state.imageUploaded = false
                state.currentItem = {}

                /* If there is an item stored to be removed, remove it */
                if(state.itemToRemove.remove){
                    delete state.list[state.itemToRemove.id]
                    for(let index in state.listArray){
                        if(state.listArray[index].id == state.itemToRemove.id){
                            state.listArray.splice([index], 1);
                        }
                    };
                    localStorage.setItem("STList", JSON.stringify(state.list) )

                    /* when the list is empty, activate the -new- component */
                    if(state.listArray.length < 1){
                        this.commit('setMainAction','new')
                    }
                }
            }
        },
        
        saveList (state) {          
            if(state.mainAction == "new"){
                state.list[state.currentItem.id] = state.currentItem
                this.commit('addItemToListArray')
            }
            if(state.mainAction == "edit"){
                Object.assign(state.list[state.currentItem.id],state.currentItem)
            }
            
            localStorage.setItem("STList", JSON.stringify(state.list) )
        },
        saveReorderedList (state, orderedArray) {
            for(let index in orderedArray){
                state.list[orderedArray[index].id].order = index
            }
            this.commit('saveList')
        },
        updateList (state) {
            localStorage.setItem("STList", JSON.stringify(state.list) );
        },
        updatecurrentItemDescription (state, desc) {
            state.currentItem.description = desc
        }
    },
    actions: {
        get (context) {
            /* get list from localStorage */

            let ref = localStorage.getItem('STList')
            if(ref != "{}" && ref){
                /* simulate ajax loading */
                setTimeout(function () {
                    context.commit('isLoading', false);
                    context.commit('setList', ref)
                    return true 
                }, 1000)
            }else{
                setTimeout(function () {
                    context.commit('isLoading', false);
                    return false
                }, 1000)
            }            
        }
    }
    
})

export default store
  