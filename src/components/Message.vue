<template>
    <div class="message">
        <div class="message__scrim">
            <div class="message__box">
                <span class="message__message">{{ message }}</span>
                <div class="message__buttons">
                    <button
                        v-if="firstButtonText"
                        class="message__button"
                        @click="firstButtonClick"
                    >
                        {{ firstButtonText }}
                    </button>
                    <button
                        v-if="secondButtonText"
                        class="message__button"
                        @click="secondButtonClick"
                    >
                        {{ secondButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'message',
    props: {
        message: String,
        firstButtonText: String,
        firstButtonClick: Function,
        secondButtonText: String,
        secondButtonClick: Function
    }
}
</script>

<style lang="stylus" scoped>
.message
    width 100%
    height 100%
    position fixed
    top 0
    left 0

.message__scrim
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    background rgba(0, 0, 0, 0.7)
    display flex
    justify-content center
    align-items center

.message__box
    background silver
    padding 20px
    width 300px
    font-family sans-serif
    font-size 30px
    border-radius 10px
    display flex
    flex-direction column
    align-items center

.message__buttons
    display flex
    justify-content center
    padding-top 20px

.message__button
    padding 15px
    font-size 20px
    cursor pointer
</style>
