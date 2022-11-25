## WizardWidget
Pluggable Mendix widget to create multi-step wizards using a single widget.

## Features
Typically, when creating a wizard, a Mendix developer would create multiple pages: one for each wizard step. With this widget, it is possible to combine the entire wizard in a single widget. This makes it easier for the developer to create a wizard. Also, the UI for navigating the wizard only needs to be defined once, speeding up the implementation of a wizard.

In addition to a traditional, static wizard, the widget support the creation of dynamic wizards, where the wizard steps animate in, right-to-left. In case of the sliding wizard, the user can navigate from one wizard step to another by clicking the header of a wizard step (see demo video)

## Usage
* Create a page in Mendix
* Add the Wizard Widget to the page
* Configure the wizard
    * Choose a wizard type (Fixed or Sliding)
    * Add wizard steps by clicking [New]
    * Select an attribute for the active step (this attribute can be used in your logic e.g., to style navigation elements based on whether or not they represent the active step)
    * Select an attribute for the step that was clicked on (this attribute can be used in your logic and is set by the widget when used in sliding mode when the user clicks on a header)
    * Configure widths of widget elements
    * (for sliding wizard only) Configure the action that needs to be carried out when clicking on the header of a wizard step
    * (for static wizard only) Configure the positioning of the navigation (top, right, bottom, left)

## Demo project
https://slidingwizard-sandbox.mxapps.io/

## Issues, suggestions and feature requests
https://github.com/mwbouwkamp-mendix/wizardWidget/

## Development and contribution
Contact autor

## Author
marco.bouwkamp@mendixlabs.com
