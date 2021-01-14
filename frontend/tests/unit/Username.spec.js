import { shallowMount } from '@vue/test-utils'
import Username from '@/components/Username.vue'

describe('Username.vue', () => {
  it('renders props.user when passed', () => {
    const email = 'Hi   (hrodriguezh85@gmail.com)'
    const wrapper = shallowMount(Username, {
      propsData: { email }
    })
    expect(wrapper.text()).toMatch(email)
  })
})
