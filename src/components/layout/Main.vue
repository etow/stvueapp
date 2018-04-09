<template>
  <div class="page-inner" v-bind:class="mainAction">
        <add-and-edit v-if="mainAction == 'new' || mainAction == 'edit'"></add-and-edit>
        <remove v-if="mainAction == 'remove'"></remove>
        <div class="main-content" v-show="mainAction == ''">
            <div class="counter" v-show="counterMsg">{{counterMsg}}</div>
            <transition-group name="list" id="list" class="list" tag="ul" v-sortable="{onEnd: reorder, handle:'.handle'}" >
                <list-item v-for="(item,index) in listArray" :key="item.id" :item="item" :index="index"></list-item>
            </transition-group>
        </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import AddAndEdit from '@/components/Add-and-edit.vue'
import Remove from '@/components/Remove.vue'
import ListItem from '@/components/List-item.vue'
export default {
    components: {
        AddAndEdit,
        ListItem,
        Remove
    },
    computed: {
        ...mapState(['mainAction', 'listArray']),
        counterMsg () {
            /* show quantity of items */

            let num = this.listArray.length
            let items = num > 1 ? " items" : " item"

            if(num > 0){
                return "Tienes " + this.listArray.length + items
            }else{
                return false
            }
        }
    },
    methods: {
        reorder ({oldIndex, newIndex}) {
            /* order array after sort */
            const movedItem = this.listArray.splice(oldIndex, 1)[0]
            this.listArray.splice(newIndex, 0, movedItem)
            /* save re ordered list */
            this.$store.commit('saveReorderedList', this.listArray)
        }
    },
    mounted () {
        /* If there are no items switch to new action */
        if( this.listArray.length < 1){
            this.$store.commit('setMainAction','new');
        }
    }
}
</script>
<style>
.list-item {
  opacity:1;
  transition: all .6s;
  position:relative;
  height:83px;
}
.list-enter{
  opacity: 0;
  transform: scale(.85);
}
.list-leave-to{
    transform: scale(.85);
    opacity:0;
    height: 0px;
    padding-top:0px;
    padding-bottom: 0px;
}
</style>
