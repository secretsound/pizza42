<template>
  <q-page>
    <div class="text-h3 q-my-xl">Checkout</div>

    <q-form>
      <div class="row">
        <div class="col q-mr-md">
          <q-list
            class="rounded-borders"
            separator
            style="border: 1px solid grey"
          >
            <q-item v-for="i in currentCart" :key="i.guid.toString">
              <q-item-section top avatar>
                <q-img :src="i.picture" width="5rem" class="rounded-borders" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="q-my-auto text-body1 text-bold">
                  {{ i.title }}
                </q-item-label>
                <div class="text-no-wrap">
                  {{ i.description }}
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="text-body1 text-black">
                  ${{ i.price }}
                  <span>
                    <q-btn
                      @click="removeItem(i.guid)"
                      icon="cancel"
                      flat
                      dense
                      fab-mini
                    />
                  </span>
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section></q-item-section>
              <q-item-section side class="text-body1 text-black">
                Total: ${{ currentCartTotalCost }}</q-item-section
              >
            </q-item>
          </q-list>
        </div>

        <div class="col-4 rounded-borders" style="border: 1px solid grey">
          <q-card
            v-if="!authenticated"
            flat
            class="q-mx-xl q-mt-xl"
            style="height: 30rem"
          >
            <div class="text-h5">Login Required</div>
            <div class="text-body2">
              Please login to continue with your purchase
            </div>
            <div class="q-mt-xl">
              <q-btn color="primary" @click="login">Login</q-btn>
            </div>
          </q-card>
          <div v-else class="q-px-md q-pt-md" style="height: 30rem">
            <div class="text-h5">Please Enter Your Information:</div>
            <q-input outlined dense label="Address" v-model="form.address" />
            <q-input
              outlined
              dense
              label="Secondary"
              v-model="form.secondary"
            />
            <q-input outlined dense label="Zip Code" v-model="form.zipcode" />
            <q-separator class="q-mt-md" />
            <q-input
              outlined
              dense
              label="Credit Card"
              mask="#### - #### - #### - ####"
              fill-mask="#"
              unmasked-value
              v-model="form.creditcard"
            />
            <div class="row q-col-gutter-x-sm q-mt-none">
              <q-input
                class="col"
                outlined
                dense
                label="CVV"
                v-model="form.cvv"
              />
              <q-input
                class="col"
                outlined
                dense
                label="Expiration Date"
                v-model="form.exp"
                mask="date"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.exp">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-toggle
              dense
              label="Would you like for us to save these settings?"
              v-model="form.save_settings"
            />
          </div>
        </div>
      </div>
      <q-separator class="q-my-lg" />

      <div class="float-right">
        <q-btn
          label="Buy"
          @click="order"
          color="primary"
          :disable="!authenticated || !email_verified"
        />
        <q-btn
          label="Cancel"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>

    <q-dialog v-model="submittingOrder">
      <q-card style="height: 10rem; width: 20rem">
        <q-card-section class="text-center">
          <div class="text-h6">{{ popupTitle }}</div>
          <div class="text-h7">{{ popupSubTitle }}</div>
        </q-card-section>

        <div class="text-center" v-if="popupStatus === 'ordering'">
          <q-spinner-hourglass color="primary" size="4em" />
        </div>
        <div v-else-if="popupStatus === 'success'" class="wrapper success-icon">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cartStore } from 'src/stores/cartStore';
import { useUserStore } from 'src/stores/userStore';
import { storeToRefs } from 'pinia';
import { Order } from 'src/models/order';
import { Guid } from 'guid-typescript';

const store = cartStore();
const { currentCart, currentCartTotalCost } = storeToRefs(store);

const userStore = useUserStore();
const { authenticated, email_verified } = storeToRefs(userStore);

export default defineComponent({
  name: 'Checkout',
  setup() {
    let form = ref({
      address: null,
      secondary: null,
      zipcode: null,
      creditcard: null,
      cvv: null,
      exp: null,
      save_settings: false,
    });

    return {
      currentCart,
      currentCartTotalCost,
      authenticated,
      email_verified,
      form,
      removeItem: (guid: Guid) => {
        store.remove(guid);
      },
      login: async () => {
        await userStore.login();
      },
    };
  },
  data() {
    async function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const submittingOrder = ref(false);

    const popupTitle = ref('Completing your order');
    const popupSubTitle = ref('One Moment...');
    const popupStatus = ref('ordering');

    return {
      submittingOrder,
      popupTitle,
      popupSubTitle,
      popupStatus,
      order: async () => {
        const l = store.cartToJson();
        submittingOrder.value = true;
        const order = new Order(currentCartTotalCost.value, l);
        await sleep(5000);

        try {
          await userStore.updateOrderHistory(order);
          popupStatus.value = 'success';
          popupTitle.value = 'Your order is Successful!';
          popupSubTitle.value = 'Returning you to the home screen.';
          await sleep(5000);
          store.clearCart();
        } catch {
          popupStatus.value = 'failed';
          popupTitle.value = 'Something went wrong..';
          popupSubTitle.value = 'Please try again later';
          await sleep(5000);
        }
        submittingOrder.value = false;
        await this.$router.push('/');
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.row
  margin-top: 1rem

.success-icon
  .checkmark__circle
      stroke-dasharray: 166
      stroke-dashoffset: 166
      stroke-width: 2
      stroke-miterlimit: 10
      stroke: #7ac142
      fill: none
      animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards


  .checkmark
      width: 4em
      height: 4em
      border-radius: 50%
      display: block
      stroke-width: 2
      stroke: #fff
      stroke-miterlimit: 10
      margin: 0 auto
      box-shadow: inset 0px 0px 0px #7ac142
      animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both


  .checkmark__check
      transform-origin: 50% 50%
      stroke-dasharray: 48
      stroke-dashoffset: 48
      animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards


  @keyframes stroke
      100%
          stroke-dashoffset: 0

  @keyframes scale
      0%,
      100%
          transform: none
      50%
          transform: scale3d(1.1, 1.1, 1)

  @keyframes fill
      100%
          box-shadow: inset 0px 0px 0px 30px #7ac142
</style>
