<template>
    <div class="grid grid-cols-4 gap-4">
        <OperatorButton>C</OperatorButton>
        <OperatorButton>%</OperatorButton>
        <OperatorButton><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59M22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3h15m0 2H7l-4.72 7L7 19h15V5Z" />
            </svg></OperatorButton>
        <OperatorButton>/</OperatorButton>
        <TheButton>7</TheButton>
        <TheButton>8</TheButton>
        <TheButton>9</TheButton>
        <OperatorButton>X</OperatorButton>
        <TheButton>4</TheButton>
        <TheButton>5</TheButton>
        <TheButton>6</TheButton>
        <OperatorButton>-</OperatorButton>
        <TheButton>1</TheButton>
        <TheButton>2</TheButton>
        <TheButton>3</TheButton>
        <OperatorButton>+</OperatorButton>
        <TheButton>00</TheButton>
        <TheButton>0</TheButton>
        <TheButton>.</TheButton>
        <EqlsBtn>=</EqlsBtn>
    </div>
</template>

<script>
import TheButton from './the-button.vue';
import OperatorButton from './operator-button.vue';
import EqlsBtn from './eqls-btn.vue'

export default {
    components: {
        TheButton,
        OperatorButton,
        EqlsBtn
    },

}
</script>
