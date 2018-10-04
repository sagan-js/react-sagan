import React from 'react'
import TestRenderer from 'react-test-renderer';
import { Store, extendModel } from 'sagan'
import { withStore, Provider } from '../src'

let spy
afterEach(() => {
  spy.mockClear()
})

describe('Provider', () => {

    it('It subcribes to store change event and triggers update callback', () => {
        const test = 'test'

        expect(test).toEqual('test')

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

        spy = jest.spyOn(Provider.prototype, 'forceUpdate')
        const wrapper = TestRenderer.create(<App />)

        store.dispatch({type: 'user:update', payload: {firstName: 'Sagan'}})

        expect(spy).toHaveBeenCalled()

    })
})