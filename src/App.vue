<template>
  <div id="app" class="app">
    <app-header></app-header>
    <div class="app-body page" id="app-body">
        <app-loader v-if="loading"></app-loader>
        <app-main v-else></app-main>
    </div>
    <app-footer :style="footerVisible"></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/Header.vue'
import AppFooter from '@/components/layout/Footer.vue'
import AppMain from '@/components/layout/Main.vue'
import AppLoader from '@/components/Loader.vue'
import { mapState} from 'vuex'


export default {
    components: {
        AppHeader,
        AppFooter,
        AppMain,
        AppLoader
    },
    data () {
        return {
            el: {
                appLoader : {},
                app : {},
                appHeader : {},
                appFooter : {},
                appBody : {}
            },
            resizeTimer : null
        }
    },
    computed : {
        ...mapState(['imageUploaded','listArray','loading']),
        footerVisible () {
            /* show the footer after the application finished loading (and if there are items in the list)
               Also, show the footer after an image has been uploaded */

            if( !this.loading && this.listArray.length > 0 || this.imageUploaded ){
                return {
                    visibility:'visible',
                }
            }else{
                return {
                    visibility: 'hidden'
                }
            }
        }
    },
    mounted () {
        /* save reference of the app elements to be able to calculate
         the height of the app-body every time a resize is made, so that the app
         is always contained on the viewport and there is no scrollbar in body */ 

        this.el.app = document.getElementById('app')
        this.el.appHeader = document.getElementById('app-header')
        this.el.appFooter = document.getElementById('app-footer')
        this.el.appBody = document.getElementById('app-body')

        /* set the size of the app for the first time */
        this.onResize()
        window.addEventListener('resize', this.onResize);
    },
    methods: {
        onResize () {
            let vm = this;
            clearTimeout(this.resizeTimer);

            /* resize debouncing */
            this.resizeTimer = setTimeout(function(){
                vm.setViewport();
            }, 100);
        },
        setViewport () {
            let height = this.el.app.offsetHeight - this.el.appHeader.offsetHeight - this.el.appFooter.offsetHeight
            this.el.appBody.style.height = height + "px"
        }
    },
    created () {
         this.$store.dispatch('get');
    }
}
</script>

<style lang="scss">
  /* los archivos css son importados de main.scss creado anteriormente */
  @import './scss/main.scss';
</style>
