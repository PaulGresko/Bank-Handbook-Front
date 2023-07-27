<template>
  <p v-if="!(swbics || rstrList.length || accounts.length)">Данные не найдены</p>
  <div class="expanded-tables" v-if="swbics || rstrList.length || accounts.length">
  <table v-if="rstrList.length" class="rstrList-table">
    <thead class="expanded-table-head">
    <tr>
      <th colspan="2">Перечень ограничений участника</th>
    </tr>
    <tr>
      <th>Код ограничения</th>
      <th>Дата начала действия ограничения</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="rstr in rstrList" :key="rstr.id">
      <td>{{ rstr.rstr }}</td>
      <td>{{ rstr.rstrDate }}</td>
    </tr>
    </tbody>
  </table>

  <table v-if="swbics" class="swbics-table">
    <thead class="expanded-table-head">
    <tr>
      <th colspan="3">Перечень БИК, соответствующий участнику</th>
    </tr>
    <tr>
      <th>№</th>
      <th>БИК</th>
      <th>Признак использования БИК</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>{{ swbics.id }}</td>
      <td>{{ swbics.swbic }}</td>
      <td>{{ swbics.defaultSWBIC ? 1 : 0}}</td>
    </tr>
    </tbody>
  </table>

  <table v-if="accounts.length" class="accounts-table">
    <thead class="expanded-table-head">
    <tr>
      <th colspan="8">Информация о счетах участника перевода
        денежных средств.</th>
    </tr>
    <tr>
      <th>№</th>
      <th>Номер счёта</th>
      <th>Тип счёта</th>
      <th>БИК ПБР</th>
      <th>Контрольный ключ</th>
      <th>Дата открытия счета</th>
      <th>Дата исключения информации о счете</th>
      <th>Статус</th>
    </tr>
    </thead>
    <tbody v-for="account in accounts" :key="account.id">
    <tr>
      <td>{{ account.id }}</td>
      <td>{{ account.account }}</td>
      <td>{{ account.regulationAccountType}}</td>
      <td>{{ account.accountCBRBIC }}</td>
      <td>{{ account.ck }}</td>
      <td>{{ account.dateIn }}</td>
      <td>{{ account.dateOut }}</td>
      <td>{{ account.accountStatus }}</td>
    </tr>
    <tr v-if="account.accRstrLists.length">
      <td colspan="8" >
        <div class="accRstr-td">
        <Table class="accRstr-table">
          <thead>
          <tr>
            <th colspan="3">Перечень ограничений операций по счету</th>
          </tr>
          <tr>
            <th>Код ограничения</th>
            <th>Дата начала действия ограничения</th>
            <th>БИК преемника</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="accRstr in account.accRstrLists" :key="accRstr.id">
            <td>{{accRstr.accRstr}}</td>
            <td>{{accRstr.accRstrDate}}</td>
            <td>{{accRstr.successorBIC}}</td>
          </tr>
          </tbody>
        </Table>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "expanded-tables",
  data() {
    return{
      accounts: [],
      swbics:null,
      rstrList:[]
    }
  },
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  methods:{
    ...mapActions([
        'GET_ACCOUNTS',
        'GET_SWBICS',
        'GET_RSTR'
    ])
  },
  async mounted() {
    this.accounts = await this.GET_ACCOUNTS(this.index);
    this.swbics = await this.GET_SWBICS(this.index);
    this.rstrList = await this.GET_RSTR(this.index);
    console.log(this.accounts);
  },


};
</script>
<style scoped lang="scss">
.accounts-table{
  width: 900px;
  table-layout: auto;
  border-collapse: collapse;
}
.rstrList-table{
  width: 400px;
  table-layout: auto;
  margin-bottom: 20px;
}
.swbics-table{
  width: 300px;
  table-layout: auto;
  margin-bottom: 20px;
}
.accRstr-td{
  display: flex;
  justify-content: center;
  align-items: center;
}
.accRstr-table{
  width: 400px;
  table-layout: auto;

}
.accRstr-table th{
  z-index: 1;
  padding: 2px;
}
.expanded-tables{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.expanded-table-head th{
  z-index: 1;
  padding: 2px;
}
</style>