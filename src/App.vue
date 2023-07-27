<template>
  <div>
    <v-header  :key="headerKey"></v-header>
    <router-view :key="routerKey"/>
  </div>
</template>



<script>
import VHeader from "@/components/header/Header.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";
import {mapGetters} from "vuex";

export default {
  name: 'app',
  components: {
    VHeader
  },
  data: () => {
    return{}
  },

  computed: {
    ...mapGetters(["handbookType"]),
    headerKey() {
      return this.handbookType;
    },
    routerKey(){
      return this.$route.fullPath;
    }

  },
  methods:  {},
  mounted() {},
  setup(){
    const route = useRoute();
    const currentId = computed(()=>route.params.id);
    return {
      currentId,
    };
  }
}

</script>

<style lang="scss">
</style>