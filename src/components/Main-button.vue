<template>
  <button class="add-new" id="addItem" v-bind:class="{active:buttonActive, saved:imageUploaded}" @click="doAction"></button>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['imageUploaded', 'mainAction', 'buttonActive'])
  },
  methods : {
    doAction () {
      /* check the current action. If it's home, switch to new, 
      if it's different, switch to default */

      if(this.mainAction == "new" || this.mainAction == "edit" ){
        /* if the action is new or edit and an image is already loaded, 
        save the item in the list */

        if(this.imageUploaded){
          this.$store.commit('saveList')
        }
        /* then switch to default */
        this.$store.commit('setMainAction','')
        
      }else if(this.mainAction == "remove"){
        this.$store.commit('setMainAction','')
      }else{
        this.$store.commit('setMainAction','new')
      }
    }
  }
}
</script>
