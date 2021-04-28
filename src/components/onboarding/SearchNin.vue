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
                  height="600"
                  :style="{'background-color': '#E4F0D4', 'background-size': 'cover'}"
              >
                <ValidationObserver v-slot="{ handleSubmit }">
                  <v-form class="my-auto" @submit.prevent="handleSubmit(handleSearch)">
                    <v-row class="row-input mt-14">
                      <v-col cols="12" md="8" sm="6">
                        <h3 class="login-title">Search NIN Record</h3>
                      </v-col>
                    </v-row>
                    <div v-if="errorMsg">
                      <span class="err text-xl-center">{{ errorMsg }}</span>
                    </div>
                    <Loader :loading="loading" :message="message" />
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <ValidationProvider
                            name="NIN"
                            :rules="{
                              required: true,
                              max:11,
                              min:11, 
                              regex:/[0-9+]+$/
                            }"
                            v-slot="{ errors }"
                        >
                          <span class="err">{{ errors[0] }}</span>
                          <v-text-field
                              label="NIN"
                              name="nin"
                              v-model="nin"
                              outlined
                              color="red"
                              class="nin register-input"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <SubmitButton button-name="Search" class="search-btn" />
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
// import UserService from "@/services/services";
import SubmitButton from "../ui/buttons/SubmitButton";
import Loader from "../ui/loader/Loader";
import {localize} from "vee-validate";
import NinData from "/home/awesome/Downloads/data.json"

export default {
  name: "SearchNin",
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
        }
      }
    });
    return {
      nin: null,
      submitted: false,
      loading: false,
      message: ".",
      errorMsg: "",
      value: true
    };
  },
  methods: {
    handleSearch() {
      this.loading = true;
      this.errorMsg = "";
     let record = null;
     for (let i = 0; i < NinData.length; i++) {
       if(this.nin === NinData[i].nin){
        record = NinData[i];
        break; 
       }
     }

     if(record !== null){
      this.$router.replace({name:'View Nin Data', query:{record}});
     }
     else{
       this.loading = false;
      this.errorMsg = "No Record Found!";
     }
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
  background-color: #E4F0D4;
}
.row-input {
  justify-content: center;
}

</style>