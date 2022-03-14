<template>
  <q-page>
    <div class="text-h4 q-my-lg">My Profile</div>
    <div>
      <div>
        <div class="text-h5 q-mb-md">Personal Information</div>
        <div class="row items-center">
          <div class="col-2">
            <q-avatar size="8rem"><q-img :src="user.picture" /></q-avatar>
          </div>
          <div class="col">
            <div class="row q-col-gutter-sm">
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="First Name"
                v-model="userObj.given_name"
              />
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="Last Name"
                v-model="userObj.family_name"
              />
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="E-Mail"
                v-model="userObj.email"
              />
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="Address"
                v-model="userObj.address"
              />
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="Phone"
                v-model="userObj.phone_number"
              />
              <q-input
                class="col-6"
                debounce="500"
                filled
                label="Birthday"
                v-model="userObj.birthdate"
              />
            </div>
          </div>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div>
        <div class="text-h5 q-mb-md">Food Preferences</div>
        <div class="text-body1 q-mb-md">
          Check any preferences you have below to help craft a better expirence
          for you!
        </div>
        <div class="column">
          <q-toggle
            name="vegetarian"
            v-model="food_prefs.vegetarian"
            label="Vegetarian"
          />
          <q-toggle name="Vegan" v-model="food_prefs.vegan" label="Vegan" />
          <q-toggle name="Keto" v-model="food_prefs.keto" label="Keto" />
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div>
        <div class="text-h5 q-mb-md">Contact Preferences</div>
        <div class="text-body1 q-mb-md">
          Would you like to receive alerts for any of the following methods?
        </div>
        <div class="column">
          <q-toggle name="email" v-model="contact_prefs.email" label="E-Mail" />
          <q-toggle
            name="sms"
            v-model="contact_prefs.sms"
            label="SMS"
            :disable="userObj.phone_number === ''"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapActions } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  name: 'Profile',
  setup() {
    const { user } = useAuth0();

    let userObj = ref({
      given_name: user.value.given_name,
      family_name: user.value.family_name,
      email: user.value.email,
      address: user.value.address,
      phone_number: user.value.phone_number,
      birthdate: user.value.birthdate,
    });

    const metadata = ref(user.value['http://metadata']);

    const food_prefs = ref({
      vegan: metadata.value.food_prefs.vegan,
      vegetarian: metadata.value.food_prefs.vegetarian,
      keto: metadata.value.food_prefs.keto,
    });

    const contact_prefs = ref({
      sms: metadata.value.contact_methods.sms,
      email: metadata.value.contact_methods.email,
    });

    return {
      user,
      userObj,
      contact_prefs,
      food_prefs,
    };
  },
  data() {
    // let userObj = ref({
    //   given_name: this.$auth0.user.value.given_name,
    //   family_name: this.$auth0.user.value..family_name,
    //   email: profile.value.email,
    //   address: profile.value.address,
    //   phone_number: profile.value.phone_number,
    //   birthdate: profile.value.birthdate,
    // });
    // const food_prefs = ref({
    //   vegan: metadata.value.food_prefs.vegan,
    //   vegetarian: metadata.value.food_prefs.vegetarian,
    //   keto: metadata.value.food_prefs.keto,
    // });
    // const contact_prefs = ref({
    //   sms: metadata.value.contact_methods.sms,
    //   email: metadata.value.contact_methods.email,
    // });
  },
  watch: {
    userObj: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
    },
    food_prefs: {
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
    },
    contact_prefs: {
      deep: true,
      handler(newValue) {
        // this.updateContactPrefs(newValue)
        //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        //   .then((res) => console.log(res))
        //   .catch((res) => console.log(res));
      },
    },
  },
});
</script>

<style lang="sass" scoped>
// .row
//   margin-top: 1rem
</style>
