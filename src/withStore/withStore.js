import React from 'react'
import Connect from '../components/Connect'
import { StoreContext } from './store.context'

export function withStore(mapStateToProps) {
    return function(Component) {
        return function ProviderComponent(props) {
            return (
                <StoreContext.Consumer>
                    {({store, dispatch}) => {
                        return (
                            <Connect
                                componentProps={props}
                                store={store}
                                dispatch={dispatch}
                                mapStateToProps={mapStateToProps}
                                component={Component}
                            />
                        )
                    }}
                </StoreContext.Consumer>
            )
        }
    }
}