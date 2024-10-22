import { definePlugin } from 'sanity'
import HealthSherpaButton from '../components/HealthSherpaButton'

export const healthSherpaTool = definePlugin({
  name: 'health-sherpa',
  tools: [
    {
      name: 'health-sherpa',
      title: 'Health Sherpa',
      component: HealthSherpaButton,
    },
  ],
})
