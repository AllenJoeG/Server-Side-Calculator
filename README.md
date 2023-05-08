# Server-Side Calculator

## Description

Project built over three days, 11/12/21 - 11/14/21.
Calculator builds an equation string based on syntactically-allowed user input. The string is sent to the server for calculation.

For this project we were disallowed using the .eval() javascript method, so I had to think through and write a Parser and math functionality from scratch. The resulting 7 functions that handle the job from STRING to finished calculation handles Multiplication, Division, Addition, and Subtraction in the proper order of operations. An isolated version of these functions and their testing can be found in the module mathfunctiontesting.js

Calculated History is stored on the server, and sent via GET route back to the client for rendering on the DOM.

## Usage

User can build an equation anywhere from one number up to as many numbers and operators they desire. The calculator will NOT evaluate as it is keyed in, so the final string will be handled resultant to proper order of operations.

The user's history of calculations are displayed on the right. User can click on any of those calculations to redisplay them on the calculator. The Clear History button sends a DELETE request to wipe the calc history. The CE button clears the input field.

## Technology

Javascript, jQuery, AJAX, Node.js, Express, CSS, HTML

## Future Functionality

A few of the next features to implement:

- Rather than identifying a syntax error and preventing input, if the user inputs two operators back to back, replace the former with the latter.

- Wire up the equation String Parser functionality I wrote as a module exported and required into server.js

- Number-Key input capability. Allow user to use number and operator keyboard inputs to input equation rather than clicking.

## Acknowledgements

Prime Academy for prompting us with this assignment and scaffolding the knowledge and tools.

## Support

Anything you notice, see, suggest, change, questions, inputs, bugs? Contact me Allen.JoeG@gmail.com
