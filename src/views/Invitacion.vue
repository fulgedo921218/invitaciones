<template>
  <component 
    v-if="event && TemplateComponent" 
    :is="TemplateComponent" 
    :event="event"
  />

  <div v-else class="text-center p-10 text-white">
    ❌ Invitación no encontrada
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

import XvPremium from './templates/XvPremium.vue'

const route = useRoute()
const slug = route.params.slug

const event = ref(null)
const TemplateComponent = shallowRef(null)

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'invitaciones'))
  const events = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  const found = events.find(e => e.slug === slug)
  if (!found) {
    console.warn('Invitación no encontrada:', slug)
    return
  }
  event.value = found
  // Siempre usar XvPremium como template
  TemplateComponent.value = XvPremium
})
</script>