<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Find A Service Center Near You</h1>
        </div>
        <div class="col-md-4">
          <div class="search">
            <label>
              <gmap-autocomplete
                @place_changed="setPlace"
                :placeholder="placeholder"
              >
              </gmap-autocomplete>
            </label>
            <select v-model="radius">
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
            </select>
            <button type="button" class="btn btn-primary" @click="updateLocations">Search</button>
          </div>
          <store-list :markers="markers"/>
        </div>
        <div class="col-md-8">
          <GmapMap
            :center="center"
            :zoom="zoom"
            map-type-id="terrain"
            ref="map"
          >
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
              <div class="info-window">
                <p><b>{{infoContent.name}}</b></p>
                <p>{{infoContent.address}}</p>
                <p>{{infoContent.city}}, {{infoContent.state}} {{infoContent.zip}}</p>
                <p>Phone: {{infoContent.phone}}</p>
                <a :href="`https://maps.google.com/maps?daddr=${infoContent.address} ${infoContent.city}, ${infoContent.state} ${infoContent.zip}`">Get Directions</a>
              </div>
            </gmap-info-window>
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              @click="toggleInfoWindow(m,i)"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import serviceCenters from '@/data/serviceCenters'
import StoreList from '@/components/StoreList'
export default {
  name: 'GoogleMap',
  components: {
    StoreList
  },

  data () {
    return {
      serviceCenters,
      center: {lat: 34.503441, lng: -82.650131},
      zoom: 4,
      infoContent: {},
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      place: null,
      radius: 100
    }
  },

  methods: {
    toggleInfoWindow (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },

    computeDistance () {
      this.markers.forEach(marker => {
        let center = new google.maps.LatLng(this.center)
        let targetLoc = new google.maps.LatLng(marker.position)
        let distance = google.maps.geometry.spherical.computeDistanceBetween(center, targetLoc)
        marker['distance'] = distance
      })
    },

    setPlace (place) {
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      this.place = place
      this.computeDistance()
    },

    convertRadius () {
      this.radius = Number(this.radius) * 1609.344
    },

    filterMarkers () {
      this.markers = this.markers.filter(marker => marker.distance < this.radius)
    },

    sortMarkers () {
      this.markers.sort((a, b) => a.distance - b.distance)
    },

    updateLocations () {
      this.convertRadius()

      // filter and sort markers
      this.filterMarkers()
      this.sortMarkers()

      // set map zoom higher for zoom in effect
      this.zoom = 7
    }
  },

  created () {
    this.serviceCenters.map(element => {
      this.markers.push(
        {
          position: {
            lat: Number(element.lat),
            lng: Number(element.lng)
          },
          infoText: {
            name: element.name,
            address: element.address,
            city: element.city,
            state: element.state,
            zip: element.zip_code,
            phone: element.phone_number
          }
        }
      )
    })
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
  text-align: center;
}
.info-window p {
  margin-bottom: 5px
}
.vue-map-container {
  display: inline-block;
  width: 100%;
  height: 550px;
}
.search {
  padding: 12px 0;
  text-align: center;
  background-color: #eee;
}
.search button {
  margin-left: 10px;
  padding: 2px .75rem;
}
label {
  padding-right: 10px;
  margin-bottom: 0;
}
select {
  height: 31px;
}
</style>

