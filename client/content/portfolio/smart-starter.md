---
title: "Smart Starter: A Tool for Safe Sane Crowdfunding Budgets"
thesis: "A small side project I did in response to the difficulty of putting together a crowdfunding budget that won't end up screwing the creators."
project: portfolio
date: 11/18/2015
repo: https://github.com/blainehansen/smartstarter
demo: http://smartstarter.blainehansen.co
tags:
- meteor
- javascript
- product-design
- systems-design
- crowdfunding
---

This project's goal was to create a crowdfunding budget creation tool with a couple of important characteristics:

* It would be flexible enough to accommodate any kind of campaign with any kinds of rewards.
* It would create budgets that were safe and profitable in *all* success cases. No matter how many of any individual reward was promised, the creators would be able to pay for and fulfill everything.
* It would "pre-consider" a couple of important things like cushion and fees.
* It didn't ask creators to make any assumptions about how their campaign would go. It's unwise to try and predict how many backers you'll receive, since a good fundraising strategy tries to make the campaign go viral. Only production and fulfillment costs should be asked for, and everything else should work from there.

I did this mostly just for fun. I am very interested in Kickstarter, I've backed a couple of projects and I like reading about people's experience with crowdfunding. It seems that whenever people make budgets they aren't very good at considering wild edge cases, especially runaway success. And when I looked for a budget tool, they were always either lame excel spreadsheets or asked you to make assumptions about how many backers you were going to get.


### The Code

I built this app entirely in Meteor, over the course of a couple of weeks in my spare time. This was my first time extensively using the `aldeed:simple-schema` package and the other related packages after discovering them, and it made this whole project much easier. Also the `reactive-var` package had just been introduced, and `Template.instance()` support had just been added, so it was much easier to create a state holding template to make lightweight interface elements like an "open/closed" editable box:

```js
Template.clickToEdit.created = function () {
	this._editing = new ReactiveVar(false);
};

Template.clickToEdit.events({
	'click .open-area': function (e, t) {
		t._editing.set(true);
	},
	'click .close-area': function (e, t) {
		t._editing.set(false);
	},
	// ... other events ...
});

Template.clickToEdit.helpers({
	editing: function () {
		return Template.instance()._editing.get();
	}
});
```
```html
<template name="clickToEdit">
	{{|#if editing}}
		<!-- the content blocks need real data,
		so if this element has been passed arguments,
		we need to get the next level's context -->
		{{|#if contextId}}
			{{|> UI.contentBlock ..}}
		{{|else}}
			{{|> UI.contentBlock}}
		{{|/if}}
	{{|else}}
		{{|#if contextId}}
			{{|> UI.elseBlock ..}}
		{{|else}}
			{{|> UI.elseBlock}}
		{{|/if}}
	{{|/if}}
</template>
```

This element could be closed with <kbd>esc</kbd>, or submitted and closed simultaneously with <kbd>enter</kbd>, and would stay open in the event of a submission error:

```js
'keyup': function (e, t) {
	if (e.which == 27) {
		t._editing.set(false);
		e.stopPropagation()
	}
	else if (e.which == 13) {
		$(e.target).submit();
		e.stopPropagation()
	}
},
'submit form': function (e, t) {
	e.stopPropagation();
	// contextCollection and contextSchema are used to query the collection2 package, and see if an error occurred.
	if (!t.data.keepOpenOnSubmit && (t.data.contextSchema || t.data.contextCollection)) {
		var schema = window[t.data.contextSchema] || window[t.data.contextCollection]._c2._simpleSchema;
		var schemaContext = schema.namedContext(t.data.contextId);
		if (schemaContext.isValid())
			t._editing.set(false);
	}
	else if(!t.data.keepOpenOnSubmit) {
		t._editing.set(false);
	}
	else {
		t.find('.first-input').focus();
	}
}
```

This project was my first time using Jade extensively through the `mquandalle:jade` package, and I loved it. Jade is a much cleaner and more readable markup syntax. The only problem I had with it was in embedding conditional attributes in html:

```html
<div class="form-group{{|#if afFieldIsInvalid name=name}} has-error{{|/if}}">
```

The above doesn't work when translated to Jade syntax.

```jade
//- This simply outputs as a div with ".has-error" as content.
.form-group{{|#if afFieldIsInvalid name=name}}.has-error{{|/if}}
//- This would work, but would require more js, so whatever, I just did this sort of thing with html.
.form-group($dyn = attrs)
//- It all compiles to Meteor templates anyway, so it wasn't a big deal to have html and jade in the same project.
```

### Bulletproof Budgets

The obvious truth of deciding how to price a product you're selling is to first determine how much it costs to make it, since that's the bare minimum you have to sell it for. When the cost to make something is a large upfront lump sum that pays for many copies, you simply divide that lump sum by the product count. Simple.

