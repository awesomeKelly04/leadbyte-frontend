<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <a @click="routeToCourseDetailsPage(cards.id)" class="card-link">
        <v-card
            rounded="lg"
            width="508px"
            height="219px"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            :style="{'background-image':`url(${ cards.logo })`, 'background-size': 'cover'}"
        >
          <div class="overlay">
            <v-list-item>
              <v-list-item-content>
                <v-list-item>
                  <v-card-text class="headline ml-0 mt-n2">
                    <div v-if="cards.name_of_restaurant.length < 35">
                      <h1
                          :style="{'font-family': 'IBM Plex Sans', 'font-size': '24px', 'line-height': '31px'}"
                      >{{ cards.name_of_restaurant }}</h1>
                    </div>
                    <div v-else>
                      <h1
                          :style="{'font-family': 'IBM Plex Sans', 'font-size': '24px', 'line-height': '31px'}"
                      >{{ cards.name_of_restaurant.substring(0,35)+"..." }}</h1>
                    </div>
                  </v-card-text>
                </v-list-item>
                <v-list-item>
                  <v-card-text
                      class="prop mt-n8 pr-5"
                      :style="{'font-family': 'IBM Plex Sans', 'font-size': '14px'}"
                  >
                    {{ cards.phone_number }}
                    <strong>|</strong>
                    {{ cards.email }}
                  </v-card-text>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
            <v-footer
                absolute
                class="font-weight-medium"
                :style="{'color': '#FF2E2E', 'opacity': 1, 'background-color': 'rgba(0,0,0,0.0)'}"
            >
              <v-col class="text-left" cols="12">
                <v-list-item class="font-weight-medium ml-0 mt-16" absolute>
                  <v-icon
                      color="#fff"
                      :style="{'font-family': 'IBM Plex Sans', 'font-size': '14px'}"
                  >mdi-star</v-icon>
                  <v-card-text
                      class="prop"
                      :style="{'font-family': 'IBM Plex Sans', 'font-size': '14px'}"
                  >4.7</v-card-text>
                </v-list-item>
              </v-col>
            </v-footer>
          </div>
        </v-card>
      </a>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "ProviderCard",
  props: {
    cards: Object,
    index: Number
  },
  components: {

  },
  data: () => ({
    notifications: false,
    sound: true,
    widgets: false,
  }),
  methods: {
    routeToCourseDetailsPage(id) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      if (window.location.pathname === '/'){
        this.$router.push( { path: '/', query: { id: id } });
      }
      else if (window.location.pathname === '/'){
        this.$router.push( { path: '/', query: { id: id } });
      }
      else {
        this.$router.push({path: '/', });
      }
    }
  }
};
</script>
<style scoped>

.headline {
  line-height: 31px;
  font-style: normal;
  font-weight: bold;
  color: #ffffff;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
.prop {
  font-family: IBM Plex Sans, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #ffffff;
}
v-card {
  transition: opacity 0.4s ease-in-out;
}
v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>