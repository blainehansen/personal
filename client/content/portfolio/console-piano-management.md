---
title: "Python Console Piano Studio Management"
thesis: "A series of python scripts for managing my customers, website, and studio."
project: portfolio
date: 11/03/2015
repo: https://github.com/blainehansen/console-studio-management
tags:
- systems-design
- programming
- python
- unix
---

These scripts all together functioned as my first customer management system for my piano studio. I decided to pursue this project both to have a streamlined and bespoke way to manage everything, but also for the experience and growth.

The core CMS system works as follows:

* `manage.py` is the entry point for the system. It handles the console input loop and interfaces with the underlying database and object oriented controls. It parses inputs to decide on what actions to take, and can print out help text. On each run, it backs up all databases, outputs the databases into printable spreadsheet files specific to certain types of business actions (like accounts with outstanding balances), and gracefully closes in the event of a <kbd>ctrl+C</kbd> close.
* `management.py` holds the high level object definitions, `Studio`, `Student` and `Customer`, which are both a subclass of `Person`. These classes have functions defined for manipulating those datatypes, as well as searching their contents and outputting them. A helper function `dict-eval` is defined to parse strings in this format `key:value, key:value....` into python dictionaries. And the `backup` helper function provides the means to save the database.
* `records.py` holds the low level object definitions, `Lesson`, `Expense`, `Payment`, and `Contact`, all of which are subclasses of `Record`. These classes all are essentially business events with a date and comments. Several helper functions are also defined in this file.
* `output_strings.py` is just a couple of tab-delimited strings used as the headers for the spreadsheet files mentioned earlier.

I designed the interface format primarily with input speed in mind. Pretty much the only benefit of a console based system like this is the fact that the user can keep their hands in one place and very quickly type out their commands, as long as they have invested some time in understanding the interface. I wanted to be able to input a day's lessons and make any other changes quickly and with a minimum of design effort, and this seemed like a good way to do so. Since the command history could be accessed by pressing the up key, I could type in a command for my first lesson, and then reuse that same command for the other lessons and just change the student name each time.

The feature I'm most proud of is the fuzzy person lookup, where I could type an incomplete or even slightly inaccurate spelling of a person's name, and a fuzzy string matching system would find all the possibilities, alert me if there was more than one and what they were, and complete my command if only one was found.

```python
def find(self, customer_student, name):
	# ... set up ...

	import difflib
	match = lambda sname, name: (sname == name) or (name in sname) or (difflib.SequenceMatcher(None, sname, name).ratio() >= .75)
	exact = [item for item in array if item.name.lower() == name.lower()]
	possibles = [item for item in array if match(item.name.lower(), name.lower())]

	if len(exact) == 1:
		return exact[0]
	elif len(exact) > 1:
		return "There are multiple people that exactly match that query."

	return "Couldn't be found." if len(possibles) == 0 else (possibles[0] if len(possibles) == 1 else [item.name for item in possibles])
```

From a design standpoint, I also very much liked my idea to output certain types of important data to spreadsheets. I found this very handy, since I could leverage the power of existing spreadsheet software to save myself further coding, and it broke my management workload up into more understandable blocks.

I eventually stopped using this system when I discovered Meteor and [used it to build my studio website](/meteor-piano-website). Meteor made it easy to build web forms to handle all of these management tasks, although not as easy as it would become once `aldeed-autoform` was introduced. In order to migrate my records over to the website, I wrote `website_transfer.py`. It leveraged the [meteorUFO](https://github.com/DrPaulBrewer/meteorUFO) package as a python interface between the Meteor mongo database. Since I was using [shelve](https://docs.python.org/2/library/shelve.html) as my database (it's lightweight, object based, requires no installation, and is interfaced directly in python, which was appropriate for this project) I felt this was necessary. I wasn't sure if there was a javascript based way of interfacing with shelve, so I instead found a python system for interfacing with Meteor. This might have been unnecessary, but it worked.

`messenger.py` is a script I wrote to send automatic emails. It used gmail's freely offered `smtp` server along with my email credentials to send messages. I was planning on folding this into my management script to send automated reminders to my students, but that was unnecessary once I switched to the Meteor site.

The input loop portion would likely have been easier to write with the help of an argument parsing library like [argparse](https://docs.python.org/2/library/argparse.html). This was early enough in my development as a programmer that I hadn't quite fully understood the principle of always searching diligently for existing solutions before charging forward with your own! And to a certain extent I wanted to hone my skills, and doing that myself wasn't so bad.