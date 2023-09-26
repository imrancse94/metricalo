export const postValidation = (params) => {
    
    let result = {};
    
    if(!params?.title) {
        result.title = 'Title is required';
    }

    if(!params?.body) {
        result.body = 'Body is required';
    }

    if(!params?.userId) {
        result.userId = 'User is required';
    }

    return result;
}