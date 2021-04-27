const { validationResult } = require("express-validator");
const ProfileModel = require("../Models/ProfileModel");
const request = require('request')


module.exports = new (class ProfilesController {
    index = async (req, res) => {
        try {

            // get all profiles from db and return them
            const profiles = await ProfileModel.getAllProfiles();
            return res.status(200).json({
                success: true,
                profiles: profiles,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };
    getSingleProfile = async (req, res) => {
        try {
            // get url param and fetch related profile from db
            const userId = req.params.user_id;
            const profile = await ProfileModel.getSingleProfile(userId);

            // return profile to the user
            return res.status(200).json({
                success: true,
                profile: profile,
            });
        } catch (error) {
            // url param does not match a valid objectId,return an error
            if (error.kind === "ObjectId") {
                return res.status(400).json({
                    success: false,
                    message: "Profil non trouvé",
                });
            }

            // something went wrong on the server side
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };
    myProfile = async (req, res) => {
        try {
            // get currently authenticated user profile
            const profile = await ProfileModel.getMyProfile(req.user._id);

            // no profile found, return an error
            if (!profile) {
                return res.status(400).json({
                    success: false,
                    message: "Il n'y a pas de profil pour cet utilisateur",
                });
            }

            // profile found, return profile to the user
            return res.status(200).json({
                success: true,
                profile: profile,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    create = async (req, res) => {
        // check for errors and return them if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors,
            });
        }

        // no errors found, bind incoming data,save to db
        const profileToSave = this.bindIncomingData(req);
        const profileSaved = await ProfileModel.create(profileToSave);

        return res.status(201).json({
            success: true,
            profile: profileSaved,
        });
    };

    update = async (req, res) => {
        // check for errors and return them if any
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors,
            });
        }

        // no errors found, bind incoming data and save to db
        const profileToUpdate = this.bindIncomingData(req);
        const profileUpdated = await ProfileModel.update(
            req.user.id,
            profileToUpdate
        );

        return res.status(200).json({
            success: true,
            profile: profileUpdated,
        });
    };

    updateExperience = async (req,res)=>{

        // check for errors and return them if any
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:errors
            })
        }

        // no errors found, create the experience object to save
        const {title,company,location,from,to,current,description} = req.body
        const newExperienceToSave = {title,company,location,from,to,current,description}
        try {

            // get the profile, prepend the last experience and save it in db
            const profile = await ProfileModel.getMyProfile(req.user._id)
            profile.experience.unshift(newExperienceToSave)
            await ProfileModel.update(req.user._id,profile)
            
            // return the profile to the user
            return res.status(200).json({
                success:true,
                profile:profile
            })
        } catch (error) {
            
            // something went wrong, return feedback
            res.status(500).json({
                success:false,
                message:"Une erreur inattendue est survenue"
            })
        }
    }

    deleteExperience = async (req,res) =>{
        
        try {
            // get the currently authenticated user profile 
            const profile = await ProfileModel.getMyProfile(req.user._id)
            
            // get the experience id from url param
            const expId = req.params.exp_id

            // get the related index looping through the profile experiences to delete the experience
            const removeIndex = profile.experience.map(item=>item._id).indexOf(expId)
            profile.experience.splice(removeIndex,1)

            // update the user profile in db and return the updated data
            await ProfileModel.update(req.user._id,profile)
            return res.status(200).json({
                success:true,
                profile:profile
            })
        } catch (error) {
            return res.status(200).json({
                success:false,
                message:"Une erreur inattendue est survenue"
            })
        }
        
    }
    updateEducation = async (req,res)=>{

        // check for errors and return them if any
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors:errors
            })
        }
        // no errors found, create the education object to save
        const {school,degree,fieldOfStudy,from} = req.body
        const newEducationToSave = {school,degree,fieldOfStudy,from}
        try {

            // get the profile, prepend the last education and save it in db
            const profile = await ProfileModel.getMyProfile(req.user._id)
            profile.education.unshift(newEducationToSave)
            await ProfileModel.update(req.user._id,profile)
            
            // return the profile to the user
            return res.status(200).json({
                success:true,
                profile:profile
            })
        } catch (error) {
            
            // something went wrong, return feedback
            res.status(500).json({
                success:false,
                message:"Une erreur inattendue est survenue"
            })
        }
    }

    deleteEducation = async (req,res) =>{
        
        try {
            // get the currently authenticated user profile
            const profile = await ProfileModel.getMyProfile(req.user._id)

            // get the education id from url
            const eduId = req.params.edu_id

            // loop through the profile education to retrieve and remove the related education
            const removeIndex = profile.education.map(item=>item._id).indexOf(eduId)
            profile.education.splice(removeIndex,1)

            // update the rpofile in db and return updated data
            await ProfileModel.update(req.user._id,profile)
            return res.status(200).json({
                success:true,
                profile:profile
            })
        } catch (error) {
            return res.status(200).json({
                success:false,
                message:"Une erreur inattendue est survenue"
            })
        }
        
    }
    deleteProfilePostsAndUser = (req, res) => {
        
        try { 

            ProfileModel.delete(req.user._id);

            return res.status(200).json({
                success: true,
                message: "compte supprimé",
            });
        } catch (error) {
           
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    getGithubRepos = (req,res)=>{
        try {
            // set the request option and send the rquest
            const options = {
                uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
                method:'GET',
                headers:{ 'user-agent':'node.js'},
                Authorization: `token ${process.env.GITHUB_TOKEN}` 
            }
            request(options,(error,response,body)=>{
               
                // no data or some errors found
                if(error) console.error(error)
                if(response.statusCode !==200){
                    return res.status(404).json({
                        success:false,
                        message:"Pas de profil github trouvé"
                    })
                }

                // there some data ,return them to the user
                return res.status(200).json({
                    success:200,
                    repos: JSON.parse(body)
                })
            })
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    }

    bindIncomingData(data) {
        const {
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedIn,
        } = data.body;

        const profile = { user: data.user._id };

        if (company) profile.company = company;
        if (website) profile.website = website;
        if (location) profile.location = location;
        if (bio) profile.bio = bio;
        if (status) profile.status = status;
        if (githubUsername) profile.githubUsername = githubUsername;
        if (skills)
            profile.skills = skills.split(",").map((skill) => skill.trim());

        // build social object
        profile.social = {};
        profile.social.youtube = youtube;
        profile.social.twitter = twitter;
        profile.social.facebook = facebook;
        profile.social.linkedIn = linkedIn;
        profile.social.instagram = instagram;
        return profile;
    }
})();
