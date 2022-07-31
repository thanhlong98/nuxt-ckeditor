<template>
  <client-only>
    <v-ckeditor v-model="text" />
  </client-only>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      text: 'Hello World!!',
    }
  },
}
</script>
