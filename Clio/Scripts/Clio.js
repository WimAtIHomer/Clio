var Clio;
(function (Clio) {
    var Server = (function () {
        function Server() {
        }
        Server.ClioHub = $.connection.clioHub;
        Server.Connect = function () {
            $.connection.hub.start().done(function () {
                Server.ClioHub.server.login(CurrentUser.user.name);
            });
            Server.ClioHub.client.login = function (user) {
                $('#message').text(user + " login");
            };
            Server.ClioHub.client.addUser = function (user, user2) {
                $('#message').text(user.name + " heeft " + user2.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    User.All.push(user2);
                    User.sort(true);
                }
            };
            Server.ClioHub.client.editUser = function (user, user2) {
                $('#message').text(user.name + " heeft " + user2.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(User.All, function (index, item) {
                        if (item.id == user2.id) {
                            User.All[index] = user2;
                            User.sort(true);
                            return false;
                        }
                    });
                }
            };
            Server.ClioHub.client.addProject = function (user, project) {
                $('#message').text(user.name + " heeft project " + project.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    Project.All.push(project);
                    Project.sort(true);
                }
            };
            Server.ClioHub.client.editProject = function (user, project) {
                $('#message').text(user.name + " heeft project " + project.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(Project.All, function (index, item) {
                        if (item.id == project.id) {
                            Project.All[index] = project;
                            Project.sort(true);
                            return false;
                        }
                    });
                }
            };
            Server.ClioHub.client.addTechnology = function (user, technology) {
                $('#message').text(user.name + " heeft tech " + technology.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    Technology.All.push(technology);
                    Technology.sort(true);
                }
            };
            Server.ClioHub.client.editTechnology = function (user, technology) {
                $('#message').text(user.name + " heeft tech " + technology.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(Technology.All, function (index, item) {
                        if (item.id == technology.id) {
                            Technology.All[index] = technology;
                            Technology.sort(true);
                            return false;
                        }
                    });
                }
            };
            Server.ClioHub.client.addTool = function (user, tool) {
                $('#message').text(user.name + " heeft app " + tool.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    Tool.All.push(tool);
                    Tool.sort(true);
                }
            };
            Server.ClioHub.client.editTool = function (user, tool) {
                $('#message').text(user.name + " heeft app " + tool.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(Tool.All, function (index, item) {
                        if (item.id == tool.id) {
                            Tool.All[index] = tool;
                            Tool.sort(true);
                            return false;
                        }
                    });
                }
            };
            Server.ClioHub.client.addTag = function (user, tag) {
                $('#message').text(user.name + " heeft tag " + tag.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    Tag.All.push(tag);
                    Tag.sort(true);
                }
            };
            Server.ClioHub.client.editTag = function (user, tag) {
                $('#message').text(user.name + " heeft tag " + tag.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(Tag.All, function (index, item) {
                        if (item.id == tag.id) {
                            Tag.All[index] = tag;
                            Tag.sort(true);
                            return false;
                        }
                    });
                }
            };
            Server.ClioHub.client.addReview = function (user, review) {
                $('#message').text(user.name + " heeft ervaring " + review.name + ' toegevoegd');
                if (user.id != CurrentUser.user.id) {
                    Review.All.unshift(review);
                    if (review.type == "Technology")
                        Technology.reviewAdded(review.technologyId);
                    if (review.type == "Tool")
                        Tool.reviewAdded(review.toolId);
                    User.reviewAdded(review.userId);
                    Project.reviewAdded(review.projectId);
                    var start = (Review.CurrentPage - 1) * 10;
                    if (!Review.RactiveList.get('hasFilter')) {
                        Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                    }
                }
            };
            Server.ClioHub.client.editReview = function (user, review) {
                $('#message').text(user.name + " heeft ervaring " + review.name + ' aangepast');
                if (user.id != CurrentUser.user.id) {
                    $.each(Review.All, function (index, item) {
                        if (item.id == review.id && item.type == review.type) {
                            Review.All[index] = review;
                            return false;
                        }
                    });
                }
            };
        };
        return Server;
    })();
    Clio.Server = Server;

    var CurrentUser = (function () {
        function CurrentUser() {
        }
        return CurrentUser;
    })();
    Clio.CurrentUser = CurrentUser;

    var Ping = (function () {
        function Ping() {
        }
        Ping.Polling = function () {
            setInterval(Ping.GetTime, 60000);
        };

        Ping.GetTime = function () {
            var restClient = new RestClient();
            restClient.get(path + "time", {}, { cache: false }).success(function (response, headers, config) {
                $("#time").html(response.data.time);
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            }).unauthorized(function (response, headers, config) {
                Error.show("Session timeout");
            });
        };
        return Ping;
    })();
    Clio.Ping = Ping;

    var Error = (function () {
        function Error() {
        }
        Error.show = function (message) {
            var callback = function (template, message) {
                var ractive = new Ractive({
                    el: 'error',
                    template: template,
                    noIntro: true,
                    data: {
                        message: message
                    }
                });
            };

            MyTemplates.Error(callback, message);
        };

        Error.showModal = function (message) {
            var callback = function (template, message) {
                var ractive = new Ractive({
                    el: Error.lastModal,
                    template: template,
                    noIntro: true,
                    data: {
                        message: message
                    }
                });
            };

            MyTemplates.Error(callback, message);
        };
        return Error;
    })();
    Clio.Error = Error;

    var Tag = (function () {
        function Tag() {
        }
        Tag.CurrentPage = 1;

        Tag.sort = function (resetView) {
            Tag.All.sort(function (a, b) {
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            if (resetView) {
                var start = (Tag.CurrentPage - 1) * 10;
                Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
            }
        };

        Tag.list = function (taglist) {
            var restClient = new RestClient();
            restClient.get(path + "tag", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Tag.All = response.data;
                Tag.sort(false);
                Tag.RactiveList.set('tags', Tag.All.slice(0, 10), function () {
                    $('#tags a').tooltip({});
                    $('#tagPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(Tag.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            Tag.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            $('#tags a').tooltip('destroy');
                            Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                            $('#tags a').tooltip({});
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            Tag.RactiveList = new Ractive({
                el: 'tags',
                template: taglist,
                noIntro: true,
                data: {
                    tags: []
                }
            });

            Tag.RactiveList.on("add", function (event) {
                MyTemplates.TagAdd(Tag.add);
                Error.lastModal = 'tagErrorModal';
            });
            Tag.RactiveList.on("edit", function (event) {
                MyTemplates.TagEdit(Tag.edit, Tag.All[parseInt(event.node.getAttribute('data-index')) + (Tag.CurrentPage - 1) * 10]);
                Error.lastModal = 'tagErrorModal';
            });
        };

        Tag.edit = function (addForm, data) {
            var tag = data;

            var ractive = new Ractive({
                el: 'tagModal',
                template: addForm,
                noIntro: true,
                data: tag
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tag.name = event.context.name;
                tag.description = event.context.description;

                var restClient = new RestClient();
                restClient.update(path + "tag", tag, null).success(function (response, headers, config) {
                    var start = (Tag.CurrentPage - 1) * 10;
                    Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                    $('#tags a').tooltip({});
                    $('#tagModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        Tag.add = function (addForm) {
            var tag = { id: 0 };

            var ractive = new Ractive({
                el: 'tagModal',
                template: addForm,
                noIntro: true,
                data: tag
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tag.name = event.context.name;
                tag.description = event.context.description;

                var restClient = new RestClient();
                restClient.insert(path + "tag", tag, null).success(function (response, headers, config) {
                    Tag.All.push(response.data);
                    if (Tag.All.length % 10 == 1) {
                        $('#tagPager').bootstrapPaginator({ totalPages: Math.ceil(Tag.All.length / 10) });
                    }
                    var start = (Tag.CurrentPage - 1) * 10;
                    Tag.RactiveList.set('tags', Tag.All.slice(start, start + 10));
                    $('#tags a').tooltip({});
                    $('#tagModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return Tag;
    })();
    Clio.Tag = Tag;

    var Project = (function () {
        function Project() {
        }
        Project.CurrentPage = 1;

        Project.reviewAdded = function (projectId) {
            $.each(Project.All, function (index, item) {
                if (item.id == projectId) {
                    Project.All[index].reviews++;
                    return false;
                }
            });
            Project.sort(true);
        };

        Project.sort = function (resetView) {
            Project.All.sort(function (a, b) {
                var reviewDiv = b.reviews - a.reviews;
                if (reviewDiv != 0)
                    return reviewDiv;
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            if (resetView) {
                var start = (Project.CurrentPage - 1) * 10;
                Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
            }
        };

        Project.list = function (projectlist) {
            var restClient = new RestClient();
            restClient.get(path + "project", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Project.All = response.data;
                Project.RactiveList.set('projects', Project.All.slice(0, 10), function () {
                    $('#projects a').tooltip({});
                    $('#projectPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(Project.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            Project.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            $('#projects a').tooltip('destroy');
                            Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                            $('#projects a').tooltip({});
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            Project.RactiveList = new Ractive({
                el: 'projects',
                template: projectlist,
                noIntro: true,
                data: {
                    projects: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            Project.RactiveList.on("add", function (event) {
                MyTemplates.ProjectAdd(Project.add);
                Error.lastModal = 'projectErrorModal';
            });
            Project.RactiveList.on("edit", function (event) {
                MyTemplates.ProjectEdit(Project.edit, Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10]);
                Error.lastModal = 'projectErrorModal';
            });
            Project.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "projectId",
                    id: Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10].id,
                    name: Project.All[parseInt(event.node.getAttribute('data-index')) + (Project.CurrentPage - 1) * 10].name
                });
            });
        };

        Project.edit = function (addForm, data) {
            var project = data;
            project.format = function (date) {
                return moment(date).format("DD-MM-YYYY");
            };

            var ractive = new Ractive({
                el: 'projectModal',
                template: addForm,
                noIntro: true,
                data: project
            });
            $('.datepicker').datepicker();

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                project.name = event.context.name;
                project.customer = event.context.customer;
                project.startDate = moment($('#inputProjectStartDate').val(), "DD-MM-YYYY").toDate();
                project.description = event.context.description;

                var restClient = new RestClient();
                restClient.update(path + "project", project, null).success(function (response, headers, config) {
                    var start = (Project.CurrentPage - 1) * 10;
                    Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                    $('#projects a').tooltip({});
                    $('#projectModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        Project.add = function (addForm) {
            var project = {
                id: 0,
                startDate: new Date(),
                format: function (date) {
                    return moment(date).format("DD-MM-YYYY");
                }
            };

            var ractive = new Ractive({
                el: 'projectModal',
                template: addForm,
                noIntro: true,
                data: project
            });
            $('.datepicker').datepicker();

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                project.name = event.context.name;
                project.customer = event.context.customer;
                project.startDate = moment($('#inputProjectStartDate').val(), "DD-MM-YYYY").toDate();
                project.description = event.context.description;

                var restClient = new RestClient();
                restClient.insert(path + "project", project, null).success(function (response, headers, config) {
                    Project.All.push(response.data);
                    Project.sort(false);
                    if (Project.All.length % 10 == 1) {
                        $('#projectPager').bootstrapPaginator({ totalPages: Math.ceil(Project.All.length / 10) });
                    }
                    var start = (Project.CurrentPage - 1) * 10;
                    Project.RactiveList.set('projects', Project.All.slice(start, start + 10));
                    $('#projects a').tooltip({});
                    $('#projectModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return Project;
    })();
    Clio.Project = Project;

    var Technology = (function () {
        function Technology() {
        }
        Technology.CurrentPage = 1;

        Technology.reviewAdded = function (technologyId) {
            $.each(Technology.All, function (index, item) {
                if (item.id == technologyId) {
                    Technology.All[index].reviews++;
                    return false;
                }
            });
            Technology.sort(true);
        };

        Technology.sort = function (resetView) {
            Technology.All.sort(function (a, b) {
                var reviewDiv = b.reviews - a.reviews;
                if (reviewDiv != 0)
                    return reviewDiv;
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            if (resetView) {
                var start = (Technology.CurrentPage - 1) * 10;
                Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
            }
        };

        Technology.list = function (technologylist) {
            var restClient = new RestClient();
            restClient.get(path + "technology", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Technology.All = response.data;
                Technology.sort(false);
                Technology.RactiveList.set('technologies', Technology.All.slice(0, 10), function () {
                    $('#technologies a').tooltip({});
                    $('#technologyPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(Technology.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            Technology.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            $('#technologies a').tooltip('destroy');
                            Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                            $('#technologies a').tooltip({});
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            restClient.get(path + "language", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Technology.Languages = response.data;
                Technology.RactiveList.set('languages', Technology.Languages);
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            Technology.RactiveList = new Ractive({
                el: 'technologies',
                template: technologylist,
                noIntro: true,
                data: {
                    technologies: [],
                    languages: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    },
                    isLanguage: function (id1, id2) {
                        return id1 == id2;
                    }
                }
            });

            Technology.RactiveList.on("add", function (event) {
                MyTemplates.TechnologyAdd(Technology.add);
                Error.lastModal = 'technologyErrorModal';
            });
            Technology.RactiveList.on("edit", function (event) {
                MyTemplates.TechnologyEdit(Technology.edit, Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10]);
                Error.lastModal = 'technologyErrorModal';
            });
            Technology.RactiveList.on("review", function (event) {
                MyTemplates.TechnologyReviewAdd(TechnologyReview.add, Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10]);
                Error.lastModal = 'technologyreviewErrorModal';
            });
            Technology.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "technologyId",
                    id: Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10].id,
                    name: Technology.All[parseInt(event.node.getAttribute('data-index')) + (Technology.CurrentPage - 1) * 10].name
                });
            });
        };

        Technology.edit = function (addForm, data) {
            var technology = data;
            technology.languages = Technology.Languages;
            technology.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'technologyModal',
                template: addForm,
                noIntro: true,
                data: technology
            });

            $('#inputTechnologyTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                technology.name = event.context.name;
                technology.languageId = event.context.languageId;
                technology.link = event.context.link;
                technology.license = event.context.license;
                technology.description = event.context.description;
                var tags = $('#inputTechnologyTags').val() || [];
                technology.tags = $.map(tags, function (item, index) {
                    return parseInt(item);
                });

                var restClient = new RestClient();
                restClient.update(path + "technology", technology, null).success(function (response, headers, config) {
                    var start = (Technology.CurrentPage - 1) * 10;
                    Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                    $('#technologies a').tooltip({});
                    $('#technologyModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        Technology.add = function (addForm) {
            var technology = { id: 0, languageId: 1 };
            technology.languages = Technology.Languages;
            technology.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'technologyModal',
                template: addForm,
                noIntro: true,
                data: technology
            });

            $('#inputTechnologyTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                technology.name = event.context.name;
                technology.languageId = event.context.languageId;
                technology.link = event.context.link;
                technology.license = event.context.license;
                technology.description = event.context.description;
                var tags = $('#inputTechnologyTags').val() || [];
                technology.tags = $.map(tags, function (item, index) {
                    return parseInt(item);
                });

                var restClient = new RestClient();
                restClient.insert(path + "technology", technology, null).success(function (response, headers, config) {
                    Technology.All.push(response.data);
                    Technology.sort(false);
                    if (Technology.All.length % 10 == 1) {
                        $('#technologyPager').bootstrapPaginator({ totalPages: Math.ceil(Technology.All.length / 10) });
                    }
                    var start = (Technology.CurrentPage - 1) * 10;
                    Technology.RactiveList.set('technologies', Technology.All.slice(start, start + 10));
                    $('#technologies a').tooltip({});
                    $('#technologyModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return Technology;
    })();
    Clio.Technology = Technology;

    var Tool = (function () {
        function Tool() {
        }
        Tool.CurrentPage = 1;

        Tool.reviewAdded = function (toolId) {
            $.each(Tool.All, function (index, item) {
                if (item.id == toolId) {
                    Tool.All[index].reviews++;
                    return false;
                }
            });
            Tool.sort(true);
        };

        Tool.sort = function (resetView) {
            Tool.All.sort(function (a, b) {
                var reviewDiv = b.reviews - a.reviews;
                if (reviewDiv != 0)
                    return reviewDiv;
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            if (resetView) {
                var start = (Tool.CurrentPage - 1) * 10;
                Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
            }
        };

        Tool.list = function (toollist) {
            var restClient = new RestClient();
            restClient.get(path + "tool", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Tool.All = response.data;
                Tool.sort(false);
                Tool.RactiveList.set('tools', Tool.All.slice(0, 10), function () {
                    $('#tools a').tooltip({});
                    $('#toolPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(Tool.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            Tool.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            $('#tools a').tooltip('destroy');
                            Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                            $('#tools a').tooltip({});
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            Tool.RactiveList = new Ractive({
                el: 'tools',
                template: toollist,
                noIntro: true,
                data: {
                    tools: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            Tool.RactiveList.on("add", function (event) {
                MyTemplates.ToolAdd(Tool.add);
                Error.lastModal = 'toolErrorModal';
            });
            Tool.RactiveList.on("edit", function (event) {
                MyTemplates.ToolEdit(Tool.edit, Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10]);
                Error.lastModal = 'toolErrorModal';
            });
            Tool.RactiveList.on("review", function (event) {
                MyTemplates.ToolReviewAdd(ToolReview.add, Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10]);
                Error.lastModal = 'toolreviewErrorModal';
            });
            Tool.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "toolId",
                    id: Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10].id,
                    name: Tool.All[parseInt(event.node.getAttribute('data-index')) + (Tool.CurrentPage - 1) * 10].name
                });
            });
        };

        Tool.edit = function (addForm, data) {
            var tool = data;
            tool.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'toolModal',
                template: addForm,
                noIntro: true,
                data: tool
            });

            $('#inputToolTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tool.name = event.context.name;
                tool.owner = event.context.owner;
                tool.license = event.context.license;
                tool.link = event.context.link;
                tool.description = event.context.description;
                var tags = $('#inputToolTags').val() || [];
                tool.tags = $.map(tags, function (item, index) {
                    return parseInt(item);
                });

                var restClient = new RestClient();
                restClient.update(path + "tool", tool, null).success(function (response, headers, config) {
                    var start = (Tool.CurrentPage - 1) * 10;
                    Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                    $('#tools a').tooltip({});
                    $('#toolModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        Tool.add = function (addForm) {
            var tool = { id: 0 };
            tool.taglist = Tag.All;

            var ractive = new Ractive({
                el: 'toolModal',
                template: addForm,
                noIntro: true,
                data: tool
            });

            $('#inputToolTags').chosen({ width: '218px' });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                tool.name = event.context.name;
                tool.owner = event.context.owner;
                tool.license = event.context.license;
                tool.link = event.context.link;
                tool.description = event.context.description;
                var tags = $('#inputToolTags').val() || [];
                tool.tags = $.map(tags, function (item, index) {
                    return parseInt(item);
                });

                var restClient = new RestClient();
                restClient.insert(path + "tool", tool, null).success(function (response, headers, config) {
                    Tool.All.push(response.data);
                    Tool.sort(false);
                    if (Tool.All.length % 10 == 1) {
                        $('#toolPager').bootstrapPaginator({ totalPages: Math.ceil(Tool.All.length / 10) });
                    }
                    var start = (Tool.CurrentPage - 1) * 10;
                    Tool.RactiveList.set('tools', Tool.All.slice(start, start + 10));
                    $('#tools a').tooltip({});
                    $('#toolModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return Tool;
    })();
    Clio.Tool = Tool;

    var User = (function () {
        function User() {
        }
        User.CurrentPage = 1;

        User.reviewAdded = function (userId) {
            $.each(User.All, function (index, item) {
                if (item.id == userId) {
                    User.All[index].reviews++;
                    return false;
                }
            });
            User.sort(true);
        };

        User.sort = function (resetView) {
            User.All.sort(function (a, b) {
                var reviewDiv = b.reviews - a.reviews;
                if (reviewDiv != 0)
                    return reviewDiv;
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            if (resetView) {
                var start = (User.CurrentPage - 1) * 10;
                User.RactiveList.set('users', User.All.slice(start, start + 10));
            }
        };

        User.list = function (userlist) {
            var restClient = new RestClient();
            restClient.get(path + "user", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                User.All = response.data;
                User.sort(false);
                User.RactiveList.set('users', User.All.slice(0, 10), function () {
                    $('#users a').tooltip({});
                    $('#userPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(User.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            User.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            $('#users a').tooltip('destroy');
                            User.RactiveList.set('users', User.All.slice(start, start + 10));
                            $('#users a').tooltip({});
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            User.RactiveList = new Ractive({
                el: 'users',
                template: userlist,
                noIntro: true,
                data: {
                    users: [],
                    format: function (date) {
                        return moment(date).format("DD-MM-YYYY");
                    }
                }
            });

            User.RactiveList.on("add", function (event) {
                MyTemplates.UserAdd(User.add);
                Error.lastModal = 'userErrorModal';
            });
            User.RactiveList.on("edit", function (event) {
                MyTemplates.UserEdit(User.edit, User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10]);
                Error.lastModal = 'userErrorModal';
            });
            User.RactiveList.on("filter", function (event) {
                Review.filter({
                    field: "userId",
                    id: User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10].id,
                    name: User.All[parseInt(event.node.getAttribute('data-index')) + (User.CurrentPage - 1) * 10].name
                });
            });
        };

        User.edit = function (addForm, data) {
            var user = data;
            var ractive = new Ractive({
                el: 'userModal',
                template: addForm,
                noIntro: true,
                data: user
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                user.name = event.context.name;
                user.email = event.context.email;

                var restClient = new RestClient();
                restClient.update(path + "user", user, null).success(function (response, headers, config) {
                    var start = (User.CurrentPage - 1) * 10;
                    User.RactiveList.set('users', User.All.slice(start, start + 10));
                    $('#users a').tooltip({});
                    $('#userModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        User.add = function (addForm) {
            var user = { id: 0 };

            var ractive = new Ractive({
                el: 'userModal',
                template: addForm,
                noIntro: true,
                data: user
            });

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                user.name = event.context.name;
                user.email = event.context.email;

                var restClient = new RestClient();
                restClient.insert(path + "user", user, null).success(function (response, headers, config) {
                    User.All.push(response.data);
                    User.sort(false);
                    if (User.All.length % 10 == 1) {
                        $('#userPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                    }
                    var start = (User.CurrentPage - 1) * 10;
                    User.RactiveList.set('users', User.All.slice(start, start + 10));
                    $('#users a').tooltip({});
                    $('#userModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return User;
    })();
    Clio.User = User;

    var Review = (function () {
        function Review() {
        }
        Review.CurrentPage = 1;

        Review.list = function (reviewlist) {
            var restClient = new RestClient();
            restClient.get(path + "review", {}, { cache: false }).success(function (response, headers, config) {
                // do what you do
                Review.All = response.data;
                Review.RactiveList.set('reviews', Review.All.slice(0, 10), function () {
                    $('#reviews a').tooltip({});
                    $('#reviewPager').bootstrapPaginator({
                        currentPage: 1,
                        totalPages: Math.ceil(Review.All.length / 10),
                        size: "mini",
                        onPageChanged: function (event, oldPage, newPage) {
                            Review.CurrentPage = newPage;
                            var start = (newPage - 1) * 10;
                            if (Review.RactiveList.get('hasFilter')) {
                                Review.RactiveList.set('reviews', Review.FilterData.slice(start, start + 10));
                            } else {
                                Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                            }
                        }
                    });
                });
            }).error(function (response, headers, config) {
                Error.show(response.error.errorCode + ": " + response.error.message);
            }).validation(function (response, headers, config) {
                Error.show(response.validationErrors);
            });

            Review.RactiveList = new Ractive({
                el: 'reviews',
                template: reviewlist,
                noIntro: true,
                data: {
                    reviews: [],
                    filter: {},
                    hasFilter: false,
                    noResults: false,
                    editClass: function (userId) {
                        if (userId == CurrentUser.user.id) {
                            return "edit-resource";
                        } else {
                            return "";
                        }
                    },
                    format: function (date) {
                        return moment(date).fromNow();
                    },
                    gravatar: function (email) {
                        return 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase());
                    },
                    emoticon: function (rating) {
                        if (rating == 1)
                            return "emoticon-cry";
                        if (rating == 2)
                            return "emoticon-straight";
                        if (rating == 3)
                            return "emoticon-smile";
                        if (rating == 4)
                            return "emoticon-grin";
                        if (rating == 5)
                            return "emoticon-laugh";
                    }
                }
            });

            Review.RactiveList.on("edit", function (event) {
                var review = Review.All[parseInt(event.node.getAttribute('data-index')) + (Review.CurrentPage - 1) * 10];
                if (review.type == "Technology") {
                    MyTemplates.TechnologyReviewEdit(TechnologyReview.edit, review);
                    Error.lastModal = 'technologyreviewErrorModal';
                } else {
                    MyTemplates.ToolReviewEdit(ToolReview.edit, review);
                    Error.lastModal = 'toolreviewErrorModal';
                }
            });
            Review.RactiveList.on("removefilter", function (event) {
                Review.RactiveList.set('hasFilter', false);
                Review.RactiveList.set('noResults', false);
                Review.RactiveList.set('reviews', Review.All.slice(0, 10));
                Review.CurrentPage = 1;
                $('#reviewPager').bootstrapPaginator({ currentPage: 1, totalPages: Math.ceil(Review.All.length / 10) });
            });
        };

        Review.filter = function (filter) {
            Review.FilterData = Review.All.filter(function (data, index, all) {
                return (data[filter.field] == filter.id);
            });
            Review.RactiveList.set('filter', filter);
            Review.RactiveList.set('hasFilter', true);
            Review.RactiveList.set('reviews', Review.FilterData.slice(0, 10));
            Review.CurrentPage = 1;
            if (Review.FilterData.length > 0) {
                Review.RactiveList.set('noResults', false);
                $('#reviewPager').bootstrapPaginator({ currentPage: Review.CurrentPage, totalPages: Math.ceil(Review.FilterData.length / 10) });
            } else {
                Review.RactiveList.set('noResults', true);
                $('#reviewPager').bootstrapPaginator({ currentPage: Review.CurrentPage, totalPages: 1 });
            }
        };
        return Review;
    })();
    Clio.Review = Review;

    var TechnologyReview = (function () {
        function TechnologyReview() {
        }
        TechnologyReview.add = function (addForm, data) {
            var review = {
                id: 0,
                userId: CurrentUser.user.id,
                version: "",
                text: "",
                rating: '3',
                name: data.name,
                technologyId: data.id,
                projectId: 0
            };
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true,
                data: review
            });

            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.insert(path + "technologyreview", review, null).success(function (response, headers, config) {
                    Review.All.unshift(response.data);
                    Technology.reviewAdded(review.technologyId);
                    User.reviewAdded(review.userId);
                    Project.reviewAdded(review.projectId);
                    if (Review.All.length % 10 == 1) {
                        $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                    }
                    var start = (Review.CurrentPage - 1) * 10;
                    Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                    $('#reviews a').tooltip({});
                    $('#reviewModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        TechnologyReview.edit = function (addForm, data) {
            var review = data;
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true,
                data: review
            });

            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.update(path + "technologyreview", review, null).success(function (response, headers, config) {
                    var start = (Review.CurrentPage - 1) * 10;
                    Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                    $('#reviews a').tooltip({});
                    $('#reviewModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return TechnologyReview;
    })();
    Clio.TechnologyReview = TechnologyReview;

    var ToolReview = (function () {
        function ToolReview() {
        }
        ToolReview.add = function (addForm, data) {
            var review = {
                id: 0,
                userId: CurrentUser.user.id,
                version: "",
                text: "",
                rating: '3',
                name: data.name,
                toolId: data.id,
                projectId: 0
            };
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true,
                data: review
            });
            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.insert(path + "toolreview", review, null).success(function (response, headers, config) {
                    Review.All.unshift(response.data);
                    Tool.reviewAdded(review.toolId);
                    User.reviewAdded(review.userId);
                    Project.reviewAdded(review.projectId);
                    if (Review.All.length % 10 == 1) {
                        $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                    }
                    var start = (Review.CurrentPage - 1) * 10;
                    Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                    $('#reviews a').tooltip({});
                    $('#reviewModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };

        ToolReview.edit = function (addForm, data) {
            var review = data;
            review.projects = Project.All;

            var ractive = new Ractive({
                el: 'reviewModal',
                template: addForm,
                noIntro: true,
                data: review
            });
            ractive.set('rating', review.rating.toString());

            ractive.on('post', function (event) {
                // stop the page reloading
                event.original.preventDefault();

                var add = review.id == 0;
                review.version = event.context.version;
                review.rating = event.context.rating;
                review.text = event.context.text;
                review.projectId = event.context.projectId;

                var restClient = new RestClient();
                restClient.update(path + "toolreview", review, null).success(function (response, headers, config) {
                    if (add) {
                        Review.All.push(response.data);
                        if (Review.All.length % 10 == 1) {
                            $('#reviewPager').bootstrapPaginator({ totalPages: Math.ceil(User.All.length / 10) });
                        }
                    }
                    var start = (Review.CurrentPage - 1) * 10;
                    Review.RactiveList.set('reviews', Review.All.slice(start, start + 10));
                    $('#reviews a').tooltip({});
                    $('#reviewModal').modal('toggle');
                }).error(function (response, headers, config) {
                    Error.showModal(response.error.errorCode + ": " + response.error.message);
                }).validation(function (response, headers, config) {
                    Error.showModal(response.validationErrors);
                });
            });
        };
        return ToolReview;
    })();
    Clio.ToolReview = ToolReview;
})(Clio || (Clio = {}));
//# sourceMappingURL=Clio.js.map
