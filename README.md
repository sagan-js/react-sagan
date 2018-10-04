# React Sagan
Official React bindings for Sagan

***This library is not necessary for using Sagan together with React Router. You can use the two together just fine.***


### Installation
React Sagan requires **React 16.0.0 or later**
```
npm install --save react-sagan
```

## API

#### `<Provider store>`
Makes the Sagan store availble to the `withStore()` calls. Normally, you can't use `withStore()` without wrapping a prant or ancestor component in `<Provider>`

#### Props
* `store` (Sagan Store): The single Sagan store in your application.
* `children` (ReactElement): The root of your component hierarchy.

#### Example

##### Vanilla React

```javascript
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
)
```

##### React Router

```javascript
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
```

#### `withStore([mapStateToProps], [mapDispatchToProps])`

`withStore` does not modify the component class passed to it. Instead, it returns a new, connected component class for you to use. `withStore` returns a HOC that wraps your passed component in a React `Provider/Consumer` context.

* [`mapStateToProps(state): stateProps`] (Function): If this argument is specified, the new component will subscribe to Sagan store updates. The results of `mapStateToProps` must be a plain object, which will be merged into the component’s props. The connected component's re-render is determined by a shallow equality comparison.

### Example

```javascript
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default witState(mapStateToProps)(TodoApp)
```

#### `dispatch(payload: object)`
Sagan's store dispatch method is mapped as a prop to any component connected via `withStore`. Dispatch sends action objects as per its API.

### Example

```javascript
this.props.dispatch({type: 'todos:update', payload: {firstName: 'Jane', lastName: 'Doe'}})
```