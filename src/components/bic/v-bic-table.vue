<template>
  <div class="handbook">
    <div class="filters">
      <div class="filter-input">
        <label>БИК:</label>
        <input type="text" v-model="params.bic" />
      </div>
      <div class="filter-input">
        <label>Наименование участника:</label>
        <input type="text" v-model="params.name" />
      </div>
      <div class="filter-input">
        <label>Тип участника:</label>
        <input type="date" v-model="params.ptType" />
      </div>
      <div class="filter-buttons">
        <button @click="resetFilters">Сброс</button>
        <button @click="applyFilters">Найти</button>
      </div>
    </div>
    <main>
      <table>
        <thead>
        <tr>
          <th>Код</th>
          <th>Название</th>
          <th>Период действия с</th>
          <th>Период действия до</th>
          <th>Кем создано</th>
          <th>Когда создано</th>
          <th>Кем изменено</th>
          <th>Когда изменено</th>
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
          <td>{{ item.updatedBy }}</td>
          <td>{{ item.updatedDate }}</td>
        </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <div class="footer-left">
        <span class="pagination-icon">&#171;</span>
        <span class="pagination-icon">&#8249;</span>
        <input type="text" v-model="currentPage">
        <span class="pagination-icon">&#8250;</span>
        <span class="pagination-icon">&#187;</span>
        <span class="reload-icon">&#8635;</span>
      </div>
      <div class="footer-right">
        Отображаются записи с {{ firstRecord }} по {{ lastRecord }}, всего {{ totalRecords }}
      </div>
    </footer>
  </div>
</template>

<script setup>

import vPopup from "@/components/popup/v-popup.vue";
import VHeader from "@/components/header/Header.vue";
</script>
<style lang="scss">

</style>
