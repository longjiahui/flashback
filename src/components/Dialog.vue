<script setup lang="ts">
import { AnyDialogType } from '@/util/dialog'
import { IonModal } from '@ionic/vue'
defineProps<{ dialog: AnyDialogType }>()
</script>

<template>
    <IonModal :is-open="dialog.visible" @ionModalWillDismiss="dialog.close">
        <slot></slot>
    </IonModal>
</template>
