<template>
  <div v-if="safeEvent" :style="{ 
    background: safeEvent.styles?.bgColor || '#faf5ef',
    color: safeEvent.styles?.accentColor || '#b97b7b',
    fontFamily: safeEvent.styles?.fontFamily || 'Cormorant Garamond, serif'
    }">
    <template v-for="section in visibleSections" :key="section.key">
      <component :is="section.component" :sectionIndex="section.visibleIndex" />
    </template>

    <!-- AUDIO DE FONDO -->
    <audio
      v-if="safeEvent.media.music"
      :src="safeEvent.media.music"
      autoplay
      loop
      style="display:none"
    ></audio>

  </div>
</template>

<script setup>

import { computed, ref, onMounted, onUnmounted, defineComponent, h, Transition } from 'vue'
// Helper: List of section renderers in order
const sectionRenderers = [
    { key: 'location', component: defineComponent({
      props: ['sectionIndex'],
      setup(props) {
        return () => {
          if (!safeEvent.value.sections.location) return null
          // Render ceremonia y recepción si están activos
          const blocks = []
          if (safeEvent.value.ceremoniaVisible) {
            blocks.push(
              h('div', { class: 'mb-10' }, [
                h('div', {
                  class: 'text-3xl font-serif tracking-widest mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.ceremoniaTitulo || 'inherit' }
                }, safeEvent.value.ceremoniaTitulo || 'CEREMONIA'),
                h('div', {
                  class: 'text-lg mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.ceremoniaHora || 'inherit' }
                }, safeEvent.value.ceremoniaHora),
                h('div', {
                  class: 'mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.ceremoniaLugar || 'inherit' }
                }, safeEvent.value.ceremoniaLugar),
                h('div', {
                  class: 'mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.ceremoniaDireccion || 'inherit' }
                }, safeEvent.value.ceremoniaDireccion),
                safeEvent.value.ceremoniaMapa ? h('a', { href: safeEvent.value.ceremoniaMapa, target: '_blank', class: 'inline-block border border-[#b97b7b] px-6 py-2 rounded mt-2 hover:bg-[#b97b7b] hover:text-white transition' }, 'VER MAPA') : null
              ])
            )
          }
          if (safeEvent.value.recepcionVisible) {
            blocks.push(
              h('div', {}, [
                h('div', {
                  class: 'text-3xl font-serif tracking-widest mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.recepcionTitulo || 'inherit' }
                }, 'RECEPCIÓN'),
                h('div', {
                  class: 'text-lg mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.recepcionHora || 'inherit' }
                }, safeEvent.value.recepcionHora),
                h('div', {
                  class: 'mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.recepcionLugar || 'inherit' }
                }, safeEvent.value.recepcionLugar),
                h('div', {
                  class: 'mb-2',
                  style: { fontFamily: safeEvent.value.locationFonts?.recepcionDireccion || 'inherit' }
                }, safeEvent.value.recepcionDireccion),
                safeEvent.value.recepcionMapa ? h('a', { href: safeEvent.value.recepcionMapa, target: '_blank', class: 'inline-block border border-[#b97b7b] px-6 py-2 rounded mt-2 hover:bg-[#b97b7b] hover:text-white transition' }, 'VER MAPA') : null
              ])
            )
          }
          if (!blocks.length) return null
          return h('section', {
            style: {
              background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
              color: safeEvent.value.styles.accentColor || '#b97b7b'
            },
            class: 'py-20 px-6 text-center'
          }, [
            h('div', { class: 'text-4xl font-serif tracking-widest mb-8' }, 'CEREMONIA Y RECEPCIÓN'),
            ...blocks
          ])
        }
      }
    }) },
  { key: 'hero', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => h('section', {
        style: {
          background: safeEvent.value.sectionColors?.hero?.bg || (props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor),
          color: safeEvent.value.sectionColors?.hero?.text || safeEvent.value.styles.textColor
        },
        class: 'text-center pt-0 pb-24 px-6'
      }, [
        safeEvent.value.media.heroImage ? h('img', {
          src: safeEvent.value.media.heroImage,
          class: 'w-full h-[400px] object-cover',
          style: 'display:block; margin:0; padding:0; border-radius:0;'
        }) : null,
        h('p', { class: 'uppercase tracking-widest text-[#c6a97a] mb-4 mt-10', style: { fontFamily: safeEvent.value.heroFonts?.eventTitle || 'inherit' } }, safeEvent.value.eventTitle || 'Mis XV Años'),
        h('h1', { style: { color: safeEvent.value.styles.accentColor, fontFamily: safeEvent.value.heroFonts?.name || 'inherit' }, class: 'text-5xl md:text-7xl font-serif mb-2' }, safeEvent.value.name),
        h('p', { class: 'mt-6 text-lg opacity-70', style: { fontFamily: safeEvent.value.heroFonts?.date || 'inherit' } }, safeEvent.value.date)
      ])
    }
  }) },
  { key: 'hospedaje', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.hospedaje || !safeEvent.value.hospedaje.length) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-20 px-6 text-center'
        }, [
          h('div', {
            class: 'text-4xl font-serif tracking-widest mb-2',
            style: { fontFamily: safeEvent.value.hospedajeFonts?.titulo || 'inherit' }
          }, 'HOSPEDAJE'),
          h('div', {
            class: 'italic mb-10',
            style: { fontFamily: safeEvent.value.hospedajeFonts?.subtitulo || 'inherit' }
          }, 'Para tu mayor comodidad hemos seleccionado algunos hoteles para tu estadía'),
          h('div', { class: 'grid md:grid-cols-3 gap-8 max-w-6xl mx-auto' },
            safeEvent.value.hospedaje.map((hotel, i) =>
              h('div', { key: i, class: 'bg-white/60 rounded-3xl p-4 flex flex-col items-center' }, [
                h('img', { src: hotel.imagen, alt: hotel.nombre, class: 'rounded-3xl border-4 border-[#e2c6b7] mb-4', style: 'height:180px;object-fit:cover;' }),
                h('div', {
                  class: 'font-semibold tracking-wide mb-1',
                  style: { fontFamily: safeEvent.value.hospedajeFonts?.nombre || 'inherit' }
                }, hotel.nombre),
                h('div', {
                  class: 'mb-1',
                  style: { fontFamily: safeEvent.value.hospedajeFonts?.direccion || 'inherit' }
                }, hotel.direccion),
                hotel.mapa ? h('a', {
                  href: hotel.mapa,
                  target: '_blank',
                  class: 'inline-block border border-[#b97b7b] px-6 py-2 rounded mt-2 hover:bg-[#b97b7b] hover:text-white transition',
                  style: { fontFamily: safeEvent.value.hospedajeFonts?.boton || 'inherit' }
                }, 'VER MAPA') : null
              ])
            )
          )
        ])
      }
    }
  }) },
  { key: 'instagram', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.instagram || (!safeEvent.value.instagramUsuario && !safeEvent.value.instagramHashtag && !safeEvent.value.instagramTexto)) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-20 px-6 text-center'
        }, [
          h('div', { class: 'flex flex-col items-center mb-8' }, [
            h('svg', { width: '60', height: '60', fill: 'none', viewBox: '0 0 60 60', class: 'mb-4' }, [
              h('rect', { x: '10', y: '10', width: '40', height: '40', rx: '12', stroke: '#b97b7b', 'stroke-width': '3', fill: 'none' }),
              h('circle', { cx: '30', cy: '30', r: '12', stroke: '#b97b7b', 'stroke-width': '3', fill: 'none' }),
              h('circle', { cx: '42', cy: '18', r: '2', fill: '#e2c6b7' })
            ]),
            h('div', {
              class: 'text-3xl font-serif tracking-widest',
              style: { fontFamily: safeEvent.value.instagramFonts?.titulo || 'inherit' }
            }, 'INSTAGRAM')
          ]),
          h('div', {
            class: 'italic mb-4',
            style: { fontFamily: safeEvent.value.instagramFonts?.texto || 'inherit' }
          }, safeEvent.value.instagramTexto),
          h('div', {
            class: 'text-3xl font-serif  mb-6',
            style: { fontFamily: safeEvent.value.instagramFonts?.hashtag || 'inherit' }
          }, safeEvent.value.instagramHashtag),
          safeEvent.value.instagramUsuario ? h('a', {
            href: `https://instagram.com/${safeEvent.value.instagramUsuario}`,
            target: '_blank',
            class: 'inline-block border border-[#b97b7b] px-8 py-3 rounded  hover:bg-[#b97b7b] hover:text-white transition font-semibold',
            style: { fontFamily: safeEvent.value.instagramFonts?.boton || 'inherit' }
          }, 'MI INSTA') : null
        ])
      }
    }
  }) },
  { key: 'final', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => h('section', {
        style: {
          background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
          color: safeEvent.value.styles.accentColor || '#b97b7b'
        },
        class: 'text-center py-16'
      }, [
        h('p', {
          class: 'italic opacity-70',
          style: { fontFamily: safeEvent.value.finalFonts?.mensaje || 'inherit' }
        }, '¡Te esperamos!')
      ])
    }
  }) },

  { key: 'recomendaciones', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.recomendaciones) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-20 px-6 text-center'
        }, [
          h('div', {
            class: 'text-3xl font-serif tracking-widest  mb-2',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.titulo || 'inherit' }
          }, 'RECOMENDACIONES'),
          h('div', {
            class: 'text-2xl font-serif tracking-widest  mb-8',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.subtitulo || 'inherit' }
          }, 'DEL EVENTO'),
          h('div', { class: 'flex flex-col items-center mb-6' }, [
            h('svg', { width: '60', height: '60', fill: '#b97b7b', viewBox: '0 0 60 60', class: 'mb-4' }, [
              h('path', { d: 'M20 50 L30 10 L40 50', stroke: '#b97b7b', 'stroke-width': '3', fill: 'none' }),
              h('rect', { x: '18', y: '40', width: '24', height: '10', rx: '2', fill: '#b97b7b' })
            ])
          ]),
          h('div', {
            class: 'font-semibold tracking-wide mb-2',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.codigoTitulo || 'inherit' }
          }, 'CÓDIGO DE VESTIMENTA:'),
          h('div', {
            class: 'mb-2',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.vestimenta || 'inherit' }
          }, safeEvent.value.recomendacionesVestimenta),
          h('div', {
            class: 'italic mb-2',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.hombres || 'inherit' }
          }, `Hombres: ${safeEvent.value.recomendacionesHombres}`),
          h('div', {
            class: 'italic mb-8',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.mujeres || 'inherit' }
          }, `Mujeres: ${safeEvent.value.recomendacionesMujeres}`),
          h('div', { class: 'flex flex-col items-center mb-8' }, [
            h('div', { class: 'w-1 h-12 bg-[#b97b7b] mx-auto mb-4' }),
            h('svg', { width: '50', height: '50', fill: '#b97b7b', viewBox: '0 0 50 50', class: 'mb-4' }, [
              h('path', { d: 'M25 10 Q30 20 25 40 Q20 20 25 10 Z', fill: '#b97b7b' })
            ])
          ]),
          h('div', {
            class: 'mb-8',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.color || 'inherit' }
          }, safeEvent.value.recomendacionesColor),
          h('div', { class: 'flex flex-col items-center mb-4' }, [
            h('div', { class: 'w-1 h-12 bg-[#b97b7b] mx-auto mb-4' }),
            h('svg', { width: '40', height: '40', fill: 'none', viewBox: '0 0 40 40' }, [
              h('circle', { cx: '20', cy: '20', r: '18', stroke: '#b97b7b', 'stroke-width': '2' }),
              h('path', { d: 'M20 12v8l6 4', stroke: '#b97b7b', 'stroke-width': '2', 'stroke-linecap': 'round' })
            ])
          ]),
          h('div', {
            class: 'mt-2',
            style: { fontFamily: safeEvent.value.recomendacionesFonts?.final || 'inherit' }
          }, safeEvent.value.recomendacionesFinal)
        ])
      }
    }
  }) },
  { key: 'regalos', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.regalos || !safeEvent.value.regalos.length) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-20 px-6 text-center'
        }, [
          h('div', { class: 'flex flex-col items-center mb-8' }, [
            h('svg', { width: '60', height: '60', fill: 'none', viewBox: '0 0 60 60', class: 'mb-4' }, [
              h('rect', { x: '10', y: '22', width: '40', height: '25', rx: '4', fill: 'none', stroke: '#b97b7b', 'stroke-width': '2.5' }),
              h('rect', { x: '18', y: '12', width: '24', height: '12', rx: '6', fill: 'none', stroke: '#b97b7b', 'stroke-width': '2.5' }),
              h('path', { d: 'M30 22V12', stroke: '#b97b7b', 'stroke-width': '2.5' }),
              h('path', { d: 'M10 32h40', stroke: '#b97b7b', 'stroke-width': '2.5' }),
              h('circle', { cx: '45', cy: '15', r: '2', fill: '#e2c6b7' }),
              h('circle', { cx: '15', cy: '45', r: '1.5', fill: '#e2c6b7' })
            ]),
            h('div', [
              h('div', {
                class: 'text-3xl font-serif tracking-widest',
                style: { fontFamily: safeEvent.value.regalosFonts?.titulo || 'inherit' }
              }, 'MESA DE'),
              h('div', {
                class: 'text-2xl font-serif italic  -mt-2 mb-4',
                style: { fontFamily: safeEvent.value.regalosFonts?.subtitulo || 'inherit' }
              }, 'Regalos')
            ])
          ]),
          h('div', { class: 'grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center' },
            safeEvent.value.regalos.map((regalo, idx) =>
              h('div', { key: idx, class: 'flex flex-col items-center' }, [
                regalo.tipo === 'sobres' ? h('svg', { width: '50', height: '50', fill: 'none', viewBox: '0 0 50 50', class: 'mb-2' }, [
                  h('rect', { x: '7', y: '15', width: '36', height: '24', rx: '4', fill: 'none', stroke: '#b97b7b', 'stroke-width': '2' }),
                  h('polyline', { points: '7,15 25,32 43,15', fill: 'none', stroke: '#b97b7b', 'stroke-width': '2' }),
                  h('path', { d: 'M25 32 L25 39', stroke: '#b97b7b', 'stroke-width': '2' }),
                  h('path', { d: 'M17 23 Q25 29 33 23', stroke: '#b97b7b', 'stroke-width': '2' }),
                  h('circle', { cx: '25', cy: '12', r: '2', fill: '#e2c6b7' }),
                  h('circle', { cx: '15', cy: '35', r: '1.2', fill: '#e2c6b7' })
                ]) : null,
                regalo.tipo === 'sobres' ? h('div', {
                  class: 'text-2xl font-serif tracking-widest',
                  style: { fontFamily: safeEvent.value.regalosFonts?.lluviaTitulo || 'inherit' }
                }, 'LLUVIA DE') : null,
                regalo.tipo === 'sobres' ? h('div', {
                  class: 'text-xl font-serif italic  -mt-2 mb-4',
                  style: { fontFamily: safeEvent.value.regalosFonts?.lluviaSubtitulo || 'inherit' }
                }, 'SOBRES') : null,
                regalo.tipo === 'transferencia' ? h('div', { class: 'border-2 border-[#b97b7b] rounded-lg p-6 w-full max-w-xs ' }, [
                  h('div', {
                    class: 'text-sm font-semibold mb-1',
                    style: { fontFamily: safeEvent.value.regalosFonts?.banco || 'inherit' }
                  }, regalo.banco),
                  h('div', {
                    class: 'text-xs mb-1',
                    style: { fontFamily: safeEvent.value.regalosFonts?.cuentaLabel || 'inherit' }
                  }, 'CUENTA:'),
                  h('div', {
                    class: 'text-lg font-mono tracking-widest mb-1',
                    style: { fontFamily: safeEvent.value.regalosFonts?.cuenta || 'inherit' }
                  }, regalo.cuenta)
                ]) : null,
                regalo.tipo === 'qr' ? h('div', { class: 'flex flex-col items-center' }, [
                  h('img', { src: regalo.qr, alt: 'QR', class: 'mx-auto mb-2', style: 'max-width:90px;' }),
                  h('div', {
                    class: 'text-xs mb-1',
                    style: { fontFamily: safeEvent.value.regalosFonts?.qrDesc || 'inherit' }
                  }, regalo.qrDesc)
                ]) : null,
                h('div', {
                  class: 'mb-2 text-lg font-semibold',
                  style: { fontFamily: safeEvent.value.regalosFonts?.texto || 'inherit' }
                }, regalo.texto),
                h('div', {
                  class: 'italic mb-10',
                  style: { fontFamily: safeEvent.value.regalosFonts?.sugerencia || 'inherit' }
                }, regalo.sugerencia)
              ])
            )
          )
        ])
      }
    }
  }) },
  { key: 'padrinos', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.padrinos || !Object.keys(safeEvent.value.padrinos).length) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-16 px-6 max-w-4xl mx-auto'
        }, [
          h('div', { class: 'grid md:grid-cols-3 gap-8 text-center' },
            Object.entries(safeEvent.value.padrinos).map(([tipo, nombres]) =>
              h('div', { key: tipo }, [
                h('h3', { class: 'text-lg font-semibold mb-2 tracking-wide', style: { fontFamily: safeEvent.value.padrinosFonts?.[tipo]?.titulo || 'inherit' } }, tipo),
                nombres.map((nombre, idx) =>
                  h('p', { key: idx, class: 'opacity-80 mb-1', style: { fontFamily: safeEvent.value.padrinosFonts?.[tipo]?.nombres || 'inherit' } }, nombre)
                )
              ])
            )
          )
        ])
      }
    }
  }) },
  { key: 'gallery', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      const current = ref(0)
      const total = computed(() => safeEvent.value.media.gallery.length)
      const transitioning = ref(false)
      const direction = ref('')
      let autoplayTimer = null
      const AUTOPLAY_INTERVAL = 3000
      const next = () => {
        if (transitioning.value) return
        direction.value = 'right'
        transitioning.value = true
        clearAutoplay()
        setTimeout(() => {
          current.value = (current.value + 1) % total.value
          transitioning.value = false
          startAutoplay()
        }, 350)
      }
      const prev = () => {
        if (transitioning.value) return
        direction.value = 'left'
        transitioning.value = true
        clearAutoplay()
        setTimeout(() => {
          current.value = (current.value - 1 + total.value) % total.value
          transitioning.value = false
          startAutoplay()
        }, 350)
      }
      function startAutoplay() {
        clearAutoplay()
        autoplayTimer = setTimeout(() => {
          next()
        }, AUTOPLAY_INTERVAL)
      }
      function clearAutoplay() {
        if (autoplayTimer) {
          clearTimeout(autoplayTimer)
          autoplayTimer = null
        }
      }
      onMounted(() => {
        startAutoplay()
      })
      onUnmounted(() => {
        clearAutoplay()
      })
      return () => {
        if (!safeEvent.value.sections.gallery || !safeEvent.value.media.gallery.length) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'flex flex-col items-center justify-center px-6 py-16 max-w-5xl mx-auto'
        }, [
          h('div', { class: 'relative w-full flex items-center justify-center', style: 'min-height:480px; max-width:900px;' }, [
            h('button', {
              class: 'absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 border border-[#b97b7b] rounded-full p-3 shadow-lg hover:bg-[#b97b7b] hover:text-white transition',
              onClick: prev,
              style: 'z-index:2; font-size:2rem;'
            }, [
              h('svg', { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none' }, [
                h('circle', { cx: 16, cy: 16, r: 16, fill: 'none' }),
                h('path', { d: 'M20 8L12 16L20 24', stroke: '#b97b7b', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' })
              ])
            ]),
            h('div', {
              class: [
                'overflow-hidden w-full flex items-center justify-center',
                'relative',
                transitioning.value ? 'pointer-events-none' : ''
              ],
              style: 'height:440px;'
            }, [
              h(
                Transition,
                {
                  name: direction.value === 'right' ? 'slide-left' : 'slide-right',
                  mode: 'out-in',
                  appear: true
                },
                {
                  default: () => [
                    h('img', {
                      key: safeEvent.value.media.gallery[current.value],
                      src: safeEvent.value.media.gallery[current.value],
                      class: [
                        'rounded-3xl object-cover mx-auto shadow-2xl transition-all duration-300'
                      ],
                      style: 'max-width:100%; max-height:420px; min-height:320px; background:#fff;'
                    })
                  ]
                }
              )
            ]),
            h('button', {
              class: 'absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 border border-[#b97b7b] rounded-full p-3 shadow-lg hover:bg-[#b97b7b] hover:text-white transition',
              onClick: next,
              style: 'z-index:2; font-size:2rem;'
            }, [
              h('svg', { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none' }, [
                h('circle', { cx: 16, cy: 16, r: 16, fill: 'none' }),
                h('path', { d: 'M12 8L20 16L12 24', stroke: '#b97b7b', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' })
              ])
            ])
          ]),
          h('div', { class: 'flex gap-2 mt-6 justify-center' },
            safeEvent.value.media.gallery.map((img, idx) =>
              h('span', {
                key: idx,
                class: [
                  'inline-block w-4 h-4 rounded-full border',
                  idx === current.value ? 'bg-[#b97b7b] border-[#b97b7b]' : 'bg-gray-200 border-gray-300'
                ],
                style: 'transition:background 0.2s;'
              })
            )
          )
        ])
      }
    }
  }) },
  { key: 'frase', component: defineComponent({
    props: ['sectionIndex'],
    setup() {
      return () => safeEvent.value.frase ? h('section', {
        style: {
          background: safeEvent.value.sectionColors?.frase?.bg || safeEvent.value.styles.bgSectionColor,
          color: safeEvent.value.sectionColors?.frase?.text || safeEvent.value.styles.textSectionColor
        },
        class: 'text-center mx-auto px-6 py-16'
      }, [
        h('p', { class: 'italic text-lg opacity-80', style: { fontFamily: safeEvent.value.fraseFont || 'inherit' } }, safeEvent.value.frase)
      ]) : null
    }
  }) },
  { key: 'countdown', component: defineComponent({
    props: ['sectionIndex'],
    setup() {
      return () => h('section', {
        style: {
          background: safeEvent.value.styles.bgColor,
          color: safeEvent.value.styles.textColor
        },
        class: 'grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-6 py-16 max-w-4xl mx-auto'
      }, countdown.value.map((item, i) =>
        h('div', { key: i, class: 'bg-white/10 rounded-xl p-6' }, [
          h('p', { class: 'text-3xl font-bold text-[#c6a97a]' }, item.value),
          h('p', { class: 'text-sm opacity-60 uppercase' }, item.label)
        ])
      ))
    }
  }) },
  { key: 'detalles', component: defineComponent({
    props: ['sectionIndex'],
    setup() {
      return () => h('section', {
        style: {
          background: safeEvent.value.styles.bgSectionColor,
          color: safeEvent.value.styles.textSectionColor
        },
        class: 'text-center py-16 px-6 font-serif'
      }, [
        h('p', { class: 'italic text-lg mb-4 font-sans', style: { fontFamily: safeEvent.value.detallesFonts?.superior || 'serif' } }, safeEvent.value.detallesSuperior || 'Tenemos el honor de invitarlos a'),
        h('div', { class: 'text-6xl md:text-7xl font-bold mb-6 tracking-widest', style: { color: safeEvent.value.styles.accentColor, letterSpacing: '0.1em', fontFamily: safeEvent.value.detallesFonts?.principal || 'inherit' } }, safeEvent.value.detallesPrincipal || 'CELEBRAR'),
        h('div', { class: 'flex flex-col items-center mb-2' }, [
          h('div', { class: 'flex items-center justify-center w-full mb-2' }, [
            safeEvent.value.detallesSubtitulo ? h('span', { class: 'text-xl md:text-2xl tracking-widest mr-4', style: { color: safeEvent.value.styles.accentColor, fontFamily: safeEvent.value.detallesFonts?.subtitulo || 'inherit' } }, safeEvent.value.detallesSubtitulo) : null,
            h('span', { class: 'text-6xl md:text-7xl font-serif mx-4', style: { color: safeEvent.value.styles.accentColor } }, getDay(safeEvent.value.dateISO)),
            h('span', { class: 'text-xl md:text-2xl tracking-widest ml-4', style: { color: safeEvent.value.styles.accentColor } }, getMonth(safeEvent.value.dateISO))
          ]),
          h('div', { class: 'w-full border-t', style: { borderColor: safeEvent.value.styles.accentColor } }),
          h('div', { class: 'text-2xl md:text-3xl mt-2', style: { color: safeEvent.value.styles.accentColor } }, getYear(safeEvent.value.dateISO))
        ])
      ])
    }
  }) },
  { key: 'confirmacion', component: defineComponent({
    props: ['sectionIndex'],
    setup(props) {
      return () => {
        if (!safeEvent.value.sections.confirmacion) return null
        return h('section', {
          style: {
            background: props.sectionIndex % 2 === 0 ? safeEvent.value.styles.bgColor : safeEvent.value.styles.bgSectionColor,
            color: safeEvent.value.styles.accentColor || '#b97b7b'
          },
          class: 'py-20 px-6 text-center'
        }, [
          h('div', { class: 'flex flex-col items-center mb-8' }, [
            h('svg', { width: '60', height: '60', fill: 'none', viewBox: '0 0 60 60', class: 'mb-4' }, [
              h('circle', { cx: '30', cy: '30', r: '28', stroke: '#b97b7b', 'stroke-width': '3', fill: 'none' }),
              h('path', { d: 'M20 32l7 7 13-13', stroke: '#b97b7b', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
              h('circle', { cx: '45', cy: '15', r: '2', fill: '#e2c6b7' }),
              h('circle', { cx: '15', cy: '45', r: '1.5', fill: '#e2c6b7' }),
              h('circle', { cx: '40', cy: '45', r: '1.5', fill: '#e2c6b7' })
            ]),
            h('div', [
              h('div', {
                class: 'text-3xl font-serif tracking-widest',
                style: { fontFamily: safeEvent.value.confirmacionFonts?.titulo || 'inherit' }
              }, 'CONFIRMACIÓN'),
              h('div', {
                class: 'text-2xl font-serif italic  -mt-2 mb-4',
                style: { fontFamily: safeEvent.value.confirmacionFonts?.subtitulo || 'inherit' }
              }, 'de Asistencia')
            ])
          ]),
          h('p', {
            class: 'italic text-lg mb-2',
            style: { fontFamily: safeEvent.value.confirmacionFonts?.texto1 || 'inherit' }
          }, safeEvent.value.confirmacionTexto || 'Para mí es muy importante compartir esta alegría con ustedes'),
          h('p', {
            class: 'mb-8 text-lg',
            style: { fontFamily: safeEvent.value.confirmacionFonts?.texto2 || 'inherit' }
          }, safeEvent.value.confirmacionTexto || '¡Me encantaría contar con tu presencia!'),
          h('a', {
            href: whatsappLink.value,
            target: '_blank',
            class: 'inline-block border border-[#b97b7b] px-8 py-3 rounded  hover:bg-[#b97b7b] hover:text-white transition font-semibold',
            style: { fontFamily: safeEvent.value.confirmacionFonts?.boton || 'inherit' }
          }, 'CONFIRMA AQUÍ')
        ])
      }
    }
  }) },
  // Puedes continuar migrando el resto de secciones aquí siguiendo el mismo patrón...
]


// Build the ordered list of visible sections with correct alternation index
const visibleSections = computed(() => {
  const order = [
    'hero', 'frase', 'countdown', 'detalles', 'padrinos', 'gallery', 'location', 'confirmacion', 'regalos', 'recomendaciones', 'hospedaje', 'instagram', 'final'
  ]
  let visibleIndex = 0
  return order
    .map(key => {
      return sectionRenderers.find(s => s.key === key)
    })
    .filter(Boolean)
    .filter(s => {
      const k = s.key
      return safeEvent.value.sections[k] && (k !== 'gallery' ? true : safeEvent.value.media.gallery.length)
    })
    .map(s => ({ ...s, visibleIndex: visibleIndex++ }))
})

const props = defineProps({
  event: Object
})

// Map all admin fields to the template for dynamic rendering
const safeEvent = computed(() => {
  if (!props.event) return null
  const e = props.event
  return {
    ...e,
    styles: {
      bgColor: e.styles?.bgColor || '#0f0f0f',
      textColor: e.styles?.textColor || '#ffffff',
      accentColor: e.styles?.accentColor || '#c6a97a',
      bgSectionColor: e.styles?.bgSectionColor || 'rgba(255,255,255,0.1)',
      textSectionColor: e.styles?.textSectionColor || e.styles?.accentColor || '#b97b7b'
    },
    sections: {
      hero: e.sections?.hero ?? true,
      frase: e.sections?.frase ?? true,
      countdown: e.sections?.countdown ?? true,
      detalles: e.sections?.detalles ?? true,
      padrinos: e.sections?.padrinos ?? true,
      gallery: e.sections?.gallery ?? true,
      location: e.sections?.location ?? true,
      confirmacion: e.sections?.confirmacion ?? true,
      regalos: e.sections?.regalos ?? true,
      recomendaciones: e.sections?.recomendaciones ?? true,
      hospedaje: e.sections?.hospedaje ?? true,
      instagram: e.sections?.instagram ?? true,
      final: e.sections?.final ?? true
    },
    media: {
      heroImage: e.media?.heroImage || '',
      gallery: e.media?.gallery || [],
      music: e.media?.music || ''
    },
    eventTitle: e.eventTitle || '',
    slug: e.slug || '',
    name: e.name || '',
    date: e.date || '',
    frase: e.frase || '',
    dateISO: e.dateISO || '',
    detallesSuperior: e.detallesSuperior || '',
    detallesPrincipal: e.detallesPrincipal || '',
    detallesSubtitulo: e.detallesSubtitulo || '',
    padrinos: e.padrinos || {},
    ceremoniaTitulo: e.ceremoniaTitulo || '',
    ceremoniaVisible: e.ceremoniaVisible !== false,
    ceremoniaHora: e.ceremoniaHora || '',
    ceremoniaLugar: e.ceremoniaLugar || '',
    ceremoniaDireccion: e.ceremoniaDireccion || '',
    ceremoniaMapa: e.ceremoniaMapa || '',
    recepcionVisible: e.recepcionVisible !== false,
    recepcionHora: e.recepcionHora || '',
    recepcionLugar: e.recepcionLugar || '',
    recepcionDireccion: e.recepcionDireccion || '',
    recepcionMapa: e.recepcionMapa || '',
    confirmacionTexto: e.confirmacionTexto || '',
    confirmacionNumero: e.confirmacionNumero || '',
    confirmacionWhatsapp: e.confirmacionWhatsapp || '',
    regalos: e.regalos || [],
    recomendacionesVestimenta: e.recomendacionesVestimenta || '',
    recomendacionesHombres: e.recomendacionesHombres || '',
    recomendacionesMujeres: e.recomendacionesMujeres || '',
    recomendacionesColor: e.recomendacionesColor || '',
    recomendacionesFinal: e.recomendacionesFinal || '',
    hospedaje: e.hospedaje || [],
    instagramUsuario: e.instagramUsuario || '',
    instagramHashtag: e.instagramHashtag || '',
    instagramTexto: e.instagramTexto || ''
  }
})

const targetDate = computed(() => {
  if (!safeEvent.value?.dateISO) return null

  const d = new Date(safeEvent.value.dateISO)

  return isNaN(d.getTime()) ? null : d
})

const countdown = ref([
  { label: 'Días', value: 0 },
  { label: 'Horas', value: 0 },
  { label: 'Min', value: 0 },
  { label: 'Seg', value: 0 }
])

const updateCountdown = () => {
  if (!targetDate.value) return

  const now = new Date()
  const diff = targetDate.value - now

  if (diff <= 0) return

  countdown.value = [
    { label: 'Días', value: Math.floor(diff / (1000 * 60 * 60 * 24)) },
    { label: 'Horas', value: Math.floor((diff / (1000 * 60 * 60)) % 24) },
    { label: 'Min', value: Math.floor((diff / (1000 * 60)) % 60) },
    { label: 'Seg', value: Math.floor((diff / 1000) % 60) }
  ]
}


// Dynamic links based on admin data
const mapsLink = computed(() => {
  return safeEvent.value.ceremoniaMapa || safeEvent.value.recepcionMapa || ''
})
const whatsappLink = computed(() => {
  if (safeEvent.value.confirmacionNumero) {
    const msg = safeEvent.value.confirmacionWhatsapp || 'Confirmo asistencia'
    return `https://wa.me/${safeEvent.value.confirmacionNumero}?text=${encodeURIComponent(msg)}`
  }
  return '#'
})


// ...existing code...
function getDay(dateISO) {
  if (!dateISO) return ''
  const d = new Date(dateISO)
  return d.getDate().toString().padStart(2, '0')
}
function getMonth(dateISO) {
  if (!dateISO) return ''
  const d = new Date(dateISO)
  return d.toLocaleString('es-MX', { month: 'long' }).toUpperCase()
}
function getYear(dateISO) {
  if (!dateISO) return ''
  const d = new Date(dateISO)
  return d.getFullYear()
}

onMounted(() => {
  setInterval(updateCountdown, 1000)
})
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Unica+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Faster+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rye&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap');


.font-serif {
  font-family: 'Playfair Display', serif;
}
/* Animaciones de transición para el carrusel */
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.35s cubic-bezier(.4,0,.2,1);
}
.slide-left-enter-from {
  opacity: 0.7;
  transform: translateX(80px);
}
.slide-left-leave-to {
  opacity: 0.7;
  transform: translateX(-80px);
}
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.35s cubic-bezier(.4,0,.2,1);
}
.slide-right-enter-from {
  opacity: 0.7;
  transform: translateX(-80px);
}
.slide-right-leave-to {
  opacity: 0.7;
  transform: translateX(80px);
}
</style>