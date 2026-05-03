
<template>
    <div class="min-h-screen bg-black text-white p-10" :style="{ fontFamily: form.styles.fontFamily }">

        <h1 class="text-3xl mb-10">Panel Admin 💎</h1>

        <!-- FORM -->


        <!-- PLANTILLA -->
        <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Plantilla</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
          <label class="block mb-1 text-sm font-semibold">Plantilla</label>
          <select v-model="form.template" class="input">
            <option value="xv-premium">XV Premium</option>
          </select>
          </div>
          <div>
          <label class="block mb-1 text-sm font-semibold">Música de fondo (URL mp3)</label>
          <input v-model="form.media.music" placeholder="URL de música mp3" class="input" />
          </div>
        </div>
        </div>



        <!-- COLORES, PORTADA Y FUENTE -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Colores, portada y fuente</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-1 text-sm font-semibold">Color fondo principal</label>
              <input v-model="form.styles.bgColor" placeholder="Color fondo principal" class="input" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Color texto principal</label>
              <input v-model="form.styles.textColor" placeholder="Color texto principal" class="input" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Color acento</label>
              <input v-model="form.styles.accentColor" placeholder="Color acento" class="input" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Color fondo secciones</label>
              <input v-model="form.styles.bgSectionColor" placeholder="Color fondo secciones (ej: #fff o rgba)" class="input" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Color texto secciones</label>
              <input v-model="form.styles.textSectionColor" placeholder="Color texto secciones" class="input" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Tipo de letra principal</label>
              <select v-model="form.styles.fontFamily" class="input w-full mb-1" :style="{fontFamily: form.styles.fontFamily || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold">Imagen portada URL</label>
              <input v-model="form.media.heroImage" placeholder="Imagen portada URL" class="input" />
            </div>
          </div>
        </div>

        <!-- SECCIONES -->
        <div class="mb-10">
            <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Secciones activas</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.hero" /> Hero</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.frase" /> Frase</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.countdown" /> Countdown</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.detalles" /> Detalles</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.padrinos" /> Padres y Padrinos</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.gallery" /> Galería</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.location" /> Ceremonia y Recepción</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.confirmacion" /> Confirmación</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.regalos" /> Mesa de Regalos</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.recomendaciones" /> Recomendaciones</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.hospedaje" /> Hospedaje</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.instagram" /> Instagram</label>
                <label class="flex items-center gap-2 py-1"><input type="checkbox" v-model="form.sections.final" /> Final</label>
            </div>
        </div>



        <!-- SECCIÓN HERO -->
        <div class="mb-8" v-if="form.sections.hero">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Sección Hero</h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Tipo de evento</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.heroFonts.eventTitle" class="input w-full mb-1" :style="{fontFamily: form.heroFonts?.eventTitle || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.eventTitle" :style="{fontFamily: form.heroFonts?.eventTitle || 'inherit', fontSize: '1.5em', height: '3.6em'}" placeholder="Ej: XV Años, Boda, Bautizo..." class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Slug</label>
              <input v-model="form.slug" class="input" placeholder="slug" style="font-size:1.1em;height:3.2em" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Nombre</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.heroFonts.name" class="input w-full mb-1" :style="{fontFamily: form.heroFonts?.name || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.name" :style="{fontFamily: form.heroFonts?.name || 'inherit', fontSize: '1.5em', height: '3.6em'}" placeholder="Nombre" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Fecha visible</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.heroFonts.date" class="input w-full mb-1" :style="{fontFamily: form.heroFonts?.date || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.date" :style="{fontFamily: form.heroFonts?.date || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Fecha visible" class="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN FRASE -->
        <div class="mb-8" v-if="form.sections.frase">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Sección Frase</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Frase personalizada</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.fraseFont" class="input w-full mb-1" :style="{fontFamily: form.fraseFont || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.frase" :style="{fontFamily: form.fraseFont || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Con la bendición de Dios y el amor de mi familia, te invito a celebrar este día tan especial." class="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN COUNTDOWN -->
        <div class="mb-8" v-if="form.sections.countdown">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Sección Countdown</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Fecha para countdown <span class="opacity-60 text-xs">(Ej: 2026-04-20T19:00:00)</span></label>
              <input v-model="form.dateISO" placeholder="2026-04-20T19:00:00" class="input" style="font-size:1.1em;height:3.2em" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Tipo de contador</label>
              <select v-model="form.countdownType" class="input">
                <option value="classic">Clásico (cuadros)</option>
                <option value="inline">En línea (15. 05. 13. 14)</option>
              </select>
            </div>
          </div>
        </div>


        <!-- SECCIÓN DETALLES ELEGANTE -->
        <div class="mb-8" v-if="form.sections.detalles">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Detalles estilo elegante</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Texto superior</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.detallesFonts.superior" class="input w-full mb-1" :style="{fontFamily: form.detallesFonts?.superior || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.detallesSuperior" :style="{fontFamily: form.detallesFonts?.superior || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Tenemos el honor de invitarlos a" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Palabra principal</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.detallesFonts.principal" class="input w-full mb-1" :style="{fontFamily: form.detallesFonts?.principal || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.detallesPrincipal" :style="{fontFamily: form.detallesFonts?.principal || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: CELEBRAR" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Subtítulo (opcional)</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.detallesFonts.subtitulo" class="input w-full mb-1" :style="{fontFamily: form.detallesFonts?.subtitulo || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.detallesSubtitulo" :style="{fontFamily: form.detallesFonts?.subtitulo || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: SÁBADO" class="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN PADRINOS -->
        <div class="mb-8" v-if="form.sections.padrinos">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Sección Padrinos</h2>
          <div class="flex gap-2 items-center mb-4">
            <label class="block mb-1 text-sm font-semibold">Fuente para todos los nombres</label>
            <select v-model="form.padrinosFont" class="input w-full mb-1" :style="{fontFamily: form.padrinosFont || 'inherit', fontSize: '1.1em', height: '2.6em'}">
              <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
            </select>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="tipo in padrinoTipos" :key="tipo" class="border border-white/10 rounded p-4 mb-2">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold">{{ tipo }}</h3>
                <span class="text-xs opacity-70">({{ form.padrinos[tipo]?.length || 0 }} persona{{ (form.padrinos[tipo]?.length || 0) === 1 ? '' : 's' }})</span>
              </div>
              <ul class="mb-2">
                <li v-for="(nombre, idx) in form.padrinos[tipo]" :key="idx" class="flex items-center gap-2 mb-1">
                  <span :style="{fontFamily: form.padrinosFont || 'inherit'}">{{ nombre }}</span>
                  <button @click="removePadrino(tipo, idx)" class="text-red-400 hover:underline text-xs">Quitar</button>
                </li>
              </ul>
              <div class="flex gap-2">
                <input v-model="padrinoInputs[tipo]" placeholder="Nombre(s)" class="input w-full" @keyup.enter="addPadrinoPorTipo(tipo)" :style="{fontFamily: form.padrinosFont || 'inherit', fontSize: '1.2em', height: '3.2em'}" />
                <button @click="addPadrinoPorTipo(tipo)" class="bg-blue-500 px-3 py-2 rounded">Agregar</button>
              </div>
            </div>
          </div>
        </div>


        <!-- SECCIÓN CEREMONIA Y RECEPCIÓN -->
        <div class="mb-8" v-if="form.sections.location">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Ceremonia y Recepción</h2>
          <div class="mb-4">
              <label class="block mb-1 text-sm font-semibold">Título de la sección</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.titulo" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.titulo || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.ceremoniaTitulo" :style="{fontFamily: form.ceremoniaFonts?.titulo || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: MI CELEBRACIÓN" class="input flex-1" />
              </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6 mb-4">
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="form.ceremoniaVisible" id="ceremoniaVisible" />
              <label for="ceremoniaVisible" class="text-sm font-semibold">Mostrar Ceremonia</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" v-model="form.recepcionVisible" id="recepcionVisible" />
              <label for="recepcionVisible" class="text-sm font-semibold">Mostrar Recepción</label>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-1 text-sm font-semibold">Hora de la ceremonia</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.hora" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.hora || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.ceremoniaHora" :style="{fontFamily: form.ceremoniaFonts?.hora || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: 19:00" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Lugar de la ceremonia</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.lugar" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.lugar || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.ceremoniaLugar" :style="{fontFamily: form.ceremoniaFonts?.lugar || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Templo San Jacinto de Polonia" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Dirección ceremonia</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.direccion" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.direccion || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.ceremoniaDireccion" :style="{fontFamily: form.ceremoniaFonts?.direccion || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Ocosingo, Chiapas" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Link mapa ceremonia</label>
              <input v-model="form.ceremoniaMapa" placeholder="URL Google Maps" class="input" style="font-size:1.1em;height:3.2em" />
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Hora de la recepción</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.recepcionHora" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.recepcionHora || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recepcionHora" :style="{fontFamily: form.ceremoniaFonts?.recepcionHora || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: 20:00" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Lugar de la recepción</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.recepcionLugar" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.recepcionLugar || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recepcionLugar" :style="{fontFamily: form.ceremoniaFonts?.recepcionLugar || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Salón de Fiestas Quinta Paraíso" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Dirección recepción</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.ceremoniaFonts.recepcionDireccion" class="input w-full mb-1" :style="{fontFamily: form.ceremoniaFonts?.recepcionDireccion || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recepcionDireccion" :style="{fontFamily: form.ceremoniaFonts?.recepcionDireccion || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Ocosingo, Chiapas" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Link mapa recepción</label>
              <input v-model="form.recepcionMapa" placeholder="URL Google Maps" class="input" style="font-size:1.1em;height:3.2em" />
            </div>
          </div>
        </div>

        <!-- GALERIA -->
        <div class="mb-10" v-if="form.sections.gallery">
            <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Galería de imágenes</h2>
            <input v-model="newImage" placeholder="Agregar imagen galería" class="input" />

            <button @click="addImage" class="bg-blue-500 px-3 py-2 rounded mt-2">
                Agregar imagen
            </button>

            <div class="flex gap-2 mt-4 flex-wrap">
                <img 
                v-for="(img, i) in form.media.gallery" 
                :key="i"
                :src="img"
                class="w-20 h-20 object-cover rounded"
                />
            </div>
        </div>

        <!-- SECCIÓN CONFIRMACIÓN DE ASISTENCIA -->
        <div class="mb-8" v-if="form.sections.confirmacion">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Confirmación de Asistencia</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Texto de confirmación (mensaje por default)</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.confirmacionFonts.texto" class="input w-full mb-1" :style="{fontFamily: form.confirmacionFonts?.texto || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.confirmacionTexto" :style="{fontFamily: form.confirmacionFonts?.texto || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: ¡Me encantaría contar con tu presencia!" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Número WhatsApp</label>
              <input v-model="form.confirmacionNumero" placeholder="Ej: 5219991234567" class="input" style="font-size:1.1em;height:3.2em" />
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold">Texto para WhatsApp</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.confirmacionFonts.whatsapp" class="input w-full mb-1" :style="{fontFamily: form.confirmacionFonts?.whatsapp || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.confirmacionWhatsapp" :style="{fontFamily: form.confirmacionFonts?.whatsapp || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Confirmo mi asistencia a los XV de..." class="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN MESA DE REGALOS -->
        <div class="mb-8" v-if="form.sections.regalos">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Mesa de Regalos</h2>
          <div class="mb-4">
            <button @click="addRegalo" class="bg-blue-500 px-3 py-2 rounded">Agregar opción de regalo</button>
          </div>
          <div v-for="(regalo, idx) in form.regalos" :key="idx" class="border border-white/10 rounded p-4 mb-4 relative">
            <button @click="removeRegalo(idx)" class="absolute top-2 right-2 text-red-400 hover:underline text-xs">Quitar</button>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block mb-1 text-sm font-semibold">Tipo de mesa de regalo</label>
                <select v-model="regalo.tipo" class="input">
                  <option value="sobres">Lluvia de sobres</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="qr">QR (Liverpool, Amazon, etc)</option>
                </select>
              </div>
              <div>
                <label class="block mb-1 text-sm font-semibold">Texto principal</label>
                <div class="flex flex-col gap-1">
                  <select v-model="regalo.fontTexto" class="input w-full mb-1" :style="{fontFamily: regalo.fontTexto || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                    <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                  </select>
                  <input v-model="regalo.texto" :style="{fontFamily: regalo.fontTexto || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: ¡Mi mejor regalo es tu presencia!" class="input flex-1" />
                </div>
              </div>
              <div>
                <label class="block mb-1 text-sm font-semibold">Texto sugerencia</label>
                <div class="flex flex-col gap-1">
                  <select v-model="regalo.fontSugerencia" class="input w-full mb-1" :style="{fontFamily: regalo.fontSugerencia || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                    <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                  </select>
                  <input v-model="regalo.sugerencia" :style="{fontFamily: regalo.fontSugerencia || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Si deseas tener un detalle conmigo, estas son mis sugerencias:" class="input flex-1" />
                </div>
              </div>
              <div v-if="regalo.tipo === 'transferencia'">
                <label class="block mb-1 text-sm font-semibold">Banco / titular</label>
                <input v-model="regalo.banco" placeholder="Ej: Banco Azteca / Carla Viviana Galvéz Ruiz" class="input" style="font-size:1.1em;height:3.2em" />
                <label class="block mb-1 text-sm font-semibold mt-2">Cuenta / CLABE</label>
                <input v-model="regalo.cuenta" placeholder="Ej: 5263 5401 4024 4019" class="input" style="font-size:1.1em;height:3.2em" />
              </div>
              <div v-if="regalo.tipo === 'qr'">
                <label class="block mb-1 text-sm font-semibold">Imagen QR (ej. Liverpool, Amazon, etc)</label>
                <input v-model="regalo.qr" placeholder="URL de imagen QR" class="input" style="font-size:1.1em;height:3.2em" />
                <label class="block mb-1 text-sm font-semibold mt-2">Descripción QR</label>
                <input v-model="regalo.qrDesc" placeholder="Ej: Mesa Liverpool 123456" class="input" style="font-size:1.1em;height:3.2em" />
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN RECOMENDACIONES DEL EVENTO -->
        <div class="mb-8" v-if="form.sections.recomendaciones">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Recomendaciones del Evento</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <label class="block mb-1 text-sm font-semibold">Código de vestimenta</label>
              <select v-model="form.recomendacionesVestimenta" class="input">
                <option value="">Selecciona...</option>
                <option value="GALA">GALA</option>
                <option value="FORMAL">FORMAL</option>
                <option value="CASUAL">CASUAL</option>
                <option value="COCTEL">COCTEL</option>
                <option value="OTRO">OTRO</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Hombres</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.recomendacionesFonts.hombres" class="input w-full mb-1" :style="{fontFamily: form.recomendacionesFonts?.hombres || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recomendacionesHombres" :style="{fontFamily: form.recomendacionesFonts?.hombres || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: traje completo" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Mujeres</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.recomendacionesFonts.mujeres" class="input w-full mb-1" :style="{fontFamily: form.recomendacionesFonts?.mujeres || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recomendacionesMujeres" :style="{fontFamily: form.recomendacionesFonts?.mujeres || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: vestido largo" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Color reservado</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.recomendacionesFonts.color" class="input w-full mb-1" :style="{fontFamily: form.recomendacionesFonts?.color || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recomendacionesColor" :style="{fontFamily: form.recomendacionesFonts?.color || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Rose Gold reservado para la quinceañera" class="input flex-1" />
              </div>
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold">Texto final</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.recomendacionesFonts.final" class="input w-full mb-1" :style="{fontFamily: form.recomendacionesFonts?.final || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.recomendacionesFinal" :style="{fontFamily: form.recomendacionesFonts?.final || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Agradecemos tu puntualidad y confirmación" class="input flex-1" />
              </div>
            </div>
          </div>
        </div>


        <!-- SECCIÓN HOSPEDAJE -->
        <div class="mb-8" v-if="form.sections.hospedaje">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Hospedaje</h2>
          <div class="mb-4">
            <button @click="addHotel" class="bg-blue-500 px-3 py-2 rounded">Agregar hotel</button>
          </div>
          <div class="flex gap-2 items-center mb-4">
            <label class="block mb-1 text-sm font-semibold">Fuente para todos los hoteles</label>
            <select v-model="form.hospedajeFont" class="input w-40" :style="{fontFamily: form.hospedajeFont || 'inherit', fontSize: '1.1em', height: '3.2em'}">
              <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
            </select>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <div v-for="(hotel, i) in form.hospedaje" :key="i" class="border border-white/10 rounded p-4 relative">
              <button @click="removeHotel(i)" class="absolute top-2 right-2 text-red-400 hover:underline text-xs">Quitar</button>
              <label class="block mb-1 text-sm font-semibold">Nombre</label>
              <input v-model="hotel.nombre" :style="{fontFamily: form.hospedajeFont || 'inherit', fontSize: '1.2em', height: '3.2em'}" placeholder="Ej: Hotel Ex-Hacienda La Ilusión" class="input" />
              <label class="block mb-1 text-sm font-semibold mt-2">Dirección</label>
              <input v-model="hotel.direccion" :style="{fontFamily: form.hospedajeFont || 'inherit', fontSize: '1.2em', height: '3.2em'}" placeholder="Ej: Ocosingo, Chiapas" class="input" />
              <label class="block mb-1 text-sm font-semibold mt-2">Imagen URL</label>
              <input v-model="hotel.imagen" placeholder="URL imagen hotel" class="input" />
              <label class="block mb-1 text-sm font-semibold mt-2">Link mapa</label>
              <input v-model="hotel.mapa" placeholder="URL Google Maps" class="input" />
            </div>
          </div>
        </div>


        <!-- SECCIÓN INSTAGRAM -->
        <div class="mb-8" v-if="form.sections.instagram">
          <h2 class="text-xl font-bold mb-4 border-b border-white/20 pb-2">Instagram</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-1 text-sm font-semibold">Usuario Instagram</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.instagramFonts.usuario" class="input w-full mb-1" :style="{fontFamily: form.instagramFonts?.usuario || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.instagramUsuario" :style="{fontFamily: form.instagramFonts?.usuario || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: tuusuario" class="input flex-1" />
              </div>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold">Hashtag</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.instagramFonts.hashtag" class="input w-full mb-1" :style="{fontFamily: form.instagramFonts?.hashtag || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.instagramHashtag" :style="{fontFamily: form.instagramFonts?.hashtag || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: #XVIsabxlls" class="input flex-1" />
              </div>
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold">Texto invitación Instagram</label>
              <div class="flex flex-col gap-1">
                <select v-model="form.instagramFonts.texto" class="input w-full mb-1" :style="{fontFamily: form.instagramFonts?.texto || 'inherit', fontSize: '1.1em', height: '2.6em'}">
                  <option v-for="font in fontOptions" :key="font.value" :value="font.value" :style="{fontFamily: font.value}">{{ font.label }}</option>
                </select>
                <input v-model="form.instagramTexto" :style="{fontFamily: form.instagramFonts?.texto || 'inherit', fontSize: '1.3em', height: '3.6em'}" placeholder="Ej: Como no quiero perderme ningún detalle..." class="input flex-1" />
              </div>
            </div>
          </div>
        </div>

        <!-- BOTONES GUARDAR Y CANCELAR -->
        <div class="flex gap-4 mb-6">
            <button @click="saveEvent" class="bg-green-500 px-6 py-3 rounded">
                {{ editingId ? 'Actualizar invitación' : 'Guardar invitación' }}
            </button>
            <button v-if="editingId" @click="cancelEdit" class="bg-gray-500 px-6 py-3 rounded">
                Cancelar edición
            </button>
        </div>

        <!-- LISTA -->
        <div class="mt-10 space-y-4">

            <div 
                v-for="item in events" 
                :key="item.id"
                class="bg-white/10 p-4 rounded flex justify-between items-center"
            >
                <div>
                <p class="font-bold">{{ item.name }}</p>
                <p class="text-sm opacity-70">{{ item.slug }}</p>
                </div>

                <div class="flex gap-2">

                <a 
                    :href="'/' + item.slug"
                    target="_blank"
                    class="bg-[#c6a97a] px-4 py-2 rounded"
                >
                    Ver
                </a>

                <button 
                    @click="editEvent(item)"
                    class="bg-yellow-500 px-3 py-2 rounded">
                    Editar
                </button>

                <button 
                    @click="deleteEvent(item.id)"
                    class="bg-red-500 px-3 py-2 rounded">
                    Eliminar
                </button>

                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const padrinoTipos = [
  'Padres',
  'Padrinos de iglesia',
  'Padrinos de brindis',
  'Padrinos de anillo',
  'Padrinos de corona',
  'Padrinos de cojín',
  'Padrinos de biblia',
  'Padrinos de ramo',
  'Padrinos de vestido',
  'Padrinos de zapatos',
  'Padrinos de velo',
  'Padrinos de Lazo',
  'Padrinos de arras'
]

const padrinoInputs = ref({})

const addPadrinoPorTipo = (tipo) => {
  if (!padrinoInputs.value[tipo] || !padrinoInputs.value[tipo].trim()) return
  if (!form.value.padrinos[tipo]) {
    form.value.padrinos[tipo] = []
  }
  form.value.padrinos[tipo].push(padrinoInputs.value[tipo].trim())
  padrinoInputs.value[tipo] = ''
}

const removePadrino = (tipo, idx) => {
  form.value.padrinos[tipo].splice(idx, 1)
}

const fontOptions = [
  { label: 'Playfair Display', value: 'Playfair Display,serif', example: 'Invitación elegante' },
  { label: 'Cormorant Garamond', value: 'Cormorant Garamond,serif', example: 'Invitación elegante' },
  { label: 'Dancing Script', value: 'Dancing Script,cursive', example: 'Ejemplo manuscrita' },
  { label: 'Great Vibes', value: 'Great Vibes,cursive', example: 'Ejemplo manuscrita' },
  { label: 'Montserrat', value: 'Montserrat,sans-serif', example: 'Ejemplo moderno' },
  { label: 'Roboto', value: 'Roboto,sans-serif', example: 'Ejemplo moderno' },
  { label: 'Lobster', value: 'Lobster,cursive', example: 'Ejemplo llamativo' },
  { label: 'Pacifico', value: 'Pacifico,cursive', example: 'Ejemplo casual' },
  { label: 'Raleway', value: 'Raleway,sans-serif', example: 'Ejemplo minimalista' },
  { label: 'Merriweather', value: 'Merriweather,serif', example: 'Ejemplo clásico' },
  { label: 'Oswald', value: 'Oswald,sans-serif', example: 'Ejemplo fuerte' },
  { label: 'Quicksand', value: 'Quicksand,sans-serif', example: 'Ejemplo redondeado' },
  { label: 'Bebas Neue', value: 'Bebas Neue,sans-serif', example: 'Ejemplo impactante' },
  { label: 'Indie Flower', value: 'Indie Flower,cursive', example: 'Ejemplo divertida' },
  { label: 'Abril Fatface', value: 'Abril Fatface,cursive', example: 'Ejemplo fashion' },
  { label: 'Josefin Sans', value: 'Josefin Sans,sans-serif', example: 'Ejemplo geométrico' },
  { label: 'Lora', value: 'Lora,serif', example: 'Ejemplo elegante' },
  { label: 'Poppins', value: 'Poppins,sans-serif', example: 'Ejemplo versátil' },
  { label: 'Amatic SC', value: 'Amatic SC,cursive', example: 'Ejemplo delgado' },
  { label: 'Shadows Into Light', value: 'Shadows Into Light,cursive', example: 'Ejemplo manuscrita' },
  // Fuentes vistosas y diferentes
  { label: 'Fredericka the Great', value: 'Fredericka the Great,cursive', example: '¡Muy original!' },
  { label: 'Monoton', value: 'Monoton,cursive', example: '¡Neón llamativo!' },
  { label: 'Luckiest Guy', value: 'Luckiest Guy,cursive', example: '¡Divertida y gruesa!' },
  { label: 'Permanent Marker', value: 'Permanent Marker,cursive', example: 'Marcador fuerte' },
  { label: 'Bangers', value: 'Bangers,cursive', example: '¡Cómic y pop!' },
  { label: 'Satisfy', value: 'Satisfy,cursive', example: 'Cursiva fluida' },
  { label: 'Sacramento', value: 'Sacramento,cursive', example: 'Manuscrita elegante' },
  { label: 'Press Start 2P', value: 'Press Start 2P,cursive', example: 'Pixel retro' },
  { label: 'Orbitron', value: 'Orbitron,sans-serif', example: 'Futurista' },
  { label: 'Caveat', value: 'Caveat,cursive', example: 'Manuscrita simple' },
  { label: 'Gloria Hallelujah', value: 'Gloria Hallelujah,cursive', example: '¡Divertida y suelta!' },
  { label: 'Alfa Slab One', value: 'Alfa Slab One,cursive', example: '¡Muy gruesa!' },
  { label: 'Chewy', value: 'Chewy,cursive', example: '¡Redondeada y divertida!' },
  { label: 'Creepster', value: 'Creepster,cursive', example: '¡Terrorífica!' },
  { label: 'Unica One', value: 'Unica One,sans-serif', example: 'Geométrica moderna' },
  { label: 'Pacifico', value: 'Pacifico,cursive', example: 'Casual y amigable' },
  { label: 'Special Elite', value: 'Special Elite,cursive', example: 'Máquina de escribir' },
  { label: 'Architects Daughter', value: 'Architects Daughter,cursive', example: 'Manuscrita arquitecto' },
  { label: 'Faster One', value: 'Faster One,cursive', example: '¡Velocidad!' },
  { label: 'Rye', value: 'Rye,cursive', example: 'Western' },
  { label: 'Rubik Moonrocks', value: 'Rubik Moonrocks,cursive', example: '¡Espacial y bold!' },
]

const form = ref({
  eventTitle: '',
  slug: '',
  name: '',
  date: '',
  frase: '',
  dateISO: '',
  time: '',
  location: '',
  ceremoniaTitulo: '',
  ceremoniaTitulo: '',
  template: 'xv-premium',
  detallesSuperior: '',
  detallesPrincipal: '',
  detallesSubtitulo: '',
  padrinos: {},
  ceremoniaVisible: true,
  ceremoniaHora: '',
  ceremoniaLugar: '',
  ceremoniaDireccion: '',
  ceremoniaMapa: '',
  recepcionVisible: true,
  recepcionHora: '',
  recepcionLugar: '',
  recepcionDireccion: '',
  recepcionMapa: '',
  confirmacionTexto: '',
  confirmacionNumero: '',
  confirmacionWhatsapp: '',
  regalos: [],
  recomendacionesVestimenta: '',
  recomendacionesHombres: '',
  recomendacionesMujeres: '',
  recomendacionesColor: '',
  recomendacionesFinal: '',
  hospedaje: [],
  hospedajeFont: 'Playfair Display,serif',
  instagramUsuario: '',
  instagramHashtag: '',
  instagramTexto: '',
  instagramFonts: {
    usuario: 'Playfair Display,serif',
    hashtag: 'Playfair Display,serif',
    texto: 'Playfair Display,serif',
  },
  styles: {
    bgColor: '#0f0f0f',
    textColor: '#ffffff',
    accentColor: '#c6a97a',
    fontFamily: 'Playfair Display,serif'
  },
  heroFonts: {
    eventTitle: 'Playfair Display,serif',
    name: 'Playfair Display,serif',
    date: 'Playfair Display,serif',
  },
  fraseFont: 'Playfair Display,serif',
  detallesFonts: {
    superior: 'Playfair Display,serif',
    principal: 'Playfair Display,serif',
    subtitulo: 'Playfair Display,serif',
  },
  padrinosFont: 'Playfair Display,serif',
  ceremoniaFonts: {
    titulo: 'Playfair Display,serif',
    hora: 'Playfair Display,serif',
    lugar: 'Playfair Display,serif',
    direccion: 'Playfair Display,serif',
    recepcionHora: 'Playfair Display,serif',
    recepcionLugar: 'Playfair Display,serif',
    recepcionDireccion: 'Playfair Display,serif',
  },
  confirmacionFonts: {
    texto: 'Playfair Display,serif',
    whatsapp: 'Playfair Display,serif',
  },
  recomendacionesFonts: {
    hombres: 'Playfair Display,serif',
    mujeres: 'Playfair Display,serif',
    color: 'Playfair Display,serif',
    final: 'Playfair Display,serif',
  },
  sections: {
    hero: true,
    frase: true,
    countdown: true,
    detalles: true,
    padrinos: true,
    gallery: true,
    location: true,
    confirmacion: true,
    regalos: true,
    recomendaciones: true,
    hospedaje: true,
    instagram: true,
    final: true
  },
  media: {
    heroImage: '',
    gallery: []
  }
})

const events = ref([])
const editingId = ref(null)
const newImage = ref('')

const loadEvents = async () => {
  const querySnapshot = await getDocs(collection(db, "events"))
  events.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

const addImage = () => {
  if (!newImage.value) return
  form.value.media.gallery.push(newImage.value)
  newImage.value = ''
}

const editEvent = (item) => {
  form.value = JSON.parse(JSON.stringify(item))
  if (!form.value.hospedajeFont) form.value.hospedajeFont = 'Playfair Display,serif'
  if (!form.value.instagramFonts) form.value.instagramFonts = {}
  if (!form.value.instagramFonts.usuario) form.value.instagramFonts.usuario = 'Playfair Display,serif'
  if (!form.value.instagramFonts.hashtag) form.value.instagramFonts.hashtag = 'Playfair Display,serif'
  if (!form.value.instagramFonts.texto) form.value.instagramFonts.texto = 'Playfair Display,serif'
  if (!form.value.heroFonts) form.value.heroFonts = {}
  if (!form.value.heroFonts.eventTitle) form.value.heroFonts.eventTitle = 'Playfair Display,serif'
  if (!form.value.heroFonts.name) form.value.heroFonts.name = 'Playfair Display,serif'
  if (!form.value.heroFonts.date) form.value.heroFonts.date = 'Playfair Display,serif'
  if (!form.value.fraseFont) form.value.fraseFont = 'Playfair Display,serif'
  if (!form.value.detallesFonts) form.value.detallesFonts = {}
  if (!form.value.detallesFonts.superior) form.value.detallesFonts.superior = 'Playfair Display,serif'
  if (!form.value.detallesFonts.principal) form.value.detallesFonts.principal = 'Playfair Display,serif'
  if (!form.value.detallesFonts.subtitulo) form.value.detallesFonts.subtitulo = 'Playfair Display,serif'
  if (!form.value.padrinosFont) form.value.padrinosFont = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts) form.value.ceremoniaFonts = {}
  if (!form.value.ceremoniaFonts.titulo) form.value.ceremoniaFonts.titulo = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.hora) form.value.ceremoniaFonts.hora = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.lugar) form.value.ceremoniaFonts.lugar = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.direccion) form.value.ceremoniaFonts.direccion = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.recepcionHora) form.value.ceremoniaFonts.recepcionHora = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.recepcionLugar) form.value.ceremoniaFonts.recepcionLugar = 'Playfair Display,serif'
  if (!form.value.ceremoniaFonts.recepcionDireccion) form.value.ceremoniaFonts.recepcionDireccion = 'Playfair Display,serif'
  // Mesa de regalos: asegurar campos de fuente en cada regalo
  if (form.value.regalos && Array.isArray(form.value.regalos)) {
    form.value.regalos.forEach(regalo => {
      if (!regalo.fontTexto) regalo.fontTexto = 'Playfair Display,serif'
      if (!regalo.fontSugerencia) regalo.fontSugerencia = 'Playfair Display,serif'
    })
  }
  if (!form.value.confirmacionFonts) form.value.confirmacionFonts = {}
  if (!form.value.confirmacionFonts.texto) form.value.confirmacionFonts.texto = 'Playfair Display,serif'
  if (!form.value.confirmacionFonts.whatsapp) form.value.confirmacionFonts.whatsapp = 'Playfair Display,serif'
  if (!form.value.recomendacionesFonts) form.value.recomendacionesFonts = {}
  if (!form.value.recomendacionesFonts.hombres) form.value.recomendacionesFonts.hombres = 'Playfair Display,serif'
  if (!form.value.recomendacionesFonts.mujeres) form.value.recomendacionesFonts.mujeres = 'Playfair Display,serif'
  if (!form.value.recomendacionesFonts.color) form.value.recomendacionesFonts.color = 'Playfair Display,serif'
  if (!form.value.recomendacionesFonts.final) form.value.recomendacionesFonts.final = 'Playfair Display,serif'
  editingId.value = item.id
}

const deleteEvent = async (id) => {
  await deleteDoc(doc(db, "events", id))
  loadEvents()
}


const saveEvent = async () => {
  if (editingId.value) {
    await updateDoc(doc(db, "events", editingId.value), {
      ...form.value
    })
  } else {
    await addDoc(collection(db, "events"), {
      ...form.value
    })
  }
  cancelEdit()
  loadEvents()
}

const cancelEdit = () => {
  editingId.value = null
  form.value = {
    eventTitle: '',
    slug: '',
    name: '',
    date: '',
    frase: '',
    dateISO: '',
    time: '',
    location: '',
    template: 'xv-premium',
    padrinos: {},
    ceremoniaVisible: true,
    ceremoniaHora: '',
    ceremoniaLugar: '',
    ceremoniaDireccion: '',
    ceremoniaMapa: '',
    recepcionVisible: true,
    recepcionHora: '',
    recepcionLugar: '',
    recepcionDireccion: '',
    recepcionMapa: '',
    confirmacionTexto: '',
    confirmacionNumero: '',
    confirmacionWhatsapp: '',
    regalos: [],
    recomendacionesVestimenta: '',
    recomendacionesHombres: '',
    recomendacionesMujeres: '',
    recomendacionesColor: '',
    recomendacionesFinal: '',
    hospedaje: [],
    hospedajeFont: 'Playfair Display,serif',
    instagramUsuario: '',
    instagramHashtag: '',
    instagramTexto: '',
    instagramFonts: {
      usuario: 'Playfair Display,serif',
      hashtag: 'Playfair Display,serif',
      texto: 'Playfair Display,serif',
      boton: 'Playfair Display,serif',
    },
    styles: {
      bgColor: '#0f0f0f',
      textColor: '#ffffff',
      accentColor: '#c6a97a',
      bgSectionColor: '#fff',
      textSectionColor: '#222',
      fontFamily: 'Playfair Display,serif'
    },
    heroFonts: {
      eventTitle: 'Playfair Display,serif',
      name: 'Playfair Display,serif',
      date: 'Playfair Display,serif',
    },
    fraseFont: 'Playfair Display,serif',
    detallesFonts: {
      superior: 'Playfair Display,serif',
      principal: 'Playfair Display,serif',
      subtitulo: 'Playfair Display,serif',
    },
    padrinosFont: 'Playfair Display,serif',
    padrinosFonts: {},
    ceremoniaFonts: {
      titulo: 'Playfair Display,serif',
      hora: 'Playfair Display,serif',
      lugar: 'Playfair Display,serif',
      direccion: 'Playfair Display,serif',
      recepcionHora: 'Playfair Display,serif',
      recepcionLugar: 'Playfair Display,serif',
      recepcionDireccion: 'Playfair Display,serif',
    },
    locationFonts: {},
    confirmacionFonts: {
      titulo: 'Playfair Display,serif',
      subtitulo: 'Playfair Display,serif',
      texto1: 'Playfair Display,serif',
      texto2: 'Playfair Display,serif',
      boton: 'Playfair Display,serif',
    },
    regalosFonts: {},
    recomendacionesFonts: {
      titulo: 'Playfair Display,serif',
      subtitulo: 'Playfair Display,serif',
      codigoTitulo: 'Playfair Display,serif',
      vestimenta: 'Playfair Display,serif',
      hombres: 'Playfair Display,serif',
      mujeres: 'Playfair Display,serif',
      color: 'Playfair Display,serif',
      final: 'Playfair Display,serif',
    },
    hospedajeFonts: {
      titulo: 'Playfair Display,serif',
      subtitulo: 'Playfair Display,serif',
      nombre: 'Playfair Display,serif',
      direccion: 'Playfair Display,serif',
      boton: 'Playfair Display,serif',
    },
    finalFonts: {
      mensaje: 'Playfair Display,serif',
    },
    sections: {
      hero: true,
      frase: true,
      countdown: true,
      detalles: true,
      padrinos: true,
      gallery: true,
      location: true,
      confirmacion: true,
      regalos: true,
      recomendaciones: true,
      hospedaje: true,
      instagram: true,
      final: true
    },
    media: {
      heroImage: '',
      gallery: [],
      music: ''
    }
  }
}

// Mesa de regalos dinámica
const addRegalo = () => {
  form.value.regalos.push({
    tipo: 'sobres',
    texto: '',
    sugerencia: '',
    banco: '',
    cuenta: '',
    qr: '',
    qrDesc: ''
  })
}

const removeRegalo = (idx) => {
  form.value.regalos.splice(idx, 1)
}

// Hospedaje dinámico
const addHotel = () => {
  form.value.hospedaje.push({
    nombre: '',
    direccion: '',
    imagen: '',
    mapa: ''
  })
}

const removeHotel = (idx) => {
  form.value.hospedaje.splice(idx, 1)
}

  // Asegura que los links de Google Fonts estén en el head para previsualización y uso en la invitación
  const fontLinks = [
    'https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Dancing+Script:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Great+Vibes&display=swap',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Lobster&display=swap',
    'https://fonts.googleapis.com/css?family=Pacifico&display=swap',
    'https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Merriweather:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap',
    'https://fonts.googleapis.com/css?family=Indie+Flower&display=swap',
    'https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap',
    'https://fonts.googleapis.com/css?family=Josefin+Sans:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Lora:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Amatic+SC:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Shadows+Into+Light&display=swap',
    // Nuevas fuentes vistosas
    'https://fonts.googleapis.com/css?family=Fredericka+the+Great&display=swap',
    'https://fonts.googleapis.com/css?family=Monoton&display=swap',
    'https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap',
    'https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap',
    'https://fonts.googleapis.com/css?family=Bangers&display=swap',
    'https://fonts.googleapis.com/css?family=Satisfy&display=swap',
    'https://fonts.googleapis.com/css?family=Sacramento&display=swap',
    'https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap',
    'https://fonts.googleapis.com/css?family=Orbitron:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Caveat:400,700&display=swap',
    'https://fonts.googleapis.com/css?family=Gloria+Hallelujah&display=swap',
    'https://fonts.googleapis.com/css?family=Alfa+Slab+One&display=swap',
    'https://fonts.googleapis.com/css?family=Chewy&display=swap',
    'https://fonts.googleapis.com/css?family=Creepster&display=swap',
    'https://fonts.googleapis.com/css?family=Unica+One&display=swap',
    'https://fonts.googleapis.com/css?family=Special+Elite&display=swap',
    'https://fonts.googleapis.com/css?family=Architects+Daughter&display=swap',
    'https://fonts.googleapis.com/css?family=Faster+One&display=swap',
    'https://fonts.googleapis.com/css?family=Rye&display=swap',
    'https://fonts.googleapis.com/css?family=Rubik+Moonrocks&display=swap',
  ];

  onMounted(() => {
    loadEvents();
    fontLinks.forEach(link => {
      if (!document.head.querySelector(`link[href='${link}']`)) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = link;
        document.head.appendChild(l);
      }
    });
  });
</script>

<style>
.input {
  @apply bg-white/10 border border-white/20 px-4 py-3 rounded w-full;
}
</style>