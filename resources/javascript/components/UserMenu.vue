<template lang="pug">
  #UserMenu
    nav.panel
      a(href="/logout").panel-block
        span.panel-icon
          i.fa.fa-sign-out
        | Logout
</template>

<style lang="stylus">
#UserMenu
  position absolute
  top 0px
  right 0
  width 100px
</style>
