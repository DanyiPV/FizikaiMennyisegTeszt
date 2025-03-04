const communityRepository  = require("../repositories/communityRepository");

class communityService
{
    async getLimitedPost(limit, offset, id, filter, tagsArray, search){
        return await communityRepository.getLimitedPost(limit, offset, id, filter, tagsArray,  search);
    }

    async getLimitedComments(limit, offset, id, userId){
        return await communityRepository.getLimitedComments(limit, offset, id, userId);
    }

    async getLimitedInnerComments(limit, offset, id, userId){
        return await communityRepository.getLimitedInnerComments(limit, offset, id, userId);
    }

    async getPostCount(){
        return await communityRepository.getPostCount();
    }

    async postUpload(post,tagIds)
    {
        return await communityRepository.postUpload(post,tagIds);
    }

    async postFilesUpload(files,post_id)
    {
        return await communityRepository.postFilesUpload(files, post_id);
    }

    async postLike(post_id, upload_type, user_id)
    {
        return await communityRepository.postLike(post_id, upload_type, user_id);
    }

    async postDislike(post_id, upload_type, user_id)
    {
        return await communityRepository.postDislike(post_id, upload_type, user_id);
    }

    async postComment(comment)
    {
        return await communityRepository.postComment(comment);
    }

    async commentEdit(content, comment_id)
    {
        return await communityRepository.commentEdit(content, comment_id);
    }

    async postEdit(id, title, content, files, none_files)
    {
        return await communityRepository.postEdit(id, title, content, files, none_files);
    }

    async filesDelete(none_files){
        return await communityRepository.filesDelete(none_files);
    }
    
    async chipsDelete(postId, none_existingFiles){
        return await communityRepository.chipsDelete(postId, none_existingFiles);
    }

    async chipUpload(id, newChips){
        return await communityRepository.chipUpload(id, newChips);
    }

    async getTags(){
        return await communityRepository.getTags();
    }

    async sendReports(newReport){
        return await communityRepository.sendReports(newReport);
    }
}

module.exports = new communityService();