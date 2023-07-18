import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const SliderDemo = () => {
  return (
    <div>
      <Slider.Root className={s.sliderRoot} defaultValue={[0, 100]} max={100} step={1}>
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} aria-label="Volume" />
        <Slider.Thumb className={s.sliderThumb} aria-label="Volume" />
      </Slider.Root>
    </div>
  )
}
