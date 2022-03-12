<template>
  <q-page>
    <div class="q-my-xl">
      <previous-history class="col-12" />
    </div>
    <div class="row items-center justify-evenly">
      <div class="text-h4 col-12">Pizza</div>
      <PizzaItems v-for="i in pizza" :key="i.sku" :item="i" class="column" />
    </div>
  </q-page>
</template>

<script lang="ts">
import PizzaItems from 'src/components/PizzaItems.vue';
// import SodaItems from 'src/components/SodaItems.vue';
import { defineComponent, ref } from 'vue';
import PreviousHistory from 'src/components/PreviousHistory.vue';
import { getPizzaOpts } from 'src/models/pizza';

export default defineComponent({
  name: 'PageIndex',
  components: { PizzaItems, PreviousHistory },
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const pizza = ref(getPizzaOpts());

    return {
      pizza,
    };
  },
});
</script>

<style lang="sass" scoped>
.row
  margin-top: 1rem
</style>
