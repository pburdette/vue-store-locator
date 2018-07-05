<template>
  <div class="store-list">
    <div v-for="store in markers" :key="store.infoText.address" class="store">
      <div class="store-info">
        <h4>{{store.infoText.name}}</h4>
        <p>{{store.infoText.address}}</p>
        <p>{{store.infoText.city}}, {{store.infoText.state}} {{store.infoText.zip}}</p>
        <p>{{store.infoText.phone}}</p>
      </div>
      <div class="store-directions">
        <p v-if="store.distance">{{Math.ceil(store.distance * 0.000621371192)}} miles away</p>
        <a :href="`https://maps.google.com/maps?daddr=${store.infoText.address} ${store.infoText.city}, ${store.infoText.state} ${store.infoText.zip}`"><i class="fas fa-car"></i></a>
        <br>
        <a :href="`https://maps.google.com/maps?daddr=${store.infoText.address} ${store.infoText.city}, ${store.infoText.state} ${store.infoText.zip}`">Get Directions</a>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreList',
  props: {
    markers: Array
  }
}
</script>

<style scoped>
.store-list {
  border: 1px solid #eee;
  height: 500px;
  overflow-y: scroll;
}
.store {
  padding: 10px;
}
.store p {
  margin-bottom: 5px;
}
.store-info,
.store-directions {
  text-align: center;
}
.store-directions i {
  font-size: 65px;
  color: #1C61B2;
}
</style>
