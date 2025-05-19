These states use my library [Forestry](https://forestry-3-docs.vercel.app/api) to manage state. 

Forestry is a very simple concept: 

A series of classes that mange a value with synchronous changes. It is essentially a key-value manager bound with 
a centralised set of methods/actions for i/o and summary selectors.

Unlike Redux:

* forestry is easily testible and as a class instance conforms to most of the testability patterns that objects excel at.
* leans on RxJS as a proven engine for observability. 
* has sync and async actions
* concentrates action and value into a single instance that can be conventionally inspected. 
* is synchronous and does not rely on hook mechanics to circulate updates

## 30 seconds over Forestry

Forestry collections manage values; there are several general purpose Collections that don't put ANY assumptions on
the shape of the data, ObjectgCollection presumes POJO form to the root data allowing for easy shorthand methods 
like `set(key, value)` and `get(key)`. 

### The Constructor

making an ObjectCollection takes this form:

```javascript

const instance = new ObjectColletction(name, {
  initialValue: POJO,
  validator(value): false | error // (optional),
}, {actions}
)

```
the instance has these props:

* `acts` --- the actions that are the third parameter
* `set(k, v)`, `get(k)`, `mutate((value) => value)`
* `value` -- the current value. 
* `subscribe` -- a striaght up RxJS observer hook to listen to values; returns a Subscription
### Action

There us a huge amount of freedom to the actions
- they can be sync or async
- they can return a value or not
- they can call external resources (fetch, session, etc.)

the fact that they are bound means they can be injected straight into dom event hooks, bonus. 

This is _all you need to know_ to use Forestry; there is not a lot of conventions, everything is in the same file, and
there is no ritual, table of actions, and you have _constant, accurate real time access_ to the state's value (`.value`)
at any point in time. 

## Implementation

Forestry here is used both in _local_ and _global_ contexts;

* catState, levelState and questState are _transient local state_(s) that can be employed any number of times. 
* globalState is a _singleton_ that is only created once (in the client; in tests it can be made any number of times).

Global state persists and loads to sessionState (when available). All the other states have factory functions that
allow you to inject data-fetching functions (and default to windows fetch, wrapped, when none is provided, and when possible). 

Local states read from global states to persist user choices, which in turn writes to session in real time. So basically
global state acts as a gateway to session state at run time.

# TMI

There is a lot more going on under the hood; for example

* the optional `validator` kicks in after every `set` and `get` and every user action
* Actions are transactionally locked; uncaught errors reset the last good state before the error generating / invalid 
  value-generating activity.
* Every change is kept in a persistent _journal_ allowing for deep inspection of the history of the state. (there is some 
  trimming of history to prevent memory overuse but its tunable ) If you hit a particularly confusing state problem
  you can easily review every data changing action in the "branch" list of the state to identify precisely where things
  went off the rails, including the parameters that are passed into mutators.
* As an observable implementor, its fully interoperable with RxJS; for instance you can observe changes on a _subset_
  of a state to reduce noop processing of changes to unrelated parts of the state.

All of these added value features are there when you need them but can easily be ignored. 

## Why Forestry?

This last point has proven one of the most useful feature over time; the ability to change state and _immediately_
be able to inspect the current state or use selector functions based on its current value is so much more convenient
than using React as a circulation system. 

Over the years scores of state systems have come and gone in React; I find that one of the biggest anti-patterns is to
bind too tightly with the hook system; it makes everything asynchronous which is a pain; plus you _never really know_
what the value is or whether it is in flux, so you are forced to disincorporate your state management into a series of
microtransactions; breaking up code this way is what Saga did and thats why nobody uses it any more, despite the
fact that it was/is one of the most powerful incarnations of Redux patterns to date. 

the pattern of Forestry allows for conventional OOP patterns of updates; you can call actions and sub-actions, and bonus,
you even have transactional insulation and schema validation opportunities. Plus, even without any custom actions at all
you have useful built in modifier systems like set(k, v), get(k, v) and update((value) => value)); you could in fact
completely operate a forestry instance as a simple value registry and extrenalize all the actions as operators on the
instance, as in: 

