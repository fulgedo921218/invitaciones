<template>
  <div class="bg-[#0f0f0f] text-white">

    <!-- NAVBAR -->
    <header class="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 class="font-semibold tracking-wide">
          Nami
        </h1>

        <nav class="hidden md:flex gap-8 text-sm opacity-80">
          <a href="#ejemplos" class="hover:text-[#c6a97a] transition">Ejemplos</a>
          <a href="#como" class="hover:text-[#c6a97a] transition">Cómo funciona</a>
          <a href="#contacto" class="hover:text-[#c6a97a] transition">Contacto</a>
        </nav>

        <a 
          href="https://wa.me/5210000000000"
          target="_blank"
          class="bg-[#c6a97a] text-black px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          WhatsApp
        </a>

      </div>
    </header>

    <!-- HERO -->
    <section class="pt-32 pb-24 text-center px-6">

      <h1 class="text-4xl md:text-6xl font-serif mb-6">
        Invitaciones digitales elegantes
      </h1>

      <p class="text-lg opacity-70 max-w-xl mx-auto">
        Diseños exclusivos para eventos únicos. Comparte tu invitación con estilo.
      </p>

      <button class="mt-10 bg-[#c6a97a] text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition">
        Ver ejemplos
      </button>

    </section>

    <!-- BENEFICIOS -->
    <section class="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

      <div>
        <h3 class="text-lg font-semibold mb-2">Diseño elegante</h3>
        <p class="opacity-60">Estética premium inspirada en eventos de lujo</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">Fácil de compartir</h3>
        <p class="opacity-60">Envía tu invitación por WhatsApp en segundos</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2">100% personalizado</h3>
        <p class="opacity-60">Adaptado a tu estilo y tipo de evento</p>
      </div>

    </section>

    <!-- GALERÍA -->
    <section id="ejemplos" class="py-24 bg-[#f5f1ed] text-black px-6">

      <h2 class="text-3xl text-center mb-12 font-serif">
        Ejemplos de invitaciones
      </h2>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div 
          v-for="item in invitations" 
          :key="item.slug"
          class="cursor-pointer group"
          @click="$router.push('/' + item.slug)"
        >
          <div class="overflow-hidden rounded-xl">
            <img :src="item.media?.heroImage || ''" class="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
          </div>
          <p class="mt-3 text-center">{{ item.name }}</p>
        </div>

      </div>

    </section>

    <!-- COMO FUNCIONA -->
    <section id="como" class="py-24 text-center px-6">

      <h2 class="text-3xl mb-12 font-serif">
        ¿Cómo funciona?
      </h2>

      <div class="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

        <div>
          <p class="text-[#c6a97a] text-xl mb-2">01</p>
          <h3 class="font-semibold">Envíanos tus datos</h3>
        </div>

        <div>
          <p class="text-[#c6a97a] text-xl mb-2">02</p>
          <h3 class="font-semibold">Diseñamos tu invitación</h3>
        </div>

        <div>
          <p class="text-[#c6a97a] text-xl mb-2">03</p>
          <h3 class="font-semibold">Recibe tu link listo</h3>
        </div>

      </div>

    </section>

    <!-- CTA -->
    <section id="contacto" class="py-24 bg-[#f5f1ed] text-black text-center px-6">

      <h2 class="text-3xl mb-6 font-serif">
        Haz tu invitación hoy
      </h2>

      <p class="mb-8 opacity-70">
        Contáctanos y comienza a crear algo especial
      </p>

      <a 
        href="https://wa.me/5210000000000"
        target="_blank"
        class="bg-[#c6a97a] px-8 py-4 rounded-full font-medium"
      >
        💬 Contactar por WhatsApp
      </a>

    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const invitations = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'events'))
  invitations.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
}

.font-serif {
  font-family: 'Playfair Display', serif;
}
</style>