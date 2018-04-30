<template>
  <div class="cube-wraper" @click="getPlaylistTracks(item.id)">
    <div class="cube-circle">
    </div>
    <div class="cube">
      <div class="front">
        {{ item.name }}
      </div>
      <div class="back">
        <img :src="item.images[0].url" />
      </div>
      <div class="right">
      </div>
      <div class="left">
      </div>
      <div class="top">
      </div>
      <div class="bottom">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'item'
  ],
  methods: {
    getPlaylistTracks (playlistId) {
      this.$emit('selectPlaylist', playlistId)
    }
  }
}
</script>
