<template>
    <div class="board">
        <img class="background" src="../assets/board.jpg" />
        <square
            class="square square--big"
            :position="board.slice(0, 8)"
            @click="evt => clicked(0, evt)"
        ></square>
        <square
            class="square square--medium"
            :position="board.slice(8, 16)"
            @click="evt => clicked(1, evt)"
        ></square>
        <square
            class="square square--small"
            :position="board.slice(16, 24)"
            @click="evt => clicked(2, evt)"
        ></square>
    </div>
</template>

<script>
import Square from './Square'

import { mapActions, mapState } from 'vuex'

import {
    WHITE,
    BLACK,
    PLACE,
    REMOVE,
    MOVE
} from '../lib/constants'

export default {
    name: 'board',
    components: {
        Square
    },
    computed: {
        ...mapState([
            'board',
            'phase',
            'colorToMove',
            'piecesPlaced',
            'whitePiecesRemaining',
            'blackPiecesRemaining'
        ])
    },
    methods: {
        ...mapActions([
            'setPhase',
            'addPiece',
            'highlightPiece',
            'unhighlightAllPieces',
            'removePiece'
        ]),
        clicked (square, { position }) {
            const location = square * 8 + position

            switch (this.phase) {
                case PLACE:
                    if (!this.board[location].color) {
                        this.addPiece(location)
                    }
                    if (this.checkForMill(location)) {
                        this.highlightPiecesToRemove()
                        this.setPhase(REMOVE)
                    }
                    if (this.piecesPlaced > 8) {
                        this.setPhase(MOVE)
                        this.highlightMoveablePieces()
                    }
                    break
                case REMOVE:
                    if (this.board[location].color === this.colorToMove) {
                        this.removePiece({ location, destroy: true })
                        this.unhighlightAllPieces()
                        if (this.piecesPlaced <= 8) {
                            this.setPhase(PLACE)
                        } else {
                            this.setPhase(MOVE)
                            this.highlightMoveablePieces()
                        }
                    }
                    break
                case MOVE:
                    if (this.board[location].color === this.colorToMove) {
                        this.unhighlightAllPieces()
                        this.highlightPiece(location)
                    } else {
                        if (!this.board[location].color) {
                            let highlightedIndex = -1
                            for (let i = 0; i < this.board.length; i++) {
                                if (this.board[i].highlighted) {
                                    highlightedIndex = i
                                }
                            }

                            let flying = this.colorToMove === WHITE ? this.whitePiecesRemaining < 4 : this.blackPiecesRemaining < 4

                            if (highlightedIndex >= 0 && (this.nextToEmpty(highlightedIndex).indexOf(location) > -1 || flying)) {
                                this.removePiece({ location: highlightedIndex, destroy: false })
                                this.addPiece(location)

                                if (this.checkForMill(location)) {
                                    this.highlightPiecesToRemove()
                                    this.setPhase(REMOVE)
                                } else {
                                    this.highlightMoveablePieces()
                                }
                            }
                        }
                    }
                    break
                default:
                    return
            }
        },
        highlightPiecesToRemove () {
            let piecesHighlighted = 0
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i].color === this.colorToMove && !this.checkForMill(i)) {
                    this.highlightPiece(i)
                    piecesHighlighted++
                }
            }
            if (piecesHighlighted === 0) {
                for (let i = 0; i < this.board.length; i++) {
                    if (this.board[i].color === this.colorToMove) {
                        this.highlightPiece(i)
                    }
                }
            }
        },
        highlightMoveablePieces () {
            let flying = this.colorToMove === WHITE ? this.whitePiecesRemaining < 4 : this.blackPiecesRemaining < 4

            for (let i = 0; i < this.board.length; i++) {
                if ((this.nextToEmpty(i).length > 0 || flying) && this.board[i].color === this.colorToMove) {
                    this.highlightPiece(i)
                }
            }
        },
        checkForMill (location) {
            switch (location) {
                case 0:
                    return this.checkBigTopMill() || this.checkBigLeftMill()
                case 1:
                    return this.checkBigTopMill() || this.checkTopMiddleMill()
                case 2:
                    return this.checkBigTopMill() || this.checkBigRightMill()
                case 3:
                    return this.checkBigRightMill() || this.checkRightMiddleMill()
                case 4:
                    return this.checkBigRightMill() || this.checkBigBottomMill()
                case 5:
                    return this.checkBigBottomMill() || this.checkBottomMiddleMill()
                case 6:
                    return this.checkBigBottomMill() || this.checkBigLeftMill()
                case 7:
                    return this.checkBigLeftMill() || this.checkLeftMiddleMill()
                case 8:
                    return this.checkMediumTopMill() || this.checkMediumLeftMill()
                case 9:
                    return this.checkMediumTopMill() || this.checkTopMiddleMill()
                case 10:
                    return this.checkMediumTopMill() || this.checkMediumRightMill()
                case 11:
                    return this.checkMediumRightMill() || this.checkRightMiddleMill()
                case 12:
                    return this.checkMediumRightMill() || this.checkMediumBottomMill()
                case 13:
                    return this.checkMediumBottomMill() || this.checkBottomMiddleMill()
                case 14:
                    return this.checkMediumBottomMill() || this.checkMediumLeftMill()
                case 15:
                    return this.checkMediumLeftMill() || this.checkLeftMiddleMill()
                case 16:
                    return this.checkSmallTopMill() || this.checkSmallLeftMill()
                case 17:
                    return this.checkSmallTopMill() || this.checkTopMiddleMill()
                case 18:
                    return this.checkSmallTopMill() || this.checkSmallRightMill()
                case 19:
                    return this.checkSmallRightMill() || this.checkRightMiddleMill()
                case 20:
                    return this.checkSmallRightMill() || this.checkSmallBottomMill()
                case 21:
                    return this.checkSmallBottomMill() || this.checkBottomMiddleMill()
                case 22:
                    return this.checkSmallBottomMill() || this.checkSmallLeftMill()
                case 23:
                    return this.checkSmallLeftMill() || this.checkLeftMiddleMill()
                default:
                    return false
            }
        },
        checkBigTopMill () {
            return this.board[0].color && this.board[0].color && this.board[0].color === this.board[1].color && this.board[0].color === this.board[2].color
        },
        checkBigRightMill () {
            return this.board[2].color && this.board[2].color === this.board[3].color && this.board[2].color === this.board[4].color
        },
        checkBigBottomMill () {
            return this.board[4].color && this.board[4].color === this.board[5].color && this.board[4].color === this.board[6].color
        },
        checkBigLeftMill () {
            return this.board[6].color && this.board[6].color === this.board[7].color && this.board[6].color === this.board[0].color
        },
        checkMediumTopMill () {
            return this.board[8].color && this.board[8].color === this.board[9].color && this.board[8].color === this.board[10].color
        },
        checkMediumRightMill () {
            return this.board[10].color && this.board[10].color === this.board[11].color && this.board[10].color === this.board[12].color
        },
        checkMediumBottomMill () {
            return this.board[12].color && this.board[12].color === this.board[13].color && this.board[12].color === this.board[14].color
        },
        checkMediumLeftMill () {
            return this.board[14].color && this.board[14].color === this.board[15].color && this.board[14].color === this.board[8].color
        },
        checkSmallTopMill () {
            return this.board[16].color && this.board[16].color === this.board[17].color && this.board[16].color === this.board[18].color
        },
        checkSmallRightMill () {
            return this.board[18].color && this.board[18].color === this.board[19].color && this.board[18].color === this.board[20].color
        },
        checkSmallBottomMill () {
            return this.board[20].color && this.board[20].color === this.board[21].color && this.board[20].color === this.board[22].color
        },
        checkSmallLeftMill () {
            return this.board[22].color && this.board[22].color === this.board[23].color && this.board[22].color === this.board[16].color
        },
        checkTopMiddleMill () {
            return this.board[1].color && this.board[1].color === this.board[9].color && this.board[1].color === this.board[17].color
        },
        checkRightMiddleMill () {
            return this.board[3].color && this.board[3].color === this.board[11].color && this.board[3].color === this.board[19].color
        },
        checkBottomMiddleMill () {
            return this.board[5].color && this.board[5].color === this.board[13].color && this.board[5].color === this.board[21].color
        },
        checkLeftMiddleMill () {
            return this.board[7].color && this.board[7].color === this.board[15].color && this.board[7].color === this.board[23].color
        },
        isNextTo (location) {
            const locations = Array(24).fill(null).map(() => {
                return []
            })

            for (let i = 0; i < locations.length; i++) {
                if (i % 8 === 0) {
                    locations[i].push(i + 1, i + 7)
                } else {
                    if (i % 8 === 7) {
                        locations[i].push(i - 7, i - 1)
                    } else {
                        locations[i].push(i + 1, i - 1)
                    }

                    if (i % 8 === 1
                        || i % 8 === 3
                        || i % 8 === 5
                        || i % 8 === 7) {
                            if (i < 8) {
                                locations[i].push(i + 8)
                            } else if (i < 16) {
                                locations[i].push(i + 8, i - 8)
                            } else {
                                locations[i].push(i - 8)
                            }
                        }
                }
            }

            return locations[location]
        },
        nextToEmpty (location) {
            return this.isNextTo(location).filter(x => !this.board[x].color)
        }
    }
}
</script>

<style lang="stylus" scoped>
.background
    height 700px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

.square
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

    &--big
        width 700px
        height 700px

    &--medium
        width 500px
        height 500px

    &--small
        width 300px
        height 300px
</style>
