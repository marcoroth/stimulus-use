import { camelize } from '../support/index'
import { Controller } from 'stimulus'
import { StimulusUseOptions } from '../stimulus-use'

export interface PowerMoveOptions extends StimulusUseOptions {
  suffix?: boolean | string
  namespace?: boolean
}

const defaultOptions = {
  suffix: true,
  namespace: false,
}

export function getIdentifier(value: string, suffix: boolean | string = defaultOptions.suffix, namespace?: boolean): string {
  let newSuffix = ''

  if (suffix === true) {
    newSuffix = '_controller'
  } else if (typeof suffix === 'string' && suffix !== "") {
    newSuffix = `_${suffix}`
  }

  let newValue = value

  console.log("namespace: ", namespace)

  if (namespace === false) {
    newValue = value.split('--').slice(-1)[0]
  }

  const newerValue = newValue.split(/[-_]/).map(w => w.replace(/./, m => m.toUpperCase())).join('').replace(/^\w/, c => c.toLowerCase())

  return camelize(`${newerValue}${newSuffix}`)
}

// The best one-line Stimulus power move
// https://leastbad.com/stimulus-power-move
//
export const usePowerMove = (controller: Controller, options: PowerMoveOptions = {}) => {
  const suffix = options.suffix ?? defaultOptions.suffix
  const namespace = options.namespace ?? defaultOptions.namespace

  const identifier: string = getIdentifier(controller.identifier, suffix, namespace) as string

  (controller.element as { [index: string]: any })[identifier] = controller

  return controller
}
