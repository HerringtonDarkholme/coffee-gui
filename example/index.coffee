import {component, mount} from '../src'

MyComponent = component class
  constructor: () ->
    @text = '123'
  click: ->
    @text = '456'
    alert(@text)


MyComponent::render = ->
    div {}, ->
        span on: {@click}, -> t'Hello world'
        p {}, ->
            t(@text)

container = document.querySelector('#container')
mount(container, MyComponent)
