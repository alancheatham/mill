<template>
    <div
        class="point"
        @click="$emit('click', $event)"
    ></div>
</template>

<script>
export default {
    name: 'point'
}
</script>

<style lang="stylus" scoped>
.point
    width 50px
    height 50px
    border-radius 50%
</style>
