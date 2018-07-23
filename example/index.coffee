import {component, mount, style} from '../src'

white = style
  background: 'grey'
  color: 'white'

blue = style(
  white...
  textAlign: 'center'
  background: 'blue'
)

MyComponent = component class
  constructor: () ->
    @text = '123'
  click: ->
    @text = '456'
    alert(@text)


MyComponent::render = ->
    div ->
        span[white] on: {@click}, -> t'Hello world'
        p[blue] -> t(@text)

container = document.querySelector('#container')
mount(container, MyComponent)