````angular2html

const form = new ObjectCollection('login', {initial: {username: '', password: ''}}, {});

const sub = form.subscribe(setFormFields); // export the value to a useState mirror

// and in the view layer

<input value={formFields.username} name="username" onChange={(e) => {
form.set('username', e.target.value)
}} />

````

but honestly the ability to bundle data fetching, selectors and mutation actions in a single actions collection
is extremely powerful compared to separating all these activities into hooks makes the footprint of the important
actions extremely spread out.

### One ring to bind them all

I never liked the idea that you have one set of code patterns for local state and another for global state.
State is fundamentally the same regardless of scope: 

1. define the values under observation
2. define the methods of updating and fetching data
3. bind the values to the view layer 
4. connect events in the view layer to the states update actions

Having one set of syntax and code for local state and another for global (that is global to the client - remote network
based AI is necessarily unique and distinct) just makes your code fractured and difficult to maintain. While you can
bind Redux to hooks for local state I've never met a developer who can make this mental link because React developers
are so capitulated to the idea of riding a two-humped camel. 

### Breaking the firewall for testing

React developers have bought into the paradigm of binding state and view layers in a single architecture without realizing
this is exactly why testing react apps is such a pain. Everything in a React app's state system is buried in closure;
you cannot extract a hook based state from its implementation at test time.

Forestry instance on the other hand come out of factories an can be directly tested without any of the ponderous
(to run AND to write) view scaffolding that can take hours to perfect. 

I call this "transitive testing"; as valid as end to end and in place testing is you basically have two things to validate:

1. your state system reflects your business concern
2. Your view layer reacts properly to your state system
and a minor 
3. your interactive patterns (dropdowns, hide/show, etc) perform as desired. 

That is -- if you can test your business layer with the kind of tests that are _very easy to write_ then you can secure
and refine your application a lot faster and better than if you treat state as a black box and attempt to validate user
experience through the black box of React components. Why is this a bad thing?

* React Apps _constantly change_ their anatomy
* The effort it takes to synthesize outside input (apis, window interaction)  can take HOURS of effort to pull off
* When tests go bad, having to hack into the closured hook system or even identifying at which part of your federated
  state system is responsible for problems is extremely difficult. 

Testing a network of Forestry classes on the other hand requires almost no scaffolding and can easily be wired
and re-wired because the collections are not implemented around the view layers architecture in the first place. 

## The Kitchen Sync

Keeping Forestry sync is a requirement for transactional insulation; you can't really lock transactions in a distributed system
because that implies locking the system between the start and end of an async operation or tracking change in a very
exhausting set of mechanics. 

However you do need async methods to interact with outside processes that _are_ async (mostly network I/O). 

The compromise Forest makes with this paradox is this: Async methods are _not_ covered by "transactional locking insurance";
however all the tactical class methods like set/get/update _are_ bound by transactional locking, so the "syncy things" you call
inside an async functions (including your own sync actions) have the best possible protection for your system. Plus, after an 
await, you have direct accesss to the current state through `this.value` _even inside an async action_ so if things change
underfoot you have a chance to get a grip on them before you write or update data inside the arc of an async activity. 

that is if you think of an async action as an extended arc: 

1. Take in a set of "change drivers" as parameters (A.1)
2. Combine them with the current value of the state (A.2)
3. trigger a delayed action (read or write ) (B)
4. (optional) look at the state to see if something happened "while you were away" (C.0)
5. (optional) Call a sync write based on the result of step 3 (C.1)
6. (optional) return the upshot of all of these to the calling context (C.2)

If you consider 3 to be the "dividing line" between "now" and "then", and the fact that generally you only change state after that point,
steps 4-6 can be encapsulated in a sync "reaction" action that has full transactional insulation and _really that's all that matters_
if you are concerned about bulletproof data integrity. 