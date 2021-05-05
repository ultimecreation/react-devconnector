const ProfileEntity = require("../Entity/ProfileEntity");
const mongoose = require("mongoose");
const UserEntity = require("../Entity/UserEntity");
const dbConnection = require("../config/dbConnection");

module.exports = new (class UserModel {
    getAllProfiles = () => {
        try {
            return ProfileEntity.find().populate("user", ["name", "avatar"]);
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    getSingleProfile = (id) => {
        try {
            return ProfileEntity.findOne({ user: id }).populate("user", [
                "name",
                "avatar",
            ]);
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    getMyProfile = (id) => {
        try {
            return ProfileEntity.findOne({ user: id }).populate("user", [
                "name",
                "avatar",
            ]);
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    create = (data) => {
        try {
            return ProfileEntity({ ...data }).save();
        } catch (error) {
            console.log(error.message);
            return false;
        }
    };

    update = (userId, data) => {
        try {
            return ProfileEntity.findOneAndUpdate(
                { user: userId },
                { $set: data },
                { new: true }
            );
        } catch (error) {
            console.log(error.message);
            return false;
        }
    };
    delete = async (userId) => {
        try {
            await PostEntity.deleteMany({user: userId})
            await ProfileEntity.findOneAndRemove({ user: userId });
            await UserEntity.findByIdAndRemove({ _id: userId });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
})();
