**_1. What is the difference between Component and PureComponent? give an example where it might break my app._**

The main difference between these 2 interfaces is state management. On `Component` you can add state, while `PureComponent` aims to deliver a stateless component, with some extra benefits, such as prop comparison to determine justifiable re-renders. A `PureComponent` won't re-render even though a stateful parent component is changing its value.

About an app breaking because of this, as far as my knowledge goes (without googling :)) is managing state from inside a `PureComponent`.

**_2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?_**

No idea on this one, but I've heard horror stories from the "old" Context API about re-rendering the entire component tree, from a render trigger from anywhere in the hierarchy. Tying these 2 ideas together, the only danger I can think of is performance downgrade on checking if `ShouldComponentUpdate` depending on context changing and the entire component tree re-rendering.

**_3. Describe 3 ways to pass information from a component to its PARENT._**

If I'm understanding this question correctly, we're talking about passing data from a child to its parent. And, if that's the case, some ways would be:

- Passing a callback function with a param that would eventually take an argument on a child.
- Prop drilling
- I'll need more time to think about a third option.

**_4. Give 2 ways to prevent components from re-rendering._**

- Using the all mighty `useEffect`, since this function seems to be the main observer of components existing in the DOM. Using the dependency array we can control how, or when, a component re-renders.
- `React.memo()` offers another way to prevent re-rendering. This can return a cached component when the inputs are the same at any time.

**_5. What is a fragment and why do we need it? Give an example where it might break my app._**

Fragments are void HTML tags that help with enclosing JSX elements to satisfy the _React_ condition of components having only one parent. They don't offer any "weight" to HTML. You could break an app by passing attributes to a fragment, like `className`. React will hate it.

**_6. Give 3 examples of the HOC pattern._**

1. To wrap a presentational component with fetched data. Let's say you have a HOC that fetches users and you want to use different components with the same user list. You can build something like `<WithUsers />`.

2. To share state logic between components. A good use could be input/form state management. You can build a HOC `<WithFormData />` to speed up form creating.

3. Whenever you feel like you want to compose different components by applying a closure pattern. You can mix and match different HOCs to compose or build, new and complex components.

**_7. what's the difference in handling exceptions in promises, callbacks, and async...await._**

I would say syntax. Handling exceptions in promises can be caught with a `.catch` method, while async/await works better with a try/catch block.

**_8. How many arguments does setState take and why is it async._**

It's async due to performance. React will execute all setStates asynchronously to avoid a batch of setStates in the application. `setState` takes 2 arguments, the state we're trying to update, and a callback function that gets called immediately after re-rendering.

**_9. List the steps needed to migrate a Class to Function Component._**

- Remove the class declaration and create a function. Can be arrow, declared, etc.
- Create as many hooks as needed, according to the state object. Remove the constructor and place your new hooks.
- Convert class methods into functions.
- Remove any of the life cycle methods, if any.
- Refactor life cycle methods through the appropriate use of `useEffect` and its dependencies.
- Remove the render method, and make sure the component only `returns` a JSX block.

**_10. List a few ways styles can be used with components._**

- CSS classes
- Inline styles
- CSS in JS libraries like Styled component
- CSS Modules
- Tailwind

**_11. How to render an HTML string coming from the server._**

Not a fan of this, but we could use `dangerouslySetInnerHTML`. Otherwise, I would advise for a npm package that deals with this :)
