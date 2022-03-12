<template>
  <q-card class="my-card">
    <q-img :src="Item?.picture" height="12rem" />

    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">{{ Item?.title }}</div>
      </div>
      <q-rating
        :model-value="Item?.stars ? Item.stars : 0"
        icon="mdi-star"
        color="primary"
        :max="5"
        size="24px"
      />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-grey">
        {{ Item?.description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn @click="addItem" flat color="primary">Buy</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cartStore } from 'src/stores/cartStore';
import { Pizza, Soda } from 'src/models/products';

const store = cartStore();

export default defineComponent({
  name: 'SodaItems',
  props: ['item'],
  setup(props) {
    const Item = ref(props.item);

    const addItem = () => {
      const i: Soda = new Soda(
        Item.value.sku,
        Item.value.title,
        Item.value.description,
        Item.value.stars,
        Item.value.pictures,
        Item.value.price
      );

      store.add(i);
    };

    return {
      Item,
      addItem,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 15rem
</style>
