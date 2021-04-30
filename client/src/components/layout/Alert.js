import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({alerts}) => {
    return <div>
    {alerts && alerts.map(alert =>{
       return <div key ={alert.id} className={`alert alert-${alert.alertType} text-center`}>
            {alert.message}
        </div>
    })}
    </div>
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}
const mapStateToProps = state =>({
    alerts:  state.alertReducer
})
export default connect(mapStateToProps)(Alert)
