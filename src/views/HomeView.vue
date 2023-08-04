<template>
<div class="ed807">
  <v-popup
    v-if="IsCreatePopupVisible"
    @closePopup="closeCreatePopup"
    popupName="Импорт"
    btnTitle="Добавить"
    @btnAction="upload"
  >
    <div class="upload_display">
    <label class="input-file">
      <span class="input-file-text" type="text">{{filename}}</span>
      <input type="file" accept=".xml" name="file" @change="handleFileChange">
      <span class="input-file-btn">Выберите файл</span>
    </label>
      <input class="input-title" placeholder="Наименование файла" type="text" v-model="titleUploadFile">
    </div>

  </v-popup>

  <v-popup
      v-if="IsActualizePopupVisible"
      @closePopup="closeActualizePopup"
      popupName="Актуализация"
      btnTitle="Актуализировать"
      @btnAction="actualize"
  >
    <input class="input-title" placeholder="Наименование файла" type="text" v-model="titleActualizeFile">
  </v-popup>



<div class="ed807-table-container">
  <div class="filters">
    <div class="filter-input">
      <label>Наименование: </label>
      <input type="text" v-model="params.title" />
    </div>
    <div class="filter-input">
      <label>Дата загрузки с: </label>
      <input type="date" v-model="params.date1" />
    </div>
    <div class="filter-input">
      <label>по: </label>
      <input type="date" v-model="params.date2" />
    </div>
    <div class="filter-deleted">
      <label>Искать удаленные данные: </label>
      <input type="checkbox" v-model="params.deleted" @change="showEd807Table" />
    </div>
  </div>
    <div class="filter-buttons">
      <button class="home-buttons" @click="resetED807Filters">Сброс</button>
      <button class="home-buttons" @click="showEd807Table">Найти</button>
    </div>
  <div class="action-buttons">
    <button class="add-button" @click="showCreatePopup">Импортировать</button>
    <button class="add-button" @click="showActualizePopup">Актуализировать</button>
    <button class="handbook-buttons" v-if="!params.deleted" @click="deleteED807">Удалить</button>
    <button class="handbook-buttons" v-if="params.deleted" @click="recoverED807">Восстановить</button>
    <button class="home-buttons" @click="showEd807Table">Обновить</button>
  </div>
      <v-table :current-page="params.page + 1"
               :total-records="ed807Count"
               :page-size="5"
               @first-page="params.page=0"
               @increment-page="incrementEd807Page"
               @decrement-page="decrementEd807Page"
               @last-page="params.page=(Math.ceil(ed807Count/5)) - 1"
               @rendering-table="showEd807Table">
      <thead>
        <tr>
          <th style="width: 15px">№</th>
          <th style="width: 250px">Наименоваение</th>
          <th style="width: 100px">Дата создания</th>
          <th style="width: 160px">Файл</th>
          <th style="width: 118px">Дата составления ЭС</th>
          <th style="width: 104px">ID составления ЭС</th>
          <th style="width: 100px">ID получателя ЭС</th>
          <th style="width: 125px">Код причины создания</th>
          <th style="width: 100px">Дата создания ЭС</th>
          <th style="width: 110px">Вид представления</th>
          <th style="width: 60px">Дата ОД</th>
          <th style="width: 130px">№ версии справочника</th>
          <th style="width: 100px">Пользователь</th>
        </tr>
      </thead>
      <tbody v-for="item in ed807"
             :key="item.id"
             :class="{ 'selected': selectedItem === item.id }"
             @click="selectItem(item.id)">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.createdDate }}</td>
          <td class="openTable table-link" @click="openBicTable(item.id)">{{ item.fileName }}</td>
          <td>{{ item.edDate }}</td>
          <td>{{ item.edAuthor }}</td>
          <td>{{ item.edReceiver }}</td>
          <td>{{ item.creationReason}}</td>
          <td>{{ item.creationDateTime}}</td>
          <td>{{ item.infoTypeCode}}</td>
          <td>{{ item.businessDay}}</td>
          <td>{{ item.directoryVersion}}</td>
          <td>{{ item.createdBy}}</td>
      </tbody>
    </v-table>
