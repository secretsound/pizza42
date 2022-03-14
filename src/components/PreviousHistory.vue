<template>
  <q-card flat>
    <div class="text-h4 q-my-lg">Order History</div>
    <div v-if="!isLoading">
      <div v-if="isAuthenticated">
        <div
          v-if="history"
          class="q-mt-md rounded-borders"
          style="border: 1px solid lightgray"
        >
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 7rem"
            id="scroll-area-with-virtual-scroll-1"
            class="q-pa-md"
          >
            <q-virtual-scroll :items="history" virtual-scroll-horizontal>
              <template v-slot="{ item }">
                <q-card
                  bordered
                  class="q-mr-md"
                  style="width: 20rem; height: 5rem"
                >
                  <q-card-section horizontal>
                    <q-img
                      :src="item.order[0].picture"
                      height="5rem"
                      width="8rem"
                    />
                    <q-card-section>
                      <div>{{ convertTime(item.date) }}</div>
                      <div>${{ item.price }}</div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </template>
            </q-virtual-scroll>
          </q-scroll-area>
        </div>
        <div v-else>
          No previous order history found. Time to order something!
        </div>
      </div>
      <div v-else class="text-h7 ellipsis">
        Nothing to show here for now. Login to see your previous history!
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { DateTime } from 'luxon';
import { useAuth0 } from '@auth0/auth0-vue';
import { sleep } from '../utils';

export default defineComponent({
  name: 'PreviousHistory',
  setup() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    let history = ref();

    return {
      history,
      user,
      isAuthenticated,
      isLoading,
      thumbStyle: {
        right: '5px',
        borderRadius: '8px',
        backgroundColor: '#027be3',
        width: '8px',
        opacity: 0.75,
      },

      barStyle: {
        right: '2px',
        borderRadius: '14px',
        backgroundColor: '#027be3',
        width: '14px',
        opacity: 0.2,
        marginTop: '-3px',
        marginBottom: '-3px',
        paddingTop: '3px',
        paddingBottom: '3px',
      },
      convertTime: (time: number) => {
        const i = DateTime.fromMillis(time);
        return i.toLocaleString(DateTime.DATETIME_SHORT);
      },
    };
  },
  watch: {
    user(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
    },
  },
  mounted() {
    const { user } = useAuth0();
    if (!this.isLoading && this.isAuthenticated) {
      const i = user.value['http://metadata'].history;
      console.log(typeof i);
      if (typeof i === undefined) {
        sleep(1000)
          .then((i) => '')
          .catch((i) => '');
      }

      this.history = [...i];
    }
    return {};
  },
});
</script>

<style lang="sass" scoped></style>
