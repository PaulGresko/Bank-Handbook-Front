<template>
 <div class='v-ed807-row'>
   <div class = 'row v-ed807-row_id'>{{row_data.id}}}</div>
   <div class = 'row v-ed807-row_title'>{{row_data.title}}</div>
   <div class = 'row v-ed807-row_datetime'>{{row_data.createdDate}}</div>
   <div class = 'row v-ed807-row_fileName'>{{row_data.fileName}}</div>
   <div class = 'row v-ed807-row_date'>{{row_data.edDate}}</div>
   <div class = 'row v-ed807-row_edAuthor'>{{row_data.edAuthor}}</div>
   <div class = 'row v-ed807-row_edReceiver'>{{row_data.edReceiver}}</div>
   <div class = 'row v-ed807-row_4Symbols'>{{row_data.creationReason}}</div>
   <div class = 'row v-ed807-row_datetime'>{{row_data.creationDateTime}}</div>
   <div class = 'row v-ed807-row_4Symbols'>{{row_data.infoTypeCode}}</div>
   <div class = 'row v-ed807-row_date'>{{row_data.businessDay}}</div>
   <div class = 'row v-ed807-row_directoryVersion'>{{row_data.directoryVersion}}</div>
   <div class = 'row v-ed807-row_createdBy'>{{row_data.createdBy}}</div>

 </div>

</template>


<script>
  export default {
    name: "v-ed807-row",
    props:{
      row_data:{
        type: Object,
        default: () => {
          return {}
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
.v-ed807-row{
  display: flex;
  justify-content: space-around;
}
.row{
  text-align: left;
}

</style>