</div>
  <div class="partInfo-filters">
    <div class="filter-input">
      <label>БИК: </label>
      <input type="text" v-model="bic_params.bic" />
    </div>
    <div class="filter-input">
      <label>Наим. участника: </label>
      <input type="text" v-model="bic_params.name" />
    </div>
    <div class="filter-input">
      <label>Тип участника: </label>
      <select v-model="bic_params.ptType" @change="showPITableWithResetPage">
        <option v-for="type in ptType" :value="type.value" :key="type.value">
          {{type.label}}
        </option>
      </select>
    </div>
  </div>
  <div class="filter-buttons">
    <button class="home-buttons" @click="resetPartInfo">Сброс</button>
    <button class="home-buttons" @click="showPITableWithResetPage">Найти</button>
  </div>
    <v-table
        :current-page="bic_params.page + 1"
        :total-records="participantsInfoCount"
        :page-size="100"
        @increment-page="incrementPIPage"
        @decrement-page="decrementPIPage"
        @first-page="bic_params.page=0"
        @last-page="bic_params.page=(Math.ceil(participantsInfoCount/100)) - 1"
        @rendering-table="showPITable"
        >
      <thead>
      <tr class="bic-head">
        <th style="width: 10px"></th>
        <th style="width: 18px" >ID<br/>ЭС</th>
        <th style="width: 60px">БИК</th>
        <th style="width: 75px">Информация<br/>об участнике<br/>(ID)</th>
        <th>Наименование участника</th>
        <th style="width: 70px">Регистрационный<br/>порядковый<br/>номер</th>
        <th style="width: 45px">Код<br/>страны</th>
        <th style="width: 45px">Код<br/>территории</th>
        <th style="width: 40px">Индекс</th>
        <th style="width: 40px">Тип<br/>нас.<br/>пункта</th>
        <th style="width: 75px">Населенный<br/>пункт</th>
        <th>Адрес</th>
        <th style="width: 60px">БИК<br/>головной<br/>организации</th>
        <th style="width: 62px">Дата<br/>включения</th>
        <th style="width: 60px">Дата<br/>исключения</th>
        <th style="width: 60px">Тип<br/>участника</th>
        <th style="width: 60px">Доступные<br/>сервисы<br/>перевода</th>
        <th style="width: 54px">Участник<br/>обмена</th>
        <th style="width: 60px">УИС</th>
        <th style="width: 60px">Статус<br/>участника</th>
      </tr>
      </thead>
      <tbody
          v-for="(item, index) in participantsInfo"
             :key="item.id">
      <td><i class="icon"
             :class="expandedRows[index] ? 'minus-icon' : 'plus-icon'"
             @click="toggleIcon(index)"></i>
      </td>
      <td>{{ item.ed807Id }}</td>
      <td>{{ item.bic }}</td>
      <td>{{ item.id }}</td>
      <td>{{ item.nameP }}</td>
      <td>{{ item.regN }}</td>
      <td>{{ item.cntrCd }}</td>
      <td>{{ item.rgn}}</td>
      <td>{{ item.ind}}</td>
      <td>{{ item.tnp}}</td>
      <td>{{ item.nnp}}</td>
      <td>{{ item.adr}}</td>
      <td>{{ item.prntBIC}}</td>
      <td>{{ item.dateIn}}</td>
      <td>{{ item.dateOut}}</td>
      <td>{{ item.ptType}}</td>
      <td>{{ item.srvcs}}</td>
      <td>{{ item.xchType? 1 : 0}}</td>
      <td>{{ item.uid}}</td>
      <td>{{ item.participantStatus}}</td>
      <tr v-if="expandedRows[index]">
        <td colspan="20" style="width: 200px">
          <expanded-tables :index=item.id></expanded-tables>
        </td>
      </tr>
      </tbody>

    </v-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vPopup from '../components/popup/v-popup.vue'
