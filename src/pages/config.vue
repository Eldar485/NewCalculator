<template>
    <div class="calculator">
        <div class="calculator__container">
            <div class="calculator__name">Калькулятор займа под ПТС</div>
            <div class="variables">
                <div class="variables__variable variable">
                    <div class="variable__name">Установить минимальную сумму займа</div>
                    <input class="variable__input" v-model="minAmount" /> руб
                </div>
                <div class="variable">
                    <div class="variable__name">Установить максимальную сумму займа</div>
                    <input class="variable__input" v-model="maxAmount" /> руб
                </div>
                <div class="variable">
                    <div class="variable__name">Установить минимальный срок займа</div>
                    <input class="variable__input" v-model="minTerm" /> мес
                </div>
                <div class="variable">
                    <div class="variable__name">Установить минимальный срок займа</div>
                    <input class="variable__input" v-model="maxTerm" /> мес
                </div>
                <div class="variable">
                    <div class="variable__name">Установить процентную ставку месячного платежа</div>
                    <input class="variable__input" v-model="percent" /> %
                </div>
            </div>
            <button @click="this.setVariables" class="setVariables">Принять</button>
        </div>
    </div>
</template>

<script>
    import $store from '../store/index'
    export default {
        data(){
            return{
                minAmount: $store.getters.getMinAmount,
                maxAmount: $store.getters.getMaxAmount,
                minTerm: $store.getters.getMinTerm,
                maxTerm: $store.getters.getMinTerm,
                percent: $store.getters.getPercent,
            }
        },
        methods: {
            setVariables(){
                $store.commit('setMinAmount', this.minAmount)
                $store.commit('setMaxAmount', this.maxAmount)
                $store.commit('setMinTerm', this.minTerm)
                $store.commit('setMinTerm', this.minTerm)
                $store.commit('setMinPercent', this.percent)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .calculator {
        height: 100vh;
        color: #333;
        &__container {
            margin: 3% auto;
            width: 70%;
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.02);
            padding: 3%;
            border-radius: 25px;
        }
        &__name {
            font-size: 3rem;
            font-weight: 700;
        }
    }
    .variables{
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 60vh;
    }
    .variable{
        font-size: 1.5rem;
        &__name{
            font-size: 1.5rem;
        }
        &__input{
            font-size: 1.3rem;
            margin-top: 1%;
        }
    }
    .setVariables{
        margin-top: 3%;
        cursor: pointer;
        font-size: 1.3rem;
        border-radius: 3px;
        border: none;
        width: 50%;
        background: #696;
        color: #fff;
        height: 15%;
        transition: 3s;
        &:hover{
            background: #73db61;
        }
    }
    @media (max-width: 1020px) {
        .calculator {
            &__name{
                font-size: 2rem;
            }
        }
    }
    @media (max-width: 710px) {
        .calculator{
            &__name{
                font-size: 1rem;
            }
        }
        .variable{
            font-size: 1rem;
            &__name{
                font-size: 1rem;
            }
            &__input{
                font-size: 1rem;
            }
        }
        .setVariables {
            width: 100%;
        }
    }
</style>