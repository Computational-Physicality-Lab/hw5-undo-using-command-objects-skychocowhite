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

### Hotkeys for Undo and Redo
I implemented hotkeys for undo and redo events.
1. Undo: **ctrl+z** or **command+z**
2. Redo: **ctrl+y** or **command+shit+z**

To implement this, I add a keydown event **undoRedoKeyDownHandler** in **App** class


## Reference
1. Sample code from TAs of the HCII - GitHub: https://github.com/lxieyang/05631-hw5-base
