<template>
  <v-responsive class="component-container">
    <v-container grid-list-md>
      <div>
        <v-row  class="align-center justify-center">
          <v-col cols="12" md="8" sm="6">
            <template>
              <v-card
                  class="card pa-2"
                  max-width="844"
                  height=1000
                  :style="{'background-color': '#E4F0D4', 'background-size': 'cover'}"
              >
                <ValidationObserver v-slot="{ handleSubmit }">
                  <v-form class="my-auto" @submit.prevent="handleSubmit(handleLogin)">
                    <v-row class="row-input mt-14">
                      <v-col cols="12" md="8" sm="6">
                        <h3 class="login-title">Welcome back</h3>
                      </v-col>
                    </v-row>
                    <div v-if="errorMsg">
                      <span class="err text-xl-center">{{ errorMsg }}</span>
                    </div>
                    <Loader :loading="loading" :message="message" />
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <ValidationProvider
                            name="Username"
                            rules="required"
                            v-slot="{ errors }"
                        >
                          <span class="err">{{ errors[0] }}</span>
                          <v-text-field
                              label="Username"
                              name="username"
                              v-model="username"
                              outlined
                              color="red"
                              class="username register-input"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <ValidationProvider
                            name="password"
                            rules="required|min:6"
                            v-slot="{ errors }"
                        >
                          <span class="err">{{ errors[0] }}</span>
                          <v-text-field
                              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="() => (value = !value)"
                              :type="value ? 'password' : 'text'"
                              label="Password"
                              name="password"
                              v-model="password"
                              outlined
                              color="red"
                              class="password register-input"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <SubmitButton button-name="Login" class="login-btn" />
                      </v-col>
                    </v-row>
                  </v-form>
                </ValidationObserver>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-responsive>
</template>

<script>
import UserService from "@/services/services";
import SubmitButton from "../ui/buttons/SubmitButton";
import Loader from "../ui/loader/Loader";
import {localize} from "vee-validate";

export default {
  name: "LoginPage",
  components: {
    Loader,
    SubmitButton
  },
  data() {
    localize({
      en: {
        messages: {
          // generic rule messages...
        },
        fields: {
          password: {
            required: "Password cannot be empty!",
            min: "Password must contain digit, alphabet and underscore?"
          }
        }
      }
    });
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      message: ".",
      errorMsg: "",
      value: true
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      let user = {
        username: this.username,
        password: this.password
      };

      UserService.handleCreateUser(user).then(
          res => {
            console.log(res.data);
            this.$router.push("/success");
            this.submitted = true;
            setTimeout(() => (this.$router.push("/searchNin")), 3000);
          },
          error => {
            this.loading = false;
            this.errorMsg = error.response.data.message;
          }
      );
    }
  }
};
</script>

<style scoped>
.TC {
  font-size: 12px !important  ;
}
.tc-text {
  color: red !important;
  cursor: pointer;
}
.err {
  display: block;
  color: red;
  font-size: 13px;
  margin-bottom: 5px;
}
.component-container {
  background-color: #fff;
}
.row-input {
  justify-content: center;
}

</style>