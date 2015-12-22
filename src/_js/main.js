(function(){
    function getRecentPosts () {
        let request = new XMLHttpRequest();
        request.open("GET", "/blog/recent.json", true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText),
                    homePageRecent = document.querySelector("#latest-blog-posts .blog-articles"),
                    recentPosts = document.getElementById("recent-posts");

                if (homePageRecent) {
                    homePageRecent.innerHTML = data.reduce((prev, post) => (
                        `${prev}
                        <div class="article">
                            <a href="${post.permalink}">
                                <p class="meta">${post.date}</p>
                                <h2>${post.title}</h2>
                                <p>${post.description}</p>
                            </a>
                        </div>`
                    ), "");
                } else if (recentPosts) {
                    let current = recentPosts.getAttribute("data-current");

                    recentPosts.innerHTML = data
                        .filter((post) => post.permalink !== current)
                        .reduce((prev, post) => (
                            `${prev}
                            <li>
                                <a href="${post.permalink}" title="${post.title}">
                                    ${post.title}
                                </a>
                            </li>`
                        ), "")
                }

            }
        }

        request.send();
    }

    function getPage(e) {
        let t = e.target;
        if (t.tagName !== "A" || !t.hasAttribute("data-ajax")) {
            return;
        }

        e.preventDefault();
        fetchPage(t.getAttribute("href"));
    }

    function fetchPage(link) {
        let path = link.replace(/\/$/g, "") + "/index.json",
            request = new XMLHttpRequest();

        request.open("GET", path, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                loadPage(data);
                history.pushState(data, data.title, link);
            }
        };

        request.send();
    }

    function loadPage(data) {
        document.title = data.title;
        document.body.className = data.body_class;
        document.getElementById("site-content").innerHTML = data.content;
    }

    window.onpopstate = function(e) {
        console.log(e.target.location);
        if (e.state) {
            loadPage(e.state);
        } else {
            fetchPage(window.location.pathname);
        }
    };

    document.body.addEventListener("click", getPage);

    getRecentPosts();
})();
