import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const MyAccount = () => {
    
    return (
        <div>
            <h1>Mon Compte</h1>
        </div>
    )
}
MyAccount.propTypes = {
    
}
export default connect()(MyAccount)