Here's the catch with crowdfunding though. When someone pledges, their money is all thrown into the same pot with everyone else's money. No matter what they pledged for, all the money goes in the same place, and all of the rewards for all of the backers have to be paid for from that pot. If a pledge contributes 0.5% of the total budget, then it also needs to contribute at least 0.5% of the upfront costs.

Let's consider a hypothetical project run by a naive creator, let's say an indie rock band. And for simplicity we'll say this project is happening in a universe where shipping costs don't exist. They want to record an album, and their rewards will be copies of the CD and t-shirts. The costs to record the album are $300 for recording space, $200 for mixing and mastering, $400 for the duplication of 1000 CDs (they're going to sell these afterwards, which is half the point of crowdfunding), and $100 for album art and liner notes, coming to a total of $1000. They're going to make 1000 CDs, and so the math means those CDs are $1 each to produce. Great. Then the t-shirts can be made for $10 each through a web company. Great. I made up all of these numbers, but they should serve to illustrate my point.

Now say the band decides to charge $15 for each of those rewards. That's a good profit on both, especially the CD. They have a $15 tier for the CD by itself, another $15 tier for the t-shirt by itself, and a $30 tier for both together. They'll make their goal $1500, $1000 plus a large 50% cushion. Is this a safe budget?

The band assumes it is. They're probably assuming a pledge breakdown kind of like this:

```
T-shirts, $15: 10 backers, $150 or 10% of funds raised.
$10 * 10 shirts = $100

CDs, $15: 80 backers, $1200 or 80% of funds raised.
$300 + $200 + $100 + $400 = $1000
80 CDs removed from the 1000, 920 remaining.

Both, $30: 5 backers, $150 or 10% of funds raised.
5 CDs removed from the 920, 915 remaining.
$5 * 10 shirts = $50
```

This hypothetical campaign is great! They spend $1150, have 915 CDs left to sell, and after Kickstarter and card fees they have $200 laying around as pure profit.

But it completely relies on assumptions. And guess what happens when you assume.

The campaign goes live, but the breakdown of their pledges is surprising: 

```
T-shirts, $15: 80 backers, $1200 or 80% of funds raised.
$80 * 10 = $800

CDs, $15: 10 backers, $150 or 10% of funds raised.
$300 + $200 + $100 + $400 = $1000
10 CDs removed from the 1000, 990 remaining

Both, $30: 5 backers, $150 or 10% of funds raised.
5 CDs removed from the 990, 985 remaining
$5 * 10 = $50
```

The total required to make and fulfill rewards: $1850, with 985 CDs left.
Oh and don't forget, 10% is sliced right off the top by Kickstarter and card fees, so you only have $1350 to actually work with, leaving $500 (or 33% of the original goal) coming out of the band's pocket.

So perhaps as damage control they decide to make less CDs. Okay, but they still have to do the fixed costs, `$300 + $200 + $100 = $600`. They could decrease the $400 for duplication, but they'll get less CDs and the whole point was to have CDs left over to sell. Oh well. They decide to decrease to $200 and get 350 CDs (economics of scale are less on their side now), but the damage is still $800 and they're still $200 over budget.

Maybe, *maybe* those remaining CDs could defray that cost, but the whole reason this band is going to crowdfunding is because they don't have money laying around up front, and they aren't positive they can sell that many CDs. Crowdfunding is about managing the risk of making something by pushing the compensation for making it to the beginning of the process instead of the end of the process. And the thing that screwed them was the t-shirts, and it's all because of upfront to per item ratios.

Every time someone pledges to the project, their pledge has to pay for *everything*. It's going in to the same pot with everything else, and it has to contribute to the creation of every other reward. You can't price things just according to that thing's cost, you have to consider the entire project.

Obviously this can get a lot more complicated when you have large projects with lots of rewards and huge goals. That's why I made smartstarter. It's just not safe to make assumptions about your reward breakdowns. Smartstarter only asks for the things you can actually know beforehand, the costs.

This is probably a big reason behind the implication Kickstarter's always made that reward tiers should be cumulative. If you just lump the products together progressively with each reward tier, you mostly handle this complexity on accident because the unprofitable products are maybe lumped together with profitable ones. But that isn't always what creators want to do, and figuring out everything this way beforehand makes it so you can combine the products any way you want.

This leads to the fundamental realization of bulletproof budgets: each pledge coming in has two parts, the part that contributes to the upfront costs of the all of the rewards across the entire project, and the part that covers just that individual product.


### The Design

This whole strategy is product focused. Different products can be added and modified, each with these attributes:

* Description, whatever.
* Minimum Count, the smallest number you plan to produce of something. You may produce more if the project calls for it. If you put nothing for this, that means your upfront work could produce an infinite amount of this thing. Digital rewards like video games work this way.
* Minimum Charge, isn't editable, it's the threshold below which this product will actually lose you money. The Minimum Count is basically the cost per item if you take the upfront costs into account. The main purpose of this is to ensure that you don't run out of a product.
* Decided Charge, how much you've currently decided to charge.

and these costs:

* Fixed Costs, things that you'll spend the same amount on no matter what happens. This is mostly upfront creator work, or things that could produce infinite copies from one process. Record mastering, cover art, things like that.
* Scaling Costs, you'll pay less if you make more. Anything that's manufactured will likely work this way. The first price is what you'll pay to make the Minimum Count, and you can add further price breaks if you want. Right now these aren't used in any way, the plan was to use them for projecting runaway success conditions, but that isn't implemented.
* Per Item Costs, amounts you'll pay per item regardless of what happens. Shipping is a good obvious example, but many things would work this way.

Any type of project can be accounted for with these costs. Even projects that aren't producing physical goods, like software or a stage performance, can purely use fixed costs.

So how does the calculation work?

The most important thing in the budget is the product with the worst per item to upfront ratio. Let's use our indie band example from earlier. Their CDs technically had no per item portion at all, so all of the $15 charge contributed to the project's upfront costs. But the t-shirts... their $15 charge was mostly burned away by the $10 per item cost, so there's a 2:1 per item to upfront ratio. This ratio must be applied to the entire project to account for the situation where t-shirts provide the bulk of the income. In that example, this would require that for every dollar in upfront costs (the $1000 for making the album), there were two dollars ready to be burned away in t-shirt fulfillment. That makes a $3000 goal.

As you can see, the decided charge is an important crux of this whole thing, since changing it changes the ratios. If you charged more for the t-shirts, the upfront contribution would be greater, making the ratio less severe and *decreasing* the total project goal. If you charge $30 for the shirts, then the ratio is reversed to 1:2, meaning that the base goal would only have to be $1500. Ensuring that these types of products properly contribute is important to keeping the project goal down.

So what if the reward breakdown ends up being more ideal and those poorly contributing rewards are less common? Well then great! That extra ratio money is yours to keep or sweeten the rewards with. The important thing is that you're prepared for the worst case scenario.

The total budget of a project has to account for:

* All of the fixed and scaling costs upfront. This is easy since all you have to do is add them all up.
* All the per item costs for all rewards. This is handled with all the ratio stuff I just discussed.
* Any cuts off the top. Kickstarter fees and card processing are the first examples, but some creators use a fulfillment service that takes a percentage off the top, etc. Algebra does this work, but you can't just add the percentage on the top, since a *cut* works differently than that.
* Any "padding" or breathing room the creators might want to throw in, just in case. Here you just add the percentage on the top.

Here it is more concretely:

```python
# Reward Scope
worstCaseCount = minimumCount
worstCaseScalingCosts = [min(cost) for cost in scalingCosts]
upfrontPerItemCost = (sum(fixedCosts) + sum(worstCaseScalingCosts)) / worstCaseCount
minimumCharge = upfrontPerItemCost + perItemCost
ratio = decidedCharge / (decidedCharge - perItemCost)

# Budget Scope
worstCaseRatio = ratio of product with largest per item portion
baselineGoal = sum(fixedCosts) + sum(scalingCosts)
minimumGoal = baselineGoal * (1 + worstCaseRatio)
finalGoal = (minimumGoal * (1 + totalPad)) / (1 - totalCut)
```


### Going Further?

I considered for a time making this into a small side business. The app would be a freemium service, where the basic budget calculations would be free (basically what you see on the current page). People would have accounts, and could maybe do two or three budgets for free. But then, more involved reports giving potential breakdowns of backer distributions, different tiers of success, and comparative versions of the same project would be available for a flat fee. I was also planning on adding a "creator work hours" value to each cost, so that creators could get a handle on exactly how many hours they would be committing under certain success conditions.

After mulling this over for a period, I decided I had better things to do haha. So I stripped the app of it's project level model and server-side collections, making everything a `null` collection that would be restarted on every refresh. Since it was only really a fun side project, I didn't want it consuming unnecessary resources. Then I put the app on a subdomain of my blog. Someone could find it useful right? Might as well not let the work I did go to waste.

In terms of design improvements that could be made, the biggest problem with this site is that the internal logic isn't immediately obvious to newcomers. The current design is very fast to navigate for someone who already understands its meaning. I was very intentionally designing for ease of use rather than a beginner's understanding, since this is a tool that someone could have ended up putting a lot of information into, and I wanted to eliminate all tedium and clutter possible. The next step for this site is to make it easier for newcomers to understand, and in order to do that I would do the following:

* Include help pop-overs that explain the parts of the interface. This would be an unobtrusive way to help people who already sort of get it, and also a reminder system for the experienced. Providing a switch that would globally turn these off and on would give experienced users one less thing cluttering their interface.
* Include an explanation page. The most effective thing would be something like an infographic explaining the relationships between everything, but since I'm no Illustrator professional text might have to be good enough.
* Include an optional walk-through, where the user would be prompted to create an example budget one attribute at a time, with explanations accompanying everything.

Maybe I'll do these someday. Let me know if you have any thoughts or suggestions!