<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <div class="col-2 flex justify-end items-center">
          <q-avatar size="125px" @click="$router.push('/')" class="cursor-pointer">
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            />
          </q-avatar>
      </div>
      <div class="q-pa-md">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="secondary"
        animated
      >
        <q-step
          :name="1"
          title="Select campaign settings"
          icon="settings"
          :done="step > 1"
        >
          For each ad campaign that you create, you can control how much you're willing to
          spend on clicks and conversions, which networks and geographical locations you want
          your ads to show on, and more.
        </q-step>

        <q-step
          :name="2"
          title="Create an ad group"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads which target a shared set of keywords.
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="nextStep()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
            <q-btn v-if="step > 1" flat color="primary" @click="previousStep()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { QStepper } from 'quasar'

const stepperRef = useTemplateRef<QStepper>('stepper')
const step = ref(1)


function nextStep()
{
  stepperRef.value?.next()
}

function previousStep()
{
  stepperRef.value?.previous()
}
</script>

<style>.q-stepper, .q-step-title, .q-step-subtitle, .q-btn {
  color: black !important;
}

.q-header {
  color: black;
}

.q-step {
  color: black;
}

/* Si d'autres éléments textuels ont besoin d'être ciblés spécifiquement */
.q-page-container {
  color: black;
}</style>
