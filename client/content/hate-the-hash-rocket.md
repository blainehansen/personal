---
title: "Sorry Ruby, You Tried to Fix the Awful Hash Rocket, and You Failed"
thesis: "Some people are upset with the option to use colons in 1.9 Ruby hashes. I say they DIDN'T GO FAR ENOUGH."
date: 11/11/2015
tags:
- technology
- programming
- rants
- designing-the-world
---

So I'm digging deeper into Ruby, and learning all about the colon vs hash rocket divide that started with `1.9`, and the hand wringing and arguing and confusion that surrounds it.

[This guy unabashedly like the hash rockets](http://michaelxavier.net/posts/2011-07-01-I-Dont-Understand-The-New-Ruby-Hash-Syntax.html), and bashes colons as "JSON pandering". 

[This reddit page](https://www.reddit.com/r/ruby/comments/1hj641/since_187_is_retiring_will_you_continue_using/) features people arguing about it (as is the reddit way), some bemoaning the change, others excited.

[This gentleman](http://www.itm-labs.de/blog/transforming-rubys-hashrocket/) has come up with a helper regex to transform only symbol key hashes into the new colon syntax.

Overall it seems people are mostly just trying to figure out exactly what they'll do, both in their own coding, and when working with others. It's created compatibility problems.

But you wanna know the *real* problem with the new syntax? It forgets that **hash rockets suck**.


### I hate hash rockets.

They're awful. I never ever want to use them. Ever. **_EVER_**. They're impossible to type fluidly, they take up more space, they're ugly, and they add no needed contextual value whatsoever. For years I've literally avoided doing projects in Ruby in favor of Python, *and the hash rocket is the single reason why*. That's how annoying I find it. (well I'm lying list comprehensions are pretty cool too.... but whatever you get the point)

When I think through why such an awful awful typing convention was allowed to exist *at all*, two reasons jump to mind: 

**Reason #1.** It does convey a "pointy pointer points at this thingy" relationship. But guess what, we're programmers goddamnit. We're used to the stuff we type basically being nonsense, and since variable assignments and xml tag structure and every other language's hash syntax all have a left to right association, we don't need a goddamn little pointy pointing arrow to point from thing to thing. Not anymore anyway. Thoughts like this...

> Being a loosely-typed programming language, Ruby allows you to use whatever you want as keys, and keys within a hash can even be heterogenous. The advantage of the good old hash rocket syntax is that it communicates this concept precicely.

make me tremble with rage. Communicates that concept precisely? What exactly about this syntax:

```ruby
{:thing: 1, :other: 2}
```

conveys association less clearly than this?

```ruby
{:thing => 1, :other => 2}
```

To a programmer, who's already got tons of weird symbolic abstractions in their head, and who lives in the *goddamn web age*, the answer is absolutely nothing. The *comma* is the thing that conveys association, since it separates the groups from one another, and that's just fine.

**Reason #2.** It allows for whitespace independence, because this:

```ruby
{:thing=>:stuff,:other=>:dude}
```

is unambiguous, whereas this:

```ruby
{:thing::stuff,:other::dude}
```

overlaps with the `::` module interface syntax. But this is only a problem for certain people, and you know who they are? *People who can't be bothered to type a single freaking space.*

**Oh no!! I have to use whitespace to make my code unambiguous???!!?? Woe is me! What a hassle!**

Yeah, sometimes you have to do that. You should be used to doing that already. A space is a cheap character to type. It's not so bad I promise. Even my syntax highlighter hates you and your whitespace aversion, because it won't even interpret that correctly.

You want to know what's a *really* big hassle? Typing a freaking hash rocket, which requires two motions with weaker fingers, both out of default hand position, on the opposite sides of the keyboard, one of which requires a shift while the other one doesn't. *That's* a hassle.


### And it's not JSON pandering I promise.

It's definitely true that Javascript and JSON and Python are the inspiration for this change. But not because those pesky Ruby rookies are taking over, like [Michael Xavier seems to think](http://michaelxavier.net/posts/2011-07-01-I-Dont-Understand-The-New-Ruby-Hash-Syntax.html).

> **But Its Like JSON**
>
> It bums me out when I hear this argument. JSON is a fantastic data serialization format. [...] JSON is simple, compact and elegant. That being said, Ruby is not Rails. Ruby is a general-purpose programming language. It is not a DSL for processing JSON. Ruby is used for a lot more than web applications. I don’t understand the premise behind this argument when I hear it.
>
> If the premise of this argument is that designers and people coming from a JavaScript background can jump into Ruby with greater ease, then it is an extremely weak one.

Javascript and JSON syntax inspired this change *because Javascript and JSON syntax is shorter and more readable and faster to type.* You said it yourself: "JSON is simple, compact and elegant." It isn't because of pandering. It's just a better convention.


### Alright then, we're getting rid of them!!! Almost....

At first glance it seems like `1.9` finally made hash rockets [a thing of the past](http://web.archive.org/web/20130909062027/http://peepcode.com/blog/2011/rip-ruby-hash-rocket-syntax), but....... they're not. We basically have a **<scare-chord>zombie hash rocket problem</scare-chord>**

It seems clear to me that the Ruby designers realized at least at some level that the hash rocket is awkward. That's why they decided to implement this new colon syntax. [But why only allow it when symbols are the keys?](http://stackoverflow.com/questions/8675206/is-there-any-difference-between-the-key-value-and-key-value-hash-no) Why stop halfway like that? All it does it confuse people, compel them to comingle different hash syntaxes, and rob them of the choice to use whatever they're most comfortable with. And it causes compatibility issues. I may hate the hash rocket, but I'm sure lifelong Rubyists are really attached to it, and can type it really quickly. Give both camps what they want.


### Here's the fix.

Just do the simplest thing. *Allow colons as a one-to-one replacement for hash rockets.* Want to use a symbol as a key? Use either an explicit symbol *or* a bareword. Why not allow both? People can choose to be explicit about it or not. Ahhhh the power of *choice*.

```ruby
# These should be exactly equivalent.
{:symbol: 1, :other: 2, :thing: 3}
{:symbol : 1, :other : 2, :thing : 3}
{symbol: 1, other: 2, thing: 3}
{symbol : 1, other : 2, thing : 3}
```

Or maybe the values are symbols? Or both key and value are? Use barewords! Use explicit symbols! Just make sure it's unambiguous!

```ruby
# These should be exactly equivalent.
{:symbol: :goes, :other: :dude, :thing: :is}
{symbol: :goes, other: :dude, thing: :is}
{symbol: goes, other: dude, thing: is}
```

Or maybe you want to use a whateverthefuck as a key? And you also hate the godawful hash rocket? Go for it!

```ruby
# These should be exactly equivalent.
{'string': 1, [1, 2, 3]: 2, "Dude!!!!!": 3}
{'string' => 1, [1, 2, 3] => 2, "Dude!!!!!" => 3}
```

This only requires two language rules to change:
* Barewords are interpreted as symbols in hashes, always, regardless of whether a colon or a hash rocket is used. (my guess is this will become the preferred convention for *everybody*) Oh and if you want to use create a hash [where variables expand into keys](http://stackoverflow.com/questions/21440745/creating-a-hash-key-from-a-variable-in-ruby), just use brackets like a normal person. That's what they're there for.
* Colons and hash rockets are equivalent in hashes, as long as colons are unambiguously spaced.

And maybe, just maybe, if "kissing symbols" are too yucky for the Ruby community to ever tolerate:

```ruby
{:symbol: :goes, :other: :dude, :thing: :is}
```

just insist on barewords when using the colon syntax. That wouldn't be so bad.


### Done.

Is this not obvious to everyone? Syntactic sugar is okay right? The new syntax is a *form* of syntactic sugar, but like a shitty half-assed version. Just go all the way. Yes people will sometimes have to use whitespace to make things unambiguous in the colon version, but that's a small price to pay. This won't break the old hash rocket code, and everyone's happy.

One of the most important considerations when designing a programming language is making it easy to quickly and fluidly type. Hash rockets are unbearably slow and awkward to type when compared to the wonderful colon. Let me leave them behind!!!

Have I missed anything? HMU lol <3