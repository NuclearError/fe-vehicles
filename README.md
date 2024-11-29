Frontend Technical Test for [TeamITG](https://teamitg.com/)

# Implementation Notes - Rachel Cullen

### Tooling and dependency updates

- I had to update webpack-cli and a couple other webpack dev dependencies after encountering [the same error as reported here](https://github.com/webpack/webpack-cli/issues/2990). See the [relevant commit here](https://github.com/NuclearError/fe-vehicles/commit/0ab40eacca3340a3b4b8a10a46dbf6cd5815582e). 
- I added added a babel plugin to allow optional chaining - the code worked but unit tests threw 'unexpected token' errors. This was a more pragmatic solution in the circumstances than spending time updating Node itself (Node 14.x or later supports optional chaining natively). See the [relevant commit here](https://github.com/NuclearError/fe-vehicles/commit/ad31e1aa167b3a4a82e73b1adca7a78e337f21b1).

### Constraints to 'pixel perfect' implementation

- I observed that the fonts used in the designs were JLR/commercial fonts which I don't personally own. I copied the `font-family` rules from landrover.co.uk for verisimilitude, but I also added web-safe fallbacks (Trebuchet MS and Futura) to get the look to be as close as possible. If you have AvenirNext or the LandRoverWeb fonts installed locally, your version of the test project will look different to how it looked for me during development. For reference, here's how the fonts looked for me:

<img src="https://i.imgur.com/3oYSVgU.png" alt="Typography using Trebuchet MS and Futura" title="Typography using Trebuchet MS and Futura" width="400"/>

- Working from rasterized low-resolution design images presented some challenges that obviously wouldn't be present in a real project, eg. not having access to exact hex color codes and not being able to accurately check spacing values. I compensated for this by using Apple's Digital Colour Meter, a 'Page Ruler' chrome extension, and by using landrover.co.uk as a reference. In a real project I'd anticipate designs in a format that allows for more accuracy (eg. in Figma), as well as sourcing spacing and colour values from existing variables, as opposed to hardcoding everything.
- In the mobile design, the image in each card takes up approximately 25% of the total card width. In practice I found that this didn't work well at smaller mobile sizes (see images below) so I modified the implementation to allow the image to take up 50% of the card. In this case I chose to prioritise delivering a working test solution over fidelity to the design as provided. In a real project this sort of decision should be made in collaboration with the designer and any other relevant team members!

<img src="https://i.imgur.com/2EslJsQ.png" alt="Image at 25% width of card, showing gap at bottom" title="Image at 25% width of card, showing gap at bottom" width="400"/>
<img src="https://i.imgur.com/oIxOfFd.png" alt="Image at 25% width of card, showing gap at bottom, including details markup" title="Image at 25% width of card, showing gap at bottom, including details markup" width="400"/>

### Approach to testing

- I didn't add unit tests for all React components because most of them don't contain logic. (I don't consider basic React hooks to be testable logic as this is redundant, because it's essentially just testing that React works.) 
- In a bigger project I would hope to use visual regression testing tools like [Chromatic](https://www.chromatic.com/) or [Percy](https://percy.io/). These provide more reliable regression reporting than Jest snapshot testing (eg. `expect(results).toMatchSnapshot()`) which can only read the DOM tree. 

### Accessibility

- I tested for accessibility using Chrome Lighthouse (see scores below), [Accessibility Cloud Lite](https://www.accessibilitycloud.com/lite/), and manual testing with the Apple VoiceOver tool.
- I disabled the `jsx-a11y/alt-text` rule in the CardImage component because within the limited scope of this test project, the images do not provide semantic information to the user. Images which are purely 'decorative' shouldn't have alt tags because this can actually reduce accessibility for those using screen readers. (I can talk about this at great length if no one stops me.)
- If I had had more time I would have loved to implement a fully accessible modal - I built one in the past using React classes (it was before React hooks existed) and would be happy to discuss this in more detail.
- The `<details>` element is [not perfect for accessibility](https://www.scottohara.me/blog/2022/09/12/details-summary.html) because different browsers and screen readers will interpret the `<summary>` element differently which can lead to some weird output. However I chose to use it in this project because it has several other benefits, such as not requiring javascript, being natively keyboard accessible, with no negative impacts on SEO (the markup is semantically valid and the content is always present in the DOM).

<img src="https://i.imgur.com/uEXftOA.png" alt="Lighthouse audit score for mobile screen size" title="Lighthouse audit score for mobile screen size"  width="400"/>
<img src="https://i.imgur.com/kdZ9nux.png" alt="Lighthouse audit score for desktop screen size" title="Lighthouse audit score for desktop screen size" width="400"/>

## This was fun! 
Thanks for your consideration, this was a fun test! 😊


<details><summary>Original Readme Content</summary>


## System requirements
You’ll want to ensure you have the following already installed on your local machine before getting started with the test:
* **Node 12+:** The current LTS (long-term support) release. We like to use a [Node Version Manager like NVM](https://github.com/nvm-sh/nvm).
* **NPM 6+ or Yarn:** Both of these package managers have ups and downs, choose whichever you prefer. Follow the installation instructions for Yarn or NPM to make sure you're using the latest version.

## Setup Instructions
1. Clone this repository
2. Type the following command to install the dependencies and run the project
````
npm install && npm start
````

## Task Instructions
1. API Implementation
    * You will receive a list of general vehicle information by making an initial api request to endpoint `/api/vehicles.json`
    * You are now required to traverse the API and make further calls on a detail endpoint (`apiUrl`) to get vehicle-specific details such as price and description
    * Ignore vehicles with broken apiUrl or without any price information
    * All API related logic should be implemented inside `getData()` available at `src/api/index.js`

2. Using `getData()` in a React component
    * React component `VehicleList` is configured to use `getData()` through a custom hook `useData`
    * If you prefer to use class-based component, then the rule to make a single function to obtain all vehicles through `getData()` needs to be respected
    * No other components are allowed to make any network request

3. UI Design
    * You are required to produce the following designs on different viewports to match as closely as possible, ready for a designer to review
    * [Mobile](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/mobile.png)
    * [Tablet](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/tablet.png)
    * [Desktop](https://raw.githubusercontent.com/connect-group/frontend-technical-test/master/designs/desktop.png)

## Browser Support
We expect the solution to work in the latest version of Chrome

## Acceptance criteria

**We have a high focus on attention to details in code**
* Solution should be written in either Reactjs or VanillaJS
* The formatting of the codebase should be consistent and written in a modular approach
* We expect the codebase to be written using ES6+ and libraries kept to a minimum
* We expect the code to be written with unit testing & performance in mind
* We expect the code to be included in the relevant files
* We prefer native Browser Api over JS libraries
* Mobile-first development approach using min-width media queries
* Solution should be accessible and meet WCAG 2.1
* No CSS framework allowed
* Internally, we use BEM - but we are open to other CSS naming conventions as long as it's built with scale and maintenance in mind

**We have a high focus on attention to details in design**
* We expect the designs to match as closely as possible, ready for a designer to review
* Correct semantic HTML mark-up and/or CSS should be used to achieve the size and aspect ratio of the images in the design
* Interactions and animations to be considered but not distracting users away from the experience
* Minimal visual bugs when going resizing to mobile and large screen sizes

## Nice to have
If you have achieved primary tasks and would like to showcase your skills by implementing additional feature(s) then you can consider the following:
- An [accessible modal implementation](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) which displays the additional vehicle information e.g. emission, bodystyle
- Implement "Read more" which Show/Hide additional vehicle information
- A staggered fade in vehicle cards on load
- Redux
- Anything else which we cannot think of!

## Tips
Use linting to format the code and autofix most of the formatting issues
```shell script
npm run lint
```


</details>
