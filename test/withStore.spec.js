import React from 'react'
import TestRenderer from 'react-test-renderer';
import { Store, extendModel } from 'sagan'
import { withStore, Provider } from '../src'


describe('withStore', () => {
    it('It passes store props to wrapped component', () => {

        const User = extendModel({
            props: {
                firstName: {
                    type: 'string',
                    required: true
                },
                lastName: 'string'
            }
        })

        const userInstance = new User({
            firstName: 'Trooper',
            lastName: 'TK-421'
        })

        const store = new Store({
            models: {
                user: userInstance
            }
        })

        const mapStateToProps = (state) => {
            return {
                firstName: state.user.firstName,
                lastName: state.user.lastName
            }
        }

        const TestComponent = (props) => {
            return (
                <div {...props} />
            )
        };

        const WrappedComponent = withStore(mapStateToProps)(TestComponent)

        const App = () => {
            return (
                <Provider store={store}>
                    <WrappedComponent />
                </Provider>
            )
        }

        const wrapper = TestRenderer.create(<App />)

        expect(wrapper.toJSON().props).toEqual(expect.objectContaining({
            firstName: 'Trooper',
            lastName: 'TK-421',
            dispatch: expect.any(Function)
        }))

        store.dispatch({type: 'user:update', payload: {firstName: 'Sagan'}})

        wrapper.update(<App />)

        expect(wrapper.toJSON().props).toEqual(expect.objectContaining({
            firstName: 'Sagan',
            lastName: 'TK-421',
            dispatch: expect.any(Function)
        }))
        
    })

})