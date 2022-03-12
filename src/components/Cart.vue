<template>
  <q-btn fab-mini flat>
    <q-icon name="mdi-basket">
      <q-badge
        color="green"
        text-color="black"
        class="text-bold"
        floating
        rounded
        >{{ currentCartCount }}</q-badge
      >
    </q-icon>
    <q-menu fit>
      <q-list bordered class="round-borders">
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Orders</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-item v-if="currentCartCount === 0">
          <q-item-section
            ><div class="text-no-wrap">Nothing here yet!</div></q-item-section
          >
        </q-item>

        <q-item v-else v-for="i in currentCart" :key="i.title">
          <q-item-section avatar top>
            <q-img :src="i.picture" width="4rem" class="rounded-borders" />
          </q-item-section>

          <q-item-section top
            ><q-item-label class="q-mt-sm text-bold">{{
              i.title
            }}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-btn
              @click="removeItem(i.guid)"
              icon="cancel"
              flat
              dense
              fab-mini
            />
          </q-item-section>
          <q-separator />
        </q-item>

        <q-separator />

        <q-item
          clickable
          style="background-color: #db2126; color: white"
          class="rounded-borders"
          :disable="currentCartCount === 0"
          to="/checkout"
        >
          <q-item-section class="text-bold"> Go to Checkout </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cartStore } from 'src/stores/cartStore';
import { storeToRefs } from 'pinia';
import { Guid } from 'guid-typescript';

export default defineComponent({
  name: 'Cart',

  setup() {
    const store = cartStore();
    const { currentCart, currentCartCount } = storeToRefs(store);

    return {
      currentCart,
      currentCartCount,
      removeItem: (item: Guid) => {
        store.remove(item);
      },
    };
  },
});
</script>

<style lang="sass" scoped></style>
