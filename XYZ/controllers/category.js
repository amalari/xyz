var Category = require('./../models/category.js');
var Post = require('./../models/post.js');
var Portfolio = require('./../models/portfolio.js');
var PostViewModel = require('./../viewModels/post.js');
var PortfolioViewModel = require('./../viewModels/portfolio.js');
var SearchQb = require('./../core/queryBuilder/search-query-builder.js');


CategoryVisitorController = {
    registerRoutes: function (app) {
        app.get('/category/search', this.search);
    },
    search: function (req, res) {
        var result = {};
        var currentPage = 1;
        if (req.query.page) {
            currentPage = req.query.page
        };
        var queryParams = JSON.parse(JSON.stringify(req.query));
        var temporalyData = {};
        Category.getSearch(req.query.q)
            .then(function (category) {
                if (category === null) {
                    res.send(404, {
                        message: "category not found"
                    })
                } else {
                    temporalyData = category.toJSON()
                    var queryBuilder = new SearchQb();
                    if (req.query.type === "post") {
                        queryBuilder.setup({
                            limit: 10,
                            page: req.query.page,
                            whereCondition: {
                                is_active: 1,
                                type: 1
                            }
                        });
                        queryBuilder.search(['category_id', 'LIKE', '%' + temporalyData.id + '%']);
                        Post.list(queryBuilder)
                            .then(function (data) {
                                result.blog = PostViewModel.getList(data, req.xhr);
                                result.pagination = {
                                    page: currentPage,
                                    limit: 10,
                                    totalRows: result.blog.total,
                                    queryParams: queryParams
                                };
                                result.q = req.query.q;
                                result.type = req.query.type;
                                res.render('archive2', result);
                            })
                    } else {
                        queryBuilder.setup({
                            limit: 10,
                            page: req.query.page,
                            whereCondition: {
                                is_active: 1
                            }
                        });
                        queryBuilder.search(['category_id', 'LIKE', '%' + temporalyData.id + '%']);
                        Portfolio.list(queryBuilder)
                            .then(function (data) {
                                result.portfolio = {};
                                result.portfolio.data = PortfolioViewModel.list(data.data);
                                result.portfolio.total = data.total;
                                result.pagination = {
                                    page: currentPage,
                                    limit: 10,
                                    totalRows: result.portfolio.total,
                                    queryParams: queryParams
                                };
                                result.q = req.query.q;
                                result.type = req.query.type;
                                res.render('archive2', result);
                            })
                    };
                }
            })
            .catch(function (err) {
                res.send({
                    message: err.message
                })
            })

    },
}

module.exports = CategoryVisitorController;