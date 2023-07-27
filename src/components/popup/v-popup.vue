<template>
  <div class="pop-wrapper" ref="pop-wrapper">
<div class='v-popup'>
  <div class= "v-popup__header">
    <span>{{popupName}}</span>
  </div>
  <div class= "v-popup__content">
    <slot></slot>
  </div>
  <div class= "v-popup__footer">
    <button class="close_modal" @click="closePopup">Закрыть</button>
    <button class="submit_btn" @click="btnAction">{{ btnTitle }}</button>
  </div>
</div>
</div>
</template>

<script >
  export default {
    name: "v-popup",
    props:{
      popupName:{
        type: String,
        default: 'Popup Name'
      },

      btnTitle:{
        type: String,
        default: 'Submit'
      }
    },
    data(){
      return{}
    },
    methods:{
      btnAction(){
        this.$emit('btnAction');
      },
      closePopup(){
        this.$emit('closePopup');
      }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click',function (item) {
        if(item.target === vm.$refs['pop-wrapper']){
          vm.closePopup();
        }
      })
    }

  }

</script>
<style lang="scss">

  .pop-wrapper{
    background: rgba(64,64,64, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
  .v-popup{
    padding: 16px;
    position: fixed;
    top: 250px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;
    border-radius: 10px;
    z-index: 10;
    &__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;

    }

    &__footer{
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__content{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .submit_btn{
      min-width: 90px;
      border-radius: 20px;
      padding: 8px;
      color: #050505;
      background: #42b983;
    }

    .close_modal{
      width: 90px;
      border-radius: 20px;
      padding: 8px;
      color: #050505;
      background: #a80009;
    }
  }




</style>