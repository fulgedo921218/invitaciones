<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-black p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-100 mb-2" for="email">Email</label>
          <input v-model="email" id="email" type="email" required class="w-full px-3 py-2 border rounded text-black" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-100 mb-2" for="password">Contraseña</label>
          <input v-model="password" id="password" type="password" required class="w-full px-3 py-2 border rounded text-black" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
        <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''
  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin') // Redirige al admin
  } catch (e) {
    error.value = 'Credenciales incorrectas o error de conexión.'
  }
}
</script>

<style scoped>
body {
  background-color: #f7fafc;
}
</style>
