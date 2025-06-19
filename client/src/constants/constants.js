export const API_URL = import.meta.env.PROD
  ? "https://jammin-api-4dz4.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "d38aa6bb8f5e8f9889cfb175bd58167de4e13c431db8fc5deec6cca53f7a55cceb408711c7b1785f64a8c9176903a85aee05b619cc457bfc728b0981902080229f57d3c4eb7dbc814fbe3b7b6afd363c3982beaf7598e00c9bdec6d664add8f9e4d0d6c94a66cdfa0996bb5f89222604a2da889aa17a8d395819118009bfa6a6"
  : "2135a84b036292135f4433f725975646282cd4c441f7d3706fa6ba570ef1925f00e60ee3bf71597a6e0b4905f41b1ace4746b5e0dc4d98054eab9be97f65721398c656d38ef54843faa463fb57b53744769e5af0162b5868a57ee0fc299f83bae5bc1b4b57c2a8b7886135181b739b83b7f07e934d08e3dc1e818bbef6c4b9cd";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
