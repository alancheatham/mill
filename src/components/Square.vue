<template>
    <div
        class="square"
    >
        <div class="row">
            <point class="point"
                   :class="[
                        `point--${position[0].color}`,
                        `point--${position[0].highlighted}`
                    ]"
                   @click="$emit('click', { position: 0 })"
            ></point>
            <point class="point"
                   :class="[
                        `point--${position[1].color}`,
                        `point--${position[1].highlighted}`
                    ]"
                   @click="$emit('click', { position: 1 })">
            </point>
            <point class="point"
                   :class="[
                        `point--${position[2].color}`,
                        `point--${position[2].highlighted}`
                    ]"
                   @click="$emit('click', { position: 2 })">
            </point>
        </div>
        <div class="row">
            <point class="point"
                   :class="[
                        `point--${position[7].color}`,
                        `point--${position[7].highlighted}`
                    ]"
                   @click="$emit('click', { position: 7 })">
            </point>
            <point class="point"
                   :class="[
                        `point--${position[3].color}`,
                        `point--${position[3].highlighted}`
                    ]"
                   @click="$emit('click', { position: 3 })">
            </point>
        </div>
        <div class="row">
            <point class="point"
                   :class="[
                        `point--${position[6].color}`,
                        `point--${position[6].highlighted}`
                    ]"
                   @click="$emit('click', { position: 6 })">
            </point>
            <point class="point"
                   :class="[
                        `point--${position[5].color}`,
                        `point--${position[5].highlighted}`
                    ]"
                   @click="$emit('click', { position: 5 })">
            </point>
            <point class="point"
                   :class="[
                        `point--${position[4].color}`,
                        `point--${position[4].highlighted}`
                    ]"
                   @click="$emit('click', { position: 4 })">
            </point>
        </div>
    </div>
</template>

<script>
import Point from './Point'

export default {
    name: 'square',
    components: {
        Point
    },
    props: {
        position: Array
    }
}
</script>

<style lang="stylus" scoped>
.square
    display flex
    flex-direction column
    justify-content space-between

.row
    display flex
    justify-content space-between

.point
    margin 8px
    width 50px
    height 50px
    border-radius 50%

    &--WHITE
        background silver

    &--BLACK
        background black

    &--GREEN
        border 8px solid green
        margin 0
        cursor pointer

    &--YELLOW
        border 8px solid yellow
        margin 0
        cursor pointer

    &--RED
        border 8px solid red
        margin 0
        cursor pointer

    &--SMALL__BLUE
        width 40px
        height 40px
        margin 13px
        background blue
        cursor pointer
</style>
