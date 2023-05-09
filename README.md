[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/JJ3jryix)
# HW5 Starting Code
Student Name: 王堃宇<br>
Student ID: R11922102
***


## Deploy Website
Website link - [Netlify](https://ssui-hw5-skychocowhite.netlify.app/)

> To run and test the website, navigate from the link and start the operaions.

## Design of Website
In the homework description, TA implies that we can use **Command Object pattern** to implements the linear undo model. Thus, I found a website that introduces the so called **Command design pattern** which also give an example showing how to handle a command history. The design of the example is showed as the below image:

![](https://i.imgur.com/cOdf04U.png)
> Reference: https://refactoring.guru/design-patterns/command

In the example, the **Application** classholds a reference of **CommandHistory** class, which stores all objects of classes that extend **Command** class in the **history** list. As a result, the application can use the redo or undo methods of specified command.

Referred to this design, I made up my own design of command object pattern:

![](https://i.imgur.com/ED0eGO4.png)

> Reference: https://drive.google.com/file/d/1sV1cJgAfcRhhpZdj0a23BSW6r2Mam9pf/view?usp=sharing

As the sample code, I used the **Command** class as the interface implemented by concrete command classes, and store these objects in the list **commandList** in the **App** class.
***


## Bonus
### Undo, Redo for Line Objects
I also implemented the command object pattern on line objects, which did not modify much lines of sample codes. To test this, just change to the **line mode** and start drawing.

### Hotkeys for Undo and Redo Events
I implemented hotkeys for undo and redo events.
1. Undo: **ctrl+z** or **command+z**
2. Redo: **ctrl+y** or **command+shit+z**

To implement this, I add a keydown event **undoRedoKeyDownHandler** in **App** class, and then add the event to the `window` object. To test the function, first add some commands in the command list, and then press hotkeys for doing undo and redo events.

### Command List Block
I added the command list in the right side of the drawing panel. To implement this, I added `render` methods in each kind of command classes. To test this, just add some commands on the panel, and the corresponding commands will showed on the website. Also, the command list block will display the last executed command and commands that have been undone or not.

### Nudge Operations (Four Directions)
I implemented the nudge events for selected object, the class **NudgeCommandObject** includes all the implementation. For each direction, 
the object will be moved 5px on direction once key of that one is pressed. If the user press same direction key multiple times, the operations will be merged into one single command object, and displayed on the command list block with merged distances. To test the function, select an object, and press one of direction keys.
***

## The Hardest Part in the Implementation
In fact, there was not difficulties that really bothered me a lot during implmentation, most of the issues come from the connection between the functions in the sample codes and my implementation. The problem that bothers me more is that I'm not really sure that to what extent should the functions and attributes be passed to my implementation (for example, command classes). I will try my best to make classes loose coupling as my best if there are other opportunities for designing other systems.
***

## Interest about Software Design
The robust and extensibility of each design pattern is really amamzing for me. Most of the design patterns are confused in the first glance, but later on I will accept the pattern and get fascinating about it after reading the reason and problem solves in the design.


## Reference
1. Sample code from TAs of the HCII - GitHub: https://github.com/lxieyang/05631-hw5-base
2. Command Design Pattern: https://refactoring.guru/design-patterns/command
