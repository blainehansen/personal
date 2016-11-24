---
title: "Devops Scripts"
thesis: "Various scripts to solve various freelancing problems."
project: portfolio
date: 11/17/2015
repo: https://github.com/blainehansen/dev-ops-scripts
tags:
- programming
- python
- mysql
- javascript
- unix
---

Since I began freelancing, I've written several scripts to handle backend operations and other random problems. None of these individually is very large, but they're demonstrable work so I thought I'd throw them in.


### `/compile-reverse-engineer`

One of my clients was using an ecommerce platform (I won't way which one in the interest of the client's privacy) that gave their customers the ability to edit their website templates in a dashboard. These templates could use "hooks" that basically functioned as include helpers, that would be compiled by the dashboard into the real website. For example, placing something like `%%Block_Banner%%` in a template would include the banner of the site. The only problem with this is that all changes were made to the live site, and the platform wouldn't allow it any other way. The client needed a staging server to allow safe development, rather than working on the live site. However, it wasn't possible to run a version of the site anywhere other than through the dashboard, since all of the site's templates included these "hooks" that were compiled by the dashboard in a way we had no access to. My advice to them was to simply get a better and more flexible ecommerce platform, but they liked some of the features and wanted me to make it work.

So, the `compile-reverse-engineer` directory has a series of scripts I was writing to try and "reverse engineer" this compilation process. The thinking was that if we scraped the entire live site using `wget`, we would have all of the results of the compilation, and all we'd have to do was compare the live site contents with our templates to determine what the hooks resolved to, allowing us to have a standalone version of the templates that would work on our staging server.

`refactor.py` is the actual script to do this work, while `regex_tester.py` and `bs4_tester.py` were smaller testing grounds for the two strategies I implemented to do this. Some of the `%%` hooks follow a very simple and literal "include" paradigm, simply substituting the contents of one template into another. Implementing this was easy, since all the script had to do was look up file names and stick the contents in the right place.

However, some of the `%%` hooks substituted bits of text or javacript, and what they resolved to wasn't available to us. To solve this, I first tried regexes. `regex_tester.py` illustrates how things work. The `content` variable represents our raw templates with the `%%` style hooks in them, and the `comparison` variable represents the scraped results. As you can see, the `%%` hooks have been replaced in `comparison` with random text, and the beginnings and ends have been padded with other random text. The script uses this regex:

```python
(?P<prev>.+?)(?P<hook>\%\%.+?\%\%)(?P<next>.+?)(?P<tail>\%\%|$)
```

to find each hook, along with the things preceding it (`prev`) and following it (`next`) up until the next hook begins. The `lenient` function takes a chunk of text and crunches the whitespace down to a uniform size and type so that it won't interfere with this process.

```python
def lenient(regex):
	regex = re.escape(regex)
	regex = re.sub('\\\\[\s+]', '\s+', regex)
	return regex
```

Then `prev` and `next` are used to search the comparison text, and find whatever has replaced the hook, and that is plugged back into the original template.

This test case works completely. Each hook is replaced in the template. However, when run on the real site text, I found that the compilation process had garbled the ordering of things like html attributes, so this method which is inherently based on text ordering simply didn't work. Since the huge number of comparison files is so large, it was impossible to know this without first implementing this incorrect solution.

The next version used the [beautiful soup html parser](http://www.crummy.com/software/BeautifulSoup/bs4/doc/). The thinking here was that rather than using text ordering and regexes, the names and attributes of the html tags could be used to identify and compare them. This solution was beginning to take shape when the client finally decided to move platforms. After that there was no reason to continue this reverse engineering work.


### `/mysql-management`

This folder contains two scripts meant to deal with a client's mysql database (among other things).

`email_reminder_script.py` queries the database to find all customers whose accounts are a certain time limit away from expiring, and sends them a reminder email. This is the sort of thing that should have been handled already by the platform they were using, but it wasn't so we had to improvise.

`migration_script.py` is a cli script that can be used to sync the databases and other directories of the production server, development server, and a local instance. I used the very handy [argparse package](https://docs.python.org/2/library/argparse.html) to handle the cli arguments, and various `subprocess` calls to `ssh`, `scp`, `rsync`, `tar`, and of course `mysql`, to do the actual work. The script uses the socket package to query the hostname and therefore be aware of what environment it's running on, cutting down on the number of arguments necessary to call it effectively.


### `csv_conversion.py`

In order for a client's paywall plugin to work, it needed a copy of a subset of each user's information copied into its own database. It provided a way to bulk import this data in `csv` format, but it needed certain columns of information. I exported the users table as a `csv`, and then used this script to simplify it to only the columns needed by the plugin. I expected this to be a trivial task, but discovered after coding the simple version that the `csv` file was poorly formatted, and had erroneous commas and newlines embedded within some of the attributes. It didn't take much more wrangling, but it transformed a trivial task into one I actually had to think about, since I had to reformat the file before actually processing it. These two lines did that task, and represent most of the actual analytical thinking in this 62 line script.

```python
contents = re.sub(r'^\S+[\n]', '', contents)
contents = re.sub(r'(?<=[^"])(\s*[\n]\s*)', ' ', contents)
```


### `link_resolver.py`

The purpose of this script is to find every `css` and `js` file linked to by a website and create a unique list in order to concatenate and minify them. This script goes through all the html files in a large directory of crawled pages, finds every `<link>` and `<script>` tag, and saves their `href` and `src` attributes. It then uses python sets and fuzzy string comparison to distill this list to a unique one. Other third party tools were then used to do everything else.


### `database-migration.js`

The [Meteor website I built for my piano studio](/meteor-piano-website) initially had embedded objects in its database records, for example a `User` record had an embedded array of `Payment` objects, among other things. I realized this wasn't the best way of doing things since it was too inflexible, so I wrote `database-migration.js` to decompose all the records into their own collections. The script currently has the "dangerous" modification lines commented out, since I ran this script several times in a "dry run" way to test it and ensure it wasn't going to cause problems in the database.