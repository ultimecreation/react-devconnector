const { validationResult } = require("express-validator");
const PostModel = require("../Models/PostModel");
const UserModel = require("../Models/UserModel");
const { post } = require("../Router/routes");

module.exports = new (class PostsController {
    index = async (req, res) => {
        try {
            const posts = await PostModel.getAllPosts();
            return res.status(200).json({
                success: true,
                posts: posts,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    show = async (req, res) => {
        try {
            // get url param and fetch post from db using the post_id param
            const postId = req.params.post_id;
            const post = await PostModel.getPostById(postId);

            return res.status(200).json({
                success: true,
                post: post,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };
    create = async (req, res) => {
        try {
            // check for errors and return them if any
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: true,
                    errors: errors,
                });
            }

            // get the user from db
            const user = await UserModel.getUserById(req.user._id);

            //create the post object to insert and save it with related user data
            const postToSave = {
                text: req.body.text,
                user: req.user._id,
                name: user.name,
                avatar: user.avatar,
            };
            const postSaved = await PostModel.save(postToSave);

            return res.status(200).json({
                success: true,
                post: postSaved,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    delete = async (req, res) => {
        try {
            const postId = req.params.post_id;
            await PostModel.delete(postId);

            return res.status(200).json({
                success: true,
                message: "article supprimé",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    likePost = async (req, res) => {
        try {
            // get the post_id from url params and fetch post from db
            const postId = req.params.post_id;
            const post = await PostModel.getPostById(postId);

            // check if user liked the post and return feedback
            if (
                post.likes.filter((like) => like.user == req.user._id).length >
                0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Article dèjà liké",
                });
            }

            // post not liked for now, add the user to the likes array and update the post
            post.likes.unshift({ user: req.user._id });
            await PostModel.update(post._id, post);

            return res.status(201).json({
                success: true,
                likes: post.likes,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    unLikePost = async (req, res) => {
        try {
            // get the post_id from url params and fetch post from db
            const postId = req.params.post_id;
            const post = await PostModel.getPostById(postId);

            // check if user never liked the post and return feedback
            if (
                post.likes.filter((like) => like.user == req.user._id).length ==
                0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Article pas encore liké",
                });
            }

            // post liked, remove the user from the likes array and update the post
            const removeIndex = post.likes
                .map((like) => like.user)
                .indexOf(req.user._id);
            post.likes.splice(removeIndex, 1);
            await PostModel.update(post._id, post);

            return res.status(201).json({
                success: true,
                likes: post.likes,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    addComment = async (req, res) => {
        try {

            // check for errors and return them if any
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: true,
                    errors: errors,
                });
            }

            // no errors found, fetch the post using url param post_id and the authenticated user
            const postId = req.params.post_id 
            const post = await PostModel.getPostById(postId)
            const user = await UserModel.getUserById(req.user._id)

            // build the comment object and add it to the comments array
            const comment = {
                text: req.body.text,
                user: req.user._id,
                name: user.name,
                avatar: user.avatar 
            }
            post.comments.unshift(comment)

            // update post in db and return the response to the user
            await PostModel.update(post._id,post)
            return res.status(201).json({
                success: true,
                comments: post.comments
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };

    removeComment = async (req, res) => {
        try {
            // get url params
            const postId = req.params.post_id 
            const commentId = req.params.comment_id 

            // fetch post from db using url param
            const post = await PostModel.getPostById(postId)

            // get the comment index 
            const removeIndex = post.comments.map(comment => comment._id ).indexOf(commentId)

            // if comment does not exist return feddback
            if(removeIndex == -1){
                return res.status(400).json({
                    success: false,
                    message: "Commentaire non trouvé"
                })
            }
            // if comment does not belong to the current user
            if(post.comments[removeIndex].user != req.user._id){
                return res.status(400).json({
                    success: false,
                    message: "Impossible de supprimé le commentaire d'un autre utilisateur"
                })
            }

            // all is ok, remove the comment from post comments 
            post.comments.splice(removeIndex,1)

            // update the post in db and return comments
            await PostModel.update(post._id,post)
            return res.status(200).json({
                success: true,
                comments: post.comments
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Une erreur inattendue est survenue",
            });
        }
    };
})();
