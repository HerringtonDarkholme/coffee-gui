import {component, mount} from '../src'

MyComponent = component class
  constuctor: () ->
  click: -> alert(123)


MyComponent::render = ->
    div {}, =>
        span on: click: @click, => t'Hello world'
        p {}, => t'mmmm'

container = document.querySelector('#container')
mount(container, MyComponent)
