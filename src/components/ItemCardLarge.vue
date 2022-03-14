<template>
  <div>
    <q-card class="my-card">
      <q-img :src="picture" height="12rem" />
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ title }}</div>
        </div>
        <q-rating
          :model-value="stars ? stars : 0"
          icon="mdi-star"
          color="primary"
          :max="5"
          size="24px"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-grey">
          {{ description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <div>${{ price }}</div>
        <q-space />
        <q-btn @click="$emit('addItem', sku)" flat color="primary">Buy</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script lang="ts">
1461.15;
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['sku', 'picture', 'title', 'stars', 'description', 'price'],
  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
