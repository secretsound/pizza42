<template>
  <div style="width: 100%">
    <div class="text-h4 q-my-sm">Pizza</div>
    <div class="row items-center q-col-gutter-x-md">
      <ItemCardLarge
        v-for="v in pizza"
        :key="v.sku"
        class="col-3"
        :title="v.title"
        :description="v.description"
        :picture="v.picture"
        :stars="v.stars"
        :sku="v.sku"
        :price="v.price"
        @addItem="addItem(v)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cartStore } from 'src/stores/cartStore';
import { Pizza } from 'src/models/products';
import { getPizzaOpts } from 'src/models/pizza';
import ItemCardLarge from './ItemCardLarge.vue';

const store = cartStore();

export default defineComponent({
  components: { ItemCardLarge },
  name: 'PizzaItems',
  props: ['item'],
  setup(props) {
    const pizza = getPizzaOpts();

    const Item = ref(props.item);

    const addItem = (item: Pizza) => {
      store.add(item);
    };

    return {
      pizza,
      Item,
      addItem,
    };
  },
});
</script>

<style lang="sass" scoped></style>
