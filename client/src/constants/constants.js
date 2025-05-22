export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-4dz4.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "d38aa6bb8f5e8f9889cfb175bd58167de4e13c431db8fc5deec6cca53f7a55cceb408711c7b1785f64a8c9176903a85aee05b619cc457bfc728b0981902080229f57d3c4eb7dbc814fbe3b7b6afd363c3982beaf7598e00c9bdec6d664add8f9e4d0d6c94a66cdfa0996bb5f89222604a2da889aa17a8d395819118009bfa6a6"
  : "ca6e13336fa37b8b5ea0924283bc212ae4d4499a9b3752fde4222955d2e552caa10fdcb129e7231ade88d63f98257c26fc51899c4990f3035483c7b7e2a4d17f49db7781ce330c9774c7a01405fd367b5c50fde0845ca51c558d9bd3a8f8811c1ef55fb02ea28c793e88f52cf51d8cad420bc867a8d911287cfd6379461e3f6b";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
