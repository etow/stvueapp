import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import store from '@/store'
import Sortable from 'sortablejs'

/* Set sortable directive */ 

Vue.directive('sortable', {
  inserted: function (el, binding) {
    var sortable = new Sortable(el, binding.value || {});
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
})
