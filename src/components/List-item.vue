<template >
    <li class="list-item">
        <div class="handle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
        </div>
        <div class="left">
            <div class="detail">
                <div class="image">
                    <img :src="item.img_url">
                </div>
                <div class="description">
                    {{item.description}}
                </div>
            </div>
        </div>
        <div class="right">
            <button class="control edit" @click="edit(item.id)">
                <i class="icon icon-edit"></i>
            </button>
            <button class="control remove" @click="remove(item.id)">
                <i class="icon icon-trash-2"></i>
            </button>
        </div>
    </li>
</template>
<script>

import { mapState } from 'vuex'


export default {
    props: ['item'],
    methods: {
        edit (id) {
            /* save the current item and switch to edit action */ 
            this.$store.commit('setCurrentItem',this.$store.state.list[id])
            this.$store.commit('setMainAction','edit')
        },
        remove (id) {
            /* save the item to be removed and switch to remove action */ 
            this.$store.commit('setItemToRemove', {remove:false, id:id})
            this.$store.commit('setCurrentItem',this.$store.state.list[id])
            this.$store.commit('setMainAction','remove')
        }
    }
}
</script>

