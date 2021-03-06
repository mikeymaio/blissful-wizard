const patchOptions = {
  id: 'Shopify__ProductOption__Patch',
  name: 'Patch',
  values: ['None', 'Bear', 'Butterfly', 'Strawberry'],
}

const patchPlacementOptionsTops = {
  id: 'Shopify__ProductOption__Patch_Placement__Tops',
  name: 'Patch Placement',
  values: ['n/a', 'Chest Left', 'Chest Center', 'Arm', 'Pocket'],
}

const patchPlacementOptionsBottoms = {
  id: 'Shopify__ProductOption__Patch_Placement__Bottoms',
  name: 'Patch Placement',
  values: ['n/a', 'Back Pocket', 'Front Bottom Left', 'Front Bottom Right'],
}

const patternOptions = {
  id: 'Shopify__ProductOption__Pattern',
  name: 'Pattern',
  values: [
    'Spiral',
    'Bullseye',
    'Tiger Stripes',
    'Galaxy',
    'Random',
    'Reverse Tiedye',
  ],
}

const color1Options = {
  id: 'Shopify__ProductOption__Color1',
  name: 'Color 1',
  values: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black'],
}

const color2Options = {
  id: 'Shopify__ProductOption__Color2',
  name: 'Color 2',
  values: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black'],
}

const color3Options = {
  id: 'Shopify__ProductOption__Color3',
  name: 'Color 3',
  values: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Black'],
}

export const customTieDyeOptions = [
  patchOptions,
  patchPlacementOptionsTops,
  patchPlacementOptionsBottoms,
  patternOptions,
  color1Options,
  color2Options,
  color3Options,
]
