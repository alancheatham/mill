<template>
    <div class="app">
        <board></board>
    </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
    name: 'app',
    components: {
        Board
    }
}
</script>

<style lang="stylus">
.app
    width 100%
    height 100%
</style>
