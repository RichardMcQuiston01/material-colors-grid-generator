# material-colors-grid-generator

# Description

Generate a HTML Canvas element that can be Downloaded or Exported, which has a grid of colors available for a given product. Colors may or may not be grouped together around a common theme(i.e. PLA, PETG, etc.). Each color should have a Card style view with a color chip, hex color code, and color name.

The outputted file can be used in Product Listings to show off the colors available for a given item.

## Overview

### Output Style Inputs

- Category Font
  - Font Name(e.g. Arial) [Arial]
  - Font Color (Black, White, or Custom). [Black]
  - Font Size(e.g. 1rem) [1rem]
- Sub-Category Font
  - Font Name(e.g. Arial) [Arial]
  - Font Color (Black, White, or Custom). [Black]
  - Font Size(e.g. 0.85rem) [0.85rem]
- Card View Font
  - Font Name(e.g. Arial) [Arial]
  - Font Color (Black, White, or Auto which uses the Hex color code entered as the font color). [Auto]
  - Font Size(e.g. 0.75rem) [0.75rem]
- Output Style
  - Output Orientation (Portrait or Landscape) [Landscape]
  - Output Aspect Ration (e.g. 4:3, 16:9) [4:3]
  - Output Dimensions (User can select from a list of standard dimensions for the aspect ratio selected) [1440x1280]
- Card View
  - Cards per Row [5]
  - Card Background Color(e.g. #f7f7f7) [#f7f7f7]
  - Border
    - Rounded Corners(Yes or No) [Yes]
    - Thickness [0.25rem]
    - Color [#dddddd]

### Color Inputs

1. User can edit name of Default Category, and/or add additional Categories.
2. The user can also add Sub-Categories to a Category.
3. The user can add Colors to a Category or a Sub-Category. For each color, the user should specify a Color Name, and a Color Value using a valid hexadeciaml code.

### User Outputs

- Iterate through Categories in Alphabetical Order. If the only category is "Default", do not print this category header.
- Iterate through Sub-Categories in Alphabetical Order(if any)
- Iterate through Colors in Color Order from Dark to Light(#000000 to #ffffff).
- Once Cards per Row is reached, wrap to next line.

### Tech Stack

- Single Page Application (SPA)
- SvelteKit
- TailwindCSS
