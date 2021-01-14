<template>
  <div class="username">Hi {{ user && user.given_name }} {{ user && user.family_name }} ({{ email }}) </div>
</template>

<script>
export default {
  props: { user:Object, email:String },
}
</script>

<style lang="scss">
$text-color1: #ffffff;

.username {
  color: $text-color1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
