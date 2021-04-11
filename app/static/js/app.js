/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/upload">Upload<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <hr>
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const UploadForm = {
    name: "upload-form",
    template: 
    `
    <div class="py-5">
        <h3 class="font-weight-bold mb-4">Upload Form</h3>
        <div class="form_response">
            <div>
                <div v-for="resp in response" class="alert alert-success">{{ resp.message }}</div>
                <ul v-for="resp in error" class="alert alert-danger pl-4">
                    <li class="pl-2">{{ resp.errors[0] }}</li>
                    <li class="pl-2">{{ resp.errors[1] }}</li>
                </ul>
            </div>
        </div>
       <form id="uploadForm" @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" required name="description" rows="3"></textarea>
            </div>
            <div class="form-group mb-4">
                <label for="photo">Upload Photo</label>
                <input type="file" class="form-control-file" required name="photo" id="photo">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>      
    </div>
    `,
    data: function() {
        return {
            response: [],
            error: []
        };
    },
    methods: {
        uploadPhoto() {
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                   'X-CSRFToken': token 
                },
                credentials: 'same-origin'
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonResponse) {
                console.log(jsonResponse.result)
                self.response = jsonResponse.result;
                self.error = jsonResponse.errors;
            })
            .catch(function(error) {
                console.log(error)
            });
        }
    }
};

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    { path: "/upload", component: UploadForm },
    // Put other routes here

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');