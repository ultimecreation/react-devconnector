import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../redux/profile/actions";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
const Profiles = ({ getProfiles, profiles, loading }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h1>Nos Développeurs</h1>
                    <div className="col-9 mx-auto">
                        <div className="row">
                            {profiles.length === 0 ? (
                                <p>Pas de profils à afficher</p>
                            ) : (
                                profiles.map((profile,i) => {
                                    return  <ProfileItem
                                            key={i}
                                            profile={profile}
                                        />
                                })
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object,
};
const mapStateToProps = (state) => ({
    profiles: state.profileReducer.profiles,
    loading: state.profileReducer.loading,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
