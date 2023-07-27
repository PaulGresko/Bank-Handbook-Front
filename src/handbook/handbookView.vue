<template>
  <div class="handbook">
    <v-popup
        v-if="IsHandbookPopup"
        @closePopup="closeHandbookPopup"
        @btnAction= "ActionHandbooks"
        :popupName="isUpdateMode ? 'Редактирование' : 'Добавление'"
        :btnTitle="isUpdateMode ? 'Обновить' : 'Добавить'">
      <div class="handbook_popup">
      <div class="form-group">
        <label for="code">Код</label>
        <select class="input-code" v-model="newItem.code">
          <option v-for="option in codes[handbookType]" :key="option">
            {{option}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="title">Название</label>
        <input type="text" id="title" v-model="newItem.title" />
      </div>
      <div class="form-group">
        <label for="validFrom">Период действия с</label>
        <vue-flatpickr v-model="newItem.validFrom" :config="dateConfig" :value="newItem.validFrom ? newItem.validFrom : ' дд.мм.гггг'"/>
      </div>
      <div class="form-group">
        <label for="validUntil">Период действия до</label>
        <vue-flatpickr v-model="newItem.validUntil" :config="dateConfig" :value="newItem.validUntil ? newItem.validUntil : ' дд.мм.гггг'"/>
      </div>
        </div>
    </v-popup>


    <div class="filters">
      <div class="filter-input">
        <label>Код:</label>
        <select style="width: 150px" v-model="params.code">
          <option v-for="option in codes[handbookType]" :key="option">
            {{option}}
          </option>
        </select>
      </div>
      <div class="filter-input">
        <label>Наименование:</label>
        <input type="text" v-model="params.title" />
      </div>
      <div class="filter-input">
        <label>Действует на дату:</label>
        <input type="date" v-model="params.date" />
      </div>
    </div>
    <div class="filter-deleted">
    <label>Искать удаленные данные: </label>
    <input type="checkbox" v-model="params.deleted" @change="renderingTable" />
  </div>
    <div class="filter-buttons">
    <button class="handbook-buttons" @click="resetFilters">Сброс</button>
    <button class="handbook-buttons" @click="renderingTable">Найти</button>
  </div>
    <div class="action-handbooks-buttons">
      <button class="handbook-buttons" @click="IsHandbookPopup = true">Добавить</button>
      <button class="handbook-buttons" @click="updateHandbook">Изменить</button>
      <button class="handbook-buttons" v-if="!params.deleted" @click="deleteHandbook">Удалить</button>
      <button class="handbook-buttons" v-if="params.deleted" @click="recoverHandbook">Восстановить</button>
      <button class="handbook-buttons" @click="renderingTable">Обновить</button>
    </div>
    <v-table
      :current-page="currentPage"
      :total-records="handbooksCount"
      :page-size="20"
      @first-page="currentPage=1"
      @increment-page="incrementPage"
      @decrement-page="decrementPage"
      @last-page="currentPage=(Math.ceil(handbooksCount/20))"
      @rendering-table="renderingTable">
    <thead>
    <tr>
      <th class="sticky-column" style="width: 50px">Код</th>
      <th class="sticky-column">Название</th>
      <th class="sticky-column" style="width: 120px">Период действия с</th>
      <th class="sticky-column" style="width: 120px">Период действия до</th>
      <th class="sticky-column" style="width: 120px">Кем создано</th>
      <th class="sticky-column" style="width: 120px">Когда создано</th>
      <th class="sticky-column" style="width: 120px">Кем изменено</th>
      <th class="sticky-column" style="width: 120px">Когда изменено</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in handbooks " :key="item.id" :class="{ 'selected': selectedItem === item.id }" @click="selectItem(item.id)">
      <td>{{ item.code }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.validFrom }}</td>
      <td>{{ item.validUntil }}</td>
      <td>{{ item.createdBy }}</td>
      <td>{{ item.createdDate }}</td>
      <td>{{ item.lastModifiedBy }}</td>
      <td>{{ item.lastModifiedDate }}</td>
    </tr>
    </tbody>
  </v-table>
  </div>
</template>

<script>

