import React from 'react'
import { StoreContext } from '../withStore/store.context'

export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.unsubscribe = props.store.subscribe(this.handleChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange() {
        this.forceUpdate()
    }

    render() {

        const {
            store
        } = this.props

        return (
            <StoreContext.Provider value={{store: store.getState(), dispatch: store.dispatch.bind(store)}}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
  }