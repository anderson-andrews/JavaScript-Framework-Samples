JavaScript-Framework-Samples
============================

Framework
---------
These samples are part of a larger project I've been working on.
The frontend JavaScript has the ability to request and process pre-processed JSON from a server.
Server pre-processing includes adding a data array or object to the JSON string and
processing the string with ERB(Ruby's default templating engine).

The server creates stubs that act as placeholders for the new elements.
The client side JavaScript finds the stubs and uses the information they provide to create AJAX requests for the full JSON commands.
The data added to the JSON can be accessed on the client side when building an HTML element through "__data__.data_name".
If the data is an array application will build an element for each of the objects in the array.
If the data is an object it will build only one element.
The framework also has the ability to store data from JSON instructions in
localStorage or sessionStorage depending on the JSON instructions.

In addition to building elements and storing data the JSON is used to link elements using multiple observer groups.
When a particular action is performed on an active DOM element it triggers a list of actions.
The actions can be action calls(specialized functions) or announce(__announce__).
Announce tells all of the observing elements within an observer that an action has been performed.
If an element is observing the action that is triggered it will run its actions for that trigger.
There's a lot more going on but those are some of the major parts.

observer.js
-----------
This file is a sample from my frontend javascript framework. It contains a simple observer and a trigger.
They use a modified module pattern that gives the objects public, private and privileged functions.
I can also use initializers if needed. I wrap most of my functions with
anonymous functions to preserve their namespaces. And, I use a namespace object named
Core to keep all of my objects organized. I included a small example of the Core namespace at the beginning of the file.
Please note that this code should not run because it references other helpers and functions from my framework.

sample.json
-----------
This is one of my test JSON files. It shows most of the JSON command functionality.
