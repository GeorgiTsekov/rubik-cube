exports.errorHandler = function (error, req, res, next) {
    if (error) {
        res.redirect('404');
    }
};