<template>
  <v-responsive class="component-container">
    <v-container grid-list-md>
      <div :style="{'font-family': 'IBM Plex Sans'}">
        <v-row class="mx-5 mt-16">
          <div class="headline ml-2 mt-8 mb-5">
            <h1
                :style="{'font-family': 'IBM Plex Sans', 'font-size': '38px', 'line-height': '56px'}"
            >Service Providers</h1>
          </div>
        </v-row>
        <v-row>
          <div id="app">
            <autocomplete
                :search="search"
                placeholder="Search By city"
                aria-label="Search By city"
                :get-result-value="getResultValue"
                @submit="handleSubmit"
            ></autocomplete>
          </div>
        </v-row>
        <template v-if="providers.length === 0 && providersByCity === 0" style="height: 450px; background-color: #E4F0D4;">
          <v-row  class="align-center justify-center">
            <v-col cols="12" md="12" sm="8">
              <v-card
                  class="card mx-auto pa-2"
                  max-width="1000"
                  outlined
                  rounded="lg"
              >
                <v-row>
                  <v-col cols="12" md="8" sm="10" class="ml-lg-10 mr-lg-10">
                    {{ providers.message }}
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="providersByCity !== 0" style="background-color: #E4F0D4;">
          <Loader :loading="loading" :message="message" />
          <v-row>
            <v-col cols="4" md="6" sm="6" v-if="providers.length !== 0">
              <div v-for="(card, index) in providersByCity" :key="index" class="component-container">
                <ProviderCard :cards="card" :index="index"/>
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-else style="background-color: #E4F0D4;">
          <Loader :loading="loading" :message="message" />
          <v-row>
            <v-col cols="4" md="6" sm="6" v-if="providers.length !== 0">
              <div v-for="(card, index) in providers" :key="index" class="component-container">
                <ProviderCard :cards="card" :index="index"/>
              </div>
            </v-col>
          </v-row>
        </template>
      </div>
    </v-container>
  </v-responsive>
</template>

<script>
import UserService from "@/services/user-services";
import Loader from "@/components/ui/loader/Loader";
import Autocomplete from '@trevoreyre/autocomplete-vue';


export default {
  components: {
    Loader,
    Autocomplete
  },
  name: 'Food',
  props: {
  },
  data: function () {
    return {
      providers: [],
      message: ".",
      loading: false,
      providersByCity: [],
    };
  },
  computed: {
  },
  methods:{
    getAllServiceProviders(){
      this.loading = true;
      UserService.getAllServiceProviders()
          .then(res =>{
                console.log(res.data)
                this.providers = res.data;
                this.loading = false;
              },
              error => {
                this.loading = false;
                console.log(error.res);
                this.errorMsg = error.res;
              }
          )
    },

    // Search function can return a promise
    // which resolves with an array of
    // results. In this case we're using
    // the city search API.
    search(input) {
      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([])
        }

        this.loading = true;
        UserService.getAllCities()
            .then(response => {
              console.log(response.data)
            })
            .then(data => {
              resolve(data.query.search)
            })
      })
    },
    // We want to display the title
    getResultValue(result) {
      return result.city_name
    },
    handleSubmit(result) {
      this.loading = true;
      console.log(result)
      // UserService.handleGetAllServiceProvidersByCity(result.id)
      //     .then(res =>{
      //           this.loading = false;
      //           console.log(res.data)
      //           this.providersByCity = res.data;
      //         },
      //         error => {
      //           this.loading = false;
      //           console.log(error.res);
      //           this.errorMsg = error.res;
      //         }
      //     )
    }
  },
  created() {
    this.getAllServiceProviders()
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
  color: #F56C08;
  font-size: 11px;
}
.row-input {
  justify-content: center;
}


#app {
  max-width: 400px;
  margin: 0 auto;
}



.component-container {
  background-color: #E4F0D4;
}
</style>

