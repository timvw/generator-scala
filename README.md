## Scala Yeoman Generator

The aim of the project is to provide an easy way to scaffold scala projects outside an IDE such as IntelliJ or Eclipse.

## Getting started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-scala from npm, run:

```bash
npm install -g generator-scala
```

Finally, initiate the generator:

```bash
yo scala
```

In case you want to go fast, you can provide values for the requested parameters:

```bash
yo scala emptysbt foo 2.11.8
```


### Maintainer(s)
- [@timvw](https://github.com/timvw)
