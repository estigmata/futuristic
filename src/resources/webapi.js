import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

export default {
  getUserId (token) {
    Vue.http.headers.common.Authorization = 'Bearer ' + token
    return Vue.http.get('https://api.spotify.com/v1/me')
  },
  getPlayLists (token, userId) {
    Vue.http.headers.common.Authorization = 'Bearer ' + token
    return Vue.http.get(`https://api.spotify.com/v1/users/${userId}/playlists`)
  },
  getPlayList (token, userId, playlistId) {
    Vue.http.headers.common.Authorization = 'Bearer ' + token
    return Vue.http.get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}`)
  },
  getPlaylistTracks (token, userId, playlistId) {
    Vue.http.headers.common.Authorization = 'Bearer ' + token
    return Vue.http.get(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`)
  },
  getTrack (token, trackId) {
    Vue.http.headers.common.Authorization = 'Bearer ' + token
    return Vue.http.get(`https://api.spotify.com/v1/tracks/${trackId}`)
  }
}
