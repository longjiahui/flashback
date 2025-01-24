<template>
    <div class="size-full flex flex-col">
        <IonTabs>
            <IonTab tab="sets">
                <IonHeader :translucent="true">
                    <IonToolbar>
                        <IonTitle>Flashback Sets</IonTitle>
                        <IonButtons collapse slot="end">
                            <IonButton @click="handleCreateSet"
                                ><IonIcon :icon="add"></IonIcon
                            ></IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Flashback Sets</IonTitle>
                            <IonButtons collapse slot="end">
                                <IonButton size="large" @click="handleCreateSet"
                                    ><IonIcon :icon="add"></IonIcon
                                ></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                        <IonItemSliding v-for="(s, i) in sets" :key="i">
                            <IonItem
                                button
                                @click="editSetDialog.show(extend(true, {}, s))"
                                :detail="false"
                            >
                                <IonLabel>{{ s.name }}</IonLabel>
                            </IonItem>
                            <IonItemOptions
                                @ion-swipe="sets.splice(i, 1)"
                                color="danger"
                            >
                                <IonItemOption
                                    color="danger"
                                    @click="sets.splice(i, 1)"
                                >
                                    Delete
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    </IonList>
                </IonContent>
            </IonTab>
            <IonTab tab="timer">
                <IonHeader :translucent="true">
                    <IonToolbar>
                        <IonTitle>Timer</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Timer</IonTitle>
                            <IonButtons collapse slot="end">
                                <IonButton
                                    size="large"
                                    @click="handleCreateTimer"
                                >
                                    <IonIcon :icon="add"></IonIcon>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                        <IonItemSliding v-for="t in timers" :key="t.id">
                            <IonItem
                                @click="
                                    editTimerDialog.show(extend(true, {}, t))
                                "
                            >
                                <div class="flex flex-col stretch">
                                    <IonLabel>{{ t.name }}</IonLabel>
                                    <IonNote>hello world</IonNote>
                                </div>
                                <div>
                                    <IonToggle @click.stop> </IonToggle>
                                </div>
                            </IonItem>
                            <IonItemOptions>
                                <IonItemOption color="danger"
                                    >Delete</IonItemOption
                                >
                            </IonItemOptions>
                        </IonItemSliding>
                    </IonList>
                </IonContent>
            </IonTab>
            <IonTabBar slot="bottom">
                <IonTabButton tab="sets"> Sets </IonTabButton>
                <IonTabButton tab="timer"> Timer </IonTabButton>
            </IonTabBar>
        </IonTabs>
        <Dialog :dialog="editSetDialog">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Flashback Set</IonTitle>
                    <IonButtons @click="editSetDialog.close()" slot="start">
                        <IonButton>Close</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton
                            @click="()=>{
                            const s = sets.find(s=>s.id === editSetDialog.data.id)
                            if(s){
                                Object.assign(s, editSetDialog.data)
                            }else{
                                if(editSetDialog.data.id && editSetDialog.data.name){
                                    sets.push(editSetDialog.data as Set)
                                }
                            }
                            editSetDialog.finish()
                        }"
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
                            v-model="editSetDialog.data.name"
                        ></IonInput>
                    </IonItem>
                </IonList>
                <IonList inset>
                    <IonListHeader>
                        <IonLabel>Contents</IonLabel>
                        <IonButton
                            @click="
                                contentNameInputDialog
                                    .show('')
                                    .finishPromise((d) => {
                                        if (d) {
                                            if (!editSetDialog.data.contents) {
                                                editSetDialog.data.contents = []
                                            }
                                            editSetDialog.data.contents?.push({
                                                id: uuid(),
                                                content: d,
                                            })
                                        }
                                    })
                            "
                        >
                            <IonIcon :icon="add"></IonIcon>
                        </IonButton>
                    </IonListHeader>
                    <IonItemSliding
                        v-for="(c, i) in editSetDialog.data.contents"
                        :key="c.id"
                    >
                        <IonItem>
                            <IonInput
                                placeholder="content"
                                :model-value="c.content"
                                @update:model-value="v=>editSetDialog.data.contents![i] = v"
                            ></IonInput>
                        </IonItem>
                        <IonItemOptions
                            @ion-swipe="
                                editSetDialog.data.contents?.splice(i, 1)
                            "
                        >
                            <IonItemOption
                                color="danger"
                                @click="
                                    editSetDialog.data.contents?.splice(i, 1)
                                "
                                >Delete</IonItemOption
                            >
                        </IonItemOptions>
                    </IonItemSliding>
                </IonList>
            </IonContent>
        </Dialog>
        <Dialog :dialog="contentNameInputDialog">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Content Input</IonTitle>
                    <IonButtons
                        @click="contentNameInputDialog.close()"
                        slot="start"
                    >
                        <IonButton>Close</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton
                            @click="
                                () => {
                                    contentNameInputDialog.finish(
                                        contentNameInputDialog.data
                                    )
                                }
                            "
                            >Save</IonButton
                        >
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList inset>
                    <IonItem>
                        <IonInput
                            label="Content"
                            placeholder="input here"
                            v-model="contentNameInputDialog.data"
                        ></IonInput>
                    </IonItem>
                </IonList>
            </IonContent>
        </Dialog>
        <Dialog :dialog="editTimerDialog">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Timer</IonTitle>
                    <IonButtons @click="editTimerDialog.close()" slot="start">
                        <IonButton>Close</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton
                            @click="()=>{
                    const t = timers.find(t => t.id === editTimerDialog.data.id)
                    if(t){
                        Object.assign(t, editTimerDialog.data)
                    }else{
                        if(editTimerDialog.data.id && editTimerDialog.data.name){
                        timers.push(editTimerDialog.data as Timer)
                        }
                    }
                    editTimerDialog.finish()
                    }"
                            >Save</IonButton
                        >
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList inset>
                    <IonItem>
                        <IonInput
                            label="Timer Name"
                            v-model="editTimerDialog.data.name"
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            label="Select Sets"
                            multiple
                            v-model="editTimerDialog.data.sets"
                        >
                            <IonSelectOption
                                v-for="s in sets"
                                :key="s.id"
                                :value="s.id"
                                >{{ s.name }}</IonSelectOption
                            >
                        </IonSelect>
                        <!-- <div class="flex flex-col">
                            <IonLabel>Select Sets</IonLabel>
                            <IonButton>select</IonButton>
                        </div>
                        <div v-if="editTimerDialog.data.sets?.length">
                            {{ editTimerDialog.data.sets }}
                        </div> -->
                    </IonItem>
                </IonList>
                <IonList inset>
                    <IonListHeader>
                        <IonLabel>Timer rules</IonLabel>
                        <IonButton>
                            <IonIcon :icon="add"></IonIcon>
                        </IonButton>
                    </IonListHeader>
                </IonList>
            </IonContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import { Set, Timer } from '@/models'
import { useDialog } from '@/util/dialog'
import { useStorage } from '@/util/storage'
import { LocalNotifications } from '@capacitor/local-notifications'
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
    IonTabs,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonToggle,
    IonNote,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue'
import extend from 'extend'
import { add } from 'ionicons/icons'
import { v4 as uuid } from 'uuid'

const editSetDialog = useDialog<Partial<Set>, any>({})

const sets = useStorage<Set[]>('sets', [])
const timers = useStorage<Timer[]>('timers', [])

function handleCreateSet() {
    return editSetDialog.show({ id: uuid() })
}

const contentNameInputDialog = useDialog<string, string>('')
const editTimerDialog = useDialog<Partial<Timer>>({})
function handleCreateTimer() {
    editTimerDialog.show({ id: uuid() })
}

LocalNotifications.requestPermissions().then((permission) => {
    if (permission.display === 'granted') {
        return LocalNotifications.schedule({
            notifications: [
                {
                    id: 1,
                    title: 'Notification Title',
                    body: 'This is the notification body',
                    schedule: { at: new Date(Date.now() + 1000 * 5) }, // Schedule for 5 seconds later
                },
            ],
        })
    }
})
</script>

<style scoped lang="scss"></style>
