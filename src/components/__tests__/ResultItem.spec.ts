import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ResultItem from '../ResultItem.vue'

describe('ResultItem', () => {
  it('renders properly', () => {
    const result = {
      title: 'foobar',
    }
    const wrapper = mount(ResultItem, { props: { result } })
    expect(wrapper.text()).toContain('foobar')
  })
})