import VTable from "@/components/table/v-table.vue";
import ExpandedTables from "@/components/table/ExpandedTables.vue";

export default {

  name: 'app',
  components: {
    ExpandedTables,
    VTable,
    vPopup
  },
  props: {},
  computed: {
    ...mapGetters([
      'ed807',
      'ed807Count',
      'participantsInfo',
      'participantsInfoCount'
    ])
  },
  data() {
    return {
      expandedRows: [],
      params: {
        page: 0,
        title: "",
        deleted: false,
        date1: null,
        date2: null
      },

      ptType:[
        {value:'00',label:'00'},
        {value:'10',label:'10'},
        {value:'12',label:'12'},
        {value:'15',label:'15'},
        {value:'16',label:'16'},
        {value:'20',label:'20'},
        {value:'30',label:'30'},
        {value:'40',label:'40'},
        {value:'51',label:'51'},
        {value:'52',label:'52'},
        {value:'60',label:'60'},
        {value:'65',label:'65'},
        {value:'71',label:'71'},
        {value:'75',label:'75'},
        {value:'78',label:'78'},
        {value:'90',label:'90'},
        {value:'99',label:'99'},
      ],

      updatedData:{
        id: null,
        title: "",
        edAuthor: "",
        edReceiver: "",
        creationReason: "",
        infoTypeCode: "",
        directoryVersion: ""
      },

      bic_params:{
        id:null,
        page: 0,
        bic: '',
        ed807: null,
        name: '',
        ptType: '',
      },


      filename: '',
      selectedItem: null,
      IsCreatePopupVisible: false,
      IsActualizePopupVisible: false,
      IsBicTableVisible: false,
      file: null,
      titleUploadFile: '',
      titleActualizeFile: ''
    };
  },
  methods: {
    async toggleIcon(index) {
      // if(!this.expandedRows[index]){
      //  //const data = await this.GET_ACCOUNTS(index+1);
      //   //console.log(data);
      // }
      this.expandedRows[index] = !this.expandedRows[index];
    },
    incrementEd807Page() {
      if (this.params.page !== (Math.ceil(this.ed807Count / 5)) - 1) {
        this.params.page += 1;
      }
    },
    decrementEd807Page() {
      if (this.params.page !== 0) {
        this.params.page -= 1;
      }
    },
    incrementPIPage() {
      if (this.bic_params.page !== (Math.ceil(this.participantsInfoCount / 100)) - 1) {
        this.bic_params.page += 1;
      }
    },
    decrementPIPage() {
      if (this.bic_params.page !== 0) {
        this.bic_params.page -= 1;
      }
    },

    deleteED807() {
      if (this.selectedItem !== null) {
        this.DELETE_ED807(this.selectedItem);
        this.showEd807Table();
      }
    },
    recoverED807() {
      if (this.selectedItem !== null) {
        this.RECOVER_ED807(this.selectedItem);
        this.showEd807Table();
      }
    },
    openBicTable(id) {
      this.IsBicTableVisible = true;
      this.bic_params.ed807 = id;
      this.showPITable();
      this.expandedRows = [];
    },
    async upload() {
      this.IsCreatePopupVisible = false;
      if (this.file != null) {
        await this.UPLOAD_NEW_ED807({file: this.file, title: this.titleUploadFile});
        this.showEd807Table();
      }

    },
    resetED807Filters() {
      this.page = 0;
      this.title = "";
      this.deleted = false;
      this.date1 = null;
      this.date2 = null;
      this.showEd807Table();
    },
    resetPartInfo() {
      this.bic_params.name = '';
      this.bic_params.bic = '';
      this.bic_params.page = 0;
      this.bic_params.ptType = '';
      this.showPITable();
    },
    async actualize() {
      this.IsActualizePopupVisible = false;
      await this.ACTUALIZE({title: this.titleActualizeFile});
      this.showEd807Table();
    },
    showEd807Table() {
      this.GET_ED807_FROM_API(this.params);
      this.GET_COUNT_ED807(this.params);
      this.selectedItem=null;
    },
    showPITableWithResetPage(){
      this.bic_params.page=0;
      this.GET_ALL_PART_INFO(this.bic_params);
      this.GET_COUNT_OF_PART_INFO(this.bic_params);
      this.expandedRows = [];
    },
    showPITable() {
      this.GET_ALL_PART_INFO(this.bic_params);
      this.GET_COUNT_OF_PART_INFO(this.bic_params);
      this.expandedRows = [];

    },

    handleFileChange(event) {
      this.file = event.target.files[0];
      this.filename = this.file.name;
    },
    showCreatePopup() {
      this.titleUploadFile = '';
      this.filename = '';
      this.file = null;
      this.IsCreatePopupVisible = true;
    },
    closeCreatePopup() {
      this.IsCreatePopupVisible = false;
    },
    showActualizePopup() {
      this.titleActualizeFile = '';
      this.IsActualizePopupVisible = true;
    },
    closeActualizePopup() {
      this.IsActualizePopupVisible = false;
    },


    selectItem(itemId) {
      if (this.selectedItem === itemId) {
        this.selectedItem = null;
      } else {
        this.selectedItem = itemId;
      }
    },

    ...mapActions([
      'GET_ED807_FROM_API',
      'GET_COUNT_ED807',
      'UPLOAD_NEW_ED807',
      'ACTUALIZE',
      'DELETE_ED807',
      'RECOVER_ED807',
      'GET_ALL_PART_INFO',
      'GET_COUNT_OF_PART_INFO',
      'GET_ACCOUNTS'
    ])
  },
  mounted() {
    this.GET_ED807_FROM_API(
        this.params
    );
    this.GET_COUNT_ED807(
      this.params
    )
  }


};
</script>



