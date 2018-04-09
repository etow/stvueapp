<template>
  <main>
        <div class="form remove">
            <div class="remove-preview image-preview" id="remove-preview" :style="thumbnail"></div>
            <div class="remove-description" id="remove-description">{{descriptionTemp}}</div>
            <h4 class="remove-label">¿Eliminar este elemento?</h4>
            <button class="remove-submit" id="remove-submit" @click="remove">Eliminar</button>
        </div> 
  </main>
</template>
<script>
import axios from 'axios'
import { mapState} from 'vuex'

export default {
    data (){
        return {
            imgTemp : "",
            descriptionTemp : ""
        }
    },
    computed: {
        ...mapState(['currentItem']),
        thumbnail () {
            /* returns the style for the image preview */
            return { 
                backgroundImage: 'url(' +this.currentItem.img_url+')'
            }
        }
    },
    methods: {
        remove () {
            /* 
            enable item to be removed, 
            set item to remove, 
            so it will get removed when returning to default view */
            this.$store.commit('enableItemToBeRemoved')
            this.$store.commit('setMainAction', '')
        }
    },
    mounted () {
        /* when a component is mounted, if there is a saved item,
         take the description and image data and store it to be displayed in edit view*/ 
        
        if(this.currentItem){
            this.descriptionTemp = this.currentItem.description
            this.imgTemp = this.currentItem.img_url
        }
    }
}
</script>

