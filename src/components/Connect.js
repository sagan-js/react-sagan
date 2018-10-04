import React from 'react'

export default class Connect extends React.Component {

    constructor(props) {
        super(props)
        this.mapProps = this.mapProps.bind(this)
        this.mappedProps = this.mapProps(props.store)
    }

    shouldComponentUpdate(nextProps) {
        const mappedProps = this.mapProps(nextProps.store)
        const isEqual = this.areEqualShallow(this.mappedProps, mappedProps)

        if (!isEqual) {
            this.mappedProps = mappedProps
            return true
        }
        return false
    }

    mapProps(store) {
        if (this.props.mapStateToProps) {
            return this.props.mapStateToProps(store)
        }
        return null
    }

    areEqualShallow(a, b) {
        var key
        for (key in a) {
            if (a[key] !== b[key]) {
                return false
            }
        }
        return true
    }

    render() {


        const {
            componentProps,
            dispatch,
            component
        } = this.props

        const props = {
            ...componentProps,
            dispatch,
            ...this.mappedProps
        }

        return (
            React.createElement(component, props)
        )
    }
}