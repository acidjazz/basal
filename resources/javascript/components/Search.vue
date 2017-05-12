
<template lang="pug">
.field.has-addons#search
  p.control.has-icons-left
    input.input(type='text', placeholder=placeholder)
    span.icon.is-left.is-small
      i.fa.fa-search
  p.control
    a.button Search
  
</template>

<script>

export default {

  daata () {
    return {
      placeholder: 'Search all entries'
    }
  }

}

</script>
