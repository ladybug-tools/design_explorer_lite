# design_explorer_lite
A light version of design explorer meant to display sliders for the inputs and simple images + charts for outputs: http://www.ladybug.tools/design_explorer_lite/

#Possible Future Steps:
Create documentation for community to learn how to use Grasshopper to generate their own parametric studies
Support Additional Chart Types (Pie Chart)
Support fancy stuff like Svg Animation


#Lessons Learned:
Many existing Javascript libraries could help, but pulling them in would be more trouble to learn another language (Gatsby.js requires learning React, Angular.js has its own unique syntax) and in the end, structuring the inputted data.csv and settings.json properly, enables us to use vanilla javascript to parse and use already imported Jquery
The Javascript libraries we did use D3.js and Jquery had some conflicting issues and were not able to utlize each other’s selectors, which brought some grief.
Github pages are very helpful for quick hackathon projects and provide many bonuses over traditional hosting
