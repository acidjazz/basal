<template lang='pug'>
  a.nav-item#User(@click="show = !show")
    span.icon.is-medium
      i.fa.fa-user-circle
    span.icon.is-small
      i.fa.fa-angle-down
</template>

<style lang="stylus">

a.nav-item#User
  width 100px

</style>

<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>

