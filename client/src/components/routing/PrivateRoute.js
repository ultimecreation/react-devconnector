import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'

const PrivateRoute = ({component:Component,isAuthenticated,loading, ...rest}) => {
   return <Route 
        {...rest} 
        render={props => !isAuthenticated && !loading
                        ? <Redirect to="/connexion"/>
                        :<Component {...props}/>
        } 
    />
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
}
const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated,
    loading:state.authReducer.loading
})
export default connect(mapStateToProps)(PrivateRoute)
