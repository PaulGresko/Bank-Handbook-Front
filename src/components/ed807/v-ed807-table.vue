<template>
  <div class = 'v-ed807-table'>
    <div class = 'v-ed807-table_header'>
      <p>№</p>
      <p>Наименоваение</p>
      <p>Дата создания</p>
      <p>Файл</p>
      <p>Дата составления ЭС</p>
      <p>ID составления ЭС</p>
      <p>ID получателя ЭС</p>
      <p>Код причины создания</p>
      <p>Дата создания ЭС</p>
      <p>Вид представления</p>
      <p>Дата ОД</p>
      <p>Номер версии справочника</p>
      <p>Пользователь</p>
    </div>
    <div class="v-ed807-table_body">
      <vTableRow
        v-for="row in ed807"
        :key="row.id"
        :row_data="row"
      />
    </div>

  </div>
</template>

<script>
  import vTableRow from './v-ed807-row.vue'
  export default {
    name: "v-ed807-table",
    components:{
      vTableRow
    },
    props: {
      ed807: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {}
    },
    computed: {}
  }
</script>


<style scoped lang="scss">
 .v-ed807-table{
 //  max-width: 900px;
   margin: 0 auto;
 }

  .v-ed807-table_header{
    display: flex;
    justify-content: space-around;

  }


</style>