<style>
.table-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}


.table-link:visited {
  color: blue;
}


.table-link:hover {
  color: red;
  text-decoration: underline;
}
.filters{
  display: flex;
  margin-left: 20px;
  justify-content: start;
  margin-top: 10px;
}
.filter-input{
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: 10px;
}
.filter-buttons button {
  margin-right: 10px;
}

.upload_display{
  display: flex;
  flex-direction: column;
}
.input-file {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.input-file-text {
  padding: 0 10px;
  line-height: 40px;
  text-align: left;
  height: 40px;
  display: block;
  float: left;
  box-sizing: border-box;
  width: 200px;
  border-radius: 6px 0px 0 6px;
  border: 1px solid #ddd;
}
.input-file-btn {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  font-size: 14px;
  vertical-align: middle;
  color: rgb(255 255 255);
  text-align: center;
  border-radius: 0 4px 4px 0;
  background-color: #42b983;
  line-height: 22px;
  height: 40px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
  margin: 0;
  transition: background-color 0.2s;
}
.input-file input[type=file] {
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
}


.input-file input[type=file]:focus + .input-file-btn {
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}


.input-file:hover .input-file-btn {
  background-color: #59be6e;
}
.input-file:active .input-file-btn {
  background-color: #2E703A;
}


.input-file input[type=file]:disabled + .input-file-btn {
  background-color: #eee;
}

.partInfo-filters{
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
}

table {
  border-collapse: collapse;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

th {
  text-align: center;
  background-color: #f5f5f5;
  font-weight: bold;
}

th:not(:last-child):after,
td:not(:last-child):after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 100%;
  width: 1px;
  background-color: #e0e0e0;
}

tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.selected {
  background-color: #ffe8c1 !important;
}

.bic-head tr{
  font-size: 12px;
}

button:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}
.action-buttons{
  display: flex;
  justify-content: flex-start;

  margin-left: 20px;
  margin-bottom: 10px;
}
.add-button{
  margin-right: 10px;
}
.home-buttons{
  margin-right: 10px;
}

.ed807{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
}

.icon {
  width: 20px;
  height: 20px;
  display: inline-block;
  cursor: pointer;
}

.plus-icon::before {
  content: '+';
}

.minus-icon::before {
  content: '-';
}
</style>

