<template>
  <div class="about">
    <v-table
    :ed807="ed807"
    />
  </div>
</template>




<script>
import vTable from "@/components/ed807/v-ed807-table.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'app',
  components: {
    vTable
  },
  data: () => {
    return{}
  },

  computed:{
    ...mapGetters([
      'ed807'
    ])
  },


  methods:{
    ...mapActions([
      'GET_ED807_FROM_API'
    ])
  },
  mounted() {
    this.GET_ED807_FROM_API()
  }

}

</script>