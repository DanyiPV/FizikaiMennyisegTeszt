const communityService = require("../services/communityService");

exports.getLimitedPosts = async (req, res, next) => {
    const { limit, offset, id, filter, tagsArray, search } = req.query;

    const get_posts = await communityService.getLimitedPost(limit, offset, id, filter, tagsArray, search);

    const get_postsCount = await communityService.getPostCount();

    res.status(200).json(get_posts == null ? 'null' : {posts: get_posts, total_posts: get_postsCount});
};

exports.getLimitedComments = async (req, res, next) => {
    const { limit, offset, id, type, userId } = req.query;

    const get_comments = type == 1 ? await communityService.getLimitedComments(limit, offset, id, userId) : await communityService.getLimitedInnerComments(limit, offset, id, userId);

    res.status(200).json(get_comments == null ? 'null' : {comments: get_comments.commentsWithreplies, hasMore: get_comments.hasMoreComments });
};


exports.postUpload = async (req, res, next) => {
    const {id, title, content, chips} = req.body;
    const files = req.files;

    const newPost = {
        id: null,
        title: title,
        content: content,
        likes: 0,
        dislike: 0,
        user_id: id,
    }

    try{
        const post_result = await communityService.postUpload(newPost, JSON.parse(chips));

        if(post_result == null){
            const error = new Error("Sikertelen volt a poszt feltöltés!");

            error.status = 400;

            throw error;
        }
    
        const postFiles_result = await communityService.postFilesUpload(files, post_result.id);

        if(postFiles_result == null){
            const error = new Error("A poszt feltöltése megtörtént de sikertelen volt a fájl(ok) feltöltése(i)!");

            error.status = 400;

            throw error;
        }
    
        res.status(201).json(post_result);
    }
    catch(error){
        next(error);
    }
};

exports.postEditUpload = async (req, res, next) => {
    const {id, title, content, none_files, new_Chips, none_Chips} = req.body;

    const files = req.files;

    const none_existingFiles = JSON.parse(none_files);

    const newChips = new_Chips != null && new_Chips != undefined && new_Chips != 'undefined' ? JSON.parse(new_Chips) : null;

    const none_existingChips = none_Chips != null && none_Chips != undefined && none_Chips != 'undefined' ? JSON.parse(none_Chips) : null;

    try{
        const postEdit_result = await communityService.postEdit(id, title, content);

        if(none_existingFiles != []){
            const fileDelete_result = await communityService.filesDelete(none_existingFiles);

            if(fileDelete_result == null){
                const error = new Error("A fájl(ok) törlésében valami hiba lépett fel!");
        
                error.status = 400;
        
                throw error;
            }
        }

        if(files != []){
            const postFiles_result = await communityService.postFilesUpload(files, id);
        
            if(postFiles_result == null){
                const error = new Error("Sikertelen volt a fájl(ok) feltöltése(i)!");
        
                error.status = 400;
        
                throw error;
            }
        }

        if(none_existingChips != null){
            const ChipsDelete_result = await communityService.chipsDelete(id, none_existingChips);

            if(ChipsDelete_result == null){
                const error = new Error("A tag(ek) törlésében valami hiba lépett fel!");
        
                error.status = 400;
        
                throw error;
            }
        }

        if(newChips != null){
            const chipUpload_result = await communityService.chipUpload(id, newChips);
        
            if(chipUpload_result == null){
                const error = new Error("Sikertelen volt a tag(ek) feltöltése!");
        
                error.status = 400;
        
                throw error;
            }
        }
    
        res.status(200).send(postEdit_result);
    }
    catch(error){
        next(error);
    }
};

exports.postLike = async (req,res,next)=>{
    const {post_id, user_id, upload_type, type} = req.body;

    var like_result = null;

    if(type == 0){
        like_result = await communityService.postLike(post_id, upload_type, user_id);
    }
    else if(type == 1){
        like_result = await communityService.postDislike(post_id, upload_type, user_id);
    }
    try{
        if(like_result == null){
            const error = new Error("Sikertelen volt a reakció feltöltés!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(like_result);
    }
    catch(error){
        next(error);
    }
}

exports.postComment = async (req,res,next)=>{
    const {content, linkAuthor, linked_id, user_id, type } = req.body;

    var comment = null;
    if(type == 0){
        comment = {
            id: null,
            content: content,
            linkAuthor: linkAuthor,
            post_id: linked_id,
            parent_comment_id: null,
            user_id: user_id
        }
    }
    else if(type == 1){
        comment = {
            id: null,
            content: content,
            linkAuthor: linkAuthor,
            post_id: null,
            parent_comment_id: linked_id,
            user_id: user_id
        }
    }

    const comment_result = await communityService.postComment(comment);

    try{
        if(comment_result == null){
            const error = new Error("Sikertelen volt a comment feltöltés!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(comment_result);
    }
    catch(error){
        next(error);
    }
}

exports.commentEdit = async (req,res,next)=>{
    const {content, comment_id} = req.body;

    const comment_result = await communityService.commentEdit(content, comment_id);

    try{
        if(comment_result == null){
            const error = new Error("Sikertelen volt a comment szekeztésének mentése közben!");

            error.status = 400;

            throw error;
        }

        res.status(200).send("Sikeres volt a szerkeztés!");
    }
    catch(error){
        next(error);
    }
}

exports.getTags = async (req,res,next) =>{
    const tag_result = await communityService.getTags();

    try{
        if(tag_result == null){
            const error = new Error("Nem sikerült lekérni a tageket!");

            error.status = 400;

            throw error;
        }

        res.status(200).send(tag_result);
    }
    catch(error){
        next(error);
    }
}

exports.sendReports = async (req,res,next) => {
    const {type, notif_content, content_type, user_id, from_user_id, content_id} = req.body;

    const newReport = {
        id: null,
        type: type,
        notif_content: notif_content,
        content_type: content_type,
        user_id: user_id,
        from_user_id: from_user_id,
        content_id: content_id,
        closed: false,
    }

    try{
        const repost_result = await communityService.sendReports(newReport);

        if(repost_result == null){
            const error = new Error("Nem sikerült feltölteni a reportokat!");
            
            error.status = 400;
            
            throw error;
        }
        
        res.status(200).send("El lett küldve a bejelentés!");
    }
    catch(error){
        next(error);
    }
}