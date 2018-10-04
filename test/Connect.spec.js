import Connect from '../src/components/Connect'
import { Store, extendModel } from 'sagan'

let User
let userInstance
let store
let props
let mapStateToProps
beforeEach(() => {
    User = extendModel({
        props: {
            firstName: {
                type: 'string',
                required: true
            },
            lastName: 'string'
        }
    })

    userInstance = new User({
        firstName: 'Trooper',
        lastName: 'TK-421'
    })

    store = new Store({
        models: {
            user: userInstance
        }
    })

    mapStateToProps = (state) => {
        return {
            firstName: state.user.firstName
        }
    }

    props = {
        componentProps: {test: 'test'},
        store: store.getState(),
        mapStateToProps,
        dispatch: store.dispatch
    }
  
})

describe('Connect', () => {

    it('Rerenders Connected component tree only when there is a prop change', () => {
        
        const Instance = new Connect(props)

        const shouldUpdate = Instance.shouldComponentUpdate({store: {user: {firstName: 'Sagan'}}})
        expect(shouldUpdate).toBe(true)

    })

    it('Maps state to props object', () => {

        const props = {
            componentProps: {test: 'test'},
            store: store.getState(),
            mapStateToProps,
            dispatch: store.dispatch
        }

        const instance = new Connect(props)
        expect(instance.mappedProps).toEqual({firstName: 'Trooper'})

    })
})