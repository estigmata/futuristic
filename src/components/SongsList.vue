<template>
  <section class="songs-title">
    <div class="row row-fluid row-height">
      <div class="col-xs-1" v-for="(item, index) in titles" :key="index">
        <cube-title :item="item" @selectPlaylist="playlistId=$event"></cube-title>
      </div>
    </div>
  </section>
</template>

<script>
import CubeTitle from '@/components/CubeTitle'

export default {
  props: [
    'titles'
  ],
  components: {
    CubeTitle
  },
  data () {
    return {
      playlistId: ''
    }
  },
  watch: {
    'playlistId': function () {
      this.$emit('selectedPlaylist', this.playlistId)
    }
  }
}
</script>
