<template>
  <q-page>
    <div class="q-my-lg">
      <previous-history class="col-12" />
    </div>
    <div class="row items-center justify-evenly">
      <PizzaItems class="column" />
    </div>
  </q-page>
</template>

<script lang="ts">
import PizzaItems from 'src/components/PizzaItems.vue';
// import SodaItems from 'src/components/SodaItems.vue';
import { defineComponent } from 'vue';
import PreviousHistory from 'src/components/PreviousHistory.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { PizzaItems, PreviousHistory },
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped>
.row
  margin-top: 1rem
</style>
