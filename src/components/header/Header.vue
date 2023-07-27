<template>
  <div class="header">
    <button class="dropbtn header-link" @click="goToHome">Ссылка на главную страницу</button>
<!--    <router-link to="/" class="header-link">Ссылка на главную страницу</router-link>-->
    <div class="dropdown">
      <button class="dropbtn">{{ buttonText }}<span class="arrow-down">&#9662;</span></button>
      <div class="dropdown-content">
        <router-link
            v-for="item in directories"
            :key="item.id"
            :to="'/handbook/' + item.id"
            @click="handleHandbookClick(item.id)"
            >{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "v-header",
  data() {
    return {
      directories: [
        {id: 'CreationReason', name: "Причина создания ЭС"},
        {id: 'InfoType', name: "Вид предоставления информации"},
        {id: 'ChangeType', name: "Тип изменения в справочнике"},
        {id: 'PtType', name: "Тип участника перевода"},
        {id: 'SrvcsType', name: "Доступные сервисы перевода денежных средств"},
        {id: 'XchType', name: "Участник обмена"},
        {id: 'RstrType', name: "Ограничения сервисов перевода денежных средств"},
        {id: 'ParticipantStatusType', name: "Статус участника"},
        {id: 'AccRstrType', name: "Ограничения операций по счёту"},
        {id: 'AccountStatusType', name: "Статус счёта"},
        {id: 'RegulationAccountType', name: "Тип счёт в соответствии с нормативом"}
      ]
    };
  },
  computed: {
    ...mapGetters([
      'handbookType'
    ]),
  buttonText(){
    return this.handbookType ? this.getHandbookNameById(this.handbookType) : "Справочники";
  },

  },
  methods: {
    goToHome(){
      this.$router.push({path:'/'});
    },
    handleHandbookClick(id){
      this.SET_HANDBOOKS_TYPE(id);
      },
    ...mapMutations([
      'SET_HANDBOOKS_TYPE'
    ]),
    getHandbookNameById(id) {
      const handbook = this.directories.find(item => item.id === id);
      return handbook ? handbook.name : "";
    }
  },

};
</script>

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #f5f5f5;
}

.header-link {
  margin-right: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #f5f5f5;
  color: #000000;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 9;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
