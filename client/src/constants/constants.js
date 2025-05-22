export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-4dz4.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "d38aa6bb8f5e8f9889cfb175bd58167de4e13c431db8fc5deec6cca53f7a55cceb408711c7b1785f64a8c9176903a85aee05b619cc457bfc728b0981902080229f57d3c4eb7dbc814fbe3b7b6afd363c3982beaf7598e00c9bdec6d664add8f9e4d0d6c94a66cdfa0996bb5f89222604a2da889aa17a8d395819118009bfa6a6"
  : "8cf2c09c3c33c6bc5ad132549c7ba9c8154b90f887567316e17f72feb2c80c2a05b21f268231d66fb86f5bc1bb83865ea4e44d8924d0e43aadc09d3415420dfa4d2c116ffd73968dfdb8f2ef7073fa0139b6805968e5057f7bf787213a018d629ed27c92df056882ae227119768eab0324053ae0db71c546cc337718d576ff70";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
