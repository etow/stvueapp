<template>
    <main>
        <div class="page-progress" v-show="uploadingProgress" v-bind:style="uploadingProgress ? uploadingProgress : ''"></div>
        <div class="form empty" v-show="this.listArray.length < 1 && !this.imageUploaded">
            <h4 class="empty-title">Tu lista esta vacia, carga una imagen para comenzar</h4>
        </div>
        <div class="form upload" id="upload-form" v-bind:class="{ 'has-file': imageUploaded }">
            <label for="upload-file" class="attach">
                <div class="upload-preview image-preview" id="upload-preview" v-bind:style="thumbnail">
                    <div class="icon"><i class="icon-image"></i></div>
                </div>
                <div class="upload-label">
                    Añade una imagen
                </div>
            </label>
            <input name="file" type="file" class="cloudinary_fileupload" id="upload-file" v-on:change="upload($event.target.files)" accept="image/*">
            <textarea type="text" name="description" v-model="descriptionTemp" placeholder="Añade una descripción" id="descriptionInput" class="upload-description" maxlength="300">
            </textarea>
            <div id="upload-chars" class="chars">{{charsMsg}}</div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    data () {
        return {
             cloudinary: {
                uploadPreset: 'txlysz1z',
                url: 'https://api.cloudinary.com/v1_1/eliastorres/image/upload'
            },
            uploadingProgress: false,
            imgTemp: "",
            descriptionTemp: "",
            charsMsg : ""
        }
    },
    computed: {
        ...mapState(['imageUploaded','mainAction','currentItem', 'listArray']),
        thumbnail () {
            /* returns the style for the image preview */
            return { 
                backgroundImage: 'url(' +this.imgTemp+')'
            }
        }
    },
    methods: {
        upload (file) {

            /* create formData to send to cloudinary */

            const formData = new FormData()
            
            formData.append('file', file[0]);
            formData.append('upload_preset', this.cloudinary.uploadPreset);
            formData.append('tags', 'app-excercise');

            const config = {
                headers: { "X-Requested-With": "XMLHttpRequest" },
                onUploadProgress: progressEvent => {
                    /* show the upload profress */
                    let progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                    this.uploadingProgress = {
                        width: progress+"%"
                    }
                }
            }
            
            /* send file to cloudinary */
            axios.post(this.cloudinary.url, formData, config).then(res => {
                /* If everything turns out well, hide the progress bar */
                this.uploadingProgress = false
                /* save the image url */
                this.imgTemp = res.data.secure_url
                /* indicate that the image was loaded */
                this.$store.commit("imageUploaded", true)


                /* set the new item's data according to the action */

                if(this.mainAction == "new"){
                    var id = Date.now()
                    var img_id = res.data.public_id
                    var img_url = res.data.secure_url
                }
                if(this.mainAction == "edit"){
                    /* in case of updating an element, take the id of stored item */
                    var id = this.currentItem.id;
                    var img_id = this.currentItem.img_id
                    var img_url = this.imgTemp
                }

                /* every time an item is added, 
                it has to have a lower order number, to be ordered first in the list */

                this.$store.commit('decrementOrder');

                /* save the loaded item*/

                let item = {
                    id: id,
                    description : this.descriptionTemp ? this.descriptionTemp : "",
                    img_id: img_id,
                    img_url: img_url,
                    order: this.$store.state.currentOrder,
                }
                
                this.$store.commit("setCurrentItem", item)
                               
            })
        },
        checkChars (desc) {
            /* verify that the description does not exceed 300 characters*/
            this.descriptionTemp = desc
            if( this.descriptionTemp.length < 300){
                if ( this.descriptionTemp.length > 0){
                    this.charsMsg = "Caracteres restantes "+ ( 300 - this.descriptionTemp.length )
                }else{
                    this.charsMsg = ""
                }
            }else{
               this.charsMsg = "La descripción no puede superar los 300 caracteres"
            }
            this.$store.commit('updatecurrentItemDescription', this.descriptionTemp)
        }
    },
    mounted () {
        /* when a component is mounted, if there is a saved item,
         take the description and image data and store it to be displayed in edit view*/ 
        
        if(this.currentItem){
            this.descriptionTemp = this.currentItem.description
            this.imgTemp = this.currentItem.img_url
        }
        /* vue keyup was not working well on android, 
        addEventListener works fine */ 
        let el = document.getElementById('descriptionInput');
        if (typeof el.addEventListener != "undefined") {
            el.addEventListener("keyup", () => {
                this.checkChars(el.value)
            }, false);
        } else if (typeof el.attachEvent != "undefined") {
            el.attachEvent("onkeyup", () => {
                this.checkChars(el.value)
            });
        }
    }
}
</script>
