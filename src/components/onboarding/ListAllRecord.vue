<template>
  <v-responsive class="component-container">
    <v-container grid-list-xl>
      <div :style="{'font-family': 'IBM Plex Sans'}">
        <v-row class="d-flex mx-5">
          <div class="headline ml-0 mt-8">
            <h1
                :style="{'font-family': 'IBM Plex Sans', 'font-size': '38px', 'line-height': '56px'}"
            >View All NIN Records</h1>
          </div>
        </v-row>
        <div style="background-color: #E4F0D4;">
          <v-row  class="align-center justify-center mt-8">
              <v-col cols="12" md="12" sm="8">
                <v-card
                    class="card mx-auto pa-2"
                    max-width="1000"
                    outlined
                    rounded="lg"
                    height="600"

                >
                 <div v-if="submitted === false">
                      <ValidationObserver v-slot="{ handleSubmit }">
                  <v-form class="my-auto" @submit.prevent="handleSubmit(handleCreate)">
                     
                    <Loader :loading="loading" :message="message" />     
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <SubmitButton button-name="View Records" class="view-rec-btn" />
                      </v-col>
                    </v-row>
                    <div style="height: 500px; background-color: #E4F0D4;">
        </div>
                  </v-form>
                </ValidationObserver>
                 </div>
                  <div v-else>
                      <ValidationObserver v-slot="{ handleSubmit }">
                  <v-form class="my-auto" @submit.prevent="handleSubmit(handleClear)">
                    <v-row class="row-input mt-n5">
                      <v-col cols="12" md="8" sm="6">
                        <SubmitButton button-name="Clear View" class="clear-view-btn" />
                      </v-col>
                    </v-row>
                     <div v-if="ninRecords.length === 0" style="height: 500px; background-color: #E4F0D4;">
        </div>
        <div v-else style="background-color: #E4F0D4; height: 500px; ">
          <div v-for="record in ninRecords" :key="record.nin">
            <v-row  class="align-center justify-center mt-8">
              <v-col cols="12" md="12" sm="8">
                <v-card
                    class="card mx-auto pa-2"
                    max-width="1000"
                    outlined
                    rounded="lg"
                >
                  <v-row>
                    <v-col cols="12" md="3" sm="6">
                      <v-img :src="record.headShot" alt="" max-height="177" max-width="203"/>
                    </v-col>
                    <v-col cols="12" md="5" sm="8" class="ml-lg-n10 mr-lg-10 mt-n3">
                      <v-list-item class="card-text" :style="{'font-family': 'IBM Plex Sans'}">
                        Name :  {{ record.name }}
                      </v-list-item>
                      <v-list-item class="card-text mt-n3" :style="{'font-family': 'IBM Plex Sans'}">
                        Surname :  {{ record.surname }}
                      </v-list-item>
                      <v-list-item class="card-text mt-n3" :style="{'font-family': 'IBM Plex Sans'}">
                        NIN :  {{ record.nin }}
                      </v-list-item>
                      <v-list-item class="card-text mt-n3" :style="{'font-family': 'IBM Plex Sans'}">
                        Email :  {{ record.email }}
                      </v-list-item>
                      <v-list-item class="card-text mt-n3" :style="{'font-family': 'IBM Plex Sans'}">
                        Date Of Birth :  {{ record.dateOfBirth }}
                      </v-list-item>
                      <v-list-item class="card-text mt-n3" :style="{'font-family': 'IBM Plex Sans'}">
                        Phone Number :  {{ record.phoneNumber }}
                      </v-list-item>

                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
                  </v-form>
                </ValidationObserver>
                 </div>
                </v-card>
              </v-col>
        </v-row>
        </div>
      </div>
    </v-container>
  </v-responsive>
</template>

<script>
import UserService from "@/services/services";
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import { ValidationObserver } from "vee-validate";
import Loader from "@/components/ui/loader/Loader";
import {localize} from "vee-validate";

export default {
  components: {
    Loader,
    SubmitButton,
    ValidationObserver
  },
  name: 'ViewNinData',
  data () {
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
      ninRecords: [],
      loading: false,
      message: ".",
      submitted: false,
    };
  },
  computed: {
  },
  methods:{
      getAllNinsRecord(){
          UserService.getAllNinsRecord().then(
          res => {
            console.log(res.data);
            this.ninRecords = res.data;
          },
          error => {
            this.loading = false;
            console.log(error.response.data.message);
          }
        );
      },
    handleCreate(){
    this.loading = true;
    this.submitted = true;   
 
    },
    handleClear(){
        this.loading = false;

    this.submitted = false; 
    },
  },
  created() {
   this.getAllNinsRecord(); 
  }
};
</script>

<style scoped>
.component-container {
  background-color: #E4F0D4;
}
.headline {
  line-height: 31px;
  font-style: normal;
  font-weight: bold;
  color: #F56C08;
  text-align: center;
}
v-card {
  transition: opacity 0.4s ease-in-out;
  background-color: transparent !important;
}
v-card:not(.on-hover) {
  opacity: 0.6;
}
.solution {
  justify-content: center;
}
.card {
  background-color: #E4F0D5;
  border: 2px solid #F8F8F8;
  box-sizing: border-box;
  box-shadow: 0 2px 3px rgba(43, 28, 28, 0.15);
  border-radius: 15px 15px 0 0;
}
.err {
  display: block;
  color: red;
  font-size: 13px;
  margin-bottom: 5px;
}
.row-input {
  justify-content: center;
}
</style>

