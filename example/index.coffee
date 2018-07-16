import {component, mount} from '../src'

MyComponent = component class
  constuctor: () ->


MyComponent::render = ->
    div {}, =>
        span {}, => t'Hello world'
        t 'mmmm'

container = document.querySelector('#container')
mount(container, MyComponent)
