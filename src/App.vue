<template>
  <div id="app">
    <div v-if="userId === '' && token === ''">
      <div class="btn-sm login">
        <div @click="getAuth">Login to Spotify</div>
      </div>
    </div>
    <div v-else>
      <home :token="token" :userId="userId" :playlists="playlists"></home>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import webapi from '@/resources/webapi'
import home from '@/components/Home'

export default {
  data () {
    return {
      token: '',
      userId: '',
      playlists: []
    }
  },
  components: {
    home
  },
  methods: {
    login (callback) {
      var clientId = '6d03b3388c6044cb92c58978bf82f750'
      var redirectUri = 'http://localhost:8081'

      function getLoginURL (scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + clientId +
          '&redirect_uri=' + encodeURIComponent(redirectUri) +
          '&scope=' + encodeURIComponent(scopes.join(' ')) +
          '&response_type=token'
      }

      var url = getLoginURL([
        'user-read-email'
      ])

      window.addEventListener('message', function (event) {
        var hash = JSON.parse(event.data)
        if (hash.type === 'access_token') {
          callback(hash.access_token)
        }
      }, false)

      var params = [
        'menubar=no',
        'location=no',
        'resizable=no',
        'scrollbars=no',
        'status=no',
        'height=' + screen.height,
        'width=' + screen.width,
        'fullscree=yes',
        'top=0',
        'left=0'
      ].join(', ')

      window.open(url, 'My Spotify', params)
    },
    getUserData (accessToken) {
      axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
    },
    getAuth () {
      this.login(function (accessToken) {
        this.getUserData(accessToken)
          .then(function (response) {
            this.display = true
          })
      })
    },
    async getPlayLists () {
      const {body} = await webapi.getPlayLists(this.token, this.userId)
      this.playlists = body.items
    }
  },
  async mounted () {
    this.token = this.$route.fullPath.split('&')[0].split('=')[1].trim()
    const {body} = await webapi.getUserId(this.token)
    this.userId = body.id
    this.getPlayLists()
  }
}
</script>
