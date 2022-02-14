<template>
    <div class="calculator">
        <div class="success" v-show="Successful">
            Заявка успешно отправлена
        </div>
        <div class="calculator__container">
            <div class="calculator__name">Калькулятор займа под ПТС</div>
            <div class="functions">
                <div class="settings">
                    <div class="type">
                        <div class="type__name">Тип платежа</div>
                        <div class="type__buttons">
                            <button :class="{ active: isActive, type__button: !isActive }" class="type__button_diff">Дифференцированный</button>
                            <button :class="{ active: !isActive, type__button: isActive  }" class="type__button_ann">Аннуитентный</button>
                        </div>
                    </div>
                    <div class="amount">
                        <div class="amount__title">
                            <div class="amount__name">Сумма займа</div>
                            <div class="amount__value"><p>{{loanAmount}}</p><p>₽</p></div>
                        </div>
                        <div class="scale_calc">
                            <input class="inputAmount" v-model="loanAmount"  type="range" min="15000" max="1000000" step="1"/>
                        </div>
                        <div class="amount__subTitle">
                            <div class="amount__start">от {{$store.getters.getMinAmount}} ₽</div>
                            <div class="amount__end">до {{$store.getters.getMaxAmount}} ₽</div>
                        </div>
                    </div>
                    <div class="term">
                        <div class="term__title">
                            <div class="term__name">Срок займа</div>
                            <div class="term__value"><p>{{loanTerm}}</p><p>месяцев</p></div>
                        </div>
                        <div class="scale_term">
                            <input class="inputTerm" v-model="loanTerm"  type="range" min="2" max="12" step="1"/>
                        </div>
                        <div class="term__subTitle">
                            <div class="term__start">от {{$store.getters.getMinTerm}} месяцев</div>
                            <div class="term__end">до {{$store.getters.getMinTerm}} месяцев</div>
                        </div>
                    </div>
                    <div class="settings__description">Условия выдачи займа могут отличаться, исходя из анализа документов и состояния вашего автомобиля</div>
                </div>
                <div class="result">
                    <div class="result__betName">Ставка</div>
                    <div class="result__bet">{{$store.getters.getPercent}}%</div>
                    <div class="result__paymentName">Ежемесячный платёж</div>
                    <div class="result__payment">{{monthlyPayment}} ₽</div>
                    <button @click="setSuccessful" class="result__button button">Подать заявку</button>
                    <div class="result__paymentDescription">Расчет займа предварительный</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                Successful: false,
                isActive: true, //Выбор типа платежа
                loanAmount: 138100, //Сумма займа
                loanTerm: 8, //Срок займа
                bet: 2.7, //Ставка
                monthlyPayment: 3729 //Ежемесячный платёж
            }
        },
        methods: {
            //Показ уведомления успешности
            setSuccessful(){
                this.Successful = true
                setTimeout(()=>{
                    this.Successful = false
                }, 2000)
            },
            //Стилизация шкалы Amount
            setAmount(){
                document.querySelector(".inputAmount").oninput = function() {
                    var value = (this.value-this.min)/(this.max-this.min)*100
                    this.style.background = 'linear-gradient(to right, #67ac5b 0%, #67ac5b ' + value + '%, #cfd1d5 ' + value + '%, #cfd1d5 100%)'
                };
            },
            //Стилизация шкалы Term
            setTerm(){
                document.querySelector(".inputTerm").oninput = function() {
                    var value = (this.value-this.min)/(this.max-this.min)*100
                    this.style.background = 'linear-gradient(to right, #67ac5b 0%, #67ac5b ' + value + '%, #cfd1d5 ' + value + '%, #cfd1d5 100%)'
                };
            },
            //Включение дифференцированного платежа
            activate(){
                this.isActive = true
            },
            //Включение аннуитентного платежа
            disabled(){
                this.isActive = false
            },
            //Расчёт ежемесячного платежа
            calculate(){
                if(this.isActive){
                    //Формула расчёта дифференцированного платежа
                    this.monthlyPayment = Math.round((2.7/100) * this.loanAmount)                    //this.monthlyPayment = Math.round(this.loanAmount/this.loanTerm + this.loanAmount * ((2.7/100)/this.loanAmount))
                }
                else{
                    //Формула расчёта аннуитентного платежа
                    this.monthlyPayment = Math.round(this.loanAmount*(2.7/100)*Math.pow((1 + 2.7/100), this.loanTerm)/(Math.pow((1 + 2.7/100), this.loanTerm)-1))
                    //this.monthlyPayment = Math.round(this.loanAmount*((2.7/100)/(Math.pow((1 + 2.7/100), this.loanTerm) - 1)))
                }
            },
        },
        mounted(){
            //Вызов стилизации шкал
            this.setAmount()
            this.setTerm()
            //Создание переменных шкал
            let amount = document.querySelector(".scale_calc input")
            let term = document.querySelector(".scale_term input")
            //Создание переменных кнопок
            let diff = document.querySelector(".type__button_diff")
            let ann = document.querySelector(".type__button_ann")
            //Добавление обработчиков события перемещения шкал
            amount.addEventListener("input", this.calculate)
            term.addEventListener("input", this.calculate)
            //Добавление обработчиков события выбора типо платежа
            diff.addEventListener("click", this.activate)
            ann.addEventListener("click", this.disabled)
            diff.addEventListener("click", this.calculate)
            ann.addEventListener("click", this.calculate)
        }
    }
