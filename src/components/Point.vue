<template>
    <div class="point" @click="$emit('click', $event)"></div>
</template>

<script>
export default {
    name: 'point'
}
</script>

<style lang="stylus" scoped></style>
