/**
 * Swiper animate
 * http://www.swiper.com.cn/
 *
 * Created by 刘谦 <qianliu> 112486391@qq.com
 */

const wildcard = '[data-animate-effect]'

function swiperAnimateCache (swiper) {
  const allBoxes = document.querySelectorAll(wildcard)

  for (let i = 0, max = allBoxes.length; i < max; i++) {
    const box = allBoxes[i]
    const attrStyle = box.attributes['style']

    box.setAttribute('data-animate-cache', attrStyle ? attrStyle.value : '')
    box.style.visibility = 'hidden'
  }
}

function swiperAnimate (swiper) {
  clearSwiperAnimate()

  const characters = swiper.slides[swiper.activeIndex].querySelectorAll(wildcard)

  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]
    character.style.visibility = 'visible'

    const animateEffect = character.attributes['data-animate-effect']
    const effect = animateEffect ? animateEffect.value : ''

    character.className = `${character.className} ${effect} animated`

    let style = character.attributes['style'].value

    const animateDuration = character.attributes['data-animate-duration']
    const duration = animateDuration ? animateDuration.value : ''

    if (duration) {
      style += `animation-duration: ${duration}; -webkit-animation-duration: ${duration};`
    }

    const animateDelay = character.attributes['swiper-animate-delay']
    const delay = animateDelay ? animateDelay.value : ''

    if (delay) {
      style += `animation-delay: ${delay}; -webkit-animation-delay: ${delay};`
    }

    character.setAttribute('style', style)
  }
}

function clearSwiperAnimate () {
  const allBoxes = document.querySelectorAll(wildcard)

  for (let i = 0, max = allBoxes.length; i < max; i++) {
    const box = allBoxes[i]
    const animateCache = box.attributes['data-animate-cache']

    if (animateCache) {
      box.setAttribute('style', animateCache.value)
    }

    box.style.visibility = 'hidden'
    box.className = box.className.replace('animated', '')

    const animateEffect = box.attributes['data-animate-effect']
    if (animateEffect) {
      box.className = box.className.replace(animateEffect.value, '')
    }
  }
}

export default {
  swiperAnimateCache,
  swiperAnimate
}
