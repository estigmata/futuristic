<template>
  <div class="main-container">
    <section class="title">
      List my music
    </section>
    <songs-list :titles="playlists" @selectedPlaylist="playlistId=$event"></songs-list>
    <div class="divider"></div>
    <section class="row row-fluid row-height">
      <div class="col-md-3">
        <section class="left-panel">
          <div class="row row-fluid row-height">
            <div class="col-md-2">
              <h5>Total</h5>
              <h1>{{ tracks.length }}</h1>
            </div>
            <div class="col-md-8">
              <nav>
                <h2>{{ playlistName }}</h2>
                <ul>
                  <li v-for="(item, index) in tracks" :key="index">
                    <a @click="getTrack(item.track.id)">{{ item.track.name }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
      <div class="col-md-4">
        <section class="round-control">
          <br />
          <div class="circles">
            <div class="circle-0">
            </div>
            <div class="circle-1">
            </div>
            <div class="circle-2">
            </div>
            <div class="circle-3">
            </div>
            <div class="circle-4">
            </div>
            <div class="circle-5">
            </div>
            <div class="circle-content">
              125.5
            </div>
          </div>
        </section>
      </div>
      <div class="col-md-3">
        <div class="wrap" v-if="track">
          <div class="big-cube">
            <div class="bfront">
              <h2>Artist</h2>
              <b>Name: </b> {{ track.artists[0].name }}
            </div>
            <div class="bback">
              <h2>Album</h2>
              <b>Album Name</b>
              <br />
              {{ track.album.name }}
              <br />
              <b>Track name</b>
              <br />
              {{ track.name }}
            </div>
            <div class="btop">
              <h2>Top side</h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
            <div class="bbottom">
              <h2>Bottom side</h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>
            <div class="bleft">
              <img :src="track.album.images[1 ].url" style="max-width: 100%; max-height: 100%;" />
            </div>
            <div class="bright">
              <h2>Rates</h2>
              <b>Duration: </b> {{ track.duration_ms | seg }}
              <br />
              <b>Track number: </b> {{ track.track_number }}
              <br />
              <b>popularity: </b> {{ track.popularity }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SongsList from '@/components/SongsList'
import webapi from '@/resources/webapi'

export default {
  props: [
    'playlists',
    'token',
    'userId'
  ],
  components: {
    SongsList
  },
  data () {
    return {
      playlistId: '',
      playlistName: '',
      tracks: [],
      track: ''
    }
  },
  methods: {
    async getPlayListName () {
      const {body} = await webapi.getPlayList(this.token, this.userId, this.playlistId)
      this.playlistName = body.name
    },
    async getTrack (trackId) {
      const {body} = await webapi.getTrack(this.token, trackId)
      console.log(body)
      this.track = body
    }
  },
  filters: {
    seg (value) {
      return (value / 1000) / 60
    }
  },
  watch: {
    'playlistId': async function () {
      this.getPlayListName()
      const {body} = await webapi.getPlaylistTracks(this.token, this.userId, this.playlistId)
      console.log(body.items)
      this.tracks = body.items
    }
  }
}
</script>
