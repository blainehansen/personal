---
ignore: true
---

The biggest oversight in the entire sass definition is [mixin variable scopes](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variable_scope_and_content_blocks):

> The block of content passed to a mixin are evaluated in the scope where the block is defined, not in the scope of the mixin. This means that variables local to the mixin cannot be used within the passed style block and variables will resolve to the global value:

Wait, even when Ruby (the compiler language for sass) has [block arguments with their own parameters?](http://www.tutorialspoint.com/ruby/ruby_blocks.htm)

Why exactly wasn't this type of syntax carried over into sass? It's incredibly powerful, and would allow much DRYer sass. It wouldn't be complicated to specify either. Instead of this:

```
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}
```

we could imitate the Ruby `yield arg` and `|arg|` syntax:

```
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content($color); // equivalent of the yield command
  border-color: $color;
}
.colors {
  @include colors {|$color| // equivalent of the |arg| list
  	color: $color;
  }
}
```

Including the `|$arg|` syntax allows us to unambiguously list all of the parameters that should be resolved at block scope rather than definition scope. Even when argument names overlap (like they do with `$color` in the above example) the `|$arg|` list would take precedence.

Doing it this way would allow the very flexible ability to have both definition scope variables and block scope variables intermixed, giving the programmer a lot of control that they have to specifically opt into with the `|$arg|` convention. The default would remain as it currently is.

It would only add a touch of complexity, in that mixins using this would have to include in their documentation what variables were passed to the internal `@content()` command. But we're used to this. In javascript (something just about every regular sass developer is almost certainly familiar with), callback functions frequently have their own parameter lists or options objects, and those have to be specified alongside the function definition.

This would get especially useful when you're trying to write a mixin like this:

```
@mixin apply-color-classes($color-map, $hover-darken, $prefix, $attribute) {
	@each $class, $color in $color-map {
		.#{$prefix}#{$class} {
			$attribute: $color;
			&:hover {
				$attribute: darken($color, $hover-darken);
			}
		}
	}
}
```

I wrote this mixin to allow me to define a map relating classes to colors and then quickly distribute them into useful selectors.

The only problem is that I'm limited to whatever blocks I can predict. I'd prefer to do this:

```
@mixin distribute-value($map, $prefix) {
	@each $class, $value in map {
		.#{$prefix}#{$class} {
			@content($value);
		}
	}
}
$map: ('primary': blue , 'warning': yellow, 'danger': red);
@include distribute-value($map, $prefix: 'text-') { |$color|
	color: $color;
	&:hover {
		color: darken($color, %15);
	}
}
```

I'm sure this would prove really useful right? I certainly want it right now.