import vPopup from "@/components/popup/v-popup.vue";
import VueFlatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import {mapActions, mapGetters, mapMutations} from "vuex";
import VTable from "@/components/table/v-table.vue";
export default {
  components: {
    VTable,
    vPopup,
    VueFlatpickr
  },


  data() {
    return {
      isUpdateMode: false,
      IsHandbookPopup: false,
      newItem: {
        code: null,
        title: null,
        validFrom: null,
        validUntil: null
      },
      params: {
        type: this.id,
        page: 0,
        code: null,
        title: null,
        date: null,
        deleted: null,
      },
      selectedItem: null,
      currentPage: 1,
      dateConfig: {
        dateFormat: "d.m.Y",
      },
      codes: {
        'CreationReason': ['RQST', 'CIBD', 'FCBD', 'FIRR', 'SIRR'],
        'InfoType': ['FIRR', 'SIRR'],
        'ChangeType': ['ADDD', 'CHGD', 'DLTD'],
        'PtType': ['00', '10', '12', '15', '16', '20', '30', '40', '51', '52', '60', '65', '71', '75', '78', '90', '99'],
        'SrvcsType': ['1', '2', '3', '4', '5', '6'],
        'XchType': ['0', '1'],
        'RstrType': ['URRS', 'LWRS', 'MRTR', 'RSIP', 'FPIP'],
        'ParticipantStatusType': ['PSAC', 'PSDL'],
        'AccRstrType': ['LMRS', 'URRS', 'CLRS', 'FPRS', 'SDRS'],
        'AccountStatusType': ['ACAC', 'ACDL'],
        'RegulationAccountType': ['CBRA', 'CRSA', 'BANA', 'TRSA', 'TRUA', 'CLAC', 'UTRA']
      }
    };
  },
  computed: {
    ...mapGetters([
      'handbooks',
      'handbooksCount',
      'handbookType'
    ]),
  },
  methods: {
    incrementPage(){
      if(this.currentPage!==(Math.ceil(this.totalRecords/20))){
        this.currentPage += 1;
      }
    },
    decrementPage(){
      if(this.currentPage!==1){
        this.currentPage -= 1;
      }
    },
    renderingTable() {
      this.params.page = this.currentPage - 1;
      this.GET_ALL_HANDBOOKS(this.params);
      this.GET_COUNT_OF_HANDBOOKS(this.params);
    },
    async ActionHandbooks() {
      if (this.isUpdateMode) {
        const data = {
          id: this.selectedItem,
          type: this.handbookType,
          code: this.newItem.code,
          title: this.newItem.title,
          validFrom: this.newItem.validFrom,
          validUntil: this.newItem.validUntil
        }
        await this.UPDATE_HANDBOOK(data);
        this.isUpdateMode = false;
      } else {
        if (this.newItem.code && this.newItem.title) {
          const data = {
            type: this.handbookType,
            code: this.newItem.code,
            title: this.newItem.title,
            validFrom: this.newItem.validFrom,
            validUntil: this.newItem.validUntil
          }
         await this.ADD_HANDBOOK(data);
        }

      }
      this.renderingTable();
      this.resetForm();
    },
    closeHandbookPopup(){
      this.IsHandbookPopup = false;
      this.resetForm();
    },
    updateHandbook() {
      if (this.selectedItem !== null) {
        const selectedRow = this.getSelectedRow();
        this.newItem.code = selectedRow.code;
        this.newItem.title = selectedRow.title;
        this.newItem.validFrom = selectedRow.validFrom;
        this.newItem.validUntil = selectedRow.validUntil;
        this.isUpdateMode = true;
        this.IsHandbookPopup = true;
      }
    },
    resetForm() {
      this.newItem = {
        code: '',
        name: '',
        startDate: '',
        endDate: ''
      };
      this.IsHandbookPopup = false;
    },
    resetFilters() {
      this.params = {
        page: 0,
        code: null,
        title: null,
        date: null,
        deleted: null,
      };
      this.renderingTable();
    },

    selectItem(itemId) {
      if (this.selectedItem === itemId) {
        this.selectedItem = null;
      } else {
        this.selectedItem = itemId;
      }
    },
    getSelectedRow() {
      if (this.selectedItem) {
        return this.handbooks.find(item => item.id === this.selectedItem);

      }
      return null;
    },
    deleteHandbook() {
      if (this.selectedItem !== null) {
        this.DELETE_HANDBOOK(this.selectedItem);
        this.GET_COUNT_OF_HANDBOOKS(this.params);
        this.GET_ALL_HANDBOOKS(this.params);
        this.selectedItem = null;
      }
    },
    recoverHandbook() {
      this.RECOVER_HANDBOOK(this.selectedItem);
      this.GET_COUNT_OF_HANDBOOKS(this.params);
      this.GET_ALL_HANDBOOKS(this.params);
      this.selectedItem = null;
    },

    ...mapMutations([

      'SET_HANDBOOKS_COUNT'
    ]),
    ...mapActions([
      'GET_ALL_HANDBOOKS',
      'GET_COUNT_OF_HANDBOOKS',
      'ADD_HANDBOOK',
      'UPDATE_HANDBOOK',
      'DELETE_HANDBOOK',
      'RECOVER_HANDBOOK'
    ])
  },
  mounted() {
    this.GET_ALL_HANDBOOKS(this.params);
    this.GET_COUNT_OF_HANDBOOKS(this.params);
  },
  props: {
    id: {
      type: String,
      required: true
    },
  }


};

</script>

<style>

v-popup{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 16px;
  width: 100%;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input {
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-code{
  width: 220px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.filter-input{
  margin-top: 4px;
  margin-bottom: 4px;
}
.filter-buttons button {
  margin-right: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.action-handbooks-buttons {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  margin-bottom: 10px;
}


html,body,.handbook {
  height: 100%;
  margin: 0;
  padding: 0;
}

.handbook {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
}

.selected{
  background-color: #ffe8c1 !important;
}
.handbook_popup{
  display: flex;
  flex-direction: column;
}
.handbook-buttons{
  margin-right: 10px;
}
.filter-deleted{
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
