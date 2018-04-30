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
                    <a>{{ item.track.name | truncate }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
      <div class="col-md-4">
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
      tracks: []
    }
  },
  methods: {
    async getPlayListName () {
      const {body} = await webapi.getPlayList(this.token, this.userId, this.playlistId)
      this.playlistName = body.name
    }
  },
  filter: {
    truncate (name) {
      return (name.length > 45) ? name.substr(0, 45 - 1) + '&hellip;' : name
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
