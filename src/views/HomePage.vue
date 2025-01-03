<template>
    <div class="size-full flex flex-col">
        <IonHeader :translucent="true">
            <IonToolbar>
                <IonTitle>Flashback Sets</IonTitle>
                <IonButtons collapse slot="end">
                    <IonButton><IonIcon :icon="add"></IonIcon></IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Flashback Sets</IonTitle>
                    <IonButtons collapse slot="end">
                        <IonButton size="large"
                            ><IonIcon :icon="add"></IonIcon
                        ></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonList>
                <IonItemSliding
                    v-for="(d, i) in new Array(100).fill(0)"
                    :key="i"
                >
                    <IonItem
                        button
                        @click="editFlashbackSetDialog.show({})"
                        :detail="false"
                    >
                        <IonLabel>hello</IonLabel>
                    </IonItem>
                    <IonItemOptions color="danger"
                        ><IonItemOption color="danger">Delete</IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            </IonList>
        </IonContent>
    </div>
    <Dialog :dialog="editFlashbackSetDialog">
        <IonHeader>
            <IonToolbar>
                <IonTitle>Edit Flashback Set</IonTitle>
                <IonButtons
                    @click="editFlashbackSetDialog.close()"
                    slot="start"
                >
                    <IonButton>Close</IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton @click="editFlashbackSetDialog.finish()"
                        >Save</IonButton
                    >
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList inset>
                <IonItem>
                    <IonInput
                        label="Set Name"
                        v-model="editFlashbackSetDialog.data.name"
                    ></IonInput>
                </IonItem>
            </IonList>
            <IonList inset>
                <IonListHeader>
                    <IonLabel>hello</IonLabel>
                    <IonButton>
                        <IonIcon :icon="add"></IonIcon>
                    </IonButton>
                </IonListHeader>
                <IonItemSliding>
                    <IonItem>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItemOptions>
                        <IonItemOption color="danger">Delete</IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            </IonList>
        </IonContent>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import { Flashback } from '@/models/flashback'
import { useDialog } from '@/util/dialog'
import {
    IonLabel,
    IonList,
    IonItem,
    IonItemSliding,
    IonButton,
    IonItemOptions,
    IonItemOption,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonIcon,
    IonInput,
    IonListHeader,
} from '@ionic/vue'
import { add } from 'ionicons/icons'

const editFlashbackSetDialog = useDialog<Partial<Flashback>, any>({})
</script>

<style scoped lang="scss"></style>
