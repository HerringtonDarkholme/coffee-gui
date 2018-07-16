import {component} from '../src'

component class MyComponent
  constuctor: ({@text}) ->


MyComponent::render = ->
    div {} -> @text


