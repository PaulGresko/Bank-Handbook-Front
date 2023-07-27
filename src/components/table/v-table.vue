

<template>
  <div class="table-container">
    <table class="table_body">
      <slot></slot>
    </table>
  </div>
  <footer>
    <div class="footer-left">
      <span class="pagination-icon" @click="firstPage">&#171;</span>
      <span class="pagination-icon" @click="decrementPage">&#8249;</span>
      <p>{{ currentPage }}</p>
      <span class="pagination-icon" @click="incrementPage">&#8250;</span>
      <span class="pagination-icon" @click="lastPage">&#187;</span>
      <span class="reload-icon" @click="renderingTable">&#8635;</span>
    </div>
    <div class="footer-right">
      Отображаются записи с {{ firstRecord }} по {{ lastRecord }}, всего {{ totalRecords }}
    </div>
  </footer>
</template>


<script>
export default {
  name: "v-table",
  data(){
    return{}
  },
  props:{
    currentPage:{
      type: Number,
      default: 1
    },
    totalRecords: {
      type: Number,
      default: 0
    },
    pageSize:{
      type: Number,
      default: 0
    }
  },
  methods:{
    firstPage(){
      this.$emit('first-page');
      this.renderingTable();
    },
    decrementPage(){
      this.$emit('decrement-page');
      this.renderingTable();
    },
    incrementPage(){
      this.$emit('increment-page');
      this.renderingTable();
    },
    lastPage(){
      this.$emit('last-page');
      this.renderingTable();
    },
    renderingTable(){
      this.$emit('rendering-table');
    }
  },


  computed:{
    firstRecord() {
      if(this.totalRecords === 0) {
        return 0;
      }
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    lastRecord() {
      return Math.min(this.currentPage * this.pageSize, this.totalRecords);
    },
  },


}

</script>


<style lang="scss">
.table-container {
  overflow-y: auto;
  min-height: 213px;
  max-height: 660px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead th {
  background-color: #f5f5f5;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 2;
}

th.sticky-column {
  left: 0;
  position: sticky;
}

tbody {
  overflow-y: auto;
  max-height: 100%;
}



tbody td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  word-wrap: break-word;
  max-width: 200px;
}

tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 3px solid #e0e0e0;
}

.footer-left {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.pagination-icon {
  margin: 0 5px;
  cursor: pointer;
}

.reload-icon {
  margin-left: 10px;
  cursor: pointer;
}

.footer-right {
  font-size: 14px;
  margin-right: 10px;
}
</style>