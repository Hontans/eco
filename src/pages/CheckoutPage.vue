<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black q-pa-sm row items-center">
      <div class="col-auto">
          <q-avatar size="100px" @click="$router.push('/')" class="cursor-pointer q-mr-md">
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
              alt="Logo"
            />
          </q-avatar>
      </div>
      <div class="col">
        <q-stepper
          v-model="step"
          ref="stepperRef"
          color="primary"
          animated
          flat
          header-nav
          class="bg-transparent no-shadow full-width"
        >
          <q-step
            :name="1"
            title="Panier"
            icon="shopping_cart"
            :done="step > 1"
            class="text-black"
          >
            <!-- Le contenu est dans q-page-container -->
          </q-step>

          <q-step
            :name="2"
            title="Livraison et paiement"
            icon="local_shipping"
            :done="step > 2"
            class="text-black"
          >
            <!-- Le contenu est dans q-page-container -->
          </q-step>
        </q-stepper>
      </div>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="row q-col-gutter-x-lg">
          <!-- Zone de contenu principal (Articles du panier ou Formulaire de livraison) -->
          <div class="col-12 col-md-8">
            <div v-if="step === 1">
              <h5 class="q-my-md">Votre Panier</h5>
                <template v-for="product in store.data.basket" :key="product.id">
                  <q-card flat bordered>
                  <q-card-section horizontal>
                    <q-img
                      class="col-auto"
                      src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                      style="width: 120px; height: 120px; object-fit: cover;"
                    />
                    <q-card-section class="col q-py-sm q-px-md">
                      <div><b>{{ product.name }}</b></div>
                      <div class="text-grey-8 q-pt-xs text-caption ellipsis-2-lines">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    </q-card-section>
                    <q-card-section class="column items-end justify-between q-py-sm q-px-md" style="min-width: 80px;">
                      <div class="text-subtitle1 q-mb-xs">{{product.price}}</div>
                      <q-btn class="q-ml-sm" @click="api.deleteProduct(product)" icon="cancel" flat round size="sm"/>
                    </q-card-section>
                  </q-card-section>
                </q-card>
                </template>
            </div>
            <div v-if="step === 2">
              <h5 class="q-my-md">Livraison et Paiement</h5>
              <q-card flat bordered>
                <q-card-section>
                  <p>Formulaire de livraison et de paiement à implémenter ici.</p>
                  <q-input v-model="address" outlined label="Adresse" class="q-mb-md" dense/>
                  <q-input v-model="paymentInfo" outlined label="Informations de paiement" dense/>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Barre latérale pour le résumé et le bouton d'achat -->
          <div class="col-12 col-md-4">
            <q-card flat bordered class="q-mt-md q-md-mt-none sticky-top-card" style="top: 20px;">
              <q-card-section>
                <div class="text-h6">Total des prix :</div>
                <div class="text-h5 q-py-sm">{{ store.basketPrice }}€</div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical align="center" class="q-pa-md">
                <q-btn
                  :label="step === 1 ? 'Passer à la livraison' : 'Acheter'"
                  color="primary"
                  class="full-width q-py-sm text-subtitle1"
                  @click="handleMainAction"
                  size="lg"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
      <!-- <router-view />  Décommentez si vous utilisez des routes enfants pour le contenu des étapes -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue' // Removed useTemplateRef as ref="stepperRef" is used directly
import type { QStepper } from 'quasar'
import { useApi } from '../js/api'
import { dataStore } from '../stores/data-store'


const store = dataStore();
const api = useApi()
const stepperRef = ref<QStepper | null>(null) // Correctly typed for template ref
const step = ref(1)


const address = ref('');
const paymentInfo = ref('');

function handleMainAction() {
  if (step.value === 1) {
    stepperRef.value?.next();
  } else if (step.value === 2) {
    // Logique pour procéder au paiement
    console.log('Procédure d\'achat lancée');
    // Exemple: redirection ou affichage d'un message de succès
    console.log('Adresse:', address.value);
    console.log('Informations de paiement:', paymentInfo.value);
  }
}
</script>

<style>

.q-page-container {
  color: black; /* Assure que le texte par défaut dans la page est noir si non spécifié autrement */
}

.sticky-top-card {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 20px; /* Ajustez le décalage du haut selon vos besoins */
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