</script>

<style lang="scss" scoped>
    .inputAmount, .inputTerm {
        background: linear-gradient(to right, #cfd1d5 0%, #cfd1d5 50%, #cfd1d5 50%, #cfd1d5 100%);
        border-radius: 0 8px 8px 0;
        height: 5px;
        width: 100%;
        outline: none;
        transition: background 450ms ease-in;
        -webkit-appearance: none;
    }
    .inputAmount::-webkit-slider-thumb, .inputTerm::-webkit-slider-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        -webkit-appearance: none;
        cursor: ew-resize;
        background: #67ac5b;
    }

    .calculator{
        height: 100vh;
        color: #333;
        &__container{
            margin: 3% auto;
            width: 70%;
            box-shadow: 0 14px 28px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.02);
            padding: 3%;
            border-radius: 25px;
        }
        &__name{
            font-size: 3rem;
            font-weight: 700;
        }
        .functions{
            display: flex;
            margin-top: 2%;
            .settings{
                padding: 3% 0;
                .type{
                    display: flex;
                    justify-content: space-between;
                    &__name{
                        display: flex;
                        align-items: center;
                        font-size: 1.8rem;
                        line-height: 1.5rem;
                    }
                    &__buttons{
                        color: #336;
                        background: #fff;
                        display: flex;
                        font-size: 1.3rem;
                        :last-child{
                            margin-left: -1.5px;
                        }
                    }
                    &__button{
                        background: #fff;
                        cursor: pointer;
                        box-sizing: border-box;
                        border: 2px solid #ccc;
                        padding: 0.5rem 2rem;
                        transition: 0.2s;
                        :first-child{
                            border-radius: 3px 0 0 3px;
                        }
                        :last-child{
                            border-radius: 0 3px 3px 0;
                        }
                        &:hover{
                            background: #f2f2f2;
                        }
                    }
                }
                .amount{
                    margin-top: 10%;
                    &__title{
                        margin: 0 3.5%;
                        display: flex;
                        justify-content: space-between;
                    }
                    &__name{
                        font-size: 1.8rem;
                    }
                    &__value{
                        font-size: 1.5rem;
                        border: none;
                        margin-top: 3px;
                        display: flex;
                        :first-child{
                            margin-right: 25px;
                        }
                    }
                    .scale_calc{
                        input{
                            cursor: pointer;
                            width: 100%;
                            background: #ccc;
                        }
                    }
                    &__subTitle{
                        font-size: 1.3rem;
                        color: #999;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                .term{
                    margin-top: 5%;
                    &__title{
                        margin: 0 3.5%;
                        display: flex;
                        justify-content: space-between;
                    }
                    &__name{
                        font-size: 1.8rem;
                    }
                    &__value{
                        font-size: 1.5rem;
                        margin-top: 3px;
                        display: flex;
                        :first-child{
                            margin-right: 25px;
                        }
                    }
                    .scale_term{
                        input{
                            width: 100%;
                        }
                    }
                    &__subTitle{
                        font-size: 1.3rem;
                        color: #999;
                        display: flex;
                        justify-content: space-between;
                    }
                    &__start{

                    }
                    &__end{

                    }
                }
                .settings__description{
                    color: #999;
                    margin-top: 5%;
                }
            }
            .result{
                width: 40%;
                padding: 3% 2% 3% 10%;
                &__betName{
                    color: #999;
                    font-size: 1.3rem;
                }
                &__bet{
                    color: #333;
                    font-weight: 600;
                    font-size: 4rem;
                }
                &__paymentName{
                    margin-top: 5%;
                    color: #999;
                    font-size: 1.3rem;
                }
                &__payment{
                    color: #333;
                    font-weight: 600;
                    font-size: 4rem;
                }
                &__button{
                    cursor: pointer;
                    margin-top: 7%;
                    font-size: 1.3rem;
                    border-radius: 3px;
                    border: none;
                    width: 100%;
                    background: #696;
                    color: #fff;
                    height: 15%;
                    transition: 3s;
                    &:hover{
                        background: #73db61;
                    }
                }
                &__paymentDescription{
                    margin-top: 10%;
                    color: #999;
                }
            }
        }
    }
    .active{
        background: #fff;
        cursor: pointer;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 0.5rem 2rem;
        border: 2px solid #696;
        z-index: 2;
        transition: 0.2s;
        &:hover{
            background: #f2f2f2;
        }
    }
    .success{
        position: absolute;
        left: 35%;
        background: #73db61;
        color: white;
        font-size: 1.5rem;
        padding: 0.1% 1%;
        border-radius: 8px;
    }
    @media (max-width:1215px) {
        .functions{
            flex-direction: column;
            align-items: center ;
        }
        .calculator{
            &__name{
                font-size: 2rem;
            }
        }
    }
    @media (max-width: 850px) {
        .calculator{
            .success{
                font-size: 1rem;
            }
            .inputAmount::-webkit-slider-thumb, .inputTerm::-webkit-slider-thumb {
                width: 15px;
                height: 15px;
            }
            &__name{
                font-size: 1rem;
            }
            .functions{
                .settings{
                    .type{
                        &__buttons{
                            flex-direction: column;
                            font-size: 1rem;
                        }
                        &__name{
                            font-size: 1rem;
                            display: flex;
                            align-items: center;
                        }
                    }
                    .amount{
                        &__name{
                            font-size: 1rem;
                        }
                        &__value{
                            font-size: 1rem;
                        }
                        &__subTitle{
                            font-size: 1rem;
                        }
                    }
                    .term{
                        &__name{
                            font-size: 1rem;
                        }
                        &__value{
                            font-size: 1rem;
                        }
                        &__subTitle{
                            font-size: 1rem;
                        }
                    }
                    .settings__description{
                        font-size: 0.5rem;
                    }
                }
                .result{
                    width: 60%;
                    &__button{
                        font-size: 0.8rem;
                    }
                    &__bet{
                        font-size: 1rem;
                    }
                    &__payment{
                        font-size: 1rem;
                    }
                    &__paymentDescription{
                        font-size: 0.5rem;
                    }
                }
            }
        }
        .functions{
            flex-direction: column;
            align-items: flex-start ;
        }
    }
    @media (max-width: 400px){
        .calculator{
            .success{
                left: 35%;
                font-size: 0.6rem;
            }
            &__name{
                font-size: 0.8rem;
            }
            .inputAmount, .inputTerm {
                height: 2px;
            }
            .inputAmount::-webkit-slider-thumb, .inputTerm::-webkit-slider-thumb {
                width: 15px;
                height: 15px;
            }
            .functions{
                .settings{
                    .type{
                        flex-direction: column;
                        &__buttons{
                            font-size: 0.6rem;
                        }
                    }
                    .amount{
                        &__name{
                            font-size: 0.6rem;
                        }
                        &__value{
                            font-size: 0.6rem;
                            :first-child{
                                margin-right: 5px;
                            }
                        }
                        &__subTitle{
                            font-size: 0.6rem;
                        }
                    }
                    .term{
                        &__name{
                            font-size: 0.6rem;
                        }
                        &__value{
                            font-size: 0.6rem;
                            :first-child{
                                margin-right: 5px;
                            }
                        }
                        &__subTitle{
                            font-size: 0.6rem;
                        }
                    }
                }
                .result{
                    width: 100%;
                    &__betName{
                        font-size: 1rem;
                    }
                    &__paymentName{